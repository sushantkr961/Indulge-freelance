import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet, Text, View, Dimensions, PermissionsAndroid, Platform, ActivityIndicator, } from "react-native";
// import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
// import { RootStackParamList } from "../../navigation/types";
import BackButton from "../../Components/BackButton";
import SearchBox from "../../Components/SearchBox";
import ContactList from "../../Components/ContactList";
import contactsData from "../../data/referralsData.json";
// import { ReferFriendStyles as styles } from "./style";
import Contacts from 'react-native-contacts';
import { colors } from "../../Utils/Constant/Colors";
import { Fonts, FontSize, FontWeight } from "../../Utils/Constant/Fonts";
import { STATUSES } from "../../StoreRedux/objects";
const { width, height } = Dimensions.get("window");

// type HomeScreenNavigationProp = StackNavigationProp<
//   RootStackParamList,
//   "ReferFriend"
// >;

// type Props = {
//   navigation: HomeScreenNavigationProp;
// };

const ReferFriends = ({ navigation }: any) => {
  const [status, setStatus] = useState(STATUSES.IDLE);
  const [searchQuery, setSearchQuery] = useState("");
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);

  // Request contacts permission (iOS and Android)
  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: "Contacts Permission",
          message: "This app would like to access your contacts.",
          buttonPositive: "OK"
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      const permission = await Contacts.checkPermission();
      if (permission === 'authorized') {
        return true;
      } else if (permission === 'undefined') {
        const granted = await Contacts.requestPermission();
        return granted === 'authorized';
      }
      return false;
    }
  };
  const normalizeContacts = (contacts: any) => {
    return contacts.map((contact, index) => {
      let name = '';
      let mobileNo = '';

      // Normalize for Android
      if (Platform.OS === 'android') {
        name = contact.displayName || '';
        mobileNo = contact.phoneNumbers?.[0]?.number || '';
      }

      // Normalize for iOS
      if (Platform.OS === 'ios') { //${contact.familyName || ''}
        name = `${contact.givenName || ''}`.trim();
        mobileNo = contact.phoneNumbers?.[0]?.number || '';
      }

      return {
        id: `${index + 1}`,   // You can customize this ID if needed
        name: name || 'Unknown',   // Fallback in case name is missing
        mobileNo: mobileNo || 'No Number',  // Fallback if no phone number exists
      };
    });
  };
  // Fetch contacts
  const fetchContacts = async () => {
    setStatus(STATUSES.LOADING)
    const hasPermission = await requestPermission();
    if (hasPermission) {
      Contacts.getAll()
        .then(async (contacts) => {
          // console.log("Contacts....", contacts)
          const normalizedContacts = await normalizeContacts(contacts);

          setStatus(STATUSES.IDLE)
          setContacts(normalizedContacts);
        })
        .catch(error => {
          setStatus(STATUSES.IDLE)
          console.log('Error fetching contacts:', error);
        });
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);


  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text == '') {
      setFilteredContacts([])
    } else {
      const filtered = contacts.filter((contact) => {
        // Check if contact name matches the search query
        const nameMatch = contact?.name
          ?.toLowerCase()
          .includes(text.toLowerCase());

        // Check if contact phone number matches the search query
        const mobileNoMatch = contact.mobileNo.includes(text);
        // Return true if either the name or phone number matches
        return nameMatch || mobileNoMatch;
      });
      setFilteredContacts(filtered);
    }
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
        {
          status === STATUSES.LOADING && <View style={styles.subContainer1} >
            <ActivityIndicator size="large" color={colors.YELLO_THEME_COLOR} />
          </View>
        }
        {
          contacts.length == 0 && <View style={styles.subContainer1} >
            <Text style={styles.typeText0}>No Contacts</Text>
          </View>
        }
        <ContactList contacts={filteredContacts?.length > 0 ? filteredContacts : contacts} isTouchableEnabled={true} />
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
  subContainer1: {
    paddingHorizontal: 20,
    marginTop: 20
  },
  typeText0: {
    color: colors.YELLO_THEME_COLOR_TEXT,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSize.F_24,
    fontWeight: FontWeight.F_W_300,
    alignSelf: 'center'
  },
});