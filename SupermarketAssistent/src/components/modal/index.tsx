/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';

export default function NewItemodal({
  isVisible,
  close,
  item,
  setItem,
  value,
  setValue,
  amount,
  setAmount,
}: {
  amount: string;
  setAmount: any;
  value: string;
  setValue: any;
  item: string;
  setItem: any;
  isVisible: any;
  close: any;
}) {
  return (
    <Modal
      style={{justifyContent: 'center', alignItems: 'center'}}
      isVisible={isVisible}
      animationIn={'zoomInDown'}
      animationOut={'zoomOutUp'}
      animationInTiming={1000}
      animationOutTiming={800}
      backdropTransitionInTiming={1000}
      backdropTransitionOutTiming={1100}
      children={
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#837d7d',
            height: '60%',
            width: '80%',
            borderRadius: 10,
          }}>
          <TextInput
            style={styles.Input}
            placeholder="ITEM"
            value={item}
            onChangeText={setItem}
            placeholderTextColor={'#00000050'}
            returnKeyType={'next'}
            keyboardType="default"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.Input}
            placeholder="VALOR"
            value={value}
            onChangeText={setValue}
            placeholderTextColor={'#000000'}
            returnKeyType={'next'}
            keyboardType="numeric"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.Input}
            placeholder="QUANTIDADE"
            value={amount}
            onChangeText={setAmount}
            placeholderTextColor={'#000000'}
            returnKeyType={'next'}
            keyboardType="numeric"
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={close}>
            <Text>FECHAR</Text>
          </TouchableOpacity>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  Input: {
    width: '60%',
    height: '24%',
    padding: '10%',
    marginBottom: 10,
    backgroundColor: '#ffffff',
    alignSelf: 'center',
  },
});
