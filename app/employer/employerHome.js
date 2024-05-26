import { useNavigation } from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import profileIcon from "../../assets/icon2.png";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "../../components";
import BottomBar from "../../components/BottomBar";
import EmployerJobs from "../../components/home/employerJobs/EmployerJobs";
import { COLORS, icons, SIZES } from "../../constants";
import { showToast } from "../../utils";
import Toast from "react-native-toast-message";

const employerHome = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const navigation = useNavigation();
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
      }
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (!isSignedIn) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.menu}
              dimension="60%"
              options={[
                {
                  label: "Employer Profile",
                  icon: "account",
                  action: () => navigation.navigate("employer/employerProfile"),
                },
                {
                  label: "Saved Jobs",
                  icon: "content-save",
                  action: () => navigation.navigate("likedJobs"),
                },
                {
                  label: "About Us",
                  icon: "information",
                  action: () => navigation.navigate("about"),
                },
                {
                  label: "Settings",
                  icon: "wrench",
                  action: () => showToast("Settings Coming Soon"),
                },
                {
                  label: "Logout",
                  icon: "exit-to-app",
                  action: () => {
                    const auth = getAuth();
                    signOut(auth)
                      .then(() => {
                        // Sign-out successful.

                        console.log("User signed out");
                        // navigation.navigate("auth");
                      })
                      .catch((error) => {
                        // An error happened.
                        console.log("Error signing out: ", error);
                      });
                  },
                },
              ]}
              showModal={true}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={profileIcon}
              dimension="100%"
              options={[]}
              showModal={false}
              handlePress={() => showToast("Profile Coming Soon")}
            />
          ),
          headerTitle: "",
        }}
      />
      <View style={{ flex: 1, flexDirection: "column" }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingBottom: 60 }}
        >
          <View
            style={{
              flex: 1,
              padding: SIZES.medium,
            }}
          >
            <Welcome
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              handleClick={() => {
                if (searchTerm) {
                  router.push(`/search/${searchTerm}`);
                }
              }}
            />

            <Popularjobs />
            <EmployerJobs />
            <Nearbyjobs />
          </View>
          <Toast />
        </ScrollView>
        <BottomBar navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

export default employerHome;
