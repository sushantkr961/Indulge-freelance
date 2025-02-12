import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { colors } from "../../Utils/Constant/Colors";
import ExploreScreensHeader from "../../Components/ExploreScreensHeader";
import ExploreScreenFilterList from "../../Components/ExploreScreenFilterList";
import ExploreImageCarousel from "./ExploreImageCarousel";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../StoreRedux/hooks/Hooks";
import ExploreCardList from "./ExploreCardList";
import { fetchExploreData, resetExploreData } from "../../StoreRedux/ExploreDataListSlice";
import {
  fetchExploreFilterData,
  resetExploreFilterTags,
  resetExploreSubFilterTags,
  setExploreFilterTags,
  setExploreSubFilterTags,
} from "../../StoreRedux/ExploreFilterListSlice";
import ExploreSubCategoryFilterList from "../../Components/ExploreSubFilterList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ExploreCustomTooltip from "../../Components/ExploreCustomTooltip";
import { setIsExploreTooltipOpen, setIsHelpModalOpen } from "../../StoreRedux/ProfileDetailsSlice";
import { Fonts, FontSize } from "../../Utils/Constant/Fonts";
import ImageCarousel from "../../Components/ImageCarousel";
const ExploreScreen = ({ route }: any) => {
  const { path, id } = route.params || { path: undefined, id: undefined };
  const { deeplinkDetails } = useAppSelector((state) => state.deeplinkData);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [tooltipStep, setTooltipStep] = useState<number>(0); // Track tooltip step
  const [exploreTooltipsShown, setExploreTooltipsShown] = useState(false);
  const [exploreCategory, setExploreCategory] = useState('');
  const [isSearchList, setIsSearchList] = useState([]);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const backRoute = useRoute();

  const { exploreDataList, totalCount } = useAppSelector(
    (state: any) => state.exploreData
  );
  const { exploreFilterListData, exploreSubFilterListData } = useAppSelector(
    (state: any) => state.exploreFilterList
  );

  const { isFromReginster, isExploreTooltipOpen } = useAppSelector(
    (state) => state.profileDetails
  );
  const { exploreCarosalList } = useAppSelector(
    (state) => state.carosalImageData
  );

  const exploreTooltipData = [
    {
      index: 0,
      text: "Effortlessly top up your funds, explore transaction history, and unlock benefits by referring friends",
      title: "Explore - Filter",
    },
    {
      index: 1,
      text: "Shop to elevate your everyday—explore the Indulge Shop, filled with unique and exquisite pieces curated just for you.",
      title: "Shop",
    },
  ];
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      const newData = exploreFilterListData.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = query.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setIsSearchList(newData);
    } else {
      setIsSearchList([]);
    }
  };
  const onPressCard = (item: any) => {
    (navigation as any).navigate("ExploreSubScreen", { item: item });
  };
  useEffect(() => {
    exploreFilterListData?.length == 0 && dispatch(fetchExploreFilterData("EXPLORE"));
    const checkTooltipsShown = async () => {
      if (isFromReginster && !isExploreTooltipOpen) {
        setExploreTooltipsShown(true);
      }
    };
    checkTooltipsShown();
    dispatch(setIsHelpModalOpen(false));
  }, []);

  // useEffect(() => {
  //   // Check if the 'screen' param is passed and it's 'Concierge'
  //   if (backRoute.params?.screen === 'Concierge') {
  //     // If the param is 'Concierge', navigate to the 'Concierge' tab
  //     navigation.navigate('Concierge' as never);
  //   }
  // }, [backRoute.params]);

  const handleNextTooltip = async () => {
    if (tooltipStep < exploreTooltipData.length - 1) {
      setTooltipStep(tooltipStep + 1);
    } else {
      dispatch(setIsExploreTooltipOpen(true));
      setExploreTooltipsShown(false);
    }
  };
  const handlePreviousTooltip = async () => {
    if (tooltipStep == 0) return;
    if (tooltipStep <= exploreTooltipData.length - 1) {
      setTooltipStep(tooltipStep - 1);
    } else {
      dispatch(setIsExploreTooltipOpen(true));
      setExploreTooltipsShown(false);
    }
  };
  const handleSkipTooltip = async () => {
    dispatch(setIsExploreTooltipOpen(true));
    setExploreTooltipsShown(false);
  };

  useEffect(() => {
    if (deeplinkDetails?._id == id && path == 'Explore') {
      onPressCard(deeplinkDetails)
    } else {
      if (!exploreDataList || exploreDataList.length === 0) {
        setPage(1)
        console.log("exploreFilterListData[0]====", exploreFilterListData[0])
        clickOnTag(exploreFilterListData[0])
        // dispatch(fetchExploreData(exploreFilterListData?.find((item: any) => item.selected)?.name, exploreSubFilterListData?.find((item: any) => item.selected)?.value, 1))
        // dispatch(fetchExploreData(exploreFilterListData?.find((item: any) => item.selected)?.name, exploreSubFilterListData?.find((item: any) => item.selected)?.value, 1))
      }
    }
  }, [deeplinkDetails])
  const onRefresh = () => {
    setSearchQuery('');
    setIsSearching(false)
    // dispatch(resetExploreFilterTags());
    // dispatch(fetchExploreFilterData('EXPLORE'));
    dispatch(resetExploreSubFilterTags());
    setRefreshing(true);
    setPage(1)
    setTimeout(() => {
      dispatch(fetchExploreData(exploreCategory, '', 1))
    }, 1000);
    setRefreshing(false);
  };
  const clickOnTag = useCallback((item: any) => {
    dispatch(resetExploreSubFilterTags());
    dispatch(resetExploreData());
    setExploreCategory(item?.name)
    dispatch(setExploreFilterTags({ id: item.id }));
    setPage(1);
    dispatch(fetchExploreData(item?.name, '', 1))
  }, [dispatch]);
  const clickOnSubTag = useCallback(async (item: any) => {
    setPage(1);
    dispatch(setExploreSubFilterTags({ id: item.id }))
    dispatch(fetchExploreData(exploreCategory, item?.name, 1))
  }, [dispatch, exploreCategory]);
  const loadMoreData = () => {
    console.log("exploreDataList.length < totalCount====", exploreDataList.length, totalCount)
    if (exploreDataList.length < totalCount) {
      setPage(prevPage => prevPage + 1);
      dispatch(fetchExploreData(exploreCategory, exploreSubFilterListData?.find((item: any) => item.selected)?.value, page + 1))
    }
  }
  const loadMoreSearchData = () => {
    setIsSearching(true);
  };
  const clickOnSearchTag = (item: any) => {
    dispatch(resetExploreSubFilterTags());
    setIsSearchList([]);
    setIsSearching(false);
    setExploreCategory(item?.name)
    dispatch(setExploreFilterTags({ id: item.id }));
    setPage(1);
    dispatch(fetchExploreData(item?.name, '', 1))
  };
  return (
    <View style={styles.container}>
      <ExploreScreensHeader
        isSearching={isSearching}
        setIsSearching={setIsSearching}
        handleSearch={handleSearch}
        searchQuery={searchQuery}
      />
      {isSearchList.length > 0 && (
        <FlatList
          style={styles.searchList}
          showsHorizontalScrollIndicator={false}
          data={isSearchList}
          renderItem={(item, index) => (
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => {
                clickOnSearchTag(item.item);
              }}
            >
              <Text style={styles.eventSuggestionText}>{item.item.name} </Text>
              <View style={styles.line} />
            </TouchableOpacity>
          )}
          keyExtractor={(item: any) => item.id.toString()}
        />
      )}
      <ExploreScreenFilterList
        loadMoreSearchData={loadMoreSearchData}
        isSearching={isSearching}
        clickOnTag={clickOnTag}
      />

      {exploreFilterListData?.find((item: any) => item.selected) && (
        <ExploreSubCategoryFilterList clickOnSubTag={clickOnSubTag} />
      )}
      <ScrollView
        nestedScrollEnabled
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* <ImageCarousel shopCarosalList={exploreCarosalList} isFrom={'Explore'} />
        <ExploreImageCarousel /> */}
        <ExploreCardList
          onPressCard={onPressCard}
          loadMoreData={loadMoreData}
          exploreDataList={exploreDataList}
        />

      </ScrollView>
      <ExploreCustomTooltip
        visible={exploreTooltipsShown}
        exploreTooltipData={exploreTooltipData}
        tooltipStep={tooltipStep}
        handleNextTooltip={handleNextTooltip}
        handlePreviousTooltip={handlePreviousTooltip}
        handleSkipTooltip={handleSkipTooltip}
      />
    </View>
  )
}



export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BLACK_BACKGROUND_COLOR,
    zIndex: 0
  },
  eventSuggestionText: {
    fontSize: FontSize.F_16,
    color: colors.BLACK_BACKGROUND_COLOR,
    fontFamily: Fonts.REGULAR,
    paddingVertical: 10,
    paddingStart: 15,
  },
  searchList: {
    backgroundColor: colors.WHITE_COLOR,
    marginStart: 16,
    marginEnd: 10,
    borderRadius: 5,
    marginBottom: 10,
    position: "absolute",
    top: '13%',
    width: "79%",
    zIndex: 1
  },
  line: {
    paddingStart: 15,
    height: 1,
    backgroundColor: colors.BLACK_GREY_DIVIDER,
  },
});
