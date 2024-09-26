import { Platform } from "react-native";

// export const Fonts = {
//     BOLD: 'josefin-sans.bold',
//     SEMIBOLD: 'josefin-sans.semibold',
//     REGULAR: 'josefin-sans.regular',
//     LIGHT: 'josefin-sans.light'
// };
export const Fonts = {
    BOLD: Platform.OS == "ios" ? 'JosefinSans-Bold' : 'josefin-sans.bold',
    SEMIBOLD: Platform.OS == "ios" ? 'JosefinSans-SemiBold' : 'josefin-sans.semibold',
    REGULAR: Platform.OS == "ios" ? 'JosefinSans-Light' : 'josefin-sans.regular',
    LIGHT: Platform.OS == "ios" ? 'JosefinSans-ExtraLight' : 'josefin-sans.light'
};
export const FontSize = {
    F_10: 10,
    F_11: 11,
    F_12: 12,
    F_13: 13,
    F_14: 14,
    F_15: 15,
    F_16: 16,
    F_17: 17,
    F_18: 18,
    F_19: 19,
    F_20: 20,
    F_21: 21,
    F_22: 22,
    F_23: 23,
    F_24: 24,
    F_25: 25,
    F_26: 26,
    F_27: 27,
    F_28: 28,
    F_29: 29,
    F_30: 30,
    F_31: 31,
    F_32: 32,
    F_33: 33,
    F_34: 34,
    F_35: 35,
    F_36: 36
};
export const FontWeight: {
    F_W_normal: "normal";
    F_W_bold: "bold";
    F_W_100: "100";
    F_W_200: "200";
    F_W_300: "300";
    F_W_400: "400";
    F_W_500: "500";
    F_W_600: "600";
    F_W_700: "700";
    F_W_800: "800";
    F_W_900: "900";
} = {
    F_W_normal: "normal",
    F_W_bold: "bold",
    F_W_100: "100",
    F_W_200: "200",
    F_W_300: "300",
    F_W_400: "400",
    F_W_500: "500",
    F_W_600: "600",
    F_W_700: "700",
    F_W_800: "800",
    F_W_900: "900"
};



