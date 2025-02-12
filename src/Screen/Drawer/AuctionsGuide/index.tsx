import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import React, { FC, useState } from "react";
import { colors } from "../../../Utils/Constant/Colors";
import { Fonts, FontSize, FontWeight } from "../../../Utils/Constant/Fonts";
import AuctionListItem from "./AuctionListItem";
import ModalComponent from "../../../Components/ModalComponent";
import MessagesQuestion from "../../../../assets/svg/MessagesQuestion";
import QuestionTypeOne from "./QuestionTypeOne";
import QuestionTypeTwo from "./QuestionTypeTwo";
import BidButton from "../../../Components/BidButton";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../../../StoreRedux/hooks/Hooks";
import AuctionIconSvg from "../../../../assets/svg/AuctionIconSvg";
import DrawerScreensHeader from "../../../Components/DrawerScreensHeader";
import { Platform } from "react-native";
export type ListItem = {
  question?: string;
  id: number;
  type: number;
  answer?: any;
  subTitle?: string;
  verification?: string;
  deposit?: string;
  biddingAccess?: string;
};

const AuctionsGuide = () => {
  const navigation = useNavigation();
  const { guideAuctionData } = useAppSelector((state: any) => state.auctionOngoing);
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<ListItem | null>(null);
  const onClick = (item: ListItem) => {
    setSelectedItem(item);
    setVisible(true);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <DrawerScreensHeader
          style={styles.headerStyle}
          title=""
          leftButtonAction={() => navigation.goBack()}
        />
        <View style={styles.imageView}>
          <AuctionIconSvg />
          <Text style={styles.subText0}>
            Guide to Auction
          </Text>
          <Text style={styles.subText}>
            If you haven't registered for bidding with us before, we recommend
            initiating the registration process at least four business days before
            the auction to ensure a smooth experience.
          </Text>
        </View>
        <View style={styles.flatlistView}>
          <FlatList
            data={guideAuctionData}
            renderItem={({ item }) => (
              <AuctionListItem item={item} onPress={() => onClick(item)} />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
        <ModalComponent
          visible={visible}
          onRequestClose={() => setVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.bottomSheet}>
              <View style={styles.lineView} />
              <MessagesQuestion
                width={35}
                height={35}
                activeColor={colors.YELLO_THEME_COLOR}
              />
              <Text style={styles.subTitle}>{selectedItem?.question}</Text>
              {selectedItem?.subTitle && (
                <Text style={styles.subHade}>{selectedItem?.subTitle}</Text>
              )}

              {selectedItem?.type === 1 ? (
                <QuestionTypeOne item={selectedItem} />
              ) : (
                <QuestionTypeTwo item={selectedItem} />
              )}

              <BidButton label={"Understood"} onPress={() => setVisible(false)} />
            </View>
          </View>
        </ModalComponent>
      </View>
    </SafeAreaView>
  );
};

export default AuctionsGuide;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BLACK_BACKGROUND_COLOR,
  },
  headerStyle: {
    backgroundColor: colors.BLACK_BACKGROUND_COLOR,
    marginTop: Platform.OS === 'ios' ? 0 : 10,
    paddingStart: 20
  },
  imageView: {
    marginTop: 30,
    paddingHorizontal: 15,
  },
  subText0: {
    color: colors.YELLO_THEME_COLOR_TEXT,
    marginTop: 5,
    textAlign: "left",
    fontSize: FontSize.F_24,
    fontFamily: Fonts.REGULAR,
    fontWeight: FontWeight.F_W_300
  },
  subText: {
    color: colors.WHITE_COLOR,
    marginTop: 20,
    textAlign: "left",
    fontSize: FontSize.F_14,
    fontFamily: Fonts.REGULAR,
    fontWeight: FontWeight.F_W_300,
  },
  flatlistView: {
    flex: 1,
    marginTop: 20,
    paddingTop: 20,
    backgroundColor: colors.BLACK_BLUE_DARK,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.BLACK_BACKGROUND_COLOR,
  },
  bottomSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingVertical: 23,
    paddingHorizontal: 24,
    bottom: 0,
    borderWidth: 1,
    paddingBottom: 20,
    backgroundColor: colors.BLACK_BLUE_DARK,
  },
  lineView: {
    height: 5,
    justifyContent: "center",
    borderRadius: 2,
    marginBottom: 20,
    width: 80,
    alignSelf: "center",
    top: 5,
    backgroundColor: colors.GREY_DARK_LINE_COLOR,
  },
  subTitle: {
    color: colors.WHITE_COLOR,
    marginTop: 20,
    fontSize: FontSize.F_20,
    fontFamily: Fonts.REGULAR,
    fontWeight: FontWeight.F_W_300,
  },
  subHade: {
    color: colors.WHITE_COLOR_80,
    marginTop: 10,
    textAlign: "left",
    fontSize: FontSize.F_14,
    fontFamily: Fonts.REGULAR,
    fontWeight: FontWeight.F_W_300,
  },
});
