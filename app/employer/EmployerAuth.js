import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Formik } from "formik";
import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Yup from "yup";
import ErrorMessage from "../../components/ErrorMessage";
import AppTextInput from "../../components/AppTextInput";
import { COLORS } from "../../constants";
import { Stack, useRouter } from "expo-router";
import { collection, doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import Logo from "../../assets/logo.png";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
  companyName: Yup.string().label("Company Name"),
  companyLocation: Yup.string().label("Company Location"),
});

export default function SignInScreen() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const db = getFirestore();
  const auth = getAuth();
  const navigation = useNavigation();

  const onSignIn = (email, password) => {
    try {
      console.log("doingSignIn" + email + password);
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log("happening" + email + password);
          navigation.navigate("employer/employerHome");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const onSignUp = async (email, password, companyName, companyLocation) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        try {
          setDoc(doc(collection(db, "employers"), user.uid), {
            email: email,
            companyName: companyName,
            companyLocation: companyLocation,
            role: "employer",
          });
        } catch (e) {
          console.log(e);
        }

        navigation.reset(navigation.navigate("employer/employerHome"));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logoImg} source={Logo} />
      <Formik
        initialValues={{
          email: "",
          password: "",
          companyName: "",
          companyLocation: "",
        }}
        onSubmit={(values) => {
          try {
            isSignUpMode
              ? onSignUp(
                  values.email,
                  values.password,
                  values.companyName,
                  values.companyLocation
                )
              : onSignIn(values.email, values.password);
          } catch (e) {
            console.log(e);
          }
        }}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleSubmit,
          errors,
          values,
          setFieldTouched,
          touched,
        }) => (
          <>
            <AppTextInput
              icon={"email"}
              placeholder={"Enter your Company Email"}
              textContentType={"emailAddress"}
              onChangeText={handleChange("email")}
              onBlur={() => setFieldTouched("email")}
              value={values.email}
              autoCapitalize={"none"}
            />
            <ErrorMessage visible={touched.email} error={errors.email} />
            <AppTextInput
              icon={"lock"}
              placeholder={"Enter your Password"}
              textContentType={"password"}
              onChangeText={handleChange("password")}
              onBlur={() => setFieldTouched("password")}
              value={values.password}
              secureTextEntry
              autoCapitalize={"none"}
            />
            <ErrorMessage error={errors.password} visible={touched.password} />
            {isSignUpMode ? (
              <>
                <AppTextInput
                  icon={"office-building"}
                  placeholder={"Enter your Company Name"}
                  onChangeText={handleChange("companyName")}
                  onBlur={() => setFieldTouched("companyName")}
                  value={values.companyName}
                  autoCapitalize={"none"}
                />
                <ErrorMessage
                  error={errors.companyName}
                  visible={touched.companyName}
                />
                <AppTextInput
                  icon={"map-marker"}
                  placeholder={"Enter your Country"}
                  onChangeText={handleChange("companyLocation")}
                  onBlur={() => setFieldTouched("companyLocation")}
                  value={values.companyLocation}
                  autoCapitalize={"none"}
                />
                <ErrorMessage
                  error={errors.companyLocation}
                  visible={touched.companyLocation}
                />

                <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                  <Text style={styles.btnText}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.inlineText}
                  onPress={() => setIsSignUpMode(false)}
                >
                  <Text style={styles.switchText2}>Already registered?</Text>
                  <Text style={styles.switchText}> Sign in instead</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                  <Text style={styles.btnText}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.inlineText}
                  onPress={() => setIsSignUpMode(true)}
                >
                  <Text style={styles.switchText2}>Not registered?</Text>
                  <Text style={styles.switchText}> Sign up instead</Text>
                </TouchableOpacity>
              </>
            )}
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  logoImg: {
    width: 250,
    height: 250,
    alignSelf: "center",
    marginBottom: 5,
  },
  locationView: {
    flexDirection: "row",
  },
  locationText: {
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
    fontSize: 20,
    color: "gray",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 16,
  },
  inlineText: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  empText: {
    color: "green",
    textAlign: "center",
    fontSize: 20,
  },
  input: {
    height: 40,
    width: "100%",
    fontSize: 20,
    borderColor: "gray",
    color: "black",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  btn: {
    backgroundColor: COLORS.primary,
    color: "white",
    padding: 10,
    height: 50,
    margin: 10,
    borderRadius: 5,
  },
  btnText: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
  },
  switchText: {
    color: "blue",
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
  },
  switchText2: {
    color: "black",
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
  },
  signIcon: {
    color: COLORS.primary,
    textAlign: "center",
    marginTop: 10,
  },
});
