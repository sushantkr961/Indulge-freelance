import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Platform, View, Share, Linking, Alert, ActivityIndicator } from 'react-native';
import RNFS from 'react-native-fs';
import { colors } from '../../Utils/Constant/Colors';
import { Fonts, FontSize, FontWeight } from '../../Utils/Constant/Fonts';
import { useAppSelector } from '../../StoreRedux/hooks/Hooks';
import FastImage from 'react-native-fast-image';
import LoadingView from '../../Components/LoadingView';

const ProductCardSingleRow = ({ item, onPressCard, getPriceInfo, singleGrid }: any) => {
    const { deeplinkURL } = useAppSelector((state) => state.deeplinkData);
    const [imageUri, setImageUri] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    // console.log("item=========>", item)

    // useEffect(() => {
        // const downloadImage = async () => {
        //     const directoryPath = Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : RNFS.CachesDirectoryPath;
        //     const localPath = `${directoryPath}/${item._id}.jpg`;
        //     const fileExists = await RNFS.exists(localPath);

        //     if (fileExists) {
        //         setImageUri(`file://${localPath}`);
        //     } else {
        //         try {
        //             await RNFS.downloadFile({
        //                 fromUrl: item?.mainImage?.url,
        //                 toFile: localPath,
        //             }).promise;
        //             setImageUri(`file://${localPath}`);
        //         } catch (error) {
        //             console.log("Image download error:", error);
        //         }
        //     }
        //     setIsLoading(false);
        // };

        // downloadImage();
    // }, [item]);

    const sharePlace = async () => {
        const result = await Share.share({
            message: `Dear team, Would you be interested in reserving ${deeplinkURL}?path=Explore&id=${item._id}`,
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
    };

    const mapCallNow = (url) => {
        Linking.openURL(url).catch((err) => Alert.alert("Error opening map", err));
    };

    return (
        <TouchableOpacity
            style={[styles.itemButtonStyle, !singleGrid && { width: 181 }]}
            onPress={() => onPressCard(item)}
        >
            {/* {isLoading ? (
                <View style={[styles.itemBackground, !singleGrid && { height: 181, width: '100%' }]}>
                    <LoadingView height={80} width={80} />
                </View>
            ) : ( */}
            <FastImage
                style={[styles.itemBackground, !singleGrid && { height: 161, width: '100%', }]}
                source={{ uri: `data:image/png;base64,${item?.mainImage?.compressedBuffer}` }}
                resizeMode={!singleGrid ? FastImage.resizeMode.cover : FastImage.resizeMode.cover}
            />
            {/* )} */}
            <View style={styles.textContainer}>
                <Text style={styles.subTitle} numberOfLines={2}>{item.name}</Text>
                <Text style={styles.title} numberOfLines={1}>
                    {item?.isPriceOnRequest ? 'Price on Request' : getPriceInfo(item.prices)}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default ProductCardSingleRow;

const styles = StyleSheet.create({
    itemButtonStyle: {
        flex: 1,
        marginVertical: 10,
        marginHorizontal: 5,
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 2,
        backgroundColor: colors.BACK_BLUE_DARK,
    },
    itemBackground: {
        height: 260,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: colors.BLACK_BLUE_DARK,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16
    },
    cardActionView1: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
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
        fontWeight: FontWeight.F_W_300,
        maxWidth: 181,
        marginTop: 10,
    },
    title: {
        flex: 1,
        textAlign: 'left',
        fontSize: FontSize.F_15,
        fontFamily: Fonts.REGULAR,
        color: colors.GREY_FONT_COLOR,
        fontWeight: FontWeight.F_W_300,

    },
});
