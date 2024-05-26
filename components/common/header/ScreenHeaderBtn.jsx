import React, { useEffect, useState } from 'react';
import { Animated, Image, Modal, Text, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from "./screenheader.style";

const ScreenHeaderBtn = ({ iconUrl, dimension, handlePress, options, showModal }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const handleButtonPress = () => {
    if (showModal) {
      setModalVisible(true);
    } else {
      handlePress();
    }
  };
  const [modalAnimatedValue] = useState(new Animated.Value(-500)); // Assuming -500 is off the left of the screen

  useEffect(() => {
    Animated.timing(modalAnimatedValue, {
      toValue: modalVisible ? 0 : -500,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [modalVisible]);

  return (
    <View>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.overlay}>
            <Animated.View style={{ transform: [{ translateX: modalAnimatedValue }], ...styles.centeredView, ...styles.overlay }}>
              <View style={styles.modalView}>
                {showModal && options && options.map((option, index) => (
                  <TouchableHighlight
                    key={index}
                    underlayColor={'#f0f0f0'}
                    style={{ ...styles.openButton }}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      option.action();
                    }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                      <MaterialCommunityIcons name={option.icon} size={30} color="black" />
                      <Text style={styles.textStyle}>{option.label}</Text>
                    </View>
                  </TouchableHighlight>
                ))}
              </View>
            </Animated.View>
          </View>

        </TouchableWithoutFeedback>
      </Modal>

      <TouchableOpacity
        style={styles.btnContainer}
        onPress={handleButtonPress}
      >
        <Image
          source={iconUrl}
          resizeMode='cover'
          style={styles.btnImg(dimension)}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ScreenHeaderBtn;