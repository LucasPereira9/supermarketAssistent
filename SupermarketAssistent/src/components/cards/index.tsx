/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */

import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import MaskInput from 'react-native-mask-input';
import Modal from 'react-native-modal';

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
  const {getItem, mergeItem} = useAsyncStorage('@supermarketAssistent');
  const [finished, setFinished] = useState(false);
  const [editable, setEditable] = useState(false);
  const [editedValue, setEditedValue] = useState(data.value);

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
          <Text
            style={{
              color: '#000',
              padding: 10,
              minWidth: '38%',
              fontFamily: 'Literata-Italic-VariableFont_opsz,wght',
            }}>
            {data.unity}
          </Text>
          <Text
            style={{
              color: '#000',
              padding: 10,
              fontFamily: 'Literata-Italic-VariableFont_opsz,wght',
            }}>
            {data.amount}
          </Text>
          <Text
            style={{
              color: '#000',
              padding: 10,
              width: '30%',
              fontFamily: 'Literata-Italic-VariableFont_opsz,wght',
            }}>
            R$ {editedValue}
          </Text>
        </View>

        <TouchableOpacity style={{top: '2%', right: '27%'}} onPress={onPress}>
          <Icon name="trash-2" size={24} color="#040fa7" />
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={editable}
        children={
          <>
            <MaskInput
              placeholderTextColor={'#00000083'}
              value={String(editedValue)}
              keyboardType="numeric"
              onChangeText={masked => {
                String(setEditedValue(Number(masked)));
              }}
              mask={[/\d/, /\d/, '.', /\d/, /\d/]}
            />
            <TouchableOpacity
              onPress={() => {
                setEditable(false);
                mergeItem(data.id);
              }}>
              <Text style={{color: '#040fa7', fontSize: 20}}>Salvar</Text>
            </TouchableOpacity>
          </>
        }
      />
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
