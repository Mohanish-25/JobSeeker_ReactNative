import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import {
  Company,
  JobAbout,
  JobTabs,
  Specifics,
  JobFooter,
  ScreenHeaderBtn,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import { useRoute } from "@react-navigation/native";
import { Stack } from "expo-router";
import { Share } from "react-native";
import { useRouter } from "expo-router";

const tabs = ["About", "Qualifications", "Responsibilities"];

function EmployerCreatedJobs({}) {
  const router = useRouter();
  const route = useRoute();
  const { id } = route.params;
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const docRef = doc(db, "jobs", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setJob(docSnap.data());
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
      </SafeAreaView>
    </>
  );
}

export default EmployerCreatedJobs;
