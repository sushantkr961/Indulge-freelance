import { StyleSheet, Text, View, ActivityIndicator, Dimensions, TouchableOpacity, Image, FlatList, Platform } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { setInitialTagArray } from '../../../StoreRedux/TagsSlice';
import { fetchLikeReelData } from '../../../StoreRedux/LikeReelSlice';
import { STATUSES } from '../../../StoreRedux/objects';
import { strings } from '../../../Utils/Constant/Strings';
import { colors } from '../../../Utils/Constant/Colors';
import { Fonts, FontSize } from '../../../Utils/Constant/Fonts';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import SingleReel_Copy from '../../../Components/SingleReel_Copy';
import { useAppDispatch, useAppSelector } from '../../../StoreRedux/hooks/Hooks';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const FavoriteScreen = () => {
    const [reelsData, setReelsData] = useState([])
    const [dataLoadStatus, setDataLoadStatus] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentTag, setCurrentTag] = useState('');
    const dispatch = useAppDispatch();
    const { likedReelsData, status: statusLikeData } = useAppSelector((state) => state.likeReel);
    const { allFilterData } = useAppSelector((state: any) => state.filter);

    const swiperRef = React.useRef<SwiperFlatList>(null);
    const [paused, setPaused] = useState(false);
    const [mute, setMute] = useState(false);
    const viewRef = useRef<View>(null);
    const [viewStyle, setViewStyle] = useState({})
    const [visibleIndex, setVisibleIndex] = useState(0);
    const [visibleItems, setVisibleItems] = useState([]);
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    useEffect(() => {
        // call for reset selected tag in redux state
        // dispatch(setInitialTagArray())
        const fetchLikeData = async () => {
            dispatch(fetchLikeReelData())
        }
        fetchLikeData()
    }, []);
    useEffect(() => {
        setVisibleIndex(0);
        if (currentTag && likedReelsData.length > 0) {
            const filtered1 = likedReelsData.filter((reel: any) => reel.tags.some((tag: any) => currentTag == tag));
            setReelsData(filtered1);
        } else {
            setReelsData(likedReelsData)
            setDataLoadStatus(statusLikeData)
        }
    }, [likedReelsData, statusLikeData, currentTag])

    const onIndexChanged = (info: any) => {
        // Get the index of the currently visible item
        const currentIndex = info.changed[0]?.index || 0;
        setVisibleIndex(currentIndex);
    };
    const setResetCurrentTag = (item: string) => setCurrentTag(currentTag == item ? '' : item);
    const goBack = () => navigation.goBack();
    const measureView = () => {
        viewRef.current.measure((x, y, width, height, pageX, pageY) => {
            setViewStyle({ x, y, width, height, pageX, pageY })
            // console.log('x:', x); // The x position of the view relative to its parent
            // console.log('y:', y); // The y position of the view relative to its parent
            // console.log('width:', width); // The width of the view
            // console.log('height:', height); // The height of the view
            // console.log('pageX:', pageX); // The x position of the view relative to the screen
            // console.log('pageY:', pageY); // The y position of the view relative to the screen
        });
    };
    if (dataLoadStatus === STATUSES.LOADING) <View style={styles.container}><ActivityIndicator size="large" color={colors.YELLO_THEME_COLOR} /></View>
    return (
        <View style={styles.container}
            ref={viewRef}
            onLayout={measureView}
        >
            {<View style={styles.headerContainer}>
                <TouchableOpacity
                    onPress={goBack}
                    style={styles.backButtonContainer}>
                    <Image
                        source={require('../../../../assets/intro/BackArrow3.png')}
                        style={styles.logoProfile}
                    />
                </TouchableOpacity>

                <View style={styles.favButtonContainer}>
                    <Text style={styles.textFavStyle}>Favourites</Text>
                </View>
            </View>}
            {isFocused && reelsData && reelsData.length === 0 ? <View style={styles.container}><Text style={styles.textStyle}>{strings.NO_DATA_AVAILABLE}</Text></View> :
                <FlatList
                    // getItemLayout={getItemLayout}
                    // horizontal
                    // directionalLockEnabled
                    pagingEnabled
                    overScrollMode="never"
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    keyboardShouldPersistTaps="always"
                    scrollEnabled={true}
                    onViewableItemsChanged={onIndexChanged}
                    viewabilityConfig={{
                        itemVisiblePercentThreshold: 50
                    }}
                    ref={swiperRef}
                    index={visibleIndex}
                    data={reelsData}
                    renderItem={(item: any, index: any) => (
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
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    windowSize={1}
                />
            }
        </View>
    )
};

export default FavoriteScreen
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
    backButtonContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 4,
        padding: 5
    },
    logoProfile: {
        width: 25,
        height: 25,
        resizeMode: 'cover',
        tintColor: colors.WHITE_COLOR
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
    favButtonContainer: {
        alignSelf: 'center',
        marginStart: '20%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 9,
        borderRadius: 4
    },
    textFavStyle: {
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_16,
        color: colors.WHITE_COLOR
    },
})
