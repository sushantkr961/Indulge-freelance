import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { Fonts, FontSize } from '../../Utils/Constant/Fonts';
import { colors } from '../../Utils/Constant/Colors';
import EventActionMenu from '../../Components/EventActionMenu';

const CalendarCard = ({
    item,
    getColorByName,
    deleteEvent,
    editEvent
}: any) => {
    const [isNoteVisible, setIsNoteVisible] = useState(false);

    const toggleNoteVisibility = () => {
        setIsNoteVisible(!isNoteVisible);
    };
    return (<>
        <View style={styles.linearGradientMainView}>
            <LinearGradient
                colors={['#373737', 'rgba(55, 55, 55, 0)']}
                style={styles.linearGradientView1}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={styles.eventItem}>
                    <Text style={styles.eventDateText}>{new Date(item.date).toLocaleString('en', { day: '2-digit' })} {new Date(item.date).toLocaleString('en', { weekday: 'short' })}</Text>
                    <Text style={styles.eventTimeText}>{item.time}</Text>
                </View>
            </LinearGradient>
            <LinearGradient
                colors={['#373737', 'rgba(55, 55, 55, 0)']}
                style={styles.linearGradientView2}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={styles.eventItem}>
                    <TouchableOpacity onPress={toggleNoteVisibility}>
                        <Text numberOfLines={1} style={[styles.eventNameText, { color: getColorByName(item.type) }]}>
                            {item.title}
                        </Text>
                        <Text style={styles.eventTypeText} numberOfLines={1}>
                            {item.note}
                        </Text>
                    </TouchableOpacity>

                </View>
                <EventActionMenu
                    item={item} deleteEvent={deleteEvent}
                    editEvent={editEvent}
                    isNoteVisible={isNoteVisible}
                    toggleNoteVisibility={toggleNoteVisibility}
                />
            </LinearGradient>
        </View>
        {isNoteVisible && (<View style={styles.linearGradientNotesView}>

            {/* <View style={styles.linearGradientNotesView1} /> */}
            <LinearGradient
                colors={['#373737', 'rgba(55, 55, 55, 0)']}
                style={styles.linearGradientNotesView0}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <Text style={styles.notesTypeText}>{item.note}</Text>
            </LinearGradient>
        </View>
        )}
    </>
    )
}

export default CalendarCard

const styles = StyleSheet.create({
    linearGradientMainView: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10
    },
    linearGradientView1: {
        flex: 0.5,
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
        padding: 15
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
    },
    eventItem: {
        flex: 1,
        borderRadius: 16,
        padding: 20
    }
});
