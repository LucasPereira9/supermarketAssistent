/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */

import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
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
    console.log('daata', data);
    setFinished(!finished);
  }
  return (
    <View style={{minWidth: '100%'}}>
      <TouchableOpacity onPress={() => handleFinished(data.id)}>
        <Icon name={finished ? 'left' : 'down'} size={60} color="#cc0000" />
      </TouchableOpacity>
      <View>
        <Text style={{color: '#000'}}>{data.unity}</Text>
        <Text style={{color: '#000'}}>{data.value}</Text>
        <Text style={{color: '#000'}}>{data.amount}</Text>
      </View>

      <TouchableOpacity onPress={onPress}>
        <Icon name="delete" size={22} color="#888D97" />
      </TouchableOpacity>
    </View>
  );
}