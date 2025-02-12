
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const ActionIcons = ({ item }: any) => {
    return (
        <TouchableOpacity onPress={item.onPress} style={styles.icon}>
            {/* <Image source={item.source}
                style={styles.icon}
            /> */}
            {item?.source}
        </TouchableOpacity>
    )
}

export default ActionIcons

const styles = StyleSheet.create({
    icon: {
        width: 26,
        height: 26,
        marginStart: 15
    }
})