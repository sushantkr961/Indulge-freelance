import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet } from 'react-native';
import { colors } from '../../../Utils/Constant/Colors';
import Ongoing from './Ongoing';
import MyBids from './MyBids';
import { Fonts, FontSize } from '../../../Utils/Constant/Fonts';

const Tab = createMaterialTopTabNavigator();

const TabNavBarAuction = () => {
    return (
        <Tab.Navigator
            style={styles.container}
            sceneContainerStyle={styles.container}
            tabBarOptions={{
                style: styles.tabBarOptions,
                activeTintColor: colors.WHITE_COLOR,
                inactiveTintColor: colors.GREY_FONT_FONT_COLOR,
                labelStyle: styles.labelStyle,
                indicatorStyle: styles.indicatorStyle
            }}
        >
            <Tab.Screen name="Ongoing" component={Ongoing} />
            <Tab.Screen name="MyBids" component={MyBids} />
        </Tab.Navigator>
    );
};

export default TabNavBarAuction;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0F0F15',
    },
    tabBarOptions: {
        backgroundColor: '#0F0F15',
        borderBottomWidth: 2,
        borderColor: colors.BLACK_GREY_DIVIDER,
    },
    labelStyle: {
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_16,
        textAlign: 'left'
    },
    indicatorStyle: {
        backgroundColor: colors.YELLO_THEME_COLOR,
    },
});