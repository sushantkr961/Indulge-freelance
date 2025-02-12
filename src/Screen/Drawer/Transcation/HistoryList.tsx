import { FlatList, StyleSheet, Text, TouchableOpacity, View, Linking } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../../Utils/Constant/Colors';
import { useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Fonts, FontSize } from '../../../Utils/Constant/Fonts';

const HistoryList = ({ transactions }: any) => {
    const { trasanctionsData } = useSelector((state: any) => state.transactionSlice)
    // {
    //     date: '12.05.2024',
    //     time: '04:40 pm',
    //     id: '9384DG531',
    //     price: '+₹2,10,00',
    //     createdBy: 'builder'
    // },
    const getInvoice = (URL: string) => {
        Linking.openURL(URL).catch((err) => console.error('Failed to open URL:', err));
    };
    const renderItem = ({ item }: any) => {
        return (
            <LinearGradient
                colors={['rgba(26, 26, 35, 0)', '#1A1A23']}
                style={styles.titleContainer}
                start={{ x: 0.2, y: 0 }}
                end={{ x: 0.5, y: 1 }}
            >
                <View style={styles.subTitleContainer}>
                    <View style={styles.dateContainer}>
                        <Text style={styles.date}>{item.date}</Text>
                        {/* <Text style={styles.date}>{item.time}</Text> */}
                    </View>
                    <View style={styles.dateContainer1}>
                        <Text style={styles.idText}>Id {item.invoice_number}</Text>
                        <Text style={styles.priceText}>₹{item.total}</Text>
                        <View style={styles.invoiceContainer}>
                            {/* <Text style={styles.idText}>{item.transaction_type}</Text> */}
                            <Text style={styles.idText}></Text>
                            <TouchableOpacity onPress={() => getInvoice(item?.invoice_url.trim())} style={styles.invoiceContainer}>
                                <Text style={styles.invoiceText}>View Invoice</Text>
                                <MaterialCommunityIcons name="download" size={20} color={colors.WHITE_COLOR_30} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        )
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={transactions}
                renderItem={renderItem}
                keyExtractor={(item) => item.invoice_number.toString()}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default HistoryList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    titleContainer: {
        flex: 1,
        paddingHorizontal: 24,
        marginTop: 20,
        borderRadius: 16
    },
    subTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    dateContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingVertical: 20
    },
    dateContainer1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingVertical: 20
    },
    date: {
        color: colors.WHITE_COLOR_30,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_15,
        textAlign: 'left'
    },
    idText: {
        color: colors.WHITE_COLOR_30,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_16,
        textAlign: 'left'
    },
    invoiceText: {
        color: colors.WHITE_COLOR_30,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_16,
        textAlign: 'left',
        marginStart: 10,
        marginEnd: 5
    },
    priceText: {
        color: colors.YELLO_THEME_COLOR_TEXT,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_20,
        textAlign: 'left'
    },
    invoiceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})