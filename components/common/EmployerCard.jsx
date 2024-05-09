import React from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import styles from "../home/nearby/nearbyjobs.style";
import { COLORS, SIZES, SHADOWS } from "../../constants";
import { useNavigation } from "@react-navigation/native";

const EmployerCard = () => {
    const router = useRouter();
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Employer Jobs </Text>
                <TouchableOpacity disabled>
                    <Text style={styles.headerBtn}>Show all</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.cardsContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('employer/EmployerCreatedJobs')} >
                    <Text>JobRole and Location here</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};


export default EmployerCard;


