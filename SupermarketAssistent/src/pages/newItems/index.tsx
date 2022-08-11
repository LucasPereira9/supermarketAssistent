/* eslint-disable react-native/no-inline-styles */

import React, {useState} from 'react';
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
      setUnity('');
      setAmount(1);
      setValue('');

      await setItem(JSON.stringify(data));
      Alert.alert('Sucesso', 'Item adicionado com sucesso');
    } catch (error) {
      console.log(error);
      Alert.alert('deu ruim');
    }
  }
  const multiply = Number(value) * amount;
  const fixed = parseFloat(String(multiply));
  const result = String(fixed).substr(0, 5);
  return (
    <Container>
      <HeaderForm />
      <View style={styles.Container}>
        <TextInput
          style={styles.Input}
          placeholder="ITEM"
          onChangeText={setUnity}
          placeholderTextColor={'#00000083'}
          keyboardType="default"
        />
        <MaskInput
          style={styles.Input}
          placeholderTextColor={'#00000083'}
          value={value}
          keyboardType="numeric"
          onChangeText={masked => {
            setValue(masked);
          }}
          mask={
            value.length > 3
              ? [/\d/, /\d/, '.', /\d/, /\d/]
              : [/\d/, '.', /\d/, /\d/]
          }
        />
        <NumericInput
          value={amount}
          onChange={event => setAmount(event)}
          minValue={1}
          maxValue={20}
          valueType="real"
          type="plus-minus"
          rounded
          textColor="#fff"
          iconStyle={{color: '#000000'}}
          rightButtonBackgroundColor="#FDCC4E"
          leftButtonBackgroundColor="#FDCC4E"
        />
        <Text style={{textAlign: 'center', padding: 16, color: '#fff'}}>
          valor total multiplicado {'\n'} {result}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleMoreItens();
          }}>
          <Text style={{color: '#000000'}}>ADICIONAR</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  Container: {
    top: '14%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#040fa7',
    height: '45%',
    width: '80%',
    borderRadius: 10,
  },
  Input: {
    color: '#000',
    width: '60%',
    height: '16%',
    marginBottom: 10,
    backgroundColor: '#FDCC4E',
    borderRadius: 16,
    textAlign: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    height: '14%',
    borderRadius: 8,
    backgroundColor: '#FDCC4E',
  },
});
