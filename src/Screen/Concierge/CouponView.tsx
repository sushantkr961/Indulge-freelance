import React, { useRef, useState } from 'react'
import { Animated, FlatList, StyleSheet, View } from 'react-native'
import MyCouponCode from '../../Components/MyCouponCode'
import { colors } from '../../Utils/Constant/Colors';

const CouponView = ({ fetchCouponData, myCouponData, appliedCoupon, callApplyCoupon, cancelCoupon }: any) => {
    const scrollY = useRef(new Animated.Value(0)).current;
    const [refreshing, setRefreshing] = useState(false);

    // Calculate the size of the scroll indicator
    const indicatorSize = 100;
    const contentHeight = myCouponData?.length * 120; // Adjust based on item height
    const scrollIndicatorHeight = (indicatorSize / contentHeight) * 200; // Adjust based on FlatList height
    // console.log("contentHeight====", scrollIndicatorHeight, contentHeight, myCouponData)
    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchCouponData(); // Call the fetchCoupon function
        setRefreshing(false); // Hide the activity indicator once data is fetched
    };
    return (
        <View style={styles.container}>
            <FlatList
                nestedScrollEnabled={true}
                style={{ height: 330, marginTop: 10 }}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={true}
                data={myCouponData}
                renderItem={({ item }) => <MyCouponCode item={item} appliedCoupon={appliedCoupon} callApplyCoupon={callApplyCoupon} cancelCoupon={cancelCoupon} />}
                keyExtractor={(item) => item._id.toString()}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                contentContainerStyle={{ paddingVertical: 10 }}
                refreshing={refreshing}
                onRefresh={handleRefresh}
            // extraData={eventsSuggestedData} // You can directly pass the state here
            />
            {/* Track line for scroll indicator */}
            {myCouponData?.length > 2 && <View style={styles.scrollTrack} />}
            {/* Custom Scroll Indicator */}
            {myCouponData?.length > 2 && <Animated.View
                style={[
                    styles.scrollIndicator,
                    {
                        height: scrollIndicatorHeight,
                        transform: [
                            {
                                translateY: scrollY.interpolate({
                                    inputRange: [0, contentHeight - 150], // Adjust for FlatList height
                                    outputRange: [0, 100 - scrollIndicatorHeight], // Adjust for FlatList height
                                    extrapolate: 'clamp',
                                }),
                            },
                        ],
                    },
                ]}
            />}
        </View>
    )
}

export default CouponView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    scrollIndicator: {
        width: 10,
        height: 23,
        backgroundColor: colors.YELLO_THEME_COLOR_DARK,
        position: 'absolute',
        right: 8,
        top: 45,
        borderRadius: 20,
    },
    scrollTrack: {
        width: 4,
        height: '30%', // Full height of the container
        backgroundColor: colors.WHITE_COLOR_60, // Lighter color for the track line
        position: 'absolute',
        right: 11,
        top: 46,
        borderRadius: 2,
    },
})