import { Stack, useRouter, useSearchParams } from "expo-router";
import { useCallback, useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";
import { Share } from "react-native";
const tabs = ["About", "Qualifications", "Responsibilities"];
import { collection, addDoc, getDoc, setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase"; // assuming you have a firebase config file
import { showToast } from "../../utils";

const JobDetails = () => {
  const params = useSearchParams();
  const router = useRouter();
  const userId = auth.currentUser.uid;

  const { data, isLoading, error, refetch } = useFetch("job-details", {
    job_id: params.id,
  });
  const [err, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      const docRef = doc(db, "jobs", userId);
      const docSnap = await getDoc(docRef);
      try {
        if (docSnap.exists()) {
          setJob(docSnap.data());
          const userId = auth.currentUser.uid;
          const jobDocRef = doc(db, `likedJobs/${userId}/jobs`, userId);
          const jobDocSnap = await getDoc(jobDocRef);
          if (jobDocSnap.exists()) {
            setIsLiked(true);
          } else {
            setIsLiked(false);
          }
        } else {
          setError("No such document!", err.message);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchJobDetails();
  }, [userId]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);

  const displayTabContent = () => {
    switch (activeTab) {
      case "Qualifications":
        return (
          <Specifics
            title="Qualifications"
            points={data[0].job_highlights?.Qualifications ?? ["N/A"]}
          />
        );

      case "About":
        return (
          <JobAbout info={data[0].job_description ?? "No data provided"} />
        );

      case "Responsibilities":
        return (
          <Specifics
            title="Responsibilities"
            points={data[0].job_highlights?.Responsibilities ?? ["N/A"]}
          />
        );

      default:
        return null;
    }
  };

  const handleLike = async () => {
    const userId = auth.currentUser.uid;
    const jobDocRef = doc(db, `likedJobs/${userId}/jobs`, data[0].job_id);
    const jobDocSnap = await getDoc(jobDocRef);

    if (jobDocSnap.exists()) {
      // The job is already liked, so we don't do anything
      showToast("Job is already liked");
    } else {
      const jobDetailsObject = {
        jobTitle: data[0].job_title,
        employerName: data[0].employer_name,
        jobCountry: data[0].job_country,
        jobLogo: data[0].employer_logo,
        jobId: data[0].job_id,
      };
      await setDoc(jobDocRef, jobDetailsObject);
      setIsLiked(true);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
              showModal={false}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={icons.share}
              dimension="60%"
              handlePress={() => {
                const jobLink = data[0]?.job_google_link;
                Share.share({
                  message: `Check out this job:\n ${jobLink}`,
                  url: jobLink,
                  // You can also add a URL to share
                  // url: '<job link here>'
                });
              }}
              showModal={false}
            />
          ),
          headerTitle: "",
        }}
      />

      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data.length === 0 ? (
            <Text>No data available</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                location={data[0].job_country}
              />

              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {displayTabContent()}
            </View>
          )}
        </ScrollView>

        <JobFooter
          url={
            data[0]?.job_google_link ??
            "https://careers.google.com/jobs/results/"
          }
          onLike={handleLike}
          isLiked={isLiked}
        />
      </>
    </SafeAreaView>
  );
};

export default JobDetails;
