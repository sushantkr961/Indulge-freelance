import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import LottieView from 'lottie-react-native';
const LoadingView = ({ height, width }: any) => {
    return (
        <LottieView
            source={require('../../assets/lottieFile/LoadingAnimation_Dot.json')}
            autoPlay
            loop
            resizeMode="cover"
            style={{ width: width, height: height }}
        />
    )
}

export default LoadingView

const styles = StyleSheet.create({})
