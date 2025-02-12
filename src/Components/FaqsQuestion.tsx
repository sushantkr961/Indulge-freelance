import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../Utils/Constant/Colors'
import { Fonts, FontSize } from '../Utils/Constant/Fonts'

const FaqsQuestion = ({ item }) => {

    const [openOrClose, setOpenOrClose] = useState<boolean>(item.item.id == 0 ? true : false)
    return (
        <View style={{ padding: 10, }}>
            <TouchableOpacity style={styles.conciergeText5View} onPress={() => { setOpenOrClose(!openOrClose) }}>
                <Text style={[openOrClose ? styles.conciergeText50 : styles.conciergeText5]}>
                    {item?.item.question}
                </Text>
                <Image
                    source={
                        openOrClose ?
                            require('../../assets/screen/Down_Arrow_YELLOW.png')
                            :
                            require('../../assets/screen/Right_Arrow_YELLOW.png')
                    }
                    style={styles.rightArrowIcon}
                />
            </TouchableOpacity>
            {
                openOrClose &&
                <View style={styles.conciergeText50View}>
                    <Text style={styles.conciergeText501}>
                        {item?.item.answer}
                    </Text>
                </View>
            }
        </View>
    )
}

export default FaqsQuestion

const styles = StyleSheet.create({
    conciergeText5View: {
        flexDirection: 'row',
        // marginHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20
    },
    conciergeText4: {
        fontFamily: 'PF Beau Sans Pro-Regular',
        fontSize: 20,
        // fontWeight: "600",
        color: colors.WHITE_COLOR_78,
        marginTop: 20
    },
    conciergeText50: {
        flex: 1,
        fontSize: FontSize.F_20,
        fontFamily: Fonts.REGULAR,
        color: colors.YELLO_THEME_COLOR_TEXT,
    },
    conciergeText501: {
        flex: 1,
        color: colors.WHITE_COLOR,
        fontSize: FontSize.F_16,
        fontFamily: Fonts.REGULAR,
        marginVertical: 20,
        textAlign: 'left'
    },
    conciergeText50View: {
        flexDirection: 'row',
        // marginHorizontal: -20,
        paddingHorizontal: 10,
        marginTop: 20,
        alignItems: 'center',
        backgroundColor: "#202020"
    },
    conciergeText5: {
        flex: 1,
        color: colors.WHITE_COLOR_60,
        fontSize: FontSize.F_20,
        fontFamily: Fonts.REGULAR,
        marginEnd: 10
    }
})