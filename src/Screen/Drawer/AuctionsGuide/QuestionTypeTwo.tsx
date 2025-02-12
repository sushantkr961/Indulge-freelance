import React, { FC } from "react";
import { Text, View, StyleSheet } from "react-native";
import { colors } from "../../../Utils/Constant/Colors";
import { Fonts, FontSize, FontWeight } from "../../../Utils/Constant/Fonts";
import QuestionTypeItem from "./QuestionTypeItem";
import { ListItem } from ".";
interface QuestionTypeTwoProps {
  item?: ListItem;
}

export const QuestionTypeTwo: FC<QuestionTypeTwoProps> = ({ item }) => {
  return (
    <View style={styles.container}>
      <QuestionTypeItem
        type={1}
        label="Verification"
        subText={item?.verification}
      />
      <QuestionTypeItem type={2} label="Deposit" subText={item?.deposit} />
      <QuestionTypeItem
        type={3}
        label="Bidding Access"
        subText={item?.biddingAccess}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  small: {
    color: colors.WHITE_COLOR_80,
    textTransform: "uppercase",
    marginTop: 10,
    textAlign: "left",
    fontSize: FontSize.F_14,
    fontFamily: Fonts.REGULAR,
    fontWeight: FontWeight.F_W_300,
  },
});

export default QuestionTypeTwo;
