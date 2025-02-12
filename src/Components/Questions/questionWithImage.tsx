import React from 'react';
import { Image, View, Text, StyleSheet, Pressable } from 'react-native';
import { colors } from '../../Utils/Constant/Colors';
import { Fonts } from '../../Utils/Constant/Fonts';

const QuestionWithImage = ({ img, questionData1, updateAnswerByIndex }: any) => {

  return (
    <View style={Styles.cardContainer}>
      <View>
        <Image style={Styles.mainImage} source={img} alt="img" />
        <Text style={Styles.questionText}>1. You are a</Text>
      </View>
      <View style={Styles.AnswerBoxContainer}>
        {questionData1[0].questions.map((val: any, i: any) => (
          <Pressable onPress={() => updateAnswerByIndex(questionData1[0].index, val.value)} key={val.value}>
            <View style={val.value === questionData1[0].answer ? Styles.AnswerBoxActive : Styles.AnswerBox}>
              <Text
                style={val.value === questionData1[0].answer ? Styles.answerTextActive : Styles.answerText}>
                {val.value}
              </Text>
              <Image style={Styles.answerImage} source={val.img} alt="img" />
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default QuestionWithImage;

export const Styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#000000',
    gap: 15,
  },
  questionText: {
    color: colors.WHITE_COLOR,
    fontFamily: Fonts.REGULAR,
    fontSize: 24,
    gap: 10
  },
  AnswerBoxContainer: {
    gap: 10,
  },
  AnswerBox: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 18,
    paddingVertical: 18,
    backgroundColor: '#80808029',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  AnswerBoxActive: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 18,
    paddingVertical: 18,
    backgroundColor: '#80808029',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: colors.YELLO_THEME_COLOR_TEXT,
    borderWidth: 1,
  },
  answerText: {
    color: colors.GREY_FONT_FONT_COLOR,
    fontFamily: Fonts.REGULAR,
    fontSize: 20,
  },
  answerTextActive: {
    color: colors.YELLO_THEME_COLOR_TEXT,
    fontFamily: Fonts.REGULAR,
    fontSize: 20,
  },
  answerImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  mainImage: {
    resizeMode: 'contain',
    width: '100%',
  },
});
