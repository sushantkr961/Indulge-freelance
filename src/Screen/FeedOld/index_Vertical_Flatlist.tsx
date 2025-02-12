
import React, { useState, useEffect, useRef } from 'react';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, Platform, Image, ActivityIndicator } from 'react-native';
import { colors } from '../../Utils/Constant/Colors';
import SingleReel_Copy from '../../Components/SingleReel_Copy';
import { useNavigation, useIsFocused, DrawerActions } from '@react-navigation/native';
import { fetchProducts } from '../../StoreRedux/AllReelsSlice';
import { setInitialTagArray } from '../../StoreRedux/TagsSlice';
import { strings } from '../../Utils/Constant/Strings';
import NotificationIconSvg from '../../../assets/svg/NotificationIconSvg';
import FilterIconForReelSvg from '../../../assets/svg/FilterIconForReelSvg';
import { Fonts, FontSize } from '../../Utils/Constant/Fonts';
import { useAppDispatch, useAppSelector } from '../../StoreRedux/hooks/Hooks';
import { setDeeplinkDetailsData } from '../../StoreRedux/DeepLinkingSlice';
import { STATUSES } from '../../StoreRedux/objects';
import HelpWithYouScreen from '../../Components/HelpWithYouScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setIsHelpModalOpen } from '../../StoreRedux/ProfileDetailsSlice';
import Thumbnail2 from '../../../assets/screen/Thumbnail2.png'
import video1 from '../../../assets/video/Auto_harleyblue.mp4'
import video2 from '../../../assets/video/Auto_Bentley11.mp4'
// import video3 from '../../../assets/video/Gourmet_indulgeBugattiNoun.mp4'
// import SingleReel from '../../Components/SingleReel';
import RNFS from 'react-native-fs';

