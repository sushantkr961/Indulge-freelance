import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import FastImage from 'react-native-fast-image';
import { colors } from '../../Utils/Constant/Colors';
import { Fonts, FontSize } from '../../Utils/Constant/Fonts';
import RNFS from 'react-native-fs';
import LoadingView from '../../Components/LoadingView';

// The ProductCard component handles rendering a single product item
const ProductCard = ({ item, onPressCard, getPriceInfo }: any) => {
    const [localImageUri, setLocalImageUri] = useState(item?.mainImage?.url); // Initialize with remote URL
    const [loadingImage, setLoadingImage] = useState(true); // Loading state for each image

    // Function to get the image path from local storage or download it
    const getCachedImage = async (imageUri: string) => {
        const fileName = imageUri.split('/').pop(); // Get the image file name from URI
        const localImagePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

        // Check if the image exists locally
        const imageExists = await RNFS.exists(localImagePath);

        if (!imageExists) {
            // Download the image if it doesn't exist locally
            try {
                const download = await RNFS.downloadFile({
                    fromUrl: imageUri,
                    toFile: localImagePath
                }).promise;

                if (download.statusCode === 200) {
                    return `file://${localImagePath}`; // Return local path
                }
            } catch (error) {
                console.error("Error downloading image:", error);
            }
        } else {
            console.log("imageExists========>", imageExists)
            return `file://${localImagePath}`; // Return local path if exists
        }

        return imageUri; // Fallback to remote URL if download fails
    };

    useEffect(() => {
        (async () => {
            const cachedImage = await getCachedImage(item?.mainImage?.url);
            setLocalImageUri(cachedImage);
            setLoadingImage(false); // Stop loading once the image is ready
        })();
    }, [item?.mainImage?.url]);

    return (
        <TouchableOpacity style={styles.itemContainer} onPress={() => onPressCard(item)}>
            <View style={styles.imageContainer}>
                {loadingImage ? (
                    <View style={[styles.image1, { alignSelf: 'center' }]}>
                        <LoadingView height={150} width={100} />
                    </View>
                ) : (
                    localImageUri && (
                        <FastImage
                            style={styles.image}
                            source={{
                                uri: localImageUri,
                                priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                    )
                )}
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.subTitle} numberOfLines={2}>{item.name}</Text>
                <Text style={styles.title} numberOfLines={1}>
                    {item?.isPriceOnRequest ? 'Price on Request' : getPriceInfo(item.prices)}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default React.memo(ProductCard, (prevProps, nextProps) => {
    return prevProps.item === nextProps.item;
});

const styles = StyleSheet.create({
    itemContainer: {
        marginEnd: Platform.OS === 'ios' ? 10 : 15,
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: 20,
        backgroundColor: colors.BACK_BLUE_DARK,
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 5,
        maxWidth: 170,
        minWidth: 170,
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        borderRadius: 10,
        height: 170,
        width: 170,
    },
    image1: {
        alignItems: 'center',
        borderRadius: 10,
        height: 170,
        width: 170,
    },
    textContainer: {
        flex: 1,
        padding: 15,
    },
    subTitle: {
        flex: 1,
        textAlign: 'left',
        color: colors.WHITE_COLOR,
        fontSize: FontSize.F_18,
        fontFamily: Fonts.REGULAR,
        maxWidth: 200,
        marginTop: 10,
    },
    title: {
        flex: 1,
        textAlign: 'left',
        fontSize: FontSize.F_15,
        fontFamily: Fonts.REGULAR,
        color: colors.GREY_FONT_COLOR,
    },
});
