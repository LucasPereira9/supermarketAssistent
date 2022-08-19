/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import MaskInput from 'react-native-mask-input';

export default function MoneyInput({
  value,
  seted,
}: {
  value: string;
  seted: Function;
}) {
  return (
    <>
      <MaskInput
        style={{
          width: '16%',
          borderBottomWidth: 1,
          borderBottomColor: '#040fa7',
          textAlign: 'center',
          bottom: 6,
          right: 6,
        }}
        placeholder="R$"
        placeholderTextColor={'#00000083'}
        value={value}
        keyboardType="numeric"
        onChangeText={masked => {
          seted(masked);
        }}
        mask={[/\d/, /\d/, '.', /\d/, /\d/]}
      />
    </>
  );
}
