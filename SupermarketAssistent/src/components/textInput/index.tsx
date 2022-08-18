/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TextInput} from 'react-native';

export default function InputText({
  value,
  seted,
  Text,
  type,
}: {
  value: any;
  seted: any;
  Text: any;
  type: any;
}) {
  return (
    <>
      <TextInput
        style={{
          borderBottomWidth: 1,
          borderBottomColor: '#040fa7',
          textAlign: 'center',
          bottom: 6,
          width: '100%',
        }}
        value={value}
        placeholder={Text}
        onChangeText={seted}
        placeholderTextColor={'#00000083'}
        keyboardType={type}
      />
    </>
  );
}
