import React, { useState } from 'react';
import { Animated, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { colors } from '../Utils/Constant/Colors';

const ToggleButton = ({ onPressFilter }: any) => {
    const [isActive, setIsActive] = useState(false);
    const [togglePosition] = useState(new Animated.Value(0)); // Animated position of the toggle

    const handleToggle = () => {
        onPressFilter()
        setIsActive(!isActive);

        // Animate the toggle position
        Animated.timing(togglePosition, {
            toValue: isActive ? 0 : 1, // Toggle between 0 and 1
            duration: 300, // Animation duration
            useNativeDriver: false,
        }).start();
    };

    const interpolatedPosition = togglePosition.interpolate({
        inputRange: [0, 1],
        outputRange: [2, 26], // Position range for the toggle handle
    });

    return (
        <TouchableWithoutFeedback onPress={handleToggle}>
            <View style={[styles.toggleContainer, isActive && styles.activeContainer]}>
                <Animated.View
                    style={[
                        styles.toggleHandle,
                        {
                            backgroundColor: isActive ? '#C4963D' : '#fff',
                            transform: [{ translateX: interpolatedPosition }],
                        },
                    ]}
                />
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    toggleContainer: {
        width: 50,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#D3D3D3', // Grey background
        padding: 2,
        justifyContent: 'center',
    },
    activeContainer: {
        backgroundColor: '#D3D3D3', // Active state background
    },
    toggleHandle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        elevation: 2, // Add shadow for better aesthetics
    },
});

export default ToggleButton;
