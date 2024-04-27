import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
// import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();

// export const unstable_settings = {
//   // Ensure any route can link back to `/`
//   initialRouteName: "auth",
// };

const Layout = () => {
  const [fontsLoaded] = useFonts({
    DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
  });

  const navigation = useNavigation();

  useEffect(() => {
    const auth = getAuth();

    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(
          doc(collection(db, "employers"), user.uid)
        );
        const userData = userDoc.data();
        if (userData && userData.role === "employer") {
          navigation.navigate("employer/employerHome");
        } else {
          navigation.navigate("home");
        }
      } else {
        navigation.navigate("auth");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [navigation]);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color={"#fff"} />;
  }

  return (
    <Stack>
      <Stack.Screen options={{ header: () => null }} name="auth" />
    </Stack>
  );
};

export default Layout;
