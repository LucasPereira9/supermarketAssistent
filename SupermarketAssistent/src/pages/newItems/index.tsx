/* eslint-disable react-native/no-inline-styles */

import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import uuid from 'uuid/v4';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {Container} from './styles';
import HeaderForm from '../../components/cardHeader';
import NumericInput from 'react-native-numeric-input';
import MaskInput from 'react-native-mask-input';

export default function NewItems() {
  const [unity, setUnity] = useState('');
  const [value, setValue] = useState('');
  const [amount, setAmount] = useState(1);

  const {getItem, setItem} = useAsyncStorage('@supermarketAssistent');

  async function handleMoreItens() {
    try {
      const id = uuid();
      const NewItem = {
        id,
        unity,
        value,
        amount,
      };
      const response = await getItem();
      const previousItens = response ? JSON.parse(response) : [];
      const data = [...previousItens, NewItem];

      await setItem(JSON.stringify(data));
      Alert.alert('Sucesso', 'Item adicionado com sucesso');
    } catch (error) {
      console.log(error);
      Alert.alert('deu ruim');
    }
  }

  return (
    <Container>
      <HeaderForm />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#837d7d',
          height: '60%',
          width: '80%',
          borderRadius: 10,
        }}>
        <TextInput
          style={styles.Input}
          placeholder="ITEM"
          onChangeText={setUnity}
          placeholderTextColor={'#00000050'}
          keyboardType="default"
        />
        <MaskInput
          value={value}
          onChangeText={masked => {
            setValue(masked);
          }}
          mask={[/\d/, /\d/, '.', /\d/, /\d/]}
        />
        <NumericInput
          value={amount}
          onChange={event => setAmount(event)}
          minValue={1}
          valueType="real"
          type="plus-minus"
          rounded
        />
        <TouchableOpacity
          onPress={() => {
            handleMoreItens();
          }}>
          <Text>CADASTRAR</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  Input: {
    width: '60%',
    height: '24%',
    padding: '10%',
    marginBottom: 10,
    backgroundColor: '#ffffff',
    alignSelf: 'center',
  },
});
