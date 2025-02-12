import { RefreshControl, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { colors } from '../../Utils/Constant/Colors'
import ShopScreensHeader from '../../Components/ShopScreensHeader'
import ShopScreenFilterList from '../../Components/ShopScreenFilterList'
import { ScrollView } from 'react-native-gesture-handler'
import ProductCardList from './ProductCardList'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import FilterModal from './FilterModal'
import FilterSvg from '../../../assets/svg/FilterSvg'
import { useAppDispatch, useAppSelector } from '../../StoreRedux/hooks/Hooks'
import { fetchShopProductData, resetStateOfShopProduct } from '../../StoreRedux/ShopProductListSlice'
import { resetFilterTags, setFilterTags } from '../../StoreRedux/ShopFilterListSlice'
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux'
import { setDeeplinkDetailsData, setIsFromDeeplinking } from '../../StoreRedux/DeepLinkingSlice'
import ShopCustomTooltip from '../../Components/ShopCustomTooltip'
import { setIsHelpModalOpen, setIsShopTooltipOpen } from '../../StoreRedux/ProfileDetailsSlice'
import ImageCarousel from '../../Components/ImageCarousel'
import { fetchExploreFilterData } from '../../StoreRedux/ExploreFilterListSlice'
import ListSvg from '../../../assets/svg/ListSvg'
import GridSvg from '../../../assets/svg/GridSvg'
import ToggleButton from '../../Components/ToggleButton'
import useFetch from './useFetch'
const ShopScreen = ({ route }: any) => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [singleGrid, setSingleGrid] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const { filterListData } = useAppSelector(((state: any) => state.shopFilterList))
    const isFocused = useIsFocused()
    const [isSearching, setIsSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState<number>(1);
    const [currentFilterTag, setCurrentFilterTag] = useState('');
    const { shopProductList, totalCountShopData } = useSelector(((state: any) => state.shopProductList))
    const navigation = useNavigation()
    const { path, id, selectedTag } = route.params || { path: undefined, id: undefined, selectedTag: undefined };
    const { deeplinkDetails, error: deepLinkError } = useAppSelector((state) => state.deeplinkData);
    const [tooltipStep, setTooltipStep] = useState<number>(0); // Track tooltip step
    const [shopTooltipsShown, setShopTooltipsShown] = useState(false);
    const { isFromReginster, isShopTooltipOpen } = useAppSelector((state) => state.profileDetails);
    const { shopCarosalList } = useAppSelector((state) => state.carosalImageData);

    const shopTooltipData = [
        {
            index: 0,
            text: "Curate your world—use the filter to find content that speaks to your refined tastes and preferences.",
            title: "Shop - Options"
        },
        {
            index: 1,
            text: "Shop to elevate your everyday—explore the Indulge Shop, filled with unique and exquisite pieces curated just for you.",
            title: "Shop - Options"
        },
    ];

    useEffect(() => {
        filterListData?.length == 0 && dispatch(fetchExploreFilterData("ECOMMERCE"));

        const checkTooltipsShown = async () => {
            console.log("isFromReginster && !isShopTooltipOpen", isFromReginster, isShopTooltipOpen)
            if (isFromReginster && !isShopTooltipOpen) {
                setShopTooltipsShown(true)
            }
        };
        checkTooltipsShown();
        dispatch(setIsHelpModalOpen(false));
    }, [])

    const handleNextTooltip = async () => {
        if (tooltipStep < shopTooltipData.length - 1) {
            setTooltipStep(tooltipStep + 1);
        } else {
            dispatch(setIsShopTooltipOpen(true))
            setShopTooltipsShown(false);
        }
    };
    const handlePreviousTooltip = async () => {
        if (tooltipStep == 0) return
        if (tooltipStep <= shopTooltipData.length - 1) {
            setTooltipStep(tooltipStep - 1);
        } else {
            dispatch(setIsShopTooltipOpen(true))
            setShopTooltipsShown(false);
        }
    };
    const handleSkipTooltip = async () => {
        dispatch(setIsShopTooltipOpen(true))
        setShopTooltipsShown(false);
    };
    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };
    const filteredProducts = useCallback(
        shopProductList?.filter((product: any) =>
            // product.name.toLowerCase().includes(searchQuery.toLowerCase())

            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.categories.some((category: string) =>
                category.toLowerCase().includes(searchQuery.toLowerCase())
            )
        ),
        [searchQuery, shopProductList]
    );

    const onRefresh = () => {
        setSearchQuery('');
        setIsSearching(false)
        // dispatch(resetFilterTags());
        // setRefreshing(true);
        // dispatch(fetchExploreFilterData("ECOMMERCE"));
        setPage(1)
        dispatch(fetchShopProductData(currentFilterTag, 1, '', ''))
        // Add your refresh logic here. For example, you might want to refetch the data.
        // Once the data is fetched, setRefreshing(false) should be called to stop the refresh animation.
        // Simulating a network request with a timeout for demonstration purposes.
        // setTimeout(() => {
        //     // setRefreshing(false);
        // }, 2000);
    };
    const onPressCard = (item: any) => {
        (navigation as any).navigate('BuyScreen', { item: item }, { merge: true })
    }
    const onPressFilter = () => {
        setIsModalVisible(true);
    }
    const onPressGrid = () => {
        setSingleGrid(!singleGrid)
    }
    const onClose = (priceRange: number) => {
        const selectedTag1 = filterListData.find((item: any) => item.selected);
        const tagName = selectedTag1 ? selectedTag1.name : '';
        setPage(1)
        dispatch(fetchShopProductData(tagName, 1, priceRange, "IN"));
        setIsModalVisible(false);
    };
    useEffect(() => {
        if (deeplinkDetails?._id == id && path == 'Shop') {
            onPressCard(deeplinkDetails)
        } else {
            if (!shopProductList || shopProductList.length === 0) {
                const selectedTag1 = filterListData.find((item: any) => item.selected);
                const tagName = selectedTag1 ? selectedTag1.name : 'Featured';
                setSearchQuery('');
                setIsSearching(false)
                setPage(1)
                dispatch(fetchShopProductData(tagName, 1, '', ''));
            }
        }

    }, [deeplinkDetails]);
    // }, [navigation, filterListData, dispatch, isFocused, deeplinkDetails]);

    const goToAuction = () => {
        navigation.navigate('Auctions' as never)
    }
    const clickOnTag = (item: any) => {
        console.log("item===", item)
        if (item?.name === "Auctions") { goToAuction() }
        else {
            setCurrentFilterTag(item?.name)
            dispatch(setFilterTags({ id: item?.id }))
            dispatch(resetStateOfShopProduct())
            setPage(1)
            dispatch(fetchShopProductData(item?.name, 1, '', ''))
        }
    }

    // const { data, loading, error } = useFetch(
    //     `https://example.com/api/resource?tag=${selectedTag}`,
    //     {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWI3YjA3MWVlZjU3N2UyOTYyNzI2YjYiLCJpYXQiOjE3MzMzNzU3MTV9.nPWj9revogu-hCXNCxfk8JJ_8mxko7H2Ki6uDT91o94`,
    //       },
    //     }
    //   );

    useEffect(() => {
        if (selectedTag) {
            const selectedTag1 = filterListData.find((item: any) => item.name == selectedTag);
            console.log("selectedTag1====", selectedTag1)
            clickOnTag(selectedTag1)
        }
    }, [selectedTag])

    return (
        <View style={styles.container}>
            <ShopScreensHeader isSearching={isSearching}
                setIsSearching={setIsSearching}
                handleSearch={handleSearch} searchQuery={searchQuery} />
            <ShopScreenFilterList goToAuction={goToAuction} clickOnTag={clickOnTag} />
            <ScrollView nestedScrollEnabled refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <ImageCarousel shopCarosalList={shopCarosalList} isFrom={'Ecommerce'} />
                <ProductCardList
                    onPressCard={onPressCard}
                    shopProductList={filteredProducts}
                    // loadMoreData={loadMoreData} 
                    setPage={setPage}
                    page={page}
                    currentFilterTag={currentFilterTag}
                    singleGrid={singleGrid}
                />

            </ScrollView>
            <TouchableOpacity onPress={onPressGrid} style={[styles.buttonContainer1]}>
                {singleGrid ? <GridSvg /> : <ListSvg />}
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={onPressFilter} style={[styles.buttonContainer]}>
                <FilterSvg />
            </TouchableOpacity> */}
            <FilterModal
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                onClose={onClose}
            />
            <ShopCustomTooltip
                visible={shopTooltipsShown}
                shopTooltipData={shopTooltipData}
                tooltipStep={tooltipStep}
                handleNextTooltip={handleNextTooltip}
                handlePreviousTooltip={handlePreviousTooltip}
                handleSkipTooltip={handleSkipTooltip}
            />
        </View>
    )
}

