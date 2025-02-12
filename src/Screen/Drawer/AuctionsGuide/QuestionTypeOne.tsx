import React, { FC } from "react";
import { Text, FlatList, StyleSheet, View, ScrollView } from "react-native";
import { colors } from "../../../Utils/Constant/Colors";
import { Fonts, FontSize, FontWeight } from "../../../Utils/Constant/Fonts";
import { ListItem } from ".";
interface QuestionTypeOneProps {
  item: ListItem;
}

export const QuestionTypeOne: FC<QuestionTypeOneProps> = ({ item }) => {
  return (
    < >
      {item.answer && (
        <ScrollView style={styles.container}>
          <Text style={styles.text}>{item.answer}</Text>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  text: {
    color: colors.WHITE_COLOR_80,
    marginTop: 10,
    textAlign: "left",
    fontSize: FontSize.F_14,
    fontFamily: Fonts.REGULAR,
    fontWeight: FontWeight.F_W_300,
  },
});

export default QuestionTypeOne;
