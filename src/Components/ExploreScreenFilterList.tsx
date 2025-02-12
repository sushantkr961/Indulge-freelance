import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  resetExploreSubFilterTags,
  setExploreFilterTags,
} from "../StoreRedux/ExploreFilterListSlice";
import { colors } from "../Utils/Constant/Colors";
import { Fonts, FontSize } from "../Utils/Constant/Fonts";

const ExploreScreenFilterList = ({
  goToAuction,
  loadMoreSearchData,
  isSearching,
  clickOnTag
}: any) => {
  const { exploreFilterListData } = useSelector(
    (state: any) => state.exploreFilterList
  );
  const dispatch = useDispatch();
  const selectedTags = exploreFilterListData.filter((item: any) => item.selected);

  // const clickOnTag = (item: any) => {
  //   dispatch(resetExploreSubFilterTags());
  //   dispatch(setExploreFilterTags({ id: item.id }));
  // };
  const renderEventsSuggestionItem = ({ item }: any) => (
    <TouchableOpacity
      style={[
        styles.eventSuggestionView,
        Platform.OS === "ios" ? styles.iosShadow : styles.androidShadow,
        {
          backgroundColor: item.selected
            ? colors.YELLO_THEME_COLOR
            : colors.BACK_BLUE_DARK,
        },
      ]}
      onPress={() => {
        if (item.id === 11) {
          loadMoreSearchData();
        } else {
          clickOnTag(item);
        }
      }}
    >
      <Text style={styles.eventSuggestionText}>{item.name}</Text>
    </TouchableOpacity>
  );
  const ListFooter = () => {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {/* Display selected tag(s) */}


        {/* "+ More" button */}

        {selectedTags.length > 0 &&
          selectedTags.map((tag: any) => {
            // Find the index of the tag in exploreFilterListData
            const tagIndex = exploreFilterListData.findIndex(
              (filterTag: any) => filterTag.id === tag.id
            );

            // Only render if the tag is placed after the 10th position (index > 9)
            if (tagIndex > 9) {
              return (
                <View
                  key={tag.id}
                  style={[
                    styles.eventSuggestionView,
                    {
                      backgroundColor: colors.YELLO_THEME_COLOR,
                    },
                  ]}
                >
                  <Text style={styles.eventSuggestionText}>{tag.name}</Text>
                </View>
              );
            }

            return null; // If tag is not in the desired position, do not render anything
          })}
        <TouchableOpacity
          style={[
            styles.eventSuggestionView,
            {
              backgroundColor: isSearching
                ? colors.YELLO_THEME_COLOR
                : colors.BACK_BLUE_DARK,
            },
          ]}
          onPress={() => loadMoreSearchData()}
        >
          <Text style={styles.eventSuggestionText}>+ More</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{}}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={exploreFilterListData.slice(0, 10)}
        renderItem={renderEventsSuggestionItem}
        keyExtractor={(item: any) => item.id.toString()}
        ListFooterComponent={ListFooter}
        extraData={exploreFilterListData} // You can directly pass the state here
      />
    </View>
  );
};

export default ExploreScreenFilterList;

const styles = StyleSheet.create({
  eventSuggestionView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 25,
    marginStart: 16,
    marginTop: 15,
    overflow: "hidden",
    marginBottom: 10,
  },
  eventSuggestionText: {
    fontSize: FontSize.F_16,
    color: colors.WHITE_COLOR,
    fontFamily: Fonts.REGULAR,
  },
  iosShadow: {
    shadowColor: colors.WHITE_COLOR,
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  androidShadow: {
    elevation: 5,
  },
});
