import { useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, images, SIZES } from "../constants";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "../components";
import { BackHandler } from 'react-native';
import profileIcon from '../assets/icons/kendre.jpg';


const Home = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension='60%' options={[
              { label: 'Saved Jobs', icon: 'content-save', action: () => console.log('Option 1 clicked') },
              { label: 'About Us', icon: 'information', action: () => console.log('Option 2 clicked') },
            ]} showModal={true} />

          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={profileIcon} dimension='100%' options={[
              { label: 'My Profile', icon: 'account', action: () => console.log('Option 3 clicked') },
              { label: 'Exit', icon: 'exit-to-app', action: () => BackHandler.exitApp() },
            ]} showModal={true} />
          ),
          headerTitle: "",
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
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
                router.push(`/search/${searchTerm}`)
              }
            }}
          />

          <Popularjobs />
          <Nearbyjobs />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
