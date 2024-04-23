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

export default function SignInScreen() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth();
  const navigation = useNavigation();

  const onSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setEmail("");
        setPassword("");
        navigation.reset({
          index: 0,
          routes: [{ name: "home" }], // Replace 'Home' with the name of your home screen
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setEmail("");
        setPassword("");
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
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        textContentType="emailAddress"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        textContentType="password"
      />

      {isSignUpMode ? (
        <>
          <TouchableOpacity style={styles.btn} onPress={onSignUp}>
            <Text style={styles.btnText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsSignUpMode(false)}>
            <Text style={styles.switchText2}>Already registered?</Text>
            <Text style={styles.switchText}>Sign in instead</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity style={styles.btn} onPress={onSignIn}>
            <Text style={styles.btnText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsSignUpMode(true)}>
            <Text style={styles.switchText2}>Not registered?</Text>
            <Text style={styles.switchText}>Sign up instead</Text>
          </TouchableOpacity>
        </>
      )}
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
});
