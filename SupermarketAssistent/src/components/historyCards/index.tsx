/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */

import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export type HistoryProps = {
  id: string;
  date: string;
  value: string;
  time: string;
  Comment: string;
};
type Props = {
  data: HistoryProps;
  onPress: () => void;
};

export function HistoryCard({data, onPress}: Props) {
  return (
    <View style={styles.CardView}>
      <View
        style={[
          styles.CardView,
          {
            backgroundColor: '#FDCC4E',
            width: '100%',
            borderRadius: 20,
          },
        ]}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              color: '#000',
              padding: 10,
              width: '33%',
              fontFamily: 'Literata-Italic-VariableFont_opsz,wght',
            }}>
            {data.date}
          </Text>
          <Text
            style={{
              color: '#000',
              padding: 10,
              width: '30%',
              fontFamily: 'Literata-Italic-VariableFont_opsz,wght',
            }}>
            {data.time}
          </Text>
          <Text
            style={{
              color: '#000',
              padding: 10,
              fontFamily: 'Literata-Italic-VariableFont_opsz,wght',
            }}>
            R$ {data.value} {'\n'}
          </Text>
          <Text
            style={{
              color: '#000',
              padding: 10,
              fontFamily: 'Literata-Italic-VariableFont_opsz,wght',
            }}>
            {data.Comment}
          </Text>
        </View>

        <TouchableOpacity style={{top: '2%', right: '27%'}} onPress={onPress}>
          <Icon name="trash-2" size={24} color="#040fa7" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  CardView: {
    minWidth: '80%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
