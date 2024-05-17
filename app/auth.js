import React, { useState } from "react";
import { Button, TextInput, View, StyleSheet, Text, Image } from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, images, SIZES } from "../constants";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Formik } from "formik";
import * as Yup from "yup";
import ErrorMessage from "../components/ErrorMessage";
import AppTextInput from "../components/AppTextInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Logo from "../assets/logo.png";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

export default function SignInScreen() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const auth = getAuth();
  const navigation = useNavigation();

  const onSignIn = async (email, password) => {
    try {
      console.log("doingSignIn" + email + password);
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const docRef = doc(db, "employers", user.uid);
          getDoc(docRef).then((docSnapshot) => {
            if (docSnapshot.exists()) {
              const userData = docSnapshot.data();
              if (userData.role != "employer") {
                auth.signOut();
              } else {
                console.log("You are not an employer");
                navigation.navigate("home");
                // Sign out the user
              }
            } else {
              console.log("No such user!");
              // Sign out the user
              auth.signOut();
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const onSignUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "home" }], // Replace 'Home' with the name of your home screen
        });
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
        }}
        onSubmit={(values) => {
          try {
            isSignUpMode
              ? onSignUp(values.email, values.password)
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
              IconComponent={() => (
                <MaterialCommunityIcons name="email" size={22} color="black" />
              )}
              placeholder={"Enter your Email"}
              textContentType={"emailAddress"}
              onChangeText={handleChange("email")}
              onBlur={() => setFieldTouched("email")}
              value={values.email}
              autoCapitalize={"none"}
            />
            <ErrorMessage visible={touched.email} error={errors.email} />
            <AppTextInput
              IconComponent={() => (
                <MaterialCommunityIcons name="lock" size={22} color="black" />
              )}
              placeholder={"Enter your Password"}
              textContentType={"password"}
              onChangeText={handleChange("password")}
              onBlur={() => setFieldTouched("password")}
              value={values.password}
              secureTextEntry
              autoCapitalize={"none"}
            />
            <ErrorMessage error={errors.password} visible={touched.password} />
            {/* <TouchableOpacity>
              <MaterialCommunityIcons
                name={"google"}
                size={24}
                style={styles.signIcon}
              />
            </TouchableOpacity> */}

            {isSignUpMode ? (
              <>
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
                <Text style={styles.empText}>Or</Text>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => navigation.navigate("employer/EmployerAuth")}
                >
                  <Text style={styles.btnText}>Employer Signup</Text>
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
                <Text style={styles.empText}>Or</Text>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => navigation.navigate("employer/EmployerAuth")}
                >
                  <Text style={styles.btnText}>Employer Login</Text>
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
