import { doc, collection, getDocs, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase"; // assuming you have a firebase config file
import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
// import styles from "../components/common/cards/nearby/nearbyjobcard.style";
import { checkImageURL } from "../utils";
import { Stack, useRouter } from "expo-router";
import { ScreenHeaderBtn } from "../components";
import { COLORS, icons } from "../constants";
import { deleteDoc } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";

const LikedJobsScreen = () => {
  const [likedJobs, setLikedJobs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchLikedJobs();
  }, []);

  const fetchLikedJobs = async () => {
    const userId = auth.currentUser.uid;
    const likedJobsRef = collection(db, `likedJobs/${userId}/jobs`);
    const likedJobsSnapshot = await getDocs(likedJobsRef);
    const likedJobsList = likedJobsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setLikedJobs(likedJobsList);
  };

  return (
    <>
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
      <View style={styles.container}>
        <FlatList
          data={likedJobs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <>
              <TouchableOpacity
                style={styles.jobItem}
                onPress={async () => {
                  const jobRef = doc(db, "jobs", item.id);
                  const jobSnapshot = await getDoc(jobRef);
                  if (jobSnapshot.exists()) {
                    router.push(`/employer/${item.id}`);
                  } else {
                    router.push(`/job-details/${item.job_id}`);
                  }
                }}
              >
                {/* <Image
                  source={{
                    uri:
                      item.jobLogo !== "logo here"
                        ? item.jobLogo
                        : "https://www.kindpng.com/picc/m/78-785827_user-profile-avatar",
                  }}
                  style={{ width: 50, height: 50 }}
                /> */}
                <View>
                  <Text style={styles.jobTitle}>{item.jobTitle}</Text>
                  <Text style={styles.employerName}>{item.employerName}</Text>
                  <Text style={styles.employerName}>{item.jobCountry}</Text>
                </View>
                <TouchableOpacity
                  onPress={async () => {
                    const userId = auth.currentUser.uid;
                    const likedJobRef = doc(
                      db,
                      `likedJobs/${userId}/jobs`,
                      item.id
                    );
                    await deleteDoc(likedJobRef);
                    // Fetch the updated list of liked jobs
                    fetchLikedJobs();
                  }}
                >
                  <Ionicons name="trash-outline" size={24} color="red" />
                </TouchableOpacity>
              </TouchableOpacity>
            </>
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f8f8f8",
  },
  jobItem: {
    backgroundColor: "#fff",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  employerName: {
    fontSize: 16,
    color: "#888",
  },
});

export default LikedJobsScreen;
