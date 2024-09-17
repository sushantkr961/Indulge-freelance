import React, { useState } from "react";
import { StatusBar, StyleSheet, View, Dimensions } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../navigation/types";
import BackButton from "../components/BackButton";
import SearchBox from "../components/SearchBox";
import ContactList from "../components/ContactList";
import contactsData from "../data/contact.json";

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ReferFriend"
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const { width, height } = Dimensions.get("window");

const ReferFriends = ({ navigation }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredContacts, setFilteredContacts] = useState(contactsData);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text === "") {
      setFilteredContacts(contactsData);
    } else {
      const filtered = contactsData.filter((contact) =>
        contact.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredContacts(filtered);
    }
  };

  const handlePress = (contact: {
    id: string;
    name: string;
    phone: string;
  }) => {
    navigation.navigate("ReferFriendForm", { contact });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0F0F15"
        translucent={true}
        showHideTransition={"slide"}
      />
      <BackButton title="Refer your Friends" />
      <View style={styles.content}>
        <SearchBox onSearch={handleSearch} />
        <ContactList contacts={filteredContacts} onPress={handlePress} />
      </View>
    </SafeAreaView>
  );
};

export default ReferFriends;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F15",
  },
  content: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    marginTop: height * 0.11,
  },
});
