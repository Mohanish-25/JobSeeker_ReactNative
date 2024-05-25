import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './EmployerCard.style';
import { useNavigation } from '@react-navigation/native';
import Linkedin from '../../../../assets/icons/linkedin.png'
import Logo from '../../../../assets/logo.png'
import { router, useRouter } from 'expo-router';
const EmployerCard = ({ job }) => {
    const router = useRouter();
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles.container} onPress={() => {
            console.log(job.id);
            // router.push(`/employer/${job.id}`);

            navigation.navigate('employer/[id]', { id: job.id })
        }
        }
        >
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