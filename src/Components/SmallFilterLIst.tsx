import {
  StyleSheet,
  View,
  Pressable,
  Image,
  Text,
  ScrollView,
  TextInput,
  FlatList,
  Dimensions,
} from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import selectMark from '../../assets/questions/tastes/selectedCheckMark.png';

const SmallFilterList = props => {
  const { selectedCategory, item } = props;
  const { selectedFilterData } = useSelector(state => state.filter);
  return (
    <View style={styles.container1}>
      <Pressable>
        <View
          style={
            selectedFilterData.includes(item.category)
              ? styles.categoryButton
              : styles.categoryButton
          }>
          <Image source={item.source} style={styles.image} />
          {selectedFilterData.includes(item.category) ? (
            <Image style={styles.markImg} source={selectMark} />
          ) : null}
        </View>
      </Pressable>
    </View>
  );
};

export default SmallFilterList;

const styles = StyleSheet.create({
  container1: {
    width: Dimensions.get('window').width / 4,
    height: Dimensions.get('window').width / 4,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  selectedCategoryButton: {
    position: 'relative',
    width: Dimensions.get('window').width / 4 - 16,
    height: Dimensions.get('window').width / 4 - 16,
    borderColor: '#FFD700',
    borderWidth: 2,
    margin: 2,
  },
  categoryButton: {
    position: 'relative',
    width: Dimensions.get('window').width / 4 - 20,
    height: Dimensions.get('window').width / 4 - 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#1A1A23',
  },
  image: {
    // width: Dimensions.get('window').width / 4 - 20,
    // height: Dimensions.get('window').width / 4 - 20,
    width: 29,
    resizeMode: 'contain',
  },
  markImg: {
    width: 17,
    position: 'absolute',
    right: 5,
    bottom: 5,
    resizeMode: 'contain',
  },
});
