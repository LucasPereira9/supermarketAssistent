/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {Modal, Portal, Button, Provider} from 'react-native-paper';

const ClearModal = ({
  visible,
  onPressOut,
  onPressDelete,
}: {
  onPressDelete: () => void;
  onPressOut: () => void;
  visible: boolean;
}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  return (
    <>
      <Modal visible={visible} onDismiss={onPressOut}>
        <Text>Example Modal. Click outside this area to dismiss.</Text>
      </Modal>
    </>
  );
};
export default ClearModal;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FDCC4E',
    minWidth: '30%',
    padding: 6,
    height: 30,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
});
