import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

function AppTextInput({ IconComponent, width = "100%", ...otherProps }) {
  return (
    <View style={[styles.container, { width }]}>
      {IconComponent && (
        <View style={styles.icon}>
          <IconComponent />
        </View>
      )}
      <TextInput style={styles.text} {...otherProps} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontSize: 20,
    color: "black",
  },
});

export default AppTextInput;
