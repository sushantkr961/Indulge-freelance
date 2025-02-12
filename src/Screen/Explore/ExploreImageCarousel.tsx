import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, FlatList, Dimensions, ImageBackground } from 'react-native';
import { colors } from '../../Utils/Constant/Colors';

const images = [
  require('../../../assets/screen/ExploreImage/Explore_Image_1.png'),
  require('../../../assets/screen/ExploreImage/Explore_Image_2.png'),
  require('../../../assets/screen/ExploreImage/Explore_Image_3.png'),
  require('../../../assets/screen/ExploreImage/Explore_Image_4.png')
  // Add more image URIs as needed
];

const ExploreImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate the index of the next image
      const nextIndex = (currentIndex + 1) % images.length;
      setCurrentIndex(nextIndex);
      // Scroll to the next image
      flatListRef.current.scrollToIndex({ index: nextIndex });
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={images}
        renderItem={({ item }) => (
          <View style={styles.itemImageView}>
            <ImageBackground source={item} style={styles.itemBackground} imageStyle={styles.backgroundImage} resizeMode="cover" >

            </ImageBackground>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        onScroll={({ nativeEvent }) => {
          // Calculate the current index based on scroll position
          const index = Math.round(nativeEvent.contentOffset.x / Dimensions.get('window').width);
          setCurrentIndex(index);
        }}
      />
      <View style={styles.indicatorContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              index === currentIndex && styles.activeIndicator,
            ]}
          />
        ))}
      </View>
    </View >
  );
};

export default ExploreImageCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1
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
  itemImageView: {
    width: Dimensions.get('window').width,
    paddingHorizontal: 10
  },
  itemBackground: {
    height: 200
  },
  backgroundImage: {
    resizeMode: 'cover',
    borderRadius: 16
  }
});

