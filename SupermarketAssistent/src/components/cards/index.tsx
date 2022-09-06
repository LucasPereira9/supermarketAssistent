/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */

import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import MyAppText from '../myAppText/text';
import theme from '../../global/styles/theme';

export type CardProps = {
  id: string;
  unity: string;
  value: number;
  amount: number;
};
type Props = {
  data: CardProps;
  onPress: () => void;
  onEdit: () => void;
};

export function Card({data, onPress, onEdit}: Props) {
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
            backgroundColor: finished ? '#4dd831ae' : theme.colors.secundary,
            width: '100%',
            borderRadius: 20,
          },
        ]}>
        <TouchableOpacity onPress={() => handleFinished(data.id)}>
          <Icon
            name={finished ? 'check-square' : 'square'}
            size={40}
            color={finished ? '#2bff00' : theme.colors.primary}
          />
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <MyAppText
            styling={{
              color: '#000',
              padding: 10,
              minWidth: '38%',
              maxWidth: '50%',
            }}
            textContent={data.unity}
          />

          <MyAppText
            styling={{
              color: '#000',
              padding: 10,
            }}
            textContent={String(data.amount)}
          />

          <MyAppText
            styling={{
              color: '#000',
              padding: 10,
              width: '30%',
            }}
            textContent={String(`R$ ${data.value}`)}
          />
        </View>

        <TouchableOpacity style={{top: '2%', right: '67%'}} onPress={onEdit}>
          <Icon name="edit" size={24} color={theme.colors.tertiary} />
        </TouchableOpacity>

        <TouchableOpacity style={{top: '2%', right: '27%'}} onPress={onPress}>
          <Icon name="trash-2" size={24} color={theme.colors.tertiary} />
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
