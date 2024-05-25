import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './EmployerCard.style';
import { useNavigation } from '@react-navigation/native';
import Linkedin from '../../../../assets/icons/linkedin.png'
const EmployerCard = ({ job }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.cardsContainer}>
                <TouchableOpacity>
                    <Image
                        source={Linkedin}
                        style={styles.companyLogo}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('employer/EmployerCreatedJobs')}>
                    <View>
                        <Text style={styles.companyName} numberOfLines={1}>
                            'Company Name'
                        </Text>
                        <View style={styles.infoContainer}>
                            <Text style={styles.jobRole} numberOfLines={1}>
                                {job.jobRole}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default EmployerCard;