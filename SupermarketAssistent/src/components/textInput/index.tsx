/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {KeyboardTypeOptions, TextInput} from 'react-native';

export default function InputText({
  value,
  setFunction,
  Text,
  type,
}: {
  value: string;
  setFunction: Function;
  Text: string;
  type: KeyboardTypeOptions;
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
        onChangeText={string => {
          setFunction(string);
        }}
        placeholderTextColor={'#00000083'}
        keyboardType={type}
      />
    </>
  );
}
