import React, { useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { colors } from '../../Utils/Constant/Colors';
import { STATUSES } from '../../StoreRedux/objects';
import ExploreCard from './ExploreCard';
import { Fonts, FontSize, FontWeight } from '../../Utils/Constant/Fonts';
import { useAppSelector } from '../../StoreRedux/hooks/Hooks';
import RNFS from 'react-native-fs';

const ExploreCardList = ({ onPressCard, loadMoreData }: any) => {
    const { exploreDataList, status, totalCount } = useAppSelector(((state: any) => state.exploreData))
    const renderShopItem = ({ item }: any) => <ExploreCard item={item} onPressCard={onPressCard} />
    // console.log("exploreDataList=====", exploreDataList)
    useEffect(() => {
        if (exploreDataList.length > 0) {
            downloadImages(exploreDataList);
        }
    }, [exploreDataList]);

    const downloadImages = async (products: any) => {
        for (const product of products) {
            for (const image of product.images) {
                const fileName = image.url.split('/').pop();
                const localPath = `${RNFS.CachesDirectoryPath}/${fileName}`;

                const fileExists = await RNFS.exists(localPath);
                if (!fileExists) {
                    await RNFS.downloadFile({ fromUrl: image.url, toFile: localPath }).promise;
                }

                // Update product image URL to local path for display
                image.localPath = `file://${localPath}`;
            }
        }
    };
    const renderFooter = () => {
        if (exploreDataList.length >= totalCount) {
            return (
                <View style={styles.footerContainer}>
                    {status === STATUSES.LOADING ? <ActivityIndicator size="large" color={colors.YELLO_THEME_COLOR} />
                        : <Text style={styles.textStyle}>No more data available</Text>
                    }
                </View>
            );
        }

        return (
            <View style={styles.footerContainer}>
                {status === STATUSES.LOADING ? (
                    <ActivityIndicator size="large" color={colors.YELLO_THEME_COLOR} />
                ) : (
                    <TouchableOpacity onPress={loadMoreData}
                        style={styles.loadMoreContainer}>
                        <Text style={styles.textStyle1}>Browse More</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    };
    return (
        <View style={styles.container}>
            {
                exploreDataList.length === 0 ? status === STATUSES.LOADING ? <ActivityIndicator size="large" color={colors.YELLO_THEME_COLOR} /> : <Text style={styles.noProduct}>No Explore Places Found.</Text>
                    :
                    <FlatList
                        data={exploreDataList}
                        renderItem={renderShopItem}
                        numColumns={1}
                        ListFooterComponent={renderFooter}
                        keyExtractor={(item, index) => item._id}
                        // onEndReached={loadMoreData}
                        // onEndReachedThreshold={0.5}
                        initialNumToRender={5}
                        windowSize={5}
                        removeClippedSubviews={true}
                    />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        marginTop: 10
    },
    noProduct: {
        flex: 1,
        textAlign: 'center',
        color: colors.YELLO_THEME_COLOR_TEXT,
        fontSize: FontSize.F_26,
        fontFamily: Fonts.REGULAR
    },
    footerContainer: {
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        fontFamily: Fonts.BOLD,
        fontSize: FontSize.F_16,
        color: colors.YELLO_THEME_COLOR,
        fontWeight: FontWeight.F_W_500
    },
    textStyle1: {
        fontFamily: Fonts.BOLD,
        fontSize: FontSize.F_18,
        color: colors.YELLO_THEME_COLOR,
        fontWeight: FontWeight.F_W_500
    },
    loadMoreContainer: {
        padding: 5
    },
});

export default ExploreCardList;