const windowWidth = Dimensions.get('window').width;
const FeedScreen = ({ route }: any) => {
    const { path, id } = route.params || { path: undefined, id: undefined };
    const { deeplinkDetails } = useAppSelector((state) => state.deeplinkData);
    const swiperRef = React.useRef<SwiperFlatList>(null);
    const [dataLoadStatus, setDataLoadStatus] = useState('')
    const [paused, setPaused] = useState(false);
    const [mute, setMute] = useState(false);
    const [page, setPage] = useState<number>(1);

    const viewRef = useRef<View>(null);
    const [viewStyle, setViewStyle] = useState({})
    const [visibleIndex, setVisibleIndex] = useState(0);
    const [visibleItems, setVisibleItems] = useState([]);
    const [currentTag, setCurrentTag] = useState('');
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const isFocused = useIsFocused();
    const [helpWithYouVisible, setHelpWithYouVisible] = useState(false);
    const { selectedFilterData } = useAppSelector((state: any) => state.filter);
    const [filteredReels, setFilteredReels] = useState([]);

    const { data, reelData, status, totalCount } = useAppSelector((state: any) => state.product);
    // console.log("DATAAAAAA+++++========", data)
    const { isWelcomeIsShown, isHelpModalOpen } = useAppSelector((state) => state.profileDetails);
    const [videoPaths, setVideoPaths] = useState([]);
    const directoryPath = Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : RNFS.CachesDirectoryPath;

    // Function to check if a video file exists
    const checkIfVideoExists = async (fileName) => {
        const videoPath = `${directoryPath}/${fileName}`;
        const exists = await RNFS.exists(videoPath);
        return exists ? videoPath : null;
    };

    // Function to download a video
    const downloadVideo = async (url, fileName) => {
        try {
            const filePath = `${directoryPath}/${fileName}`;
            const downloadResult = await RNFS.downloadFile({
                fromUrl: url,
                toFile: filePath,
            }).promise;

            if (downloadResult.statusCode === 200) {
                return filePath;
            }
            return null;
        } catch (error) {
            console.error('Download Error:', error);
            return null;
        }
    };

    // Download videos one by one for all data
    const downloadAllVideos = async () => {
        const downloadedPaths = [];

        for (const item of reelData) {
            const fileName = `reel_${item._id}.mp4`;
            const localVideoPath = await checkIfVideoExists(fileName);

            if (!localVideoPath) {
                console.log(`Downloading video for item ID: ${item._id}`);
                const downloadedPath = await downloadVideo(item.videoUrl, fileName);
                downloadedPaths.push(downloadedPath ? downloadedPath : item.videoUrl);
            } else {
                console.log(`Video already exists for item ID: ${item._id}`);
                downloadedPaths.push(localVideoPath);
            }
        }

        console.log("All video paths:", downloadedPaths);
        return downloadedPaths;
    };

    useEffect(() => {
        const fetchVideoPaths = async () => {
            const paths = await downloadAllVideos();
            setVideoPaths(paths);
        };

        fetchVideoPaths();
    }, [reelData]);

    const localReelsData = [
        {
            "_id": "66d068f1a0bcad62572b3025",
            "title": "Bentley",
            "description": "Experience Elegance in Motion",
            "videoUrl": video2,
            // "videoUrl": "https://d13pwi6da1y6cp.cloudfront.net/Auto%2FBentley11.mp4",
            "tags": [
                "Auto",
                "Jet",
                "Sail"
            ],
            "thumbNail": Thumbnail2,
            "likeCount": 0,
            "__v": 0
        },
        {
            "_id": "66d06bdea0bcad62572b317f",
            "title": "Harley Davidson's Blue edition",
            "description": "A masterpiece crafted by Bucherer",

            "videoUrl": video1,
            // "videoUrl": "https://d13pwi6da1y6cp.cloudfront.net/Auto%2Fharleyblue.mp4",
            "tags": [
                "Auto",
                "Jet",
                "Sail"
            ],
            "thumbNail": Thumbnail2,
            "likeCount": 0,
            "__v": 0
        },
        // {
        //     "_id": "66d06c7ca0bcad62572b31ef",
        //     "title": "Bugatti Noun",
        //     "description": "where technology meets gastronomy",
        //     "videoUrl": video3,
        //     // "videoUrl": "https://d13pwi6da1y6cp.cloudfront.net/Gourmet%2FindulgeBugattiNoun.mp4",
        //     "tags": [
        //         "Gourmet"
        //     ],
        //     "thumbNail": Thumbnail2,
        //     "likeCount": 0,
        //     "__v": 0
        // }
    ]
    useEffect(() => {
        navigation.getParent()?.setOptions({
            tabBarStyle: {
                display: 'none'
            }
        });

        return () => {
            navigation.getParent()?.setOptions({
                tabBarStyle: {
                    display: 'flex'
                }
            });
        }
    }, [])

    // Function to open the Welcome Modal
    const openHelpWithYouModal = async () => {
        // const shown = await AsyncStorage.getItem('welcomeScreenShown');

        setPaused(true)
        setMute(true)
        dispatch(setIsHelpModalOpen(true));
    };
    const onSelect = (item: any) => {
        if (item?.name === "Tastes") {
            setPaused(false)
            setMute(false)
            closeHelpWithYouModal();
            goToFilter()
            return
        }
        if (item?.name === "Auctions") {
            closeHelpWithYouModal();
            goToAuction()
            return
        }
        if (item?.name === "Feed") {
            setPaused(false)
            setMute(false)
            closeHelpWithYouModal();
            return
        }
        closeHelpWithYouModal();
        navigation.navigate(item?.name, { selectedTag: item?.selectedTag });
    }
    // Function to close the Welcome Modal
    const closeHelpWithYouModal = async () => {
        // setHelpWithYouVisible(false);
        setPaused(true)
        setMute(true)
        dispatch(setIsHelpModalOpen(false));

    };
    useEffect(() => {
        // call for reset selected tag in redux state
        dispatch(setInitialTagArray())
        if (isWelcomeIsShown) openHelpWithYouModal()
    }, [isWelcomeIsShown]);

    useEffect(() => {
        if (currentTag && data?.length > 0) {
            setVisibleIndex(0);
            const filtered1 = data?.filter((reel: any) => reel.tags.some((tag: any) => currentTag == tag));
            setFilteredReels(filtered1);
        } else {
            if (deeplinkDetails?._id == id && path == 'Feed') {
                setVisibleIndex(0);
                // Create a new array with deeplinkDetails at the start, followed by the existing reelsData
                setFilteredReels([deeplinkDetails, ...data]);
            } else {
                // setVisibleIndex(0);
                // swiperRef.current?.scrollToIndex({ index: 0, animated: true });
                setFilteredReels([...localReelsData, ...data]);
                setFilteredReels([...data]);
            }
        }
    }, [currentTag, data, deeplinkDetails]);

    useEffect(() => {
        // Dispatch the fetchData action with the API URL
        if (selectedFilterData?.length > 0) {
            dispatch(setDeeplinkDetailsData({}))
            setCurrentTag('')
            setPage(1)
            dispatch(fetchProducts(selectedFilterData.join(','), 1));
        } else {
            // dispatch(resetReelsData())
            setPage(1)
            // console.log("DATAAAAAA+++++========1111111111111111",)

            dispatch(fetchProducts('', 1));
        }
    }, [selectedFilterData]);

    const setResetCurrentTag = (item: string) => setCurrentTag(currentTag == item ? '' : item);
    const onIndexChanged = (info: any) => {
        // Get the index of the currently visible item
        const currentIndex = info.changed[0]?.index || 0;
        console.log("currentIndex >= data?.length && data?.length < totalCount====", currentIndex, data?.length, totalCount)
        setVisibleIndex(currentIndex);
        if (currentIndex >= data?.length - 5 && data?.length < totalCount) {
            setPage((prevPage) => {
                const nextPage = prevPage + 1;
                dispatch(fetchProducts(selectedFilterData.join(','), nextPage));
                return nextPage;
            });
        }
    };
    // const onViewableItemsChanged = ({ viewableItems }: any) => {
    //     const footerIndex = filteredReels.length; // Assuming footer comes after the last reel item
    //     console.log("viewableItems=======", footerIndex, viewableItems)
    //     // Check if the footer (last item) is visible
    //     const footerVisible = viewableItems.some(item => item.index === footerIndex);

    //     // If the footer is visible, trigger more data loading
    //     if (footerVisible && data.length < totalCount) {
    //         handleLoadMoreData(); // Call function to load more data
    //     }
    // };

    // const handleLoadMoreData = () => {
    //     console.log("Footer visible, loading more data...");
    //     if (status !== STATUSES.LOADING) {
    //         setPage((prevPage) => {
    //             const nextPage = prevPage + 1;
    //             dispatch(fetchProducts(selectedFilterData.join(','), nextPage));
    //             return nextPage;
    //         });
    //     }
    // };
    const renderFooter = () => {
        if (filteredReels.length >= totalCount) {
            return (
                <View style={styles.footerContainer}>
                    {status === STATUSES.LOADING ? <ActivityIndicator size="large" color={colors.YELLO_THEME_COLOR} />
                        : < Text style={styles.textStyle}>No more data available</Text>
                    }
                </View>
            );
        }
        return null;
    };
    // <SingleReel
    //     index={index}
    //     item={item}
    //     videoViewStyle={{ height: viewStyle.height, width: viewStyle.width }}
    // />)
    const renderItem = (item: any, index: any) => (
        <SingleReel_Copy
            item={item}
            index={index}
            visibleIndex={visibleIndex}
            videoViewStyle={{ height: viewStyle.height, width: viewStyle.width }}
            currentTag={currentTag}
            setResetCurrentTag={setResetCurrentTag}
            isFocused={isFocused}
            paused={paused}
            setPaused={setPaused}
            mute={mute}
            setMute={setMute}
        />
    );

    const opendrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    }

    const goToAuction = () => {
        navigation.navigate('Auctions' as never)
    }
    const goToFilter = () => {
        navigation.navigate("Tastes" as never);
    }
    const onNotificationPress = () => {
        navigation.navigate('CalendarNotifications' as never)
    }
    const measureView = () => {
        viewRef.current.measure((x, y, width, height, pageX, pageY) => {
            setViewStyle({ x, y, width, height, pageX, pageY })
        });
    };
    // console.log("filteredReels=========", filteredReels)
    return (
        <View style={styles.container}
            ref={viewRef}
            onLayout={measureView}
        >
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    onPress={opendrawer}
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        borderRadius: 4
                    }}>
                    <Image
                        source={require('../../../assets/screen/Indulge_LOGO_ONLY.png')}
                        style={styles.logoProfile}
                    />
                </TouchableOpacity>

                <View style={styles.textContainer}>
                </View>
                <TouchableOpacity onPress={goToFilter} style={{
                    marginEnd: 30, backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    padding: 5,
                    borderRadius: 4
                }}>
                    <FilterIconForReelSvg />
                </TouchableOpacity>
                <TouchableOpacity onPress={onNotificationPress} style={{
                    marginEnd: 20, backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    padding: 5,
                    borderRadius: 4
                }}>
                    <NotificationIconSvg />
                </TouchableOpacity>
            </View>
            {isFocused && filteredReels && filteredReels.length === 0 ? <View style={styles.container}><Text style={styles.textStyle}>{strings.NO_DATA_AVAILABLE}</Text></View> :
                <FlatList
                    pagingEnabled
                    overScrollMode="never"
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    keyboardShouldPersistTaps="always"
                    scrollEnabled={true}
                    onViewableItemsChanged={onIndexChanged}
                    viewabilityConfig={{
                        itemVisiblePercentThreshold: 100,  // Trigger when item is 100% visible
                    }}
                    onEndReachedThreshold={0.5}
                    ref={swiperRef}
                    index={visibleIndex}
                    data={filteredReels}
                    renderItem={renderItem}
                    ListFooterComponent={renderFooter}
                    keyExtractor={(item, index) => item._id.toString()}
                    // initialNumToRender={5}
                    windowSize={3}
                    removeClippedSubviews={true}
                />
            }
            <HelpWithYouScreen
                visible={isHelpModalOpen}
                onClose={closeHelpWithYouModal}
                onSelect={onSelect}
            />
        </View>
    )
};

export default FeedScreen;
const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.BLACK_BACKGROUND_COLOR },
    textStyle: {
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_16,
        color: colors.YELLO_THEME_COLOR
    },
    headerContainer: {
        flex: 1,
        position: 'absolute',
        width: windowWidth,
        zIndex: 1,
        top: Platform.OS == 'ios' ? '5%' : '1%',
        left: '2%',
        flexDirection: 'row',
        alignItems: 'center',
        height: 45,
    },
    logoProfile: {
        width: 56,
        height: 56,
        resizeMode: 'cover',
        tintColor: colors.WHITE_COLOR
        // backgroundColor: colors.WHITE_COLOR
    },
    logoFilter: {
        width: 30,
        height: 30,
        resizeMode: 'cover'
    },
    textContainer: {
        flex: 1,
        paddingHorizontal: 10
    },
    footerContainer: {
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
})