export default React.memo(ShopScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BLACK_BACKGROUND_COLOR
    },
    filterIcon: {
        width: 64,
        height: 64
    },
    buttonContainer1: {
        position: 'absolute',
        bottom: 5,
        right: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        padding: 15,
        borderWidth: 1,
        borderRadius: 100,
        // borderColor: colors.GREY_FONT_FONT_COLOR,
        backgroundColor: colors.YELLO_THEME_COLOR,
        // shadowColor: colors.GREY_FONT_FONT_COLOR, // Shadow color
        // shadowOffset: {
        //     width: 1, // No horizontal offset
        //     height: 2, // No vertical offset for even spread
        // },
        // shadowOpacity: 0.5, // Adjust visibility
        // shadowRadius: 10, // Increase to create a wide spread
        // elevation: 10,

    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        padding: 10,
        borderWidth: 1,
        borderRadius: 100,
        // borderColor: colors.GREY_FONT_FONT_COLOR,
        backgroundColor: colors.YELLO_THEME_COLOR,
        // shadowColor: colors.GREY_FONT_FONT_COLOR, // Shadow color
        // shadowOffset: {
        //     width: 1, // No horizontal offset
        //     height: 2, // No vertical offset for even spread
        // },
        // shadowOpacity: 0.5, // Adjust visibility
        // shadowRadius: 10, // Increase to create a wide spread
        // elevation: 10,

    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeIndicator: {
        backgroundColor: colors.YELLO_THEME_COLOR
    },
})