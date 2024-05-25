import { View, Text } from "react-native";

import styles from "./about.style";

const About = ({ info, title = "About the Job" }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headText}>{title}</Text>

      <View style={styles.contentBox}>
        <Text style={styles.contextText}>{info}</Text>
      </View>
    </View>
  );
};

export default About;
