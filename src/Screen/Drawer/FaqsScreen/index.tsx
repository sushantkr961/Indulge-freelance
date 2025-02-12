import { StyleSheet, SafeAreaView, Text, View, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import FAQSStyle from './style';
import { FAQSDATA } from '../../../Utils/index';
import FaqsQuestion from '../../../Components/FaqsQuestion';
import DrawerScreensHeader from '../../../Components/DrawerScreensHeader';
import { useNavigation } from '@react-navigation/native';


const FAQSScreen = () => {
    const [reelsData, setReelsData] = useState([])

    // useEffect(() => {
    //     // call for reset selected tag in redux state
    // }, []);
    const navigation = useNavigation();

    return (
        <SafeAreaView style={FAQSStyle.container}>
            <DrawerScreensHeader
                style={FAQSStyle.headerStyle}
                title="FAQ’s"
                leftButtonAction={() => navigation.goBack()}
            />
            <FlatList
                showsHorizontalScrollIndicator={false}
                data={FAQSDATA}
                renderItem={(item) => <FaqsQuestion item={item} />}
                keyExtractor={item => item.id.toString()}
            // extraData={eventsSuggestedData} // You can directly pass the state here
            />
        </SafeAreaView>
    )
};

export default FAQSScreen

