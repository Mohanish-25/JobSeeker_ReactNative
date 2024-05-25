import React from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AppTextInput from "../../components/AppTextInput";
import {
  MaterialCommunityIcons,
  AntDesign,
  Feather,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { ScrollView } from "react-native";
import BottomBar from "../../components/BottomBar";
import { useNavigation } from "@react-navigation/native";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../app/firebase";
import { COLORS } from "../../constants";

function createJobs() {
  const navigation = useNavigation();

  const [jobRole, setJobRole] = React.useState("");
  const [qualifications, setQualifications] = React.useState("");
  const [responsibilities, setResponsibilities] = React.useState("");
  const [about, setAbout] = React.useState("");

  const handleSubmit = async () => {
    try {
      const employerDoc = await getDoc(
        doc(db, "employers", auth.currentUser.uid)
      );
      console.log("Employer document data: ", employerDoc.data());
      const companyName = employerDoc.data().companyName;

      const docRef = await addDoc(collection(db, "jobs"), {
        jobRole: jobRole,
        qualifications: qualifications,
        responsibilities: responsibilities,
        about: about,
        employerId: auth.currentUser.uid,
        companyName: companyName,
      });
      const id = docRef.id;
      await updateDoc(docRef, { id: id });
      navigation.navigate("employer/employerHome");
      console.log("Job posted successfully");
    } catch (e) {
      console.error("Error posting job: ", e);
    }
  };

  return (
    <>
      <ScrollView
        style={{ padding: 16 }}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <AppTextInput
          IconComponent={() => <Feather name="user" size={24} color="black" />}
          placeholder={"Enter your Job Role here"}
          onChangeText={setJobRole}
        />
        <AppTextInput
          IconComponent={() => (
            <MaterialCommunityIcons
              name="school-outline"
              size={24}
              color="black"
            />
          )}
          multiline={true}
          placeholder={"Enter your Qualifications here"}
          onChangeText={setQualifications}
        />
        <AppTextInput
          IconComponent={() => (
            <AntDesign name="form" size={24} color="black" />
          )}
          multiline={true}
          placeholder={"Enter your Responsibilities here"}
          onChangeText={setResponsibilities}
        />
        <AppTextInput
          IconComponent={() => (
            <SimpleLineIcons name="info" size={24} color="black" />
          )}
          multiline={true}
          placeholder={"Enter your About here"}
          onChangeText={setAbout}
        />
        <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
      <BottomBar navigation={navigation} />
    </>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: COLORS.primary,
    color: "white",
    padding: 10,
    height: 50,
    borderRadius: 5,
    marginBottom: 50,
  },
  btnText: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
  },
});

export default createJobs;
