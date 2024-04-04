import { StyleSheet, Dimensions } from "react-native";

import { COLORS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "flex-end",
    flex: 1,
    alignItems: "center",
    // marginTop: 22
  },
  modalView: {
    width: Dimensions.get('window').width,
    backgroundColor: 'grey',
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,

  },
  openButton: {
    backgroundColor: "white",
    // borderRadius: 20,
    padding: 10,
    // elevation: 2,
    marginBottom: 10,
    width: Dimensions.get('window').width,
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  },

  btnContainer: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small / 1.25,
    justifyContent: "center",
    alignItems: "center",
  },
  btnImg: (dimension) => ({
    width: dimension,
    height: dimension,
    borderRadius: SIZES.small / 1.25,
  }),
  // overlay: {
  //   flex: 1,
  //   backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
  //   justifyContent: 'flex-end',
  //   alignItems: 'center',
  // },
});

export default styles;
