import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import PlayYellowSvg from '../../../../assets/svg/PlayYellowSvg';
import { colors } from '../../../Utils/Constant/Colors';
import VideoPlayModal from '../../../Components/VideoPlayModal';
import FastImage from 'react-native-fast-image';

function CustomCarousel({ item }: any) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [videoModal, setVideoModal] = useState<boolean>(false);
    const [videoLink, setVideoLink] = useState('');
    const [mediaData, setMediaData] = useState([]);
    useEffect(() => {
        const createMediaData = () => {
            const data = [];
            item?.images?.forEach(image => {
                data.push({
                    type: 'image',
                    url: image?.url
                });
            });
            if (item?.video?.url) {
                data.push({
                    type: 'video',
                    url: item?.video.url,
                    thumbnailUrl: item?.mainImage?.url
                });
            }
            setMediaData(data);
        };

        createMediaData();
    }, [item]);

    const width = Dimensions.get('window').width;
    const onPressPlayButton = (videoName: any) => {
        setVideoLink(videoName);
        setVideoModal(true);
    };
    return (
        <View style={{ flex: 1 }}>
            <Carousel
                loop
                width={width}
                height={426}
                autoPlay={!videoModal}
                data={mediaData}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => setCurrentIndex(index)}
                pagingEnabled
                renderItem={({ item }) => (
                    <View style={styles.imageContainer}>
                        {item.type === 'image' ? (
                            <FastImage
                                style={styles.imageStyle}
                                source={{
                                    uri: item.url,
                                    priority: FastImage.priority.normal,
                                }}
                                resizeMode={FastImage.resizeMode.contain}
                            />
                        ) : (

                            item.url && <TouchableOpacity onPress={() => onPressPlayButton(item.url)}>
                                <FastImage
                                    style={styles.imageStyle}
                                    source={{
                                        uri: item.thumbnailUrl,
                                        priority: FastImage.priority.normal,
                                    }}
                                    resizeMode={FastImage.resizeMode.contain}
                                />
                                <TouchableOpacity style={styles.playButtonContainer} onPress={() => onPressPlayButton(item.url)}>
                                    <PlayYellowSvg />
                                </TouchableOpacity>
                            </TouchableOpacity>

                        )}
                    </View>
                )}
            />
            <View style={styles.indicatorContainer}>
                {mediaData.map((_, index) => (
                    <View
                        key={index.toString()}
                        style={[
                            styles.indicator,
                            index === currentIndex && styles.activeIndicator,
                        ]}
                    />
                ))}
            </View>
            <VideoPlayModal
                videoModal={videoModal}
                setVideoModal={setVideoModal}
                videoLink={videoLink}
            />
        </View>
    );
}

export default CustomCarousel;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    playButtonContainer: {
        position: 'absolute',
        top: 50,
        right: 20,
        flexDirection: 'row'
    },
    indicatorContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        flexDirection: 'row'
    },
    indicator: {
        width: 14,
        height: 3,
        backgroundColor: colors.WHITE_COLOR_BLACK_GREY,
        marginHorizontal: 5
    },
    activeIndicator: {
        backgroundColor: colors.YELLO_THEME_COLOR
    },
    imageContainer: {
        flex: 1,
        borderWidth: 1,
        justifyContent: 'center',
    },
    imageStyle: {
        width: '100%',
        height: 526
    }
});
