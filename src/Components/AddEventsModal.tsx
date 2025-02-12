import React, { useState, useEffect } from 'react';
import { Modal, View, Image, ScrollView, KeyboardAvoidingView, TextInput, ActivityIndicator, Text, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { AddEventObject } from '../Screen/Calender/types';
import { colors } from '../Utils/Constant/Colors';
import ListOfSuggestedEventsType from './ListOfSuggestedEventsType';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { combineDateAndTime } from '../Utils';
import { Fonts, FontSize } from '../Utils/Constant/Fonts';
import CloseWhite from '../../assets/svg/CloseWhite';

interface AddEventsModalProps {
    eventSaveModalVisible: boolean;
    onAddEventsSave: (addEventObj: AddEventObject) => void;
    onEditEventsUpdate: (addEventObj: AddEventObject) => void;
    setEventsSaveModalVisible: (visible: boolean) => void;
    loading: boolean;
    setLoading: (visible: boolean) => void;
    eventItem: AddEventObject | undefined
}

const AddEventsModal: React.FC<AddEventsModalProps> = ({
    eventSaveModalVisible,
    onAddEventsSave,
    setEventsSaveModalVisible,
    loading, setLoading,
    eventItem,
    onEditEventsUpdate
}) => {

    const [eventTitle, setEventTitle] = useState<string>('');
    const [remindMe, setRemindMe] = useState<number>(0);
    const [notes, setNotes] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [date, setDate] = useState<Date>(new Date());
    const [time, setTime] = useState<Date>(new Date());
    const [showDatepicker, setShowDatepicker] = useState<boolean>(false);
    const [showTimepicker, setShowTimepicker] = useState<boolean>(false);
    const [reminderModal, setReminderModal] = useState<boolean>(false);
    useEffect(() => {
        if (eventItem) {
            setEventTitle(eventItem?.title ?? '');
            setRemindMe(eventItem?.reminderTime ?? 0);
            setNotes(eventItem?.note ?? '');
            setType(eventItem?.type ?? '');
            setDate(eventItem?.date ? new Date(eventItem.date) : new Date());
            setTime(eventItem?.time ? combineDateAndTime(eventItem.date, eventItem.time) : new Date())
        }
    }, [eventItem]);
    const showDatepickerHandler = () => {
        setShowDatepicker(!showDatepicker);
        setShowTimepicker(false); // Ensure only one picker is shown at a time
    };

    const showTimepickerHandler = () => {
        setShowTimepicker(!showTimepicker);
        setShowDatepicker(false); // Ensure only one picker is shown at a time
    };

    const onChangeDate = (event: Event, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShowDatepicker(Platform.OS === 'ios'); // Close datepicker on iOS after selection
        setDate(currentDate);
    };
    const onChangeTime = (event: Event, selectedTime?: Date) => {
        const currentTime = selectedTime || date;
        setShowTimepicker(Platform.OS === 'ios'); // Close timepicker on iOS after selection
        setTime(currentTime);
    };
    const handleSave = async () => {
        if (type.trim() === '') {
            Alert.alert("Alert", "Please select event type.");
            return;
        }

        if (eventTitle.trim() === '') {
            Alert.alert("Alert", "Please enter event title.");
            return;
        }

        if (notes.trim() === '') {
            Alert.alert("Alert", "Please enter event note.");
            return;
        }

        const parts = date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).split("/");
        const formattedDate = parts[2] + "-" + parts[1] + "-" + parts[0];
        const addEventObj: AddEventObject = {
            type: type,
            title: eventTitle,
            date: formattedDate,
            remindMe: remindMe,
            notes: notes,
            time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', minimumIntegerDigits: 2 })
        }
        if (eventItem?.eventId) {
            addEventObj.eventId = eventItem?.eventId
            // update data
            onEditEventsUpdate(addEventObj);
        } else {
            // Save data
            onAddEventsSave(addEventObj);
        }
        // Clear inputs after saving
        setEventTitle('');
        setRemindMe(1);
        setNotes('');
        setType('')
    };
    const onPressType = (selectedType: string) => {
        setType(selectedType)
    }
    const setRemindMEValue = (value: any) => {
        setRemindMe(value)
        setReminderModal(false)
    }
    return (
        <Modal visible={eventSaveModalVisible} animationType="slide" transparent>
            <View style={[styles.modalContainer]}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    enabled
                >
                    <ScrollView style={styles.modalContent} nestedScrollEnabled={true}>
                        <View style={styles.verticleViewStyle} />
                        <Text style={styles.yourScheduleText}>
                            Add Calender
                        </Text>
                        <Text style={styles.label}>Event Type*:</Text>
                        <ListOfSuggestedEventsType eventSuggestionView={styles.eventSuggestionView} onPressType={onPressType} selectedType={type} />
                        <Text style={styles.label}>Title*:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={'Dinson Birthday'}
                            value={eventTitle}
                            onChangeText={setEventTitle}
                        />
                        <Text style={styles.label}>Date:</Text>

                        <TouchableOpacity style={styles.datePickerContainer} onPress={showDatepickerHandler}>
                            <Text style={styles.dateText}>{date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</Text>
                            {showDatepicker && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    mode="date"
                                    is24Hour={true}
                                    display="default"
                                    onChange={onChangeDate}
                                />
                            )}
                        </TouchableOpacity>
                        <Text style={styles.label}>Time:</Text>

                        <TouchableOpacity style={styles.datePickerContainer} onPress={showTimepickerHandler}>
                            <Text style={styles.dateText}>{time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', minimumIntegerDigits: 2 })}</Text>
                            {showTimepicker && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={time}
                                    mode="time"
                                    is24Hour={false}
                                    display="default"
                                    onChange={onChangeTime}
                                />
                            )}
                        </TouchableOpacity>
                        <Text style={styles.label}>Remind Me:</Text>

                        <TouchableOpacity style={[styles.datePickerContainer, {
                            justifyContent: 'space-between', alignItems: 'center',
                        }]} onPress={() => setReminderModal(!reminderModal)}>
                            <Text style={styles.dateText}>{remindMe} days in advance</Text>
                            <Image
                                source={reminderModal ? require("../../assets/screen/Down_Arrow_YELLOW.png") : require("../../assets/screen/Right_Arrow_YELLOW.png")}
                            />
                        </TouchableOpacity>
                        {reminderModal &&
                            <View style={styles.dropDownContainer}>
                                {
                                    [{ value: 7, title: "One week before" },
                                    { value: 3, title: "3 days before" },
                                    { value: 2, title: "2 days before" },
                                    { value: 1, title: "1 day before" }
                                    ].map((item) => (
                                        <TouchableOpacity
                                            key={item.value.toString()}
                                            style={[styles.datePickerContainer, { paddingHorizontal: 10, paddingVertical: 3 }]}
                                            onPress={() => setRemindMEValue(item.value)}
                                        >
                                            <Text style={styles.dateText}>{item.title}</Text>
                                        </TouchableOpacity>
                                    ))}
                            </View>}
                        <Text style={styles.label}>Add Note*:</Text>
                        <TextInput
                            style={styles.inputNotes}
                            placeholder={'Write a note here'}
                            numberOfLines={3}
                            multiline={true}
                            value={notes}
                            onChangeText={setNotes}
                        />
                        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                            <Text style={styles.buttonText}>{eventItem?.eventId ? "Update in Calender" : "Save in Calender"}</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity onPress={() => setEventsSaveModalVisible(false)} style={styles.closeButton}>
                            <Text style={styles.buttonText}>Close</Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity style={styles.buttonContainer} onPress={() => setEventsSaveModalVisible(false)}>
                            <CloseWhite stroke={colors.BLACK_BACKGROUND_COLOR} />
                        </TouchableOpacity>
                    </ScrollView>
                </KeyboardAvoidingView>
                <Modal
                    animationType="slide"
                    visible={loading}
                    onRequestClose={() => setLoading(false)}
                >
                    <View style={styles.modalContainer}>
                        <ActivityIndicator size="large" color={colors.YELLO_THEME_COLOR} />
                    </View>
                </Modal>
            </View>
        </Modal >
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer1: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        flex: 1,
        backgroundColor: colors.WHITE_COLOR,
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        width: '100%',
        marginTop: Platform.OS === 'ios' ? 90 : 50,
        paddingBottom: 50
    },
    verticleViewStyle: {
        // marginTop: 10,
        width: 60,
        height: 3,
        backgroundColor: "#566D80",
        alignSelf: 'center'
    },
    yourScheduleText: {
        marginBottom: 10,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_20,
        marginTop: 5,
        color: colors.BLACK_BLUE_DARK
    },
    label: {
        marginTop: 10,
        marginBottom: 5,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_20,
        color: colors.BLACK_BLUE_DARK
    },
    input: {
        backgroundColor: colors.WHITE_COLOR,
        borderColor: colors.WHITE_COLOR_BLACK_GREY,
        borderWidth: 2,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginBottom: 15,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_20,
        color: colors.BLACK_BACKGROUND_COLOR
    },
    inputNotes: {
        height: 100,
        backgroundColor: "#FFFFFF",
        borderColor: '#EFF1F4',
        borderWidth: 2,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginBottom: 15,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_20,
        color: colors.BLACK_BACKGROUND_COLOR
    },
    datePickerContainer: {
        flexDirection: 'row',
        backgroundColor: "#FFFFFF",
        borderColor: '#EFF1F4',
        borderWidth: 2,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginBottom: 15,
    },
    dateText: {
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_20,
        color: colors.BLACK_BACKGROUND_COLOR,
        marginStart: 10,
    },
    dropDownContainer: {
        borderWidth: 2,
        padding: 10,
        borderColor: '#EFF1F4',
        marginTop: -15
    },
    saveButton: {
        backgroundColor: colors.YELLO_THEME_COLOR,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 150
    },
    closeButton: {
        backgroundColor: colors.GREY_DARK_LINE_COLOR,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 150
    },
    buttonText: {
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_16,
    },
    eventSuggestionView: {
        justifyContent: 'center',
        alignmentItems: 'center',
        paddingVerticle: 15,
        paddingHorizontal: 14,
        borderRadius: 25,
        height: 46,
        marginStart: 16
    },
    buttonContainer: {
        position: 'absolute',
        top: -5,
        right: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 1,
        padding: 10

    },
});

export default AddEventsModal;
