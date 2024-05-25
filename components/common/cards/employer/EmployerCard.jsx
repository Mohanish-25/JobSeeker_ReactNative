import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './EmployerCard.style';
import { useNavigation } from '@react-navigation/native';
import Linkedin from '../../../../assets/icons/linkedin.png'
import Logo from '../../../../assets/logo.png'
const EmployerCard = ({ job }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('employer/EmployerCreatedJobs')}>
            <View style={styles.cardsContainer}>
                <TouchableOpacity style={styles.logoContainer}>
                    <Image
                        source={Logo}
                        style={styles.logoImage}
                        resizeMode='contain'
                    />
                </TouchableOpacity>

                <View>
                    <Text style={styles.companyName} numberOfLines={1}>
                        {job.companyName}
                    </Text>
                    <View style={styles.infoContainer}>
                        <Text style={styles.jobRole} numberOfLines={1}>
                            {job.jobRole}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default EmployerCard;