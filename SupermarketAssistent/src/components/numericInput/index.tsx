import React from 'react';
import NumericInput from 'react-native-numeric-input';
import theme from '../../global/styles/theme';

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
        upDownButtonsBackgroundColor={theme.colors.primary}
        iconStyle={{color: theme.colors.secundary}}
        borderColor={theme.colors.primary}
      />
    </>
  );
}
