import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';
import { colors } from '../Utils/Constant/Colors';
import { Fonts, FontSize, FontWeight } from '../Utils/Constant/Fonts';

const TermsAndConditionsView = ({ checked, setChecked }: any) => {
    const navigation = useNavigation()
    const handlePress = () => {
        Linking.openURL('https://collectibles.global/pages/terms-of-use');
    };
    const goToTAndC = () => {
        navigation.navigate('Terms & Conditions' as never)
    }
    return (
        <View style={styles.container}>
            <Checkbox.Android
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => setChecked(!checked)}
            />
            <Text style={styles.digitText}>
                {`I have read and agreed to the`}
                <Text style={styles.digitText1} onPress={goToTAndC}>
                    {` Terms and 
            conditions *`}
                </Text>
            </Text>
        </View>
    );
};

export default TermsAndConditionsView;

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    digitText: {
        textAlign: 'center',
        fontFamily: Fonts.REGULAR,
        color: colors.WHITE_COLOR,
        fontSize: FontSize.F_16,
        fontWeight: FontWeight.F_W_300,
        marginTop: 10
    },
    digitText1: {
        color: colors.YELLO_THEME_COLOR_TEXT,
        textAlign: 'center',
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_16,
        fontWeight: FontWeight.F_W_300
    }
})
