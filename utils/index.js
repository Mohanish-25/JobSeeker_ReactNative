import Toast from "react-native-toast-message";

export const checkImageURL = (url) => {
  if (!url) return false;
  else {
    const pattern = new RegExp(
      "^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp)$",
      "i"
    );
    return pattern.test(url);
  }
};

export const showToast = (message) => {
  console.log("showToast", message);
  Toast.show({
    position: "top",
    topOffset: 10,
    text2: "",
    type: "info",
    text1: message,
    visibilityTime: 2000,
    autoHide: true,
    swipeable: true,
    autoHide: true,
    text1Style: {
      fontSize: 16,
      color: "black",
      fontWeight: "800",
      backgroundColor: "white",
    },
  });
};
