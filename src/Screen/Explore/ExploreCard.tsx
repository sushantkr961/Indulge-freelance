import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Platform, View, Share, Linking, Alert, ActivityIndicator } from 'react-native';
import RNFS from 'react-native-fs';
import { colors } from '../../Utils/Constant/Colors';
import { Fonts, FontSize, FontWeight } from '../../Utils/Constant/Fonts';
import ShareIconSvg from '../../../assets/svg/ShareIconSvg';
import LocationIconSvg from '../../../assets/svg/LocationIconSvg';
import ActionIcons from '../../Components/ActionIcons';
import { useAppSelector } from '../../StoreRedux/hooks/Hooks';
import FastImage from 'react-native-fast-image';
import LoadingView from '../../Components/LoadingView';

const ExploreCard = ({ item, onPressCard }) => {
    const { deeplinkURL } = useAppSelector((state) => state.deeplinkData);
    const [imageUri, setImageUri] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const actionButton = [
        {
            "id": 0,
            "source": <ShareIconSvg width={26} height={26} />,
            "onPress": () => sharePlace()
        },
        {
            "id": 2,
            "source": <LocationIconSvg width={25} height={30} />,
            "onPress": () => mapCallNow(item?.mapLink),
            "isLike": false
        }
    ];

    useEffect(() => {
        const downloadImage = async () => {
            const directoryPath = Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : RNFS.CachesDirectoryPath;
            const localPath = `${directoryPath}/${item._id}.jpg`;
            const fileExists = await RNFS.exists(localPath);

            if (fileExists) {
                setImageUri(`file://${localPath}`);
            } else {
                try {
                    await RNFS.downloadFile({
                        fromUrl: item?.mainImage?.url,
                        toFile: localPath,
                    }).promise;
                    setImageUri(`file://${localPath}`);
                } catch (error) {
                    console.log("Image download error:", error);
                }
            }
            setIsLoading(false);
        };

        downloadImage();
    }, [item]);

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
            style={styles.itemButtonStyle}
            onPress={() => onPressCard(item)}
        >
            {isLoading ? (
                <View style={styles.itemBackground}>
                    <LoadingView height={100} width={100} />
                </View>
            ) : (
                <FastImage
                    style={styles.itemBackground}
                    source={{ uri: imageUri }}
                    resizeMode={FastImage.resizeMode.cover}
                />
            )}
            <View style={styles.titleContainer}>
                {item?.name && <Text style={styles.subTitle} numberOfLines={2}>{item.name}</Text>}
                <View style={styles.cardActionView1}>
                    {actionButton.map((action) => <ActionIcons item={action} key={action.id} />)}
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ExploreCard;

const styles = StyleSheet.create({
    itemButtonStyle: {
        flex: 1,
        marginVertical: 10,
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 2,
        backgroundColor: colors.BLACK_BLUE_DARK
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
    subTitle: {
        flex: 1,
        textAlign: 'left',
        color: colors.WHITE_COLOR,
        fontSize: FontSize.F_24,
        fontFamily: Fonts.REGULAR,
        fontWeight: FontWeight.F_W_300,
        marginTop: 10
    },
    cardActionView1: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
});
