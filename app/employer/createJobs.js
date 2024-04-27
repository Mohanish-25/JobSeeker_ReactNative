import React from "react";
import { Text, View } from "react-native";
import BottomBar from "../../components/BottomBar";
import { useNavigation } from "@react-navigation/native";

function createJobs() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <Text>Hi this is create jobs screen</Text>
      <BottomBar navigation={navigation} />
    </View>
  );
}

export default createJobs;
