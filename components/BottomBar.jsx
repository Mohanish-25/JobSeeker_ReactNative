import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants';

const BottomBar = ({ navigation }) => {
    const route = useRoute();

    const handlePress = (screenName) => {
        navigation.navigate(screenName);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => handlePress('employer/employerHome')}>
                <View style={styles.iconContainer}>
                    <AntDesign name="home" size={28} color={route.name === 'employer/employerHome' ? 'black' : 'grey'} />
                    <Text style={styles.text}>Home</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress('employer/createJobs')}>
                <View style={styles.iconContainer}>
                    <MaterialIcons name="create" size={28} color={route.name === 'employer/createJobs' ? 'black' : 'grey'} />
                    <Text style={styles.text}>Create Job</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress('employer/employerProfile')}>
                <View style={styles.iconContainer}>
                    <AntDesign name="user" size={28} color={route.name === 'employer/employerProfile' ? 'black' : 'grey'} />
                    <Text style={styles.text}>Profile</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        position: 'absolute', // Add this line
        bottom: 0, // And this line
        justifyContent: 'space-around',
        padding: 8,
        backgroundColor: COLORS.lightWhite,
        width: '100%',
    },
    text: {
        fontSize: 18,
    },
    iconContainer: {
        alignItems: 'center',
    },
});

export default BottomBar;