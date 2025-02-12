import React, { FC } from "react";
import { Text, View, StyleSheet } from "react-native";
import { colors } from "../../../Utils/Constant/Colors";
import { Fonts, FontSize, FontWeight } from "../../../Utils/Constant/Fonts";
import { ListItem } from ".";
interface QuestionTypeItemProps {
  onPress?: () => void;
  label?: string;
  type?: number;
  subText?: string;
}

export const QuestionTypeItem: FC<QuestionTypeItemProps> = ({
  onPress,
  label = "",
  type,
  subText = "",
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <View style={styles.icon}>
            <Text style={styles.numberText}>{type}</Text>
          </View>
          {(type === 1 || type === 2) && <View style={styles.line} />}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.small}>{label}</Text>
          <Text style={styles.subHade}>{subText}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
  },
  numberText: {
    color: colors.WHITE_COLOR,
    textTransform: "uppercase",
  },
  iconContainer: {
    flex: 0.8,
    alignItems: "center",
  },
  icon: {
    height: 24,
    width: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.YELLO_THEME_COLOR,
  },
  line: {
    width: 1,
    flex: 1,
    backgroundColor: "#D6A54666",
  },
  textContainer: {
    flex: 4.5,
    marginStart: 10,
  },
  small: {
    color: colors.WHITE_COLOR,
    textTransform: "uppercase",
    textAlign: "left",
    fontSize: FontSize.F_14,
    fontFamily: Fonts.BOLD,
    fontWeight: FontWeight.F_W_300,
  },
  subHade: {
    color: colors.WHITE_COLOR_80,
    marginTop: 10,
    textAlign: "left",
    fontSize: FontSize.F_14,
    fontFamily: Fonts.REGULAR,
    fontWeight: FontWeight.F_W_300,
    marginBottom: 20,
  },
});

export default QuestionTypeItem;
