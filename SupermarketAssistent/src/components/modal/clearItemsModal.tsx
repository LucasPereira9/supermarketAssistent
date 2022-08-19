/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';

const ClearModal = ({
  visible,
  onPressOut,
  onPressDelete,
}: {
  onPressDelete: () => void;
  onPressOut: () => void;
  visible: boolean;
}) => {
  return (
    <Modal
      isVisible={visible}
      animationIn={'zoomInDown'}
      animationOut={'zoomOutUp'}
      animationInTiming={1000}
      animationOutTiming={800}
      backdropTransitionInTiming={1000}
      backdropTransitionOutTiming={1100}
      children={
        <View
          style={{
            width: '100%',
            height: '22%',
            backgroundColor: '#040fa7',
            borderRadius: 10,
          }}>
          <Text style={{textAlign: 'center', padding: 26, color: '#fff'}}>
            Você está prestes a limpar sua lista de compras {'\n'}e esta ação
            não pode ser desfeita!
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableOpacity onPress={onPressOut} style={styles.button}>
              <Text>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressDelete} style={styles.button}>
              <Text>Prosseguir</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
    />
  );
};
export default ClearModal;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FDCC4E',
    width: '30%',
    height: 30,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
