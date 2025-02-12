import React, { useState } from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity, Platform, ScrollView } from 'react-native';
import FilterScreenFilterList from '../../Components/FilterScreenFilterList';
import { formatValue } from '../../Utils';
import { colors } from '../../Utils/Constant/Colors'
import { Fonts, FontSize } from '../../Utils/Constant/Fonts';
import CustomSlider from './CustomSlider';

const FilterModal = ({ isModalVisible, setIsModalVisible, onClose }: any) => {
    const [priceRange, setPriceRange] = useState(0);
    const handleIncrease = () => {
        setPriceRange(prev => Math.min(prev + 10000, 500000000));
    };
    const handleDecrease = () => {
        setPriceRange(prev => Math.max(prev - 10000, 0));
    };
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => onClose(priceRange)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalHeader1} >
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalHeaderText}>Filter</Text>
                        <TouchableOpacity onPress={() => onClose(priceRange)} style={styles.closeButton}>
                            <Text style={styles.saveText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.categoryText}>Category</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{ flex: 1 }}
                    >
                        <FilterScreenFilterList />
                    </ScrollView>
                    <View style={{ flex: 0.7 }}>
                        <Text style={styles.categoryText}>Price</Text>
                        <CustomSlider
                            min={0} max={500000000} step={5000}
                            priceRange={priceRange} setPriceRange={setPriceRange}
                        />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.adjustButton} onPress={handleDecrease}>
                                <Text style={styles.adjustButtonText}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.priceRangeText}>{formatValue(priceRange)}</Text>
                            <TouchableOpacity style={styles.adjustButton} onPress={handleIncrease}>
                                <Text style={styles.adjustButtonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

export default FilterModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalHeader: {
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: Platform.OS == 'ios' ? 45 : 0,
        maxHeight: 250
    },
    modalHeader1: {
        flex: 1,
        backgroundColor: colors.BLACK_BLUE_DARK,
        paddingHorizontal: 20
    },
    modalHeaderText: {
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_24,
    },
    saveText: {
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_20,
    },
    categoryText: {
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_20,
        marginTop: 15
    },
    closeButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: colors.YELLO_THEME_COLOR_DARK,
        borderRadius: 10
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        width: '100%',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    filterIcon: {
        width: 46,
        height: 46
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 10
    },
    adjustButton: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.YELLO_THEME_COLOR_DARK,
        borderRadius: 25
    },
    adjustButtonText: {
        marginTop: Platform.OS === 'ios' ? 0 : -5,
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_24,
    },
    priceRangeText: {
        width: 100,
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_20,
        textAlign: 'center'
    }
});
