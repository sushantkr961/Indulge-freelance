import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Dimensions, StyleSheet, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import PlayYellowSvg from '../../../assets/svg/PlayYellowSvg';
import { colors } from '../../Utils/Constant/Colors';
import VideoPlayModal from '../../Components/VideoPlayModal';
import RNFS from 'react-native-fs';
import FastImage from 'react-native-fast-image';

function CustomCarousel({ item }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [videoModal, setVideoModal] = useState(false);
    const [videoLink, setVideoLink] = useState('');
    const [mediaData, setMediaData] = useState([]);

    useEffect(() => {
        const createMediaData = async () => {
            const data = [];

            // Download and store image paths in mediaData
            for (const image of item?.images || []) {
                // const localPath = await downloadImage(image.url);
                data.push({
                    type: 'image',
                    url: image.compressedBuffer,
                });
            }

            // Add video thumbnail
            if (item?.video?.url) {
                // const thumbnailPath = await downloadImage(item.mainImage.url);
                data.push({
                    type: 'video',
                    url: item.video.url,
                    thumbnailUrl: item.mainImage.compressedBuffer,
                });
            }

            setMediaData(data);
        };

        createMediaData();
    }, [item]);

    // Function to handle downloading and returning the local file path
    const downloadImage = async (url) => {
        const fileName = url.split('/').pop();
        const localPath = `${RNFS.CachesDirectoryPath}/${fileName}`;

        const fileExists = await RNFS.exists(localPath);
        if (!fileExists) {
            await RNFS.downloadFile({ fromUrl: url, toFile: localPath }).promise;
        }
        return `file://${localPath}`;  // Return the file path in URI format
    };

    const width = Dimensions.get('window').width;
    const onPressPlayButton = (videoName) => {
        setVideoLink(videoName);
        setVideoModal(true);
    };

    return (
        <View style={styles.container}>
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
                                source={{ uri: `data:image/png;base64,${item.url}` }}
                                resizeMode={FastImage.resizeMode.contain}
                            />
                        ) : (
                            <TouchableOpacity onPress={() => onPressPlayButton(item.url)}>
                                <FastImage
                                    style={styles.imageStyle}
                                    source={{ uri: `data:image/png;base64,${item.thumbnailUrl}` }}
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
        flex: 1,
    },
    playButtonContainer: {
        position: 'absolute',
        top: 50,
        right: 20,
        flexDirection: 'row',
    },
    indicatorContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        flexDirection: 'row',
    },
    indicator: {
        width: 14,
        height: 3,
        backgroundColor: colors.WHITE_COLOR_BLACK_GREY,
        marginHorizontal: 5,
    },
    activeIndicator: {
        backgroundColor: colors.YELLO_THEME_COLOR,
    },
    imageContainer: {
        flex: 1,
        borderWidth: 1,
        justifyContent: 'center',
    },
    imageStyle: {
        width: '100%',
        height: 526,
    },
});
