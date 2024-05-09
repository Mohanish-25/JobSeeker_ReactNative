import { doc, collection, getDocs } from "firebase/firestore";
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
import { useRouter } from "expo-router";
const LikedJobsScreen = () => {
  const [likedJobs, setLikedJobs] = useState([]);
  const router = useRouter();

  useEffect(() => {
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

    fetchLikedJobs();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={likedJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <>
            <TouchableOpacity
              style={styles.jobItem}
              onPress={() => router.push(`/job-details/${item.job_id} `)}
            >
              <Text style={styles.jobTitle}>{item.jobTitle}</Text>
              <Text style={styles.employerName}>{item.employerName}</Text>
              <Text>{item.jobCountry}</Text>
              <Image
                source={{
                  uri: checkImageURL(item.jobLogo)
                    ? item.jobLogo
                    : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
                }}
              />
            </TouchableOpacity>
          </>
        )}
      />
    </View>
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
