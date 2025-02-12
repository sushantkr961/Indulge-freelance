import { View, BackHandler, Dimensions, Linking, AppState, Platform } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import IntroVideoStyle from './style'
import { useNavigation } from '@react-navigation/native';
import Video from 'react-native-video';
const windowWidth = Dimensions.get('window').width;
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parseDeepLinkUrl } from '../../../Utils';
import INDULGE_INTRO_1 from '../../../../assets/video/INDULGE_INTRO_1.mp4'
import { useAppDispatch, useAppSelector } from '../../../StoreRedux/hooks/Hooks';

const IntroVideoScreen = ({ route }: any) => {
    const navigation = useNavigation();
    const { id } = route.params || { id: undefined };
    console.log("idididididididididid===>Video:::", id)
    useEffect(() => {
        const backAction = () => {
            // Close the application when back button is pressed
            BackHandler.exitApp();
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, []);
    const videoPlayer = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [paused, setPaused] = useState(false);
    const [
        playerState, setPlayerState
    ] = useState(1);
    const [endVideo, setEndVideo] = useState(1)
    const [screenType, setScreenType] = useState('content');
    const [initialRoute, setInitialRoute] = useState('');
    const [appState, setAppState] = useState(AppState.currentState);
    const isIpad = Platform.OS === 'ios' && (windowWidth / Dimensions.get('window').height) > 0.8;
    const dispatch = useAppDispatch();

    const getInitialRouteName = async () => {
        try {
            const data = await AsyncStorage.getItem('token');
            if (data) {
                setInitialRoute("MyDrawer");
                gotoScreen("MyDrawer");
            } else {
                setInitialRoute('IntroImage');
                // gotoScreen("IntroImage");
            }
        } catch (error) {
            console.error('Error retrieving data:', error);
            setInitialRoute("IntroImage");
        }
    };
    useEffect(() => {
        getInitialRouteName();
        // Function to handle incoming deep links
        // const handleDeepLink = (event: any) => {
        //     const url = event.url;
        //     const { path, id } = parseDeepLinkUrl(url);
        //     console.log("path, params======", path, id)
        //     if (path && id) {
        //         navigateToScreen(path, id);
        //     }
        // };

        // // Attach event listener
        // Linking.addEventListener('url', handleDeepLink);

        // // Check if the app was opened via a deep link
        // Linking.getInitialURL().then((url) => {
        //     if (url) {
        //         handleDeepLink({ url });
        //     }
        // });
        return () => { }
    }, [])
    // Function to navigate to the appropriate screen
    const navigateToScreen = async (path: string, params: string) => {
        try {
            const data = await AsyncStorage.getItem('token');
            if (data) {
                setInitialRoute("MyDrawer");
                gotoMydrawer("MyDrawer", path, params);
            } else {
                setInitialRoute('IntroImage');
            }
        } catch (error) {
            console.error('Error retrieving data:', error);
            setInitialRoute("IntroImage");
        }
    };

    const gotoMydrawer = (initialRoute: string, path: string, params: string) => navigation.reset({
        index: 0,
        routes: [{ name: initialRoute }],
        param: { path: path, params: params }
    });

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (appState.match(/inactive|background/) && nextAppState === 'active') {
                setPaused(false); // Resume video when app comes to the foreground
            } else if (nextAppState.match(/inactive|background/)) {
                setPaused(true); // Pause video when app goes to the background
            }
            setAppState(nextAppState);
        });

        return () => {
            subscription.remove();
        };
    }, [appState]);
    // Skip video if device is iPad
    useEffect(() => {
        if (isIpad) {
            onEnd();
        }
    }, [isIpad]);
    const onSeek = (seek) => {
        //Handler for change in seekbar
        videoPlayer.current.seek(seek);
    };

    const onPaused = (playerState) => {
        //Handler for Video Pause
        setPaused(!paused);
        setPlayerState(playerState);
    };

    const onReplay = () => {
        //Handler for Replay
        // setPlayerState(PLAYER_STATES.PLAYING);
        videoPlayer.current.seek(0);
    };

    const onProgress = (data) => {
        // Video Player will progress continue even if it ends
        // if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
        setCurrentTime(data.currentTime);
        // }
    };

    const onLoad = (data) => {
        setDuration(data.duration);
        setIsLoading(false);
    };

    const onLoadStart = (data) => setIsLoading(true);
    const gotoScreen = (initialRoute) => navigation.reset({
        index: 0,
        routes: [{ name: initialRoute }],
    });

    const onEnd = () => navigation.reset({
        index: 0,
        routes: [{ name: initialRoute }],
    });

    const onSeeking = (currentTime) => setCurrentTime(currentTime);

    return (
        <View style={IntroVideoStyle.container}>
            <Video
                onEnd={onEnd}
                onLoad={onLoad}
                // onLoadStart={onLoadStart}
                // onProgress={onProgress}
                paused={paused}
                ref={videoPlayer}
                resizeMode={'cover'}
                onFullScreen={isFullScreen}
                source={INDULGE_INTRO_1}
                style={{
                    width: windowWidth - 120,
                    aspectRatio: 17 / (37 * 0.9),
                    zIndex: 0,
                }}
                volume={10}
            />
        </View>
    )
}

export default IntroVideoScreen
