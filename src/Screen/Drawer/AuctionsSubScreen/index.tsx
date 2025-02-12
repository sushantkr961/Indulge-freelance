import { ScrollView, View, StyleSheet, Text, Platform, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../../Utils/Constant/Colors';
import RenderSubTextView from '../../../Components/RenderSubTextView';
import { useNavigation, useRoute } from '@react-navigation/native';
import BidButton from '../../../Components/BidButton';
import BidModal from './BidModal';
import { fetchMyBidData, fetchOngoingBidData } from '../../../StoreRedux/AuctionOngoingSlice';
import { useAppDispatch, useAppSelector } from '../../../StoreRedux/hooks/Hooks';
import { addToMyBidApi } from '../../../Service/AuctionApi/AuctionApiServices';
import { fetchWalletBalanceData } from '../../../StoreRedux/ProfileDetailsSlice';
import { getAmountByRegion, getCurrencySymbol, getTimeLeft } from '../../../Utils';
import { Fonts, FontSize } from '../../../Utils/Constant/Fonts';
import CustomCarousel from './CustomCarousel';
import BidWonModal from './BidWonModal';

const AuctionsSubScreen = () => {
    const route = useRoute();
    const navigation = useNavigation()
    const dispatch = useAppDispatch()
    const { item }: any = route.params;
    const [visibleModal, setVisibleModal] = useState<boolean>(false)
    const [confirmCheck, setConfirmCheck] = useState<boolean>(false)
    const [bidConfirm, setBidConfirm] = useState<boolean>(false)
    const [myBidValue, setMyBidValue] = useState<any>(item?.lastBiddedAmount ? item.lastBiddedAmount : getAmountByRegion(item?.prices, "IN"))
    const [timeLeft, setTimeLeft] = useState('');
    const { mobile_no, region, userId, walletBalance } = useAppSelector((state) => state.profileDetails);
    const { wonBidData } = useAppSelector((state: any) => state.auctionOngoing);
    useEffect(() => {
        if (wonBidData?.userId == userId) {
            openModal()
        }
        const interval = setInterval(() => {
            // Assuming you are calculating timeLeft for a specific item
            if (item.auctionStartTime) {
                const time = getTimeLeft(item.auctionStartTime, item.auctionEndTime);
                setTimeLeft(time);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [item, wonBidData]);
    const [wonModalVisible, setWonModalVisible] = useState(false);
    const openModal = () => setWonModalVisible(true);
    const closeModal = () => setWonModalVisible(false);
    const backPress = () => navigation.goBack()
    const onOpenModal = () => {
        setVisibleModal(true)
    }
    const onCloseModal = () => {
        setBidConfirm(false)
        setVisibleModal(false)
        setMyBidValue(item.lastBiddedAmount)
    }
    const onConfirm = async (item: any) => {
        const obj = {
            productId: item._id,
            price: myBidValue,
            currency: "IN"
        };
        console.log("myBidValuemyBidValue====", myBidValue, walletBalance)
        try {
            if (myBidValue <= walletBalance) {
                const response = await addToMyBidApi(obj);
                setBidConfirm(true);
                await dispatch(fetchWalletBalanceData(mobile_no, region))
                await dispatch(fetchOngoingBidData(userId))
                await dispatch(fetchMyBidData(userId))
                setBidConfirm(false);
                backPress()

            } else {
                Alert.alert("", "Please TopUp your wallet.", [
                    {
                        text: "ok",
                        onPress: () => {
                            onCloseModal(),
                                navigation.navigate('TopUpBalance' as never)
                        },
                        style: "default"
                    }
                ]);
            }
            // Alert.alert("Success", "Your bid has been placed successfully!");
        } catch (error) {
            Alert.alert("", `${error}`);
        } finally {
            // setBidConfirm(false);
        }
    };
    return (
        <ScrollView style={styles.container} nestedScrollEnabled={true} contentContainerStyle={{
            paddingBottom: 100
        }}>
            <TouchableOpacity onPress={backPress} style={styles.backIconContainer}>
                <Image
                    source={require('../../../../assets/intro/BackArrow3.png')}
                    style={styles.backIcon}
                    resizeMode="contain"
                />
            </TouchableOpacity>
            <CustomCarousel item={item} />
            <View style={styles.subcontainer} >
                <Text style={styles.title}>{item?.name}</Text>
                <Text style={styles.title1}>{item?.categories[0]}</Text>
                <View style={styles.subcontainer1} >
                    <Text style={styles.title3}>Description</Text>
                    <Text style={styles.title4}>{item.description}</Text>
                </View>
                <View style={styles.subTitleContainer}>
                    <RenderSubTextView string1={'Starting Bid'} string2={`₹${getAmountByRegion(item?.prices, "IN")}`} />
                    <RenderSubTextView string1={'Current Bid'} string2={item?.lastBiddedAmount ? `₹${(item.lastBiddedAmount).toString()}` : `₹${getAmountByRegion(item?.prices, "IN")}`} />
                    {item?.auctionStartTime && <RenderSubTextView string1={'Hours Left'} string2={timeLeft} />}
                </View>
                {wonBidData?.userId !== userId && < BidButton label='Bid Now' onPress={onOpenModal} />}
            </View>
            <BidModal
                visible={visibleModal} onClose={onCloseModal}
                myBidValue={myBidValue} setMyBidValue={setMyBidValue}
                confirmCheck={confirmCheck} setConfirmCheck={setConfirmCheck}
                onConfirm={onConfirm} item={item}
                bidConfirm={bidConfirm} setBidConfirm={setBidConfirm}
                name={item.name} category={item.categories[0]} timeLeft={timeLeft}
                startingBid={`₹${getAmountByRegion(item?.prices, "IN")}`}
                currentBid={item.lastBiddedAmount ? `₹${(item.lastBiddedAmount).toString()}` : `₹${getAmountByRegion(item?.prices, "IN")}`}
            />
            <BidWonModal
                isVisible={wonModalVisible}
                onClose={closeModal}
                title={item?.name}
                subtitle="on your bid"
                bidPrice={getCurrencySymbol(wonBidData?.currency) + getAmountByRegion([{ "amount": wonBidData?.totalPrice, "region": wonBidData?.currency }], wonBidData?.currency)}
                imageUrl={item?.mainImage?.url}
            />
        </ScrollView >
    )
};

export default AuctionsSubScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BLACK_BLUE_DARK,
        paddingHorizontal: 10,
        paddingTop: Platform.OS == 'ios' ? 50 : 10,
        paddingBottom: 200

    },
    imageContainer: {
        flex: 1,
        height: 450,
        width: '100%',
        backgroundColor: 'red'
    },
    subcontainer: {
        marginTop: 24,
        paddingHorizontal: 14,
        marginBottom: 20
    },
    title: {
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_24,
        textAlign: 'left'
    },
    title1: {
        color: colors.YELLO_THEME_COLOR_TEXT,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_16,
        textAlign: 'left'
    },
    itemBackground: {
        height: Platform.OS == 'ios' ? 600 : 550, // Adjust height as needed
    },
    backgroundImage: {
        resizeMode: 'cover',
        borderRadius: 16
    },
    subTitleContainer: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 40
    },
    backIconContainer: {
        marginTop: 10,
        marginBottom: 20,
        marginHorizontal: 20
    },
    backIcon: {
        // position: 'absolute',
        // top: 20,
        // left: 20,
        // width: 24,
        // height: 24,
        tintColor: colors.WHITE_COLOR
    },
    subcontainer1: {
        marginTop: 10,
        marginBottom: 10
    },
    title3: {
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_24,
        textAlign: 'left'
    },
    title4: {
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_18,
        textAlign: 'auto',
        marginTop: 20
    },
})
