import React from 'react';
import NumericInput from 'react-native-numeric-input';

export default function AmountInput({
  value,
  seted,
}: {
  value: number;
  seted: Function;
}) {
  return (
    <>
      <NumericInput
        iconSize={10}
        value={value}
        onChange={event => seted(event)}
        minValue={1}
        maxValue={20}
        valueType="real"
        type="up-down"
        rounded
        textColor="#000000"
        totalWidth={74}
        totalHeight={50}
        upDownButtonsBackgroundColor="#040fa7"
        iconStyle={{color: '#FDCC4E'}}
        borderColor="#040fa7"
      />
    </>
  );
}
