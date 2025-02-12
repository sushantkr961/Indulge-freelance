import React, { useState } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Menu } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../Utils/Constant/Colors';

const EventActionMenu = ({
	item, deleteEvent, editEvent,
	isNoteVisible, toggleNoteVisibility
}: any) => {
	const [visible, setVisible] = useState(false);
	const closeMenu = () => setVisible(false);
	const openMenu = () => setVisible(true);
	return (
		<View style={styles.container}>
			<Menu
				visible={visible}
				onDismiss={closeMenu}
				anchor={
					<TouchableOpacity onPress={openMenu}>
						<MaterialCommunityIcons name="dots-vertical" size={35} color={colors.GREY_FONT_COLOR} />
					</TouchableOpacity>
				}
			>
				<Menu.Item
					onPress={() => {
						closeMenu()
						toggleNoteVisibility()
					}}
					title={isNoteVisible ? "Hide Notes" : "View Notes"}
				/>
				<Menu.Item
					onPress={() => {
						closeMenu()
						editEvent(item)
					}}
					title="Edit"
				/>
				<Menu.Item
					onPress={() => {
						closeMenu()
						deleteEvent(item)
					}}
					title="Delete"
				/>
			</Menu>
		</View>
	);
};

export default EventActionMenu;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center'
	}
});
