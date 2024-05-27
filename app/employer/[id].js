import { useRoute } from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Share,
  Text,
  View,
} from "react-native";
import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import { showToast } from "../../utils";
import { auth, db } from "../firebase";

const tabs = ["About", "Qualifications", "Responsibilities"];

function EmployerCreatedJobs({}) {
  const router = useRouter();
  const route = useRoute();
  const { id } = route.params;
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const docRef = doc(db, "jobs", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setJob(docSnap.data());
          const userId = auth.currentUser.uid;
          const jobDocRef = doc(db, `likedJobs/${userId}/jobs`, id);
          const jobDocSnap = await getDoc(jobDocRef);

          if (jobDocSnap.exists()) {
            setIsLiked(true);
          } else {
            setIsLiked(false);
          }
        } else {
          setError("No such document!");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  const handleLike = async () => {
    const userId = auth.currentUser.uid;
    const jobDocRef = doc(db, `likedJobs/${userId}/jobs`, job.id);
    const jobDocSnap = await getDoc(jobDocRef);

    if (jobDocSnap.exists()) {
      // The job is already liked, so we don't do anything
      console.log("Job already liked");
      setIsLiked(true);
      showToast("Job is already liked");
    } else {
      const jobDetailsObject = {
        jobTitle: job.jobRole,
        employerName: job.companyName,
        jobCountry: "India",
        jobLogo: "logo here",
        jobId: job.id,
        type: "employer",
      };
      await setDoc(jobDocRef, jobDetailsObject);
      setIsLiked(true);
    }
  };

  const displayTabContent = () => {
    switch (activeTab) {
      case "Qualifications":
        return (
          <>
            {/* <Specifics
              title="Qualifications"
              points={job.qualifications ?? ["N/A"]}
            /> */}
            <JobAbout
              title="Qualifications for Job"
              info={job.qualifications ?? "No data provided"}
            />
          </>
        );

      case "About":
        return <JobAbout info={job.about ?? "No data provided"} />;

      case "Responsibilities":
        return (
          <>
            {/* <Specifics
              title="Responsibilities"
              points={job.responsibilities ?? ["N/A"]}
            /> */}
            <JobAbout
              title={"Responsibilities"}
              info={job.responsibilities ?? "No data provided"}
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
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
                  const jobLink = job.job_google_link;
                  Share.share({
                    message: `Check out this job:\n Link here`,
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
        <ScrollView showsVerticalScrollIndicator={false}>
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : job === null ? (
            <Text>No data available</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={job.employer_logo}
                jobTitle={job.jobRole}
                companyName={job.companyName}
                location={job.job_country}
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
          url={"https://careers.google.com/jobs/results/"}
          onLike={handleLike}
          isLiked={isLiked}
        />
      </SafeAreaView>
    </>
  );
}

export default EmployerCreatedJobs;
