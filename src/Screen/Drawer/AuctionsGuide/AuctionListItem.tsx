import React, { FC } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { colors } from "../../../Utils/Constant/Colors";
import { ListItem } from ".";
import MessagesQuestion from "../../../../assets/svg/MessagesQuestion";
import { Fonts, FontSize, FontWeight } from "../../../Utils/Constant/Fonts";
interface AuctionListItemProps {
  onPress?: () => void;
  item: ListItem;
}
export const AuctionListItem: FC<AuctionListItemProps> = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      accessibilityHint="Tap to view more details or take action."
    >
      <View style={styles.rowView}>
        <MessagesQuestion width={24} height={24} activeColor={colors.WHITE_COLOR} />
        <Text style={styles.subHade}>
          {item.question}
        </Text>
      </View>
      <View style={styles.lineView} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 15,
    paddingHorizontal: 15
  },
  rowView: {
    flexDirection: "row",
    alignItems: "center",
  },
  lineView: {
    height: 1,
    marginVertical: 24,
    backgroundColor: colors.WHITE_COLOR_30,
  },
  subHade: {
    color: colors.WHITE_COLOR,
    marginStart: 20,
    marginEnd: 20,
    fontSize: FontSize.F_14,
    fontFamily: Fonts.REGULAR,
    fontWeight: FontWeight.F_W_300,
  },
});

export default AuctionListItem;
