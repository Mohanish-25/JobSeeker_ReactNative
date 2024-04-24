import React, { useState } from "react";
import { Button, TextInput, View, StyleSheet, Text } from "react-native";
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

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

export default function SignInScreen() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const auth = getAuth();
  const navigation = useNavigation();

  const onSignIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
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
              icon={"email"}
              placeholder={"Enter your Email"}
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
            <TouchableOpacity>
              <MaterialCommunityIcons
                name={"google"}
                size={24}
                style={styles.signIcon}
              />
            </TouchableOpacity>

            {isSignUpMode ? (
              <>
                <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                  <Text style={styles.btnText}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsSignUpMode(false)}>
                  <Text style={styles.switchText2}>Already registered?</Text>
                  <Text style={styles.switchText}>Sign in instead</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                  <Text style={styles.btnText}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsSignUpMode(true)}>
                  <Text style={styles.switchText2}>Not registered?</Text>
                  <Text style={styles.switchText}>Sign up instead</Text>
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
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
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
