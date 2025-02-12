import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { colors } from '../../../Utils/Constant/Colors';
import Ongoing from './OngoingOrders';
import Completed from './Completed';
import { Fonts, FontSize } from '../../../Utils/Constant/Fonts';

const Tab = createMaterialTopTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
    return (
        <View style={styles.customTabBar}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <TouchableOpacity
                        key={index}
                        onPress={onPress}
                        style={[styles.tabItem, isFocused ? styles.activeTab : null]}
                    >
                        <Text
                            style={[
                                styles.tabLabel,
                                { color: isFocused ? colors.WHITE_COLOR : colors.GREY_FONT_FONT_COLOR },
                            ]}
                        >
                            {label}
                        </Text>
                        {isFocused && <View style={styles.activeIndicator} />}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const TabNavBarOrders = () => {
    return (
        <Tab.Navigator
            style={styles.container}
            sceneContainerStyle={styles.container}
            tabBar={(props) => <CustomTabBar {...props} />}
        >
            <Tab.Screen name="Ongoing" component={Ongoing} options={{ tabBarLabel: 'Ongoing' }} />
            <Tab.Screen name="Completed" component={Completed} options={{ tabBarLabel: 'Completed' }} />
        </Tab.Navigator>
    );
};

export default TabNavBarOrders;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0F0F15',
    },
    customTabBar: {
        flexDirection: 'row',
        backgroundColor: '#0F0F15',
        borderBottomWidth: 1,
        borderColor: colors.BLACK_GREY_DIVIDER,
    },
    tabItem: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: colors.YELLO_THEME_COLOR,
    },
    tabLabel: {
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_20,
    },
    activeIndicator: {
        height: 2,
        backgroundColor: colors.YELLO_THEME_COLOR,
        width: '100%',
        position: 'absolute',
        bottom: 0,
    },
    tabBarOptions: {
        backgroundColor: '#0F0F15',
    },
});
