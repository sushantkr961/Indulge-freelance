import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { colors } from '../../../Utils/Constant/Colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import { setProfileNotes } from '../../../StoreRedux/ProfileNotesSlice';
import LinearGradient from 'react-native-linear-gradient';
import { Fonts, FontSize } from '../../../Utils/Constant/Fonts';

const Notes = () => {
    const [notes, setNotes] = useState('');
    const [editMode, setEditMode] = useState(false);
    const { profileNotes } = useSelector((state: any) => state.profileNotes);
    const dispatch = useDispatch();
    const handleSaveNotes = () => {
        // Save the notes (e.g., to a database)
        setEditMode(false); // Exit edit mode
    };
    const setProfileNote = (text: string) => {
        dispatch(setProfileNotes(text));
    };
    return (
        <LinearGradient
            colors={["#1A1A23", 'rgba(26, 26, 35, 0)']}
            style={styles.linearGradient}
            start={{ x: 1, y: 0.1 }}
            end={{ x: 1, y: 1 }}
        >
            <KeyboardAwareScrollView>
                {editMode ? (
                    <View style={styles.editContainer}>
                        <TextInput
                            style={styles.textInput}
                            multiline
                            placeholder='Enter note here...'
                            value={profileNotes}
                            onChangeText={text => setProfileNote(text)}
                            returnKeyType={'done'}
                            focusable={true}
                        />
                        <TouchableOpacity
                            onPress={handleSaveNotes}
                            style={styles.saveButton}
                        >
                            <Text style={styles.saveButtonText}>Save Note</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TouchableOpacity onPress={() => setEditMode(true)} style={styles.noteContainer}>
                        <Text style={styles.noteText}>{`${profileNotes}` || 'Tap to add notes'}</Text>
                    </TouchableOpacity>
                )}
                {!editMode && (
                    <TouchableOpacity onPress={() => setEditMode(true)} style={styles.editIconContainer}>
                        <Feather name="edit" size={24} color={colors.YELLO_THEME_COLOR} />
                    </TouchableOpacity>
                )}
            </KeyboardAwareScrollView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        padding: 10,
    },
    editContainer: {
        flex: 1,
        padding: 10,
    },
    textInput: {
        height: 200,
        backgroundColor: colors.BLUE_DARK_COLOR,
        borderRadius: 5,
        paddingHorizontal: 10,
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_20,
    },
    saveButton: {
        backgroundColor: '#D39F3A',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        padding: 10,
        marginTop: 10,
    },
    saveButtonText: {
        color: colors.BLACK_BACKGROUND_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_18
    },
    noteContainer: {
        margin: 10,
        padding: 10,
        backgroundColor: colors.BLUE_DARK_COLOR,
        borderRadius: 10,
    },
    noteText: {
        marginTop: 25,
        marginBottom: 10,
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_18
    },
    editIconContainer: {
        padding: 10,
        position: 'absolute',
        top: 10,
        right: 10,
    },
});

export default Notes;
