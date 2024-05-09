import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, navigate to the main app screen
        navigation.navigate("home");
      } else {
        // User is signed out, navigate to the auth screen
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
    <Stack initialRouteName="auth">
      <Stack.Screen options={{ header: () => null }} name="auth" />
    </Stack>
  );
};

export default Layout;
