import React, { memo, useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../StoreRedux/hooks/Hooks';
import { fetchShopProductData } from '../../StoreRedux/ShopProductListSlice';
import { colors } from '../../Utils/Constant/Colors';
import { STATUSES } from '../../StoreRedux/objects';
import ProductCard from './ProductCard';
import { Fonts, FontSize, FontWeight } from '../../Utils/Constant/Fonts';
import RNFS from 'react-native-fs';
import ProductCardSingleRow from './ProductCardSingleRow';

const ProductCardList = ({
  onPressCard, shopProductList, setPage, page, currentFilterTag,
  singleGrid,
}: any) => {
  const { status, totalCountShopData } = useAppSelector(((state: any) => state.shopProductList))
  const dispatch = useAppDispatch();
  const [loadingMore, setLoadingMore] = useState(false); // Local loading state
  // useEffect(() => {
  //   if (shopProductList.length > 0) {
  //     downloadImages(shopProductList);
  //   }
  // }, [shopProductList]);

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
  const getCurrencySymbol = (region: any) => {
    switch (region.toUpperCase()) {
      case 'IN':
        return '₹'; // Indian Rupee
      case 'AE':
        return 'د.إ'; // UAE Dirham
      case 'GB':
        return '£'; // British Pound
      case 'EU':
        return '€'; // Euro
      case 'US':
        return '$'; // US Dollar
      default:
        return '$'; // Default to US Dollar if region is not recognized
    }
  };

  const getPriceInfo = (product: any) => {
    const region = "IN"; //Localize.getCountry()
    const priceInfo = product.find((price: any) => price.region.toLowerCase() === region.toLowerCase());
    if (priceInfo) {
      const currencySymbol = getCurrencySymbol(region);
      return `${currencySymbol}${priceInfo?.amount?.toLocaleString()}`
    } else {
      return null; // Return null if no price information is found for the specified region
    }
  };

  const loadMoreData = () => {
    if (!loadingMore && shopProductList?.length < totalCountShopData) {
      // console.log(page, "page", "===!loadingMore && shopProductList?.length < totalCountShopData && status === STATUSES.IDLE===", !loadingMore, shopProductList?.length, totalCountShopData)

      setLoadingMore(true); // Block additional calls until this one is done
      const newPage = page + 1; // Prepare new page value before calling API
      setPage(newPage); // Increment page
      dispatch(fetchShopProductData(currentFilterTag, newPage, '', ''))
        .finally(() => setLoadingMore(false)); // Ensure we allow future calls after data fetch
    }
  }
  const renderFooter = () => {
    if (shopProductList?.length >= totalCountShopData) {
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
        {loadingMore ? (
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
  // console.log("item=========RESSSSSSSSSSSSs=====>", shopProductList)

  return (
    <View style={styles.container}>
      {
        shopProductList?.length === 0 ? status === STATUSES.LOADING ? <ActivityIndicator size="large" color={colors.YELLO_THEME_COLOR} /> : <Text style={styles.noProduct}>No Products</Text>
          :
          <FlatList
            key={singleGrid ? 'single' : 'grid'}
            data={shopProductList.length % 2 !== 0 && !singleGrid
              ? [...shopProductList, { _id: 'placeholder', isPlaceholder: true }] // Add placeholder for odd data
              : shopProductList}
            renderItem={
              ({ item }) => (
                item.isPlaceholder ? ( // Render empty space for placeholder
                  <View style={styles.placeholder} />
                ) :
                  (<ProductCardSingleRow
                    item={item}
                    onPressCard={onPressCard}
                    getPriceInfo={getPriceInfo}
                    singleGrid={singleGrid}
                  />)
              )}
            keyExtractor={(item, index) => `${item._id}${index}`}
            numColumns={singleGrid ? 1 : 2}
            initialNumToRender={4}
            windowSize={5}
            ListFooterComponent={renderFooter}
            style={{ flexWrap: 'nowrap' }}
          />
      }
    </View>
  );
};

export default memo(ProductCardList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginHorizontal: 10,
    marginTop: 10
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
  noProduct: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: colors.YELLO_THEME_COLOR_TEXT,
  },
  placeholder: {
    flex: 1,
    margin: 10, // Same margin as the ProductCard
    backgroundColor: 'transparent', // Transparent to avoid any visuals
  },
});
