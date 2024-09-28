import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import SearchSvg from "../../assets/svg/Search";

type Props = {
  placeholder?: string;
  onSearch: (text: string) => void;
};

const { width, height } = Dimensions.get("window");

const SearchBox = ({
  placeholder = "Search Friend to invite",
  onSearch,
}: Props) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#373737"
        onChangeText={onSearch}
      />
      <TouchableOpacity>
        <SearchSvg width={width * 0.06} height={width * 0.06} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: width * 0.025,
    paddingHorizontal: width * 0.03,
    marginBottom: height * 0.03,
    marginHorizontal: width * 0.02,
    marginVertical: width * 0.03,
  },
  input: {
    flex: 1,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.02,
    color: "#373737",
    fontFamily: "JosefinSans-Light",
    fontSize: width * 0.04,
  },
});
