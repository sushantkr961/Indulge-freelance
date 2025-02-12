import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert, ActivityIndicator, FlatList, Image, } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { colors } from '../../Utils/Constant/Colors';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import AddEventsModal from '../../Components/AddEventsModal';
import { AddEventObject, DeleteEventObject, NewEventObject } from './types';
import ListOfSuggestedEventsType from '../../Components/ListOfSuggestedEventsType';
import { addEventsApi, deleteEventsApi, getDayEventsApi, getMonthEventsApi, updateEventsApi } from '../../Service/ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import EventActionMenu from '../../Components/EventActionMenu';
import { EventSuggestedData } from '../../Utils/Constant/Constant';
import { Fonts, FontSize, FontWeight } from '../../Utils/Constant/Fonts';
import CalendarCard from './CalendarCard';
import NextRoundSvg from '../../../assets/svg/NextRoundSvg'
import PreviousRoundSvg from '../../../assets/svg/PreviousRoundSvg'
import NotificationIconSvg from '../../../assets/svg/NotificationIconSvg';
import FilterSvg from '../../../assets/svg/FilterSvg';
import PlusButton from '../../../assets/svg/PlusButton';

// Define locale config if needed
LocaleConfig.locales['en'] = {
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthNamesShort: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'],
};

LocaleConfig.defaultLocale = 'en';

