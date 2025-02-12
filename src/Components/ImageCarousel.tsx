import React, { useState, useEffect, useRef, memo, useCallback } from 'react';
import { StyleSheet, View, FlatList, Dimensions } from 'react-native';
import { colors } from '../Utils/Constant/Colors';
import FastImage from 'react-native-fast-image';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageContentLoader from './ImageContentLoader';

const ImageCarousel = ({ shopCarosalList, isFrom }: any) => {
  // console.log("shopCarosalList====", shopCarosalList)
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const [localImages, setLocalImages] = useState<string[]>([]);
  const [loader, setLoader] = useState<boolean>(false);

  const scrollToIndex = useCallback((index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
  }, []);
  // Function to download images and store them locally
  const downloadImages = async () => {
    try {
      const localPaths = [];

      for (let item of shopCarosalList) {
        // console.log("item=======", item)
        const filePath = `${RNFS.DocumentDirectoryPath}/${item._id}.jpg`;

        // Check if image already exists
        const imageExists = await RNFS.exists(filePath);
        if (!imageExists) {
          // Download and save image
          await RNFS.downloadFile({
            fromUrl: item.images.url,
            toFile: filePath,
          }).promise;
        }

        localPaths.push(filePath);
      }

      setLocalImages(localPaths);
      setLoader(false)

      // Save local paths in AsyncStorage
      if (isFrom === 'Ecommerce') {
        await AsyncStorage.setItem('carouselEcommerceImages', JSON.stringify(localPaths));
      }
      if (isFrom === 'Explore') {
        await AsyncStorage.setItem('carouselExploreImages', JSON.stringify(localPaths));
      }

    } catch (error) {
      console.error('Error downloading images:', error);
      setLoader(false)

    }
  };

  // Load local images from storage or download if not present
  const loadImages = async () => {
    setLoader(true)
    try {
      if (isFrom === 'Explore') {
        const storedImages = await AsyncStorage.getItem('carouselExploreImages');
        if (storedImages) {
          setLocalImages(JSON.parse(storedImages));
          setLoader(false)

        } else {
          await downloadImages();
        }
      } else if (isFrom === 'Ecommerce') {
        const storedImages = await AsyncStorage.getItem('carouselEcommerceImages');
        if (storedImages) {
          setLocalImages(JSON.parse(storedImages));
          setLoader(false)

        } else {
          await downloadImages();
        }
      }
    } catch (error) {
      console.error('Error loading images:', error);
      setLoader(false)
    }
  };

  // Load images when component mounts
  useEffect(() => {
    loadImages();
  }, [isFrom]);

  // Auto-scroll every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % shopCarosalList.length;
      setCurrentIndex(nextIndex);
      scrollToIndex(nextIndex);
    }, 5000); // Change to 5 seconds (5000ms)

    return () => clearInterval(interval);
  }, [currentIndex, shopCarosalList.length, scrollToIndex]);

  // Handler to update current index when scrolling manually
  const onScroll = useCallback(({ nativeEvent }: any) => {
    const index = Math.round(nativeEvent.contentOffset.x / Dimensions.get('window').width);
    setCurrentIndex(index);
  }, []);
  // console.log("localImages.length====", localImages.length, localImages)
  return (
    <View style={styles.container}>
      {loader ? <View style={styles.itemImageView}><ImageContentLoader /></View> :
        <FlatList
          ref={flatListRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          data={localImages.length > 0 ? localImages : shopCarosalList}
          // data={shopCarosalList}
          renderItem={({ item }) => (
            <View style={styles.itemImageView}>
              <FastImage
                style={styles.itemBackground}
                source={{
                  // uri: item.images.url,
                  uri: localImages.length > 0 ? `file://${item}` : item.images.url,
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          )}
          keyExtractor={(_, index) => index.toString()}
          onScroll={onScroll}
          windowSize={5}
        />}
      <View style={styles.indicatorContainer}>
        {!loader && shopCarosalList.map((_: any, index: any) => (
          <View
            key={index}
            style={[
              styles.indicator,
              index === currentIndex && styles.activeIndicator,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  itemImageView: {
    width: Dimensions.get('window').width,
    paddingHorizontal: 20,
  },
  itemBackground: {
    height: 200,
    borderRadius: 10
  },
  backgroundImage: {
    resizeMode: 'cover',
    borderRadius: 16,
  },
});

export default memo(ImageCarousel, (prevProps, nextProps) => {
  return prevProps.shopCarosalList === nextProps.shopCarosalList;
});
