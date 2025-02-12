import { Platform, StyleSheet } from 'react-native';
import { Fonts } from '../../Utils/Constant/Fonts';

const TasteStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        paddingTop: Platform.OS == 'ios' ? 40 : 0
    },
    categoriesContainer: {
        marginLeft: '5%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 10,
        marginBottom: 10,
        marginTop: 5
    },
    categoryText: {
        color: '#FFFFFF',
        fontFamily: Fonts.REGULAR,
        fontSize: 16,
    },
    selectedCategory: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    focusedText: {
        color: '#FFFFFF',
    },
    flatListContainerStryle: {
        marginTop: '4%',
        marginBottom: '4%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    saveButtonForFilterText: {
        color: '#000000',
        fontFamily: Fonts.REGULAR,
        fontSize: 18,
    },
    saveButtonForFilterContainer: {
        marginHorizontal: '5%',
        backgroundColor: '#D39F3A',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        padding: 10,
        marginTop: 10,
        marginBottom: Platform.OS == 'ios' ? 30 : 0
    },
    newTasteText: {
        color: '#8E93A6',
        fontFamily: Fonts.LIGHT,
        fontSize: 28,
        textAlign: 'center',
    },
    QuestionsContainer: {
        gap: 20,
        paddingHorizontal: 15,
    },
    allQuestionsContainer: {
        gap: 20,
    },
    smallCatagoryText: {
        color: '#566D80',
        fontFamily: Fonts.LIGHT,
        fontSize: 14,
        textAlign: 'center',
    },
});

export default TasteStyle;
