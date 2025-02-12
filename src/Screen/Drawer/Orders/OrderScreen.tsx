import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { colors } from "../../../Utils/Constant/Colors";
import DrawerScreensHeader from "../../../Components/DrawerScreensHeader";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAppSelector } from "../../../StoreRedux/hooks/Hooks";
import OrdersList from "./OrdersList";
import { Fonts, FontSize } from "../../../Utils/Constant/Fonts";
import Check from "../../../../assets/svg/Check";
const OrderScreen = () => {
  const route = useRoute();
  const { currency } = useAppSelector((state) => state.profileDetails);
  const { order, shippingAddress }: any = route?.params;
  const { status } = order;
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = new Date(order.createdAt).toLocaleDateString(
    "en-GB",
    options
  );
  const modifiedDate = new Date(order?.modifiedDate).toLocaleDateString(
    "en-GB",
    options
  );

  const renderCartItem = ({ item }: any) => {
    return (
      <TouchableOpacity style={styles.itemContainer}>
        {/* <Image source={{ uri: `https://indulgeconcierge.com${order?.products[0]?.product?.mainImage?.url}` }} style={styles.image} resizeMode="cover" /> */}
        <Image
          source={{ uri: order?.products[0]?.product?.mainImage?.url }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{item.product.categories[0]}</Text>
          <Text style={styles.subtitle}>{item.product.name}</Text>
          <View style={styles.cardActionView}>
            <Text style={styles.price}>
              {currency}
              {item?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Text>
            <View style={styles.actionsContainer}>
              <Text style={styles.quantity}>Q: {item.quantity}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const CircleWithTriangle = ({
    backgroundColor,
    showFirstTriangle,
    showSecondTriangle,
    showThirdTriangle,
  }: {
    backgroundColor: string;
    showFirstTriangle?: boolean;
    showSecondTriangle?: boolean;
    showThirdTriangle?: boolean;
  }) => (
    <View
      style={[styles.progressOuterCircle, { backgroundColor: backgroundColor }]}
    >
      {showFirstTriangle && (
        <>
          {/* <View
            style={{
              height: 14,
              width: 14,
              borderRadius: 7,
              backgroundColor: "green",
              marginTop: 8,
              justifyContent:'center',
              alignItems:'center'
            }}
          >
            <Check />
          </View> */}
          <Image
            source={require("../../../../assets/screen/GreenCheck.png")}
            style={[styles.checkIcon,{top:4}]}
            resizeMode="cover"
          />
          <View
            style={[
              styles.triangle,
              {
                transform: [{ rotate: "180deg" }],
                top:7,
                borderBottomColor: backgroundColor,
              },
            ]}
          />
        </>
      )}
      {showSecondTriangle && (
        <>
          <View
            style={[
              styles.triangle,
              { borderBottomColor: colors.WHITE_COLOR, top: -1 },
            ]}
          />
          <Image
            source={
              status === "delivered"
                ? require("../../../../assets/screen/GreenCheck.png")
                : require("../../../../assets/screen/BlackCheck.png")
            }
            style={[styles.checkIcon, { top: -2 }]}
            resizeMode="cover"
          />
          <View
            style={[
              styles.triangle,
              {
                transform: [{ rotate: "180deg" }],
                top: -2,
                borderBottomColor: colors.WHITE_COLOR,
              },
            ]}
          />
        </>
      )}
      {showThirdTriangle && (
        <>
          <View
            style={[
              styles.triangle,
              { top: -10, borderBottomColor: colors.WHITE_COLOR },
            ]}
          />
          <Image
            source={
              status === "delivered"
                ? require("../../../../assets/screen/GreenCheck.png")
                : require("../../../../assets/screen/BlackCheck.png")
            }
            style={[styles.checkIcon, { top: -8 }]}
            resizeMode="cover"
          />
        </>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.subContainer}>
        <DrawerScreensHeader title="Order" leftButtonAction={goBack} />

        <FlatList
          data={order.products || []}
          renderItem={renderCartItem}
          keyExtractor={(item) => item._id.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={styles.itemContainerProgress}>
        <Text style={styles.trackText}>Trac Order</Text>
        <View style={styles.progressView}>
          <CircleWithTriangle
            backgroundColor={colors.WHITE_COLOR}
            showFirstTriangle
          />

          <View>
            <Text style={styles.orderProgressText}>Order Accepted</Text>
            <Text style={styles.orderProgressText1}>{formattedDate}</Text>
          </View>
        </View>

        <View style={styles.verticalGreenLine} />

        <View style={[styles.progressView, styles.marginTop]}>
          <CircleWithTriangle
            backgroundColor={colors.WHITE_COLOR}
            showSecondTriangle
          />

          <View style={styles.opacity5}>
            <Text style={styles.orderProgressText}>Expected On</Text>
            <Text style={styles.orderProgressText1}>{formattedDate}</Text>
          </View>
        </View>

        <View
          style={[
            styles.verticalGreenLine1,
            {
              backgroundColor:
                status === "delivered"
                  ? colors.LIGHT_GREEN
                  : colors.WHITE_COLOR,
            },
          ]}
        />
        <View style={[styles.progressView, styles.marginTop]}>
          <CircleWithTriangle
            backgroundColor={colors.WHITE_COLOR}
            showThirdTriangle
          />

          <View style={styles.opacity5}>
            <Text style={styles.orderProgressText}>Delivery On</Text>
            <Text style={styles.orderProgressText1}>
              {order?.modifiedDate ? modifiedDate : formattedDate}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.itemContainerProgress}>
        <Text style={styles.addressText}>Delivery Address</Text>
        <Text style={styles.addressText1}>Home</Text>
        <Text style={styles.addressText2}>{shippingAddress}</Text>
      </View>
      {/* <View style={styles.buttonView}>
                <View style={styles.flex1} />
                <TouchableOpacity style={styles.buttonContainer} >
                    <Text style={styles.buttonText}>Download Invoice</Text>
                </TouchableOpacity>
            </View> */}
    </ScrollView>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BLACK_BLUE_DARK,
    paddingBottom: 100,
  },
  subContainer: {
    paddingHorizontal: 20,
  },
  itemContainer: {
    backgroundColor: colors.BACK_BLUE_DARK,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    borderRadius: 16,
  },
  itemContainerProgress: {
    marginTop: 20,
    backgroundColor: colors.BACK_BLUE_DARK,
    padding: 20,
    borderRadius: 16,
    marginHorizontal: 10,
  },
  image: {
    width: 96,
    height: 96,
    borderRadius: 16,
    marginRight: 10,
  },
  checkIcon: {
    width: 13,
    height: 13,
    // marginRight: 20,
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    marginBottom: 5,
    color: colors.WHITE_COLOR,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSize.F_18,
    textAlign: "left",
  },
  subtitle: {
    color: colors.GREY_FONT_COLOR,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSize.F_14,
    textAlign: "left",
    marginBottom: 5,
  },
  price: {
    color: colors.WHITE_COLOR,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSize.F_14,
    textAlign: "left",
    marginTop: 10,
  },
  quantity: {
    color: colors.WHITE_COLOR,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSize.F_14,
    textAlign: "left",
  },
  trackText: {
    color: colors.WHITE_COLOR,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSize.F_20,
    textAlign: "left",
  },
  cardActionView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },
  marginTop: {
    marginTop: -5,
  },
  orderProgressText: {
    color: colors.WHITE_COLOR,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSize.F_20,
    textAlign: "left",
    paddingLeft: 20,
  },
  addressText: {
    color: colors.WHITE_COLOR,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSize.F_16,
    textAlign: "left",
  },
  addressText1: {
    color: colors.YELLO_THEME_COLOR_TEXT,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSize.F_16,
    textAlign: "left",
    marginTop: 10,
  },
  addressText2: {
    color: colors.WHITE_COLOR,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSize.F_15,
    textAlign: "left",
    marginTop: 5,
  },
  orderProgressText1: {
    color: colors.WHITE_COLOR_60,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSize.F_16,
    textAlign: "left",
    paddingLeft: 20,
  },
  verticalGreenLine: {
    backgroundColor: colors.WHITE_COLOR,
    height: 95,
    width: 5,
    marginStart: 9,
    marginTop: -15,
  },
  verticalGreenLine1: {
    backgroundColor: colors.WHITE_COLOR_78,
    height: 95,
    width: 5,
    marginStart: 9,
    marginTop: -9,
  },
  opacity5: { opacity: 0.5 },
  actionsContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: -10,
    marginEnd: 15,
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 55,
    marginHorizontal: 20,
  },
  flex1: { flex: 1 },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.BUTTON_WHITE_GREY,
    paddingVertical: 12,
    borderRadius: 12,
  },
  buttonText: {
    fontFamily: "PF Beau Sans Pro-Regular",
    fontSize: 16,
    color: colors.WHITE_COLOR,
    // fontWeight: '400',
    textAlign: "center",
  },
  triangle: {
    width: 0,
    height: 0,
    top: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 16,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: colors.WHITE_COLOR_78,
  },
  progressOuterCircle: {
    height: 24,
    width: 23,
    backgroundColor: colors.WHITE_COLOR_78,
    borderBottomLeftRadius: 13,
    borderBottomRightRadius: 13,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 3,
    transform: [{ translateY: -6 }],
    zIndex: 1,
  },
});
