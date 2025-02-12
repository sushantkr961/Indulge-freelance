import React from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';
import { colors } from '../../Utils/Constant/Colors';
import { Fonts, FontSize } from '../../Utils/Constant/Fonts';


const TypeAnswerQuestion = ({ QuestionData, updateAnswerByIndex }: any) => {
  const { index, question, answer, img } = QuestionData
  return (
    <View style={Styles.cardContainer}>
      <View>
        <Image style={Styles.mainImage} source={img} alt="img" />
        <Text style={Styles.questionText}>{index}. {question}</Text>
      </View>
      <View style={Styles.AnswerBoxContainer}>
        <TextInput
          style={Styles.inputStyle}
          placeholder="Type Your Answer here..."
          placeholderTextColor={'#FFD700'}
          value={answer}
          onChangeText={(text) => updateAnswerByIndex(index, text)}
        />
      </View>
    </View>
  );
};

export default TypeAnswerQuestion;

export const Styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.BLACK_BACKGROUND_COLOR,
    gap: 15
  },
  questionText: {
    color: colors.WHITE_COLOR,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSize.F_24
  },
  AnswerBoxContainer: {
    gap: 10
  },
  mainImage: {
    resizeMode: 'contain',
    width: '100%'
  },
  inputStyle: {
    backgroundColor: '#80808029',
    height: 45,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSize.F_18,
    color: colors.GREY_FONT_FONT_COLOR,
    paddingLeft: 15,
    borderRadius: 8
  },
});
