/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text} from 'react-native';

const MyAppText = ({
  textContent,
  styling,
}: {
  textContent: string;
  styling: any;
}) => {
  return (
    <Text style={[styling, {fontFamily: 'RobotoSlab-VariableFont_wght'}]}>
      {textContent}
    </Text>
  );
};

export default MyAppText;
