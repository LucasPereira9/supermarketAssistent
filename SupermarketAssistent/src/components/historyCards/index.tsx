/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */

import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';

export type HistoryProps = {
  id: string;
  date: string;
  value: string;
  time: string;
};
type Props = {
  data: HistoryProps;
  onPress: () => void;
};

export function HistoryCard({data, onPress}: Props) {
  const {getItem} = useAsyncStorage('@supermarketAssistent');
  const [finished, setFinished] = useState(false);

  async function handleFinished(id: string) {
    const response = await getItem();
    const previousItens = response ? JSON.parse(response) : [];
    const data = previousItens.filter((item: HistoryProps) => item.id !== id);
    setFinished(!finished);
  }

  return (
    <View style={styles.CardView}>
      <View
        style={[
          styles.CardView,
          {
            backgroundColor: finished ? '#4dd831ae' : '#FDCC4E',
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
            R$ {data.value}
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
