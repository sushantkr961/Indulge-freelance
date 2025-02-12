import React, { useRef, useState, useEffect, } from 'react';
import Video from 'react-native-video';
import { PermissionsAndroid, Pressable, ActivityIndicator, View, Dimensions, Text, Alert, Share, TouchableOpacity, Image, StyleSheet, Platform, Linking, ImageBackground } from 'react-native';
import LikedReelsStorage from './LikedReelsStorage';
import { dislikeReelAction, fetchProducts, likeReelAction } from '../StoreRedux/AllReelsSlice'
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../Utils/Constant/Colors';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import LikeIconSvg from '../../assets/svg/LikeIconSvg';
import { Fonts } from '../Utils/Constant/Fonts';
import ShareIconSvg from '../../assets/svg/ShareIconSvg';
import { useAppDispatch, useAppSelector } from '../StoreRedux/hooks/Hooks';
import FastImage from 'react-native-fast-image';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import RNFS from 'react-native-fs';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SingleReel = ({
    item, index, visibleIndex, currentIndex,
    currentTag, setResetCurrentTag, videoViewStyle, isFocused, paused,
    setPaused, mute, setMute
}) => {

    const video = useRef(null);
    const [like, setLike] = useState(false);
    const [likeReel, setLikeReel] = useState(item.item.liked);
    const [showControls, setShowControls] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const navigation = useNavigation();
    // const isFocused = useIsFocused();
    const [likedReels, setLikedReels] = useState([]);
    const [isFontLoaded, setFontLoaded] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isBuffering, setIsBuffering] = useState(false);
    const { deeplinkURL } = useAppSelector((state) => state.deeplinkData);
    const { isHelpModalOpen } = useAppSelector((state) => state.profileDetails);

    const [videoSource, setVideoSource] = useState(item.item.videoUrl);

    const [storedPhoneNumber, setStoredPhoneNumber] = useState('');
    const dispatch = useAppDispatch();
    // const tags = useSelector(state => state.tags);
    // const isReelLiked = useSelector((state) => state.likeReels.isLiked);

    // useEffect(() => {
    //     LikedReelsStorage.getLikedReels().then((reels) => {
    //         setLikedReels(reels);
    //         setLike(reels.includes(item.item.video));
    //     });
    // }, [item]);

    async function requestStoragePermission() {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true; // iOS doesn't need permission for saving files in its local directory
    }
    const checkIfVideoExists = async (fileName) => {
        const videoPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
        const exists = await RNFS.exists(videoPath);
        return exists ? videoPath : null;
    };
    const downloadVideo = async (url, fileName) => {
        try {
            const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
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
    const playVideo = async (videoUrl, fileName) => {
        const localVideoPath = await checkIfVideoExists(fileName);

        if (!localVideoPath) {
            console.log('Downloading video...');
            const downloadedPath = await downloadVideo(videoUrl, fileName);
            return downloadedPath ? downloadedPath : videoUrl; // Play downloaded or fallback to remote
        } else {
            console.log('Video already downloaded');
            return localVideoPath;
        }
    };
    useEffect(() => {
        const handleVideoSource = async () => {
            const videoPath = await playVideo(item.item.videoUrl, `reel_${item.item._id}.mp4`);
            setVideoSource(videoPath);
        };

        handleVideoSource();
    }, [item.item.videoUrl]);

    useEffect(() => {
        setLikeReel(item.item?.liked)
        if (!isFocused) {
            setPaused(true)
            setMute(true)
        }
        else {
            setPaused(false)
        }
    }, [isFocused, item]);
    const handleLike = async () => {
        const updatedReels = likedReels.includes(item.item.video)
            ? likedReels.filter((url) => url !== item.item.video)
            : [...likedReels, item.item.video];

        setLikedReels(updatedReels);
        setLike(!like);

        await LikedReelsStorage.setLikedReels(updatedReels);
    };

    const handleLikeReels = async (status) => {
        setLikeReel(status)
        if (status) {
            dispatch(likeReelAction(item?.item?._id))
        } else {
            dispatch(dislikeReelAction(item?.item?._id))
        }
    }

    // useEffect(() => {
    //     console.log("isFocused:::::", isFocused)

    //     if (!isFocused) {
    //         // setPaused(false)
    //         // video?.current?.pauseVideo();
    //         // video?.current?.setNativeProps({ paused: false })
    //         console.log("isFocused:::::", isFocused)

    //         setPaused(true)
    //         setShowControls(false);
    //         // video?.current?.unloadAsync();
    //     } else {
    //         setPaused(false)
    //     }
    // }, [isFocused]);

    //add font-family
    useEffect(() => {
        // const loadFont = async () => {
        //     await Font.loadAsync({
        //         "YourFont-Regular": fontName,
        //     });
        //     setFontLoaded(true);
        // };
        // loadFont();
        const getPhoneNumber = async () => {
            try {
                const storedNumber = await AsyncStorage.getItem('phoneNumber');
                if (storedNumber !== null) {
                    setStoredPhoneNumber(storedNumber);
                }
            } catch (error) {
                console.error('Error retrieving phone number:', error);
            }
        };
        getPhoneNumber();
        return () => {
            // video?.current?.pauseVideo();
            // video?.current?.unloadAsync();
            setPaused(true)
            setShowControls(false);
        }
    }, []);

    // if (!isFontLoaded) {
    //     return null;
    // }







    const handleLayout = (event) => {
        const { x, y, width, height } = event.nativeEvent.layout;
        const screenTop = 0;
        const screenBottom = windowHeight;
        const screenLeft = 0;
        const screenRight = windowWidth;

        // Check if any part of the view is within the screen boundaries
        if (x + width > screenLeft && x < screenRight && y + height > screenTop && y < screenBottom) {

            setIsVisible(true);
            setPaused(false)
        } else {
            setPaused(true)
            setIsVisible(false);
        }
    };


    const onError = error => {
        console.log("error ++++:r", error)
    }

    const onBuffer = buffer => {

        // {"isBuffering": false, "target": 1975}
        setIsBuffering(buffer.isBuffering)
        setLoading(false);
    }

    //Share functionality
    const onShare = async () => {
        try {
            const videoUrl = item.item.video;

            const result = await Share.share({
                message: `${item.item.title}\n${videoUrl}`,
                title: 'Check out this video!',
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                } else {
                }
            } else if (result.action === Share.dismissedAction) {
            }
        } catch (error) {
            Alert.alert('Error sharing video', error.message);
        }
    };

    const openAppOrStore = () => {
        Linking.canOpenURL(urlScheme)
            .then((supported) => {
                if (supported) {
                    Linking.openURL(urlScheme);
                } else {
                    if (Platform.OS === 'ios') {
                        Linking.openURL(appStoreUrl);
                    } else if (Platform.OS === 'android') {
                        Linking.openURL(playStoreUrl);
                    }
                }
            })
            .catch((err) => console.error('An error occurred', err));
    };

    // Usage example:
    const onShareReel = () => {
        const urlScheme = `ind://feed/${item.item._id}`;
        const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.rutu12.IndulgeApplication';
        const appStoreUrl = 'https://apps.apple.com/in/app/indulgeapplication/id6476107583';
        openAppOrStore(urlScheme, playStoreUrl, appStoreUrl);
    };
    const handleShareLink = async () => {
        try {
            // if (!item?.item?.thumbNail) {
            const result = await Share.share({
                message: `Hey,
                    Check this out on Indulge🧞‍♀️ - ${deeplinkURL}?path=Feed&id=${item.item._id}`,
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log(`Shared with activity type: ${result.activityType}`);
                } else {
                    console.log('Link was shared');
                }
            } else if (result.action === Share.dismissedAction) {
                console.log('Share was dismissed');
            }
            // } else {
            //     Alert.alert("This is local reel.")
            // }
        } catch (error) {
            console.error('Error sharing link:', error.message);
        }
    };

    const opendrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    }
    const goToFilter = () => {
        navigation.navigate("Tastes");
    }
    const onNotificationPress = () => {
        navigation.navigate('CalendarNotifications')
    }
    const tagHandler = (c_tag) => {
        setResetCurrentTag(c_tag)
        dispatch(fetchProducts(c_tag))
    }

    const controlsView = () => {
        setShowControls(true); // Show/hide controls on video press
        setMute(!mute)
        setTimeout(() => {
            setShowControls(false);
        }, 2000);
    };
    const hideControlsAfterResume = () => {
        setShowControls(false);
    };
    const playOrPauseVideo = (flag) => {
        console.log("flag:::", flag)
        // video.current.paused = false;
        setPaused(flag)
        if (flag) {
            hideControlsAfterResume()
        }
    }
    const reloadVideo = () => {
        if (video.current) {
            video.current.seek(0); // Seek to the beginning to restart the video
        }
    };
    const onErrorHandler = (error) => {
        // Log the error for debugging purposes
        console.log('Video playback error:', error);
        // reloadVideo()
        // Reload the video source or reinitialize it
        // video.current?.reinitialize(); // Or set the video source again
    };

    const onLongPress = () => {
        setPaused(true)
    }

    const onPressOut = () => {
        setPaused(false)
    }
    console.log("visibleIndex::", visibleIndex, item.index, paused)
    return (
        <View style={{
            // flex: 1,
            backgroundColor: colors.BLACK_BACKGROUND_COLOR,
            alignItems: 'center',
            justifyContent: 'center'
        }}
            onLayout={handleLayout}
        >
            <Pressable
                onPress={controlsView}
                onLongPress={onLongPress}
                onPressOut={onPressOut}
            >
                <Video
                    // poster={ImageForThumbnail}
                    // poster={{ uri: "../../assets/intro/AccessSlide.png" }}
                    ref={video}
                    onBuffer={onBuffer}
                    onError={onErrorHandler}
                    repeat={true}
                    resizeMode='cover'
                    // isLooping={true}
                    muted={mute}
                    preload={'auto'}
                    onLoadStart={() => setIsBuffering(true)}
                    onLoad={() => setIsBuffering(false)}
                    minLoadRetryCount={5}
                    paused={!isHelpModalOpen && visibleIndex === item.index ? paused : true}
                    // paused={currentIndex === item?.index ? paused : true} //TODO: need to uncomment after when use pase video
                    // source={{ uri: `https://indulgeconcierge.com/${item?.item?.videoUrl}` }}
                    source={{ uri: videoSource }}
                    // source={{ uri: `https://d13pwi6da1y6cp.cloudfront.net/Fashion%2FMan%20Foot%20002.mp4` }}
                    // source={{ uri: "4CC0538A-9DEF-4CDF-AC8F-FA89B0EAD812?offset=0&size=7216777" }}
                    // source={item?.item?.thumbNail ? item.item.videoUrl : { uri: item.item.videoUrl }} //.replace(/%20/g, '')
                    // source={{ uri: "https://youtube.com/shorts/01uKTK-oSdQ?si=HYU9nMyhiHL-ulMk" }}
                    // source={{ uri: "https://d13pwi6da1y6cp.cloudfront.net/Fashion%2Fmost%20valued%20jam.mp4" }}
                    // source={{ uri: "https://d13pwi6da1y6cp.cloudfront.net/Featured%2FArtAutoRangeRover.mov" }}
                    style={{
                        // flex: 1,
                        width: videoViewStyle.width,
                        height: videoViewStyle.height,
                        zIndex: 0,
                    }}
                />
            </Pressable>
            {isBuffering && (
                <FastImage
                    source={{
                        uri: item?.item?.thumbnail ? item?.item?.thumbnail : "https://d2h288z1mqqfao.cloudfront.net/1729323372689-Screenshot%202024-10-19%20at%201.00.04%E2%80%AFPM.png",
                        priority: FastImage.priority.high,
                    }}
                    style={[styles.pauseORResumeview, {
                        width: videoViewStyle.width,
                        height: videoViewStyle.height
                    }]}
                >
                    <ActivityIndicator size="large" color={colors.YELLO_THEME_COLOR} />
                </FastImage>
            )}

            {!paused && <View style={styles.actionContainer}>
                <View style={styles.actionContainer1}>
                    <View style={{ flex: 1 }}>
                        <Text style={{
                            color: colors.WHITE_COLOR,
                            fontFamily: Fonts.REGULAR,
                            fontSize: 20,
                            // fontWeight: '700'
                        }}>{item?.item?.title}</Text>
                        <Text style={{
                            color: colors.WHITE_COLOR,
                            fontFamily: Fonts.REGULAR,
                            fontSize: 15,
                        }}>{item?.item?.description}</Text>
                    </View>
                    <TouchableOpacity onPress={() => handleLikeReels(likeReel ? false : true)}>
                        {/* <AntDesign name={likeReel ? "heart" : "hearto"} size={24} color={likeReel ? 'red' : 'white'} /> */}
                        <LikeIconSvg width={32} height={32} color={likeReel ? "#C4963D" : "transparent"} />
                    </TouchableOpacity>
                </View>
                <View style={styles.actionContainer1}>
                    <View style={styles.styleForTags}>
                        {
                            item?.item?.tags[0] &&
                            item?.item?.tags?.map((item) => <Pressable
                                style={[styles.tagsListStyle, currentTag === item ? { backgroundColor: 'grey' } : {}]}
                                onPress={() => { tagHandler(item) }}
                                key={item}
                            >
                                <Text style={styles.tagsTextStyle}>{item}</Text>
                            </Pressable>)
                        }
                    </View>
                    <View style={styles.shareButtonContainer}>
                        <TouchableOpacity onPress={handleShareLink}>
                            {/* <Image source={require('../../assets/screen/ShareIconWhite.png')} /> */}
                            <ShareIconSvg width={25} height={25} />
                        </TouchableOpacity>
                    </View >
                </View >
            </View >}
            {
                showControls && (
                    <Pressable //onPress={() => setMute(!mute)}
                        hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
                        style={styles.muteUnmuteButton}>
                        <MaterialIcons name={mute ? "volume-off" : "volume-up"} size={45} color="white" />
                    </Pressable>
                )
            }
        </View >
    )
}
export default React.memo(SingleReel);

const styles = StyleSheet.create({
    muteUnmuteButton: {
        flex: 1,
        position: 'absolute',
        zIndex: 1,
        bottom: '50%',
        left: '45%',
        marginEnd: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 8,
        borderRadius: 4
    },
    pauseORResumeview: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: windowWidth,
        zIndex: 1
    },
    pauseORResumeButtonView: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 8,
        borderRadius: 4
    },
    actionContainer: {
        flex: 1,
        position: 'absolute',
        width: windowWidth,
        zIndex: 1,
        bottom: '3%',
    },
    actionContainer1: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: '2%'
    },
    tagAndShareContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    styleForTags: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginRight: 10,
        padding: 5
    },
    tagsListStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: '#C4963D',
        justifyContent: 'center',
        marginRight: 10,
        marginTop: 10,
        padding: 5
    },
    tagsTextStyle: {
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: 14,
        paddingHorizontal: 5
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'cover',
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
        resizeMode: 'cover'
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
})
