import React from "react";
import { StyleSheet, Text, View } from "react-native";
import BottomBar from "../../components/BottomBar";
import { useNavigation } from "@react-navigation/native";

function employerProfile(props) {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <Text>Hi this is Profile screen screen</Text>
      <BottomBar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: "black",
    textAlign: "center",
  },
});
export default employerProfile;