const CalenderScreen = () => {
    const currentDate = moment().format('YYYY-MM-DD');
    const currentDateForDisplay = moment();
    const [storedPhoneNumber, setStoredPhoneNumber] = useState('');
    const [eventsList, setEventsList] = useState([]);
    const [filteredEventsList, setFilteredEventsList] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const navigation = useNavigation();

    const [eventsMonthList, setEventsMonthList] = useState({});
    const [EventsMonthListForShow, setEventsMonthListForShow] = useState([]);
    // Function to convert array of events into the desired format
    const convertToEventsMonthList = (events: any) => {
        const eventsMonthList: any = {};

        events.forEach((event: any) => {
            const date = new Date(event.date);
            const formattedDate = date.toISOString().split('T')[0]; // Extracting YYYY-MM-DD format

            eventsMonthList[formattedDate] = {
                // dots: [renderDot()],
                marked: true,
                dotColor: colors.YELLO_THEME_COLOR,
                // disableTouchEvent: false // Assuming you want to disable touch event for all dates
            };
        });

        return eventsMonthList;
    };

    const [selectedDate, setSelectedDate] = useState(currentDate);
    const [dayOfMonth, setDayOfMonth] = useState(currentDateForDisplay.format('DD'));
    const [monthFullName, setMonthFullName] = useState(currentDateForDisplay.format('MMMM'));
    const [monthNo, setMonthNo] = useState(currentDateForDisplay.format('MM'));
    const [year, setYear] = useState(currentDateForDisplay.format('YYYY'));
    const [loading, setLoading] = useState<boolean>(false);
    const [eventSaveModalVisible, setEventsSaveModalVisible] = useState<boolean>(false)
    const [eventItem, setEventItem] = useState<AddEventObject>()

    useEffect(() => {
        const getPhoneNumber = async () => {
            try {
                const storedNumber = await AsyncStorage.getItem('phoneNumber');
                if (storedNumber !== null) {
                    setStoredPhoneNumber(storedNumber);
                    getDayEvents(currentDate, storedNumber);
                    await getMonthEvents(moment(currentDate).format('MM'), storedNumber)
                }
            } catch (error) {
                console.error('Error retrieving phone number:', error);
            }
        };
        getPhoneNumber();
    }, []);
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const handleDayPress = async (dayObj: any) => {

        const { day, month, year } = dayObj
        const monthName = monthNames[month - 1]
        setDayOfMonth(day)
        setMonthFullName(monthName)
        setMonthNo(month)
        setYear(year)
        setSelectedDate(dayObj.dateString);
        setSelectedType('')
        setEventItem({})
        const formattedDate = new Date(dayObj.dateString).toISOString().split('T')[0];
        await getDayEvents(formattedDate, storedPhoneNumber);
        await getMonthEvents(month, storedPhoneNumber)
    };
    const handleCurrentDay = async (selectedDate: any) => {
        const [year, month, day] = selectedDate.split("-");
        const monthName = monthNames[month - 1]
        setDayOfMonth(day)
        setMonthFullName(monthName)
        setMonthNo(month)
        setYear(year)
        setSelectedDate(selectedDate);
        await getDayEvents(selectedDate, storedPhoneNumber);
        await getMonthEvents(month, storedPhoneNumber)
    }
    const getColorByName = (eventName: string) => {
        const event = EventSuggestedData.find((event: any) => event.name.toLowerCase() === eventName.toLowerCase());
        return event ? event.color : colors.YELLO_THEME_COLOR;
    };
    const renderItem = ({ item }: any) => <CalendarCard item={item}
        getColorByName={getColorByName}
        deleteEvent={deleteEvent}
        editEvent={editEvent}
    />

    const getDayEvents = async (day: string, storedNumber: any) => {
        try {
            setLoading(true)
            const response = await getDayEventsApi(day, { "mobile_no": Number(storedNumber) })
            if (response) {
                setEventsList(response)
                setLoading(false)
                setEventsSaveModalVisible(false)
            } else {
                throw new Error(`Failed to fetch events ${response?.message}`);
            }
        } catch (error) {
            setLoading(false)
            setEventsSaveModalVisible(false)
            Alert.alert("Error", `${error}`);
        }
    }

    const getMonthEvents = async (month_no: any, storedNumber: any) => {
        try {
            setLoading(true)
            const response = await getMonthEventsApi({ "mobile_no": storedNumber, "month": month_no })
            type Event = {
                date: string;
                eventId: number;
                note: string;
                reminderTime: number;
                time: string;
                title: string;
                type: string;
            };

            // Sort and set the state
            const sortedEvents: Event[] = response.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            setEventsMonthListForShow(sortedEvents)

            if (response) {
                const eventsMonthList = await convertToEventsMonthList(response);
                setEventsMonthList(eventsMonthList)
                setLoading(false)
                setEventsSaveModalVisible(false)
            } else {
                throw new Error(`Failed to fetch events ${response?.message}`);
            }
        } catch (error) {
            setLoading(false)
            setEventsSaveModalVisible(false)
            Alert.alert("Error", `${error}`);
        }
    }
    const onAddEventsSave = async (addEventObj: AddEventObject) => {
        const { type, title, date, remindMe, notes, time } = addEventObj
        const bodyOBJ: AddEventObject & NewEventObject = {
            "mobile_no": [Number(storedPhoneNumber)],
            "type": type,
            "title": title,
            "date": date,
            "reminderTime": remindMe,
            "note": notes,
            "time": time
        }
        try {
            setLoading(true)
            const response = await addEventsApi(bodyOBJ)
            if (response?.message) {
                setLoading(false)
                setEventsSaveModalVisible(false)
                Alert.alert("Event added successfully");
                handleCurrentDay(date)
            } else {
                throw new Error('Failed to add event');
            }
        } catch (error) {
            setLoading(false)
            setEventsSaveModalVisible(false)
            Alert.alert("Error", "error");
        }
    }
    const onEditEventsUpdate = async (updateEventObj: AddEventObject) => {
        setLoading(true)
        setEventItem({})
        const { type, title, date, remindMe, notes, time, eventId } = updateEventObj
        const bodyOBJ: AddEventObject = {
            "mobile_no": Number(storedPhoneNumber),
            "type": type,
            "title": title,
            "date": date,
            "reminderTime": remindMe,
            "note": notes,
            "time": time,
            "eventId": eventId
        }
        try {
            const response = await updateEventsApi(bodyOBJ)
            if (response?.message == "Event updated successfully") {
                setLoading(false)
                setEventsSaveModalVisible(false)
                Alert.alert("Event updated successfully");
                handleCurrentDay(date)
            } else {
                throw new Error('Failed to update event');
            }
        } catch (error) {
            setLoading(false)
            setEventsSaveModalVisible(false)
            Alert.alert("Error", `${error}`);
        }
    }
    const deleteEvent = async (item: any) => {
        setLoading(true)
        setEventsList([])
        const bodyOBJ: DeleteEventObject = {
            "mobile_no": Number(storedPhoneNumber),
            "eventId": item.eventId
        }
        try {
            setLoading(true)
            const response = await deleteEventsApi(bodyOBJ)
            if (response?.message == "Event deleted successfully") {
                setLoading(false)
                await getDayEvents(new Date(item.date).toISOString().split('T')[0], storedPhoneNumber)
            } else {
                throw new Error('Failed to add event');
            }
        } catch (error) {
            setLoading(false)
            Alert.alert("Error", "error");
        }
    }
    const editEvent = (item: AddEventObject) => {
        setEventItem(item)
        setEventsSaveModalVisible(true)
    }

    const filterEventsBasedOnType = (selectedType: any) => {
        setSelectedType(selectedType)
        const filteredArray = EventsMonthListForShow.filter(event => event.type === selectedType);
        setFilteredEventsList(filteredArray);
    }
    const onAddEventsPress = () => {
        setEventItem({})
        setEventsSaveModalVisible(true)
    }
    const onNotificationPress = () => {
        navigation.navigate('CalendarNotifications' as never)
    }
    const opendrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer());

    }
    // Function to handle month change
    const handleMonthChange = (c_Month: any) => {
        const { day, month, year } = c_Month
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        const monthName = monthNames[month - 1]
        setDayOfMonth(day)
        setMonthFullName(monthName)
        setMonthNo(month)
        setYear(year)
        setSelectedDate(c_Month.dateString);
        setSelectedType('')
        getMonthEvents(month, storedPhoneNumber)
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={opendrawer}>
                    <Image
                        source={require('../../../assets/screen/Indulge_LOGO_ONLY.png')}
                        style={styles.logoProfile}
                    />
                </TouchableOpacity>

                <View style={styles.textContainer}>
                    <Text style={styles.currentYear}>{year}</Text>
                    <Text style={styles.currentDate}>{dayOfMonth} {monthFullName}</Text>
                </View>
                {/* <TouchableOpacity style={styles.addButton} onPress={onAddEventsPress}>
                    <Image
                        source={require('../../../assets/screen/Close.png')}
                        style={styles.logo}
                    />
                </TouchableOpacity> */}
                <TouchableOpacity style={styles.addButton} onPress={onNotificationPress}>
                    <NotificationIconSvg />
                </TouchableOpacity>
            </View>
            <View style={{}}>
                <Calendar
                    pagingEnabled={true}
                    enableSwipeMonths={true}
                    // hideArrows={true}
                    renderHeader={(date: any) => {
                        return <View>
                            <Text style={styles.currentDate}> </Text>
                        </View>
                    }}
                    onDayPress={handleDayPress}
                    onMonthChange={handleMonthChange}
                    markedDates={{
                        [selectedDate]: { selected: true, selectedColor: colors.YELLO_THEME_COLOR },
                        ...eventsMonthList
                    }}
                    theme={{
                        calendarBackground: colors.BLACK_BACKGROUND_COLOR,
                        todayTextColor: colors.YELLO_THEME_COLOR, // Current day text color
                        dayTextColor: colors.WHITE_COLOR, // Default day text color
                        textDisabledColor: colors.GREY_FONT_FONT_COLOR,
                        textDayFontSize: FontSize.F_16,
                        textDayFontFamily: Fonts.REGULAR,
                        textDayFontWeight: FontWeight.F_W_300,
                        agendaDayTextColor: colors.WHITE_COLOR,
                        textDayHeaderFontFamily: Fonts.REGULAR,
                        textDayHeaderFontSize: FontSize.F_16,
                        textDayHeaderFontWeight: FontWeight.F_W_300,
                        textDayStyle: { color: colors.WHITE_COLOR }
                    }}
                    renderArrow={(direction) => (
                        direction === 'left' ? <PreviousRoundSvg /> : <NextRoundSvg />
                    )}
                // leftArrowImageSource={require('../../../assets/screen/Logo_Icon_Concierge_screen.png')}
                />
            </View>
            <View style={{ flex: 1, zIndex: 0 }}>
                <ListOfSuggestedEventsType eventSuggestionView={styles.eventSuggestionView} onPressType={(typeSelected: string) => filterEventsBasedOnType(typeSelected)} />
                <LinearGradient
                    colors={['#272727', '#373737']}
                    style={styles.eventLinereGradientMainView}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <View style={styles.verticleViewStyle} />
                    <Text style={styles.yourScheduleText}>
                        Your Schedule
                    </Text>
                    {(selectedType ? filteredEventsList.length > 0 : EventsMonthListForShow.length > 0)
                        ?
                        <FlatList
                            data={selectedType ? filteredEventsList : EventsMonthListForShow}
                            showsVerticalScrollIndicator={false}
                            renderItem={renderItem}
                            keyExtractor={(item: any) => item.eventId}
                            extraData={(item: any) => item.eventId}
                        />
                        :
                        <View style={{
                            flex: 1,
                        }}>
                            {loading ?
                                <ActivityIndicator size="large" color={colors.YELLO_THEME_COLOR} />
                                :
                                <Text style={styles.eventNameText}>
                                    No {selectedType} Events found.
                                </Text>}
                        </View>
                    }
                    <TouchableOpacity style={styles.buttonContainer} onPress={onAddEventsPress}>
                        {/* <Image
                            source={require('../../../assets/screen/Close.png')}
                            style={styles.logo}
                        /> */}
                        <PlusButton />
                    </TouchableOpacity>
                </LinearGradient>
            </View>
            <AddEventsModal
                eventItem={eventItem}
                eventSaveModalVisible={eventSaveModalVisible}
                setEventsSaveModalVisible={setEventsSaveModalVisible}
                onAddEventsSave={onAddEventsSave}
                loading={loading}
                setLoading={setLoading}
                onEditEventsUpdate={onEditEventsUpdate}
            />

        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BLACK_BACKGROUND_COLOR
    },
    linearGradientMainView: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10
    },
    linearGradientView1: {
        flex: 0.6,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
        marginEnd: -10
    },
    linearGradientNotesView: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        // borderTopLeftRadius: 16,
        // borderBottomLeftRadius: 16,
        // marginEnd: -10
    },
    linearGradientNotesView0: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
        padding: 10
    },
    linearGradientNotesView1: {
        flex: 0.6,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
        marginEnd: -10,
    },
    linearGradientView2: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 16
    },
    eventLinereGradientMainView: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 20,
        borderTopRightRadius: 32,
        borderTopLeftRadius: 32,
        paddingHorizontal: 20,
        paddingTop: 20
    },
    eventSuggestionView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 14,
        borderRadius: 25,
        height: 46,
        marginStart: 16,
        marginTop: 30
    },
    eventDateText: {
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_20,
        color: colors.WHITE_COLOR
    },
    eventTimeText: {
        color: colors.GREY_FONT_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_15,
    },
    eventNameText: {
        color: colors.YELLO_THEME_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_18
    },
    eventTypeText: {
        color: colors.GREY_FONT_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_16,
        height: 20
    },
    notesTypeText: {
        color: colors.GREY_FONT_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_16,
        textAlign: 'left'
        // height: 20
    },
    verticleViewStyle: {
        width: 60,
        height: 3,
        backgroundColor: "#566D80",
        alignSelf: 'center'
    },
    yourScheduleText: {
        marginBottom: 10,
        marginTop: 5,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_16,
        color: colors.GREY_FONT_COLOR
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5
    },
    eventItem: {
        borderRadius: 16,
        padding: 20
    },
    actionView: {
        justifyContent: 'space-between'
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 45,
        paddingHorizontal: 20,
        marginTop: 5
    },
    logoProfile: {
        width: 60,
        height: 60,
        resizeMode: 'cover',
        tintColor: colors.WHITE_COLOR
    },
    logoClose: {
        width: 42,
        height: 42,
        resizeMode: 'contain'
    },
    logo: {
        width: 36,
        height: 36,
        resizeMode: 'cover'
    },
    logo1: {
        width: 28,
        height: 32,
        resizeMode: 'cover',
        marginStart: 15
    },
    textContainer: {
        flex: 1,
        paddingHorizontal: 10
    },
    currentYear: {
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_16,
        color: colors.WHITE_COLOR
    },
    currentDate: {
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_20,
        color: colors.WHITE_COLOR
    },
    addButton: {
        paddingStart: 15
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 1,
        borderWidth: 1,
        borderRadius: 100,
        borderColor: colors.GREY_FONT_FONT_COLOR,
        backgroundColor: colors.GREY_FONT_FONT_COLOR,
        shadowColor: colors.GREY_FONT_FONT_COLOR, // Shadow color
        shadowOffset: {
            width: 0, // No horizontal offset
            height: 0, // No vertical offset for even spread
        },
        shadowOpacity: 0.5, // Adjust visibility
        shadowRadius: 10, // Increase to create a wide spread
        elevation: 10, // For Android, increase elevation for spread
    },


});

export default CalenderScreen;
