import { StyleSheet } from "react-native";

import { FONT, SIZES, COLORS, SHADOWS } from "../../../../constants";

const styles = StyleSheet.create({
  cardsContainer: {
    marginTop: SIZES.small,
  },
  container: {
    width: 200,
    padding: SIZES.medium,
    backgroundColor: "#FFF",
    borderRadius: SIZES.medium,
    justifyContent: "space-between",
    ...SHADOWS.medium,
    shadowColor: COLORS.gray,
  },
  logoContainer: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: 80,
    height: 80,
  },
  companyName: {
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
    color: "#B3AEC6",
    marginTop: SIZES.xSmall / 1.5,
  },
  infoContainer: {
    marginTop: SIZES.small,
  },
  jobName: (selectedJob, item) => ({
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: selectedJob === item.job_id ? COLORS.white : COLORS.primary,
  }),
  infoWrapper: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  publisher: (selectedJob, item) => ({
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: selectedJob === item.job_id ? COLORS.white : COLORS.primary,
  }),
  location: {
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
  },
});

export default styles;
