import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../../../Utils/Constant/Colors';
import { Fonts, FontSize } from '../../../Utils/Constant/Fonts';

const ProfileCustomTabBar = ({ state, descriptors, navigation, position }: any) => {
    return (
        <View style={styles.container}>
            {state.routes.map((route: any, index: any) => {
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
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        key={label}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.tabButton}
                    >
                        <Text style={[styles.label, isFocused ? styles.activeLabel : styles.inactiveLabel]}>
                            {label}
                        </Text>
                        {isFocused && <View style={styles.indicator} />}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#0F0F15',
        borderBottomWidth: 2,
        borderColor: colors.BLACK_GREY_DIVIDER
    },
    tabButton: {
        flex: 1,
        alignItems: 'flex-start',
        paddingVertical: 10,
        paddingStart: 5
    },
    label: {
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_20,
        textAlign: 'left'
    },
    activeLabel: {
        color: colors.WHITE_COLOR
    },
    inactiveLabel: {
        color: colors.GREY_FONT_FONT_COLOR
    },
    indicator: {
        marginTop: 4,
        height: 2,
        width: 60,
        backgroundColor: colors.YELLO_THEME_COLOR
    },
});

export default ProfileCustomTabBar;
