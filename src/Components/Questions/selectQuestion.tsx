import React, { useState } from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
  Platform
} from 'react-native';
import { colors } from '../../Utils/Constant/Colors';
import { Fonts, FontSize } from '../../Utils/Constant/Fonts';

const SelectQuestion = ({ img, questionDataList4, updateAnswerByIndex }: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { index, question, answer, questions } = questionDataList4[0];

  const handleSelect = (value: string) => {
    updateAnswerByIndex(index, value);
    setModalVisible(false);
  };

  return (
    <View style={Styles.cardContainer}>
      <View>
        <Image style={Styles.mainImage} source={img} alt="img" />
        <Text style={Styles.questionText}>
          {index}. {question}
        </Text>
      </View>
      <View style={Styles.AnswerBoxContainer}>
        <TouchableOpacity
          style={Styles.picker}
          onPress={() => setModalVisible(true)}
        >
          <Text style={Styles.pickerText}>{answer || "Select option"}</Text>
          <Image source={require('../../../assets/intro/DownArrow.png')} alt="img" />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={Styles.modalContainer}>
          <View style={Styles.modalContent}>
            <FlatList
              data={questions}
              keyExtractor={(item) => item.value}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={Styles.option}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text style={Styles.optionText}>{item.value}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={Styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={Styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SelectQuestion;

export const Styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.BLACK_BACKGROUND_COLOR,
    gap: 15,
    borderRadius: 8
  },
  questionText: {
    color: colors.WHITE_COLOR,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSize.F_24,
    marginVertical: 10
  },
  AnswerBoxContainer: {
    gap: 10
  },
  mainImage: {
    resizeMode: 'contain',
    width: '100%',

  },
  picker: {
    backgroundColor: '#80808029',
    height: 60,
    color: '#FFD700',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 15,
    flexDirection: 'row'
  },
  pickerText: {
    color: colors.YELLO_THEME_COLOR,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSize.F_20,
    marginVertical: 10
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#FFF',
    padding: 20,
    paddingTop: Platform.OS == 'ios' ? 65 : 30
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC'
  },
  optionText: {
    color: colors.BLACK_BACKGROUND_COLOR,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSize.F_18
  },
  closeButton: {
    marginTop: 10,
    alignSelf: 'center',
    padding: 10,
    backgroundColor: colors.YELLO_THEME_COLOR,
    borderRadius: 8,
    marginBottom: 30
  },
  closeButtonText: {
    color: colors.BLACK_BACKGROUND_COLOR,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSize.F_16
  },
});
