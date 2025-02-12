import { Platform, StyleSheet, Image, ScrollView, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../../Utils/Constant/Colors'
import { useNavigation } from '@react-navigation/native'
import HistoryList from './HistoryList'
import { useSelector } from 'react-redux';
import { fetchZohoBalance } from '../../../StoreRedux/TransactionSlice'
import { STATUSES } from '../../../StoreRedux/objects'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAppDispatch } from '../../../StoreRedux/hooks/Hooks'
import { getZohoCustomerId, getZohoCustomerTransaction } from '../../../Service/ApiService'
import { Fonts, FontSize } from '../../../Utils/Constant/Fonts'
import NotificationIconSvg from '../../../../assets/svg/NotificationIconSvg'

const Transactions = () => {
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const [transactions, setTransactions] = useState([])
    const [message, setMessage] = useState("")
    const { status, balance, receivables } = useSelector((state: any) => state.transactionSlice)
    useEffect(() => {
        const getPhoneNumber = async () => {
            try {
                const storedNumber = await AsyncStorage.getItem('phoneNumber');
                // if (storedNumber == "7755996608") {
                if (storedNumber) {
                    const id = await getZohoCustomerId(Number(storedNumber))
                   
                    if (id) {
                        dispatch(fetchZohoBalance(id))
                        const data = await getZohoCustomerTransaction(id)
                       

                        setTransactions(data)
                        setMessage("")
                    } else {
                        setMessage("Please Assign Zoho Id to this user...")
                    }
                    // dispatch(fetchZohoBalance(id))
                    // const data = await getZohoCustomerTransaction(id)
                    // console.log("customer data::", data)

                    // dispatch(fetchZohoBalance("1204503000000205507"))
                    // } else {
                    // dispatch(fetchZohoBalance("1204503000002912003"))
                }
            } catch (error) {
                console.error('Error retrieving phone number:', error);
            }
        };
        getPhoneNumber();
    }, [])

    const goBack = () => {
        navigation.goBack();
    };
    const onNotificationPress = () => {
        navigation.navigate('CalendarNotifications' as never)
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={goBack}>
                    <Image
                        source={require('../../../../assets/screen/Indulge_LOGO_ONLY.png')}
                        style={styles.logoProfile}
                    />
                </TouchableOpacity>
                <View style={styles.textContainer}>
                </View>
                {/* <TouchableOpacity style={styles.addButton} //onPress={goBack}
                >
                    <Image
                        source={require('../../../../assets/screen/Filter_Icon.png')}
                        style={styles.logo}
                    />
                </TouchableOpacity> */}
                <TouchableOpacity style={styles.addButton} onPress={onNotificationPress}
                >
                    {/* <Image
                        source={require('../../../../assets/screen/Bell_Icon.png')}
                        style={styles.logo1}
                    /> */}
                    <NotificationIconSvg/>
                </TouchableOpacity>
            </View>
            {status === STATUSES.LOADING ? <View style={styles.subContainer1} >
                <ActivityIndicator size="large" color={colors.YELLO_THEME_COLOR} />
            </View>
                :
                <ScrollView style={styles.subContainer1} nestedScrollEnabled>
                    {message ? <Text style={styles.titleText}>{message}</Text> :
                        <Text style={styles.titleText}>Transactions</Text>}
                    <View style={styles.boxView}>
                        <View style={styles.subBoxView}>
                            <Text style={styles.titleText1}>Balance</Text>
                            <Text style={styles.titleText2}>₹{receivables ? receivables?.toLocaleString('en-IN') : 0}</Text>
                        </View>
                        <View style={styles.subBoxView1}>
                            <Text style={styles.titleText1}>Receivables</Text>
                            <Text style={styles.titleText2}>₹{balance ? balance?.toLocaleString('en-IN') : 0}</Text>
                        </View>
                    </View>
                    <Text style={styles.titleText}>History</Text>
                    <HistoryList transactions={transactions} />
                </ScrollView>}
        </View >
    )
}

export default Transactions

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BLACK_BLUE_DARK
    },
    subContainer: {
        paddingHorizontal: 20,
        marginTop: 5
    },
    subContainer1: {
        paddingHorizontal: 20,
        marginTop: 20
    },
    titleText: {
        fontFamily: Fonts.BOLD,
        fontSize: FontSize.F_28,
        color: colors.WHITE_COLOR_30
    },
    boxView: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 25
    },
    subBoxView: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 40,
        backgroundColor: colors.BACK_BLUE_DARK,
        borderRadius: 24,
        marginTop: 25,
        marginEnd: 5
    },
    subBoxView1: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 40,
        backgroundColor: colors.BACK_BLUE_DARK,
        borderRadius: 24,
        marginTop: 25,
        marginStart: 5
    },
    titleText1: {
        color: colors.WHITE_COLOR_30,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_16
    },
    titleText2: {
        color: colors.YELLO_THEME_COLOR_TEXT,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_24,
        marginTop: 15
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: colors.BLACK_BLUE_DARK,
        marginTop: Platform.OS == 'ios' ? 45 : 10
    },
    logoProfile: {
        width: 52,
        height: 52,
        resizeMode: 'contain',

    },
    logoClose: {
        width: 42,
        height: 42,
        resizeMode: 'contain'
    },
    logo: {
        width: 36,
        height: 36,
        resizeMode: 'cover'
    },
    logo1: {
        width: 28,
        height: 32,
        resizeMode: 'cover',
        marginStart: 20
    },
    textContainer: {
        flex: 1,
        paddingHorizontal: 10
    },
    addButton: {}
})