import { useNavigation } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { auth, db } from "../../app/firebase";
import BottomBar from "../../components/BottomBar";
import { COLORS } from "../../constants";

function employerProfile(props) {
  const navigation = useNavigation();
  const [employerData, setEmployerData] = useState(null);

  useEffect(() => {
    const fetchEmployerData = async () => {
      const docRef = doc(db, "employers", auth.currentUser.uid); // replace "users" with the name of your collection
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setEmployerData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchEmployerData();
  }, []);

  return (
    <>
      <View style={styles.container}>
        {employerData && (
          <View style={styles.infoContainer}>
            <Text style={styles.text}>Email: {employerData.email}</Text>
            <Text style={styles.text}>
              Company Name: {employerData.companyName}
            </Text>
            <Text style={styles.text}>
              Location: {employerData.companyLocation}
            </Text>
          </View>
        )}
      </View>
      <BottomBar navigation={navigation} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: COLORS.lightWhite,
  },
  infoContainer: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    color: COLORS.white,
    marginBottom: 10,
  },
});

export default employerProfile;
