import React from 'react';
import { Image, View, Text, StyleSheet, Pressable } from 'react-native';
import { colors } from '../../Utils/Constant/Colors';
import { Fonts, FontSize } from '../../Utils/Constant/Fonts';

const ChooseAnswerQuestion = ({ QuestionData, updateAnswerByIndex }: any) => {
  return (
    <View style={Styles.cardContainer}>
      <View>
        <Image style={Styles.mainImage} source={QuestionData.img} alt="img" />
        <Text style={Styles.questionText}>{QuestionData.index}. {QuestionData.question}</Text>
      </View>
      <View style={Styles.AnswerBoxContainer}>
        {QuestionData.questions.map((val: any, i: any) => (
          <Pressable onPress={() => updateAnswerByIndex(QuestionData.index, val.value)} key={val.value}>
            <View style={val.value === QuestionData?.answer ? Styles.AnswerBoxActive : Styles.AnswerBox}>
              <Text
                style={val.value === QuestionData?.answer ? Styles.answerTextActive : Styles.answerText}>
                {val.value}
              </Text>
              <Image
                style={Styles.answerImage}
                source={val.value === QuestionData?.answer ? require('../../../assets/questions/tastes/activeTickmark.png') : require('../../../assets/questions/tastes/tickmark.png')}
                alt="img"
              />
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default ChooseAnswerQuestion;

export const Styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.BLACK_BACKGROUND_COLOR,
    gap: 15
  },
  questionText: {
    color: colors.WHITE_COLOR,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSize.F_24,
  },
  AnswerBoxContainer: {
    gap: 10
  },
  AnswerBox: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 18,
    paddingVertical: 18,
    backgroundColor: '#80808029',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between'
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
    borderColor: '#FFD700',
    borderWidth: 1
  },
  answerText: {
    color: colors.GREY_FONT_FONT_COLOR,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSize.F_20,
  },
  answerTextActive: {
    color: colors.YELLO_THEME_COLOR_TEXT,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSize.F_20,
  },
  answerImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain'
  },
  mainImage: {
    resizeMode: 'contain',
    width: '100%'
  },
});
