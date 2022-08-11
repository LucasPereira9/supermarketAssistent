/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */

import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
export type CardProps = {
  id: string;
  unity: string;
  value: number;
  amount: number;
};
type Props = {
  data: CardProps;
  onPress: () => void;
};

export function Card({data, onPress}: Props) {
  const {getItem} = useAsyncStorage('@supermarketAssistent');
  const [finished, setFinished] = useState(false);

  async function handleFinished(id: string) {
    const response = await getItem();
    const previousItens = response ? JSON.parse(response) : [];
    const data = previousItens.filter((item: CardProps) => item.id !== id);
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
        <TouchableOpacity onPress={() => handleFinished(data.id)}>
          <Icon
            name={finished ? 'check-square' : 'square'}
            size={40}
            color={finished ? '#2bff00' : '#040fa7'}
          />
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: '#000', padding: 10, width: '41%'}}>
            {data.unity}
          </Text>
          <Text style={{color: '#000', padding: 10}}>{data.amount}</Text>
          <Text style={{color: '#000', padding: 10, width: '36%'}}>
            R$ {data.value} und.
          </Text>
        </View>

        <TouchableOpacity style={{top: '2%', right: '48%'}} onPress={onPress}>
          <Icon name="trash-2" size={22} color="#888D97" />
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
