import {
    StyleSheet,
    View,
    Pressable,
    Image,
    Text,
    Dimensions,
} from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import MarkVector from '../../assets/questions/tastes/tickVector.png';
import { MotiView } from 'moti';
import { Fonts } from '../Utils/Constant/Fonts';
import { colors } from '../Utils/Constant/Colors';

const FilterList = props => {
    const { setSelectedCategory, item, selectCategoryItem } =
        props;
    const { selectedFilterData } = useSelector(state => state.filter);
    return (
        <View style={styles.container1}>
            <Pressable
                onPress={() => {
                    setSelectedCategory('car'), selectCategoryItem(item.category);
                }}>
                <View
                    style={
                        selectedFilterData.includes(item.category)
                            ? styles.categoryButton
                            : styles.categoryButton
                    }>
                    <MotiView
                        animate={{
                            scale: selectedFilterData.includes(item?.category) ? 0.7 : 1,
                        }}
                        transition={{
                            type: 'timing',
                            duration: 200,
                        }}>
                        <Image source={item?.source} style={styles.image} />
                    </MotiView>
                    {selectedFilterData.includes(item?.category) ? (
                        <MotiView
                            from={{
                                opacity: 0,
                                scale: 15,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            transition={{
                                type: 'timing',
                            }}
                            style={styles.markView}>
                            <Image style={styles.markImg} source={MarkVector} />
                        </MotiView>
                    ) : null}
                </View>
            </Pressable>
            <Text
                style={
                    selectedFilterData.includes(item?.category)
                        ? styles.activeCatagoryText
                        : styles.catagoryText
                }>
                {item?.category}
            </Text>
        </View>
    );
};

export default FilterList;

const styles = StyleSheet.create({
    container1: {
        width: Dimensions.get('window').width / 3,
        height: Dimensions.get('window').width / 2.5,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
    },
    selectedCategoryButton: {
        position: 'relative',
        overflow: 'hidden',
        width: Dimensions.get('window').width / 3 - 16,
        height: Dimensions.get('window').width / 3 - 16,
        borderColor: '#FFD700',
        borderWidth: 2,
        margin: 2,
    },
    categoryButton: {
        position: 'relative',
        overflow: 'hidden',
        width: Dimensions.get('window').width / 3 - 20,
        height: Dimensions.get('window').width / 3 - 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        backgroundColor: '#1A1A23',
    },
    image: {
        // width: Dimensions.get('window').width / 3 - 20,
        // height: Dimensions.get('window').width / 3 - 20,
        // width: 59,
        resizeMode: 'contain',
    },
    markView: {
        position: 'absolute',
        right: 5,
        bottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 19,
        width: 19,
        borderRadius: 25,
        backgroundColor: '#C4973E',
    },
    markImg: {
        width: 11,
        resizeMode: 'contain',
    },
    catagoryText: {
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: 16,
    },
    activeCatagoryText: {
        color: colors.YELLO_THEME_COLOR_TEXT,
        fontFamily: Fonts.REGULAR,
        fontSize: 16,
    },
});
