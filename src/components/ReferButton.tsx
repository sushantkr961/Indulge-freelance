import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React from "react";

const { width, height } = Dimensions.get("window");

type Props = {
  onPress: () => void;
  title: string;
  // imageSource: any;
  Icon: React.ElementType;
  backgroundColor?: string;
  iconHeight?: number;
  iconWidth?: number;
  iconColor?: string;
};

const ReferButton = ({
  onPress,
  title,
  backgroundColor,
  // imageSource,
  Icon,
  iconHeight,
  iconWidth,
  iconColor,
}: Props) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: backgroundColor || "transparent",
            borderColor: backgroundColor ? backgroundColor : "#FFFFFF",
          },
        ]}
        onPress={onPress}
      >
        {/* <Image source={imageSource} style={styles.buttonImage} /> */}
        <Icon width={iconWidth} height={iconHeight} activeColor={iconColor} />
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReferButton;

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: "flex-start",
    marginBottom: height * 0.015,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.04,
    borderRadius: 100,
    borderWidth: 0.6,
    opacity: 1,
  },
  buttonImage: {
    width: width * 0.045,
    height: width * 0.045,
    marginRight: width * 0.03,
    opacity: 1,
  },
  buttonText: {
    fontFamily: "JosefinSans-Regular",
    fontSize: width * 0.037,
    fontWeight: "400",
    lineHeight: width * 0.06,
    letterSpacing: -0.04,
    color: "#ffffff",
    textAlign: "left",
    marginLeft: width * 0.03,
  },
});
