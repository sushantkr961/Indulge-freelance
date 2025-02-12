import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Keyboard, ActivityIndicator, TouchableOpacity } from 'react-native';
import { colors } from '../../Utils/Constant/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Fonts, FontSize } from '../../Utils/Constant/Fonts';

interface QAItem {
    id: number;
    question: string;
    answer: string;
}

interface QuestionAnswerListProps {
    isLoading: boolean;
    data: QAItem[];
    clearSearchData: () => void;
}

const QuestionAnswerList: React.FC<QuestionAnswerListProps> = ({ isLoading, data, clearSearchData }) => {
    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            flatListRef.current?.scrollToEnd({ animated: true });
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            flatListRef.current?.scrollToEnd({ animated: true });
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const renderItem = ({ item, index }: { item: QAItem, index: number }) => (
        <View style={styles.qaContainer}>
            <View style={styles.qaSection1}>
                <Image source={require('../../../assets/screen/Profile_round.png')} style={styles.icon} />
                <Text style={styles.text0}>{item.question}</Text>
            </View>
            <View style={styles.qaSection1}>
                <Image source={require('../../../assets/screen/GinneyIconData.png')} style={styles.icon} />
                {isLoading && index === data.length - 1 ? (
                    <View style={styles.text}>
                        <ActivityIndicator size="small" color={colors.YELLO_THEME_COLOR_DARK} />
                    </View>
                ) : (
                    <Text style={styles.text}>{item.answer}</Text>
                )}
            </View>
        </View>
    );

    const renderFooter = () => (
        <View style={styles.footer}>
            <TouchableOpacity onPress={clearSearchData}>
                <MaterialIcons name={"delete-sweep"} size={30} color={colors.WHITE_COLOR} />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => `${index}`}
                contentContainerStyle={styles.list}
                onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                ListFooterComponent={renderFooter}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    list: {
        paddingBottom: 20
    },
    qaContainer: {
        marginBottom: 20
    },
    qaSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5
    },
    qaSection1: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginBottom: 5
    },
    icon: {
        width: 40,
        height: 40,
        marginRight: 10
    },
    text0: {
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_18,
        flex: 1,
        color: colors.YELLO_THEME_COLOR_TEXT,
        marginTop: 5
    },
    text: {
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_18,
        flex: 1,
        color: colors.WHITE_COLOR,
        marginTop: 10,
        alignItems: 'flex-start'
    },
    footer: {
        marginTop: 20,
        alignItems: 'flex-end'
    },
});

export default QuestionAnswerList;
