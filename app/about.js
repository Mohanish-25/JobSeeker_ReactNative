import { Stack, useRouter } from "expo-router";
import React from "react";
import { Linking, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { ScreenHeaderBtn } from "../components";
import { COLORS, icons } from "../constants";

function About(props) {
  const router = useRouter();
  const developers = [
    {
      name: "Kapil Badokar",
      social: "https://www.linkedin.com/in/kapil-badokar/",
      about: "This is .",
    },
    {
      name: "Mohanish Desale",
      social: "https://www.linkedin.com/in/mohanish-desale/",
      about: "This is Mohanish Desale.",
    },
    {
      name: "Chinmay Rathod",
      social: "https://www.linkedin.com/in/chinmayy19/",
      about: "This is Developer 3.",
    },
  ];

  const appSocialLinks = [
    {
      name: "Facebook",
      url: "https://facebook.com/app",
      type: "font-awesome",
      icon: "facebook",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/app",
      type: "font-awesome",
      icon: "twitter",
    },
    //  more social links as needed
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerTitle: "",
        }}
      />

      <Text style={styles.title}>About</Text>
      <Text numberOfLines={0} style={styles.paragraph}>
        Welcome to JobCentral, your ultimate destination for simplified job
        searching!{"\n"}At JobCentral, we believe in making the job search
        process effortless and efficient for users worldwide.{"\n"}Our
        centralized platform aggregates job listings from various sources,
        providing you with a comprehensive database of opportunities.{"\n"}
        Whether you're a seasoned professional or a fresh graduate, JobCentral
        offers intuitive features, personalized recommendations, and seamless
        navigation to help you find your dream job.
      </Text>

      <Text style={styles.subtitle}>Developers</Text>
      {developers.map((dev, index) => (
        <View key={index} style={styles.devContainer}>
          <Text style={styles.devName}>{dev.name}</Text>
          {/* <Text style={styles.devAbout}>{dev.about}</Text> */}
          <Icon
            name="linkedin-square"
            type="font-awesome"
            size={28}
            color={"blue"}
            onPress={() => Linking.openURL(dev.social)}
            style={{ marginRight: 10 }}
          />
        </View>
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 23,
    marginBottom: 10,
    textAlign: "center",
  },
  devContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightWhite,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    height: 50,
    // backgroundColor: "#f0f0f0",
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.3,
    // shadowRadius: 2,
    elevation: 1,
  },
  devName: {
    fontSize: 18,
    flex: 1,
    marginRight: 10,
  },
  devAbout: {
    fontSize: 14,
    marginBottom: 10,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  paragraph: {
    fontSize: 17,
    fontWeight: "400",
    marginBottom: 20,
    textAlign: "left",
    backgroundColor: COLORS.lightWhite,
    padding: 10,
  },
});
export default About;
