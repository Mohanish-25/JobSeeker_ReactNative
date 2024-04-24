import React, { useState } from 'react';
import { Image, TouchableOpacity, Modal, View, Text, TouchableHighlight, TouchableWithoutFeedback } from "react-native";
import styles from "./screenheader.style";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ScreenHeaderBtn = ({ iconUrl, dimension, handlePress, options, showModal }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const handleButtonPress = () => {
    if (showModal) {
      setModalVisible(true);
    } else {
      handlePress();
    }
  };
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={[styles.centeredView, styles.overlay]}>
            <View style={styles.modalView}>
              {showModal && options && options.map((option, index) => (
                <TouchableHighlight
                  key={index}
                  style={{ ...styles.openButton }}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    option.action();
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <MaterialCommunityIcons name={option.icon} size={36} color="white" />
                    <Text style={styles.textStyle}>{option.label}</Text>
                  </View>
                </TouchableHighlight>
              ))}
            </View>
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