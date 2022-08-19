/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LottieView from 'lottie-react-native';

export default function TabContainer({
  Total,
  setTotal,
  bag,
  setModal,
}: {
  Total: number;
  setTotal: () => void;
  bag: boolean;
  setModal: () => void;
}) {
  return (
    <View style={styles.Container}>
      <Text style={[styles.headerText, {bottom: 26}]}>VALOR TOTAL: </Text>
      <Text style={[styles.headerText, {bottom: 26}]}>R$ {Total}</Text>
      <TouchableOpacity
        onPress={setTotal}
        style={{
          maxHeight: '40%',
          bottom: 20,
        }}>
        <LottieView
          style={{
            height: '78%',
            left: 5,
          }}
          source={require('../../assets/animations/reload.json')}
          autoPlay
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={setModal}
        style={[styles.clean, {backgroundColor: bag ? '#ccc' : '#FDCC4E'}]}>
        <Text>Finalizar compra</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    minWidth: '100%',
    height: '16%',
    backgroundColor: '#040fa7',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
  },
  clean: {
    width: '40%',
    height: '30%',
    position: 'absolute',
    bottom: 19,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
});
