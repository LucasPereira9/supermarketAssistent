/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {KeyboardTypeOptions, TextInput} from 'react-native';
import theme from '../../global/styles/theme';

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
          borderBottomColor: theme.colors.primary,
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
