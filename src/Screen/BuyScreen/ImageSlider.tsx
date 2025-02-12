import { FlatList, Image, ImageBackground, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const ImageSlider = ({ backPress }: any) => {

    const renderImageItem = ({ item }: any) => (
        <ImageBackground
            source={item.source}
            style={styles.itemBackground}
            imageStyle={styles.backgroundImage}
        >
            <TouchableOpacity onPress={backPress}>
                <Image
                    source={require('../../../../assets/intro/BackArrow3.png')}
                    style={styles.backIcon}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        </ImageBackground>
    );
    return (
        <View style={styles.imageContainer}>
            <FlatList
                data={[
                    { color: 'red', key: '1', source: require('../../../../assets/drawer/auction/Image3.png') },
                    { color: 'grey', key: '2', source: require('../../../../assets/drawer/auction/Image3.png') },
                    { color: 'green', key: '3', source: require('../../../../assets/drawer/auction/Image3.png') }
                ]}
                renderItem={renderImageItem}
                keyExtractor={(item) => item.key}
                horizontal
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
            // contentContainerStyle={styles.imageContainer}
            />
        </View>
    )
}

export default ImageSlider

const styles = StyleSheet.create({
    itemBackground: {
        height: Platform.OS == 'ios' ? 600 : 550, // Adjust height as needed
    },
    backgroundImage: {
        resizeMode: 'cover',
        borderRadius: 16
    },
    imageContainer: {
        flex: 1,
        height: 450,
        width: '100%',
        backgroundColor: 'red',
        // // paddingHorizontal: 10,
        // // paddingTop: Platform.OS == 'ios' ? 50 : 10
        // width: '100%', // Ensure it takes the full width of its parent
        // height: 450,   // Set the fixed height for horizontal scrolling
        // // Ensure no flex properties interfere with the layout
        // flexDirection: 'row',
        // justifyContent: 'flex-start',
        // alignItems: 'flex-start',
    },
    backIcon: {
        position: 'absolute',
        top: 20,
        left: 20,
        width: 24,
        height: 24,
    },
})