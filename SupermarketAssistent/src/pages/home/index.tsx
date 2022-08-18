/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useState} from 'react';
import {
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  View,
  Alert,
} from 'react-native';
import {Container, TabContainer, SelectValue} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {Card, CardProps} from '../../components/cards';
import {useFocusEffect} from '@react-navigation/native';
import ClearModal from '../../components/modal/clearItemsModal';
import uuid from 'uuid/v4';
import HomeHeader from '../../components/homeHeader';
import LottieView from 'lottie-react-native';
import AmountInput from '../../components/numericInput';
import MoneyInput from '../../components/moneyInput';
import InputText from '../../components/textInput';

export default function Home() {
  const [unity, setUnity] = useState('');
  const [value, setValue] = useState<any>('');
  const [amount, setAmount] = useState<Number>(1);

  const [total, setTotal] = useState<Number>(0);
  const [itemsInTheBag, setItemsInTheBag] = useState(0);
  const [clearmodal, setClearModal] = useState<Boolean>(false);
  const [itensContainer, setItensContainer] = useState<CardProps[]>([]);
  const [selectedValue, setSelectedValue] = useState(true);
  const [changePrice, setChangePrice] = useState(false);

  const emptyBag = itemsInTheBag < 2;

  const {getItem, setItem, removeItem} = useAsyncStorage(
    '@supermarketAssistent',
  );
  const multiply = Number(value) * Number(amount);
  const fixed = parseFloat(String(multiply));
  let result = String(fixed).substr(0, 5);

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
      const data = [NewItem, ...previousItens];

      await setItem(JSON.stringify(data));

      result = '0';
      setUnity('');
      setValue('');
      setAmount(1);
    } catch (error) {
      console.log(error);
      Alert.alert('deu ruim');
    }
  }

  async function handleAddItem() {
    try {
      const response = await getItem();

      const data = response ? JSON.parse(response) : [];
      setItensContainer(data);
      setItemsInTheBag(data.length);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRemove(id: string) {
    const response = await getItem();
    const previousItens = response ? JSON.parse(response) : [];
    const data = previousItens.filter((item: CardProps) => item.id !== id);
    setItem(JSON.stringify(data));
    setItensContainer(data);
    handleTotal();
  }

  async function handleRemoveAll() {
    await removeItem();
    setItensContainer([]);
    setItemsInTheBag(0);
    setTotal(0);
    setClearModal(false);
  }
  async function handleTotal() {
    try {
      const response = await getItem();
      const previousItens = response ? JSON.parse(response) : [];
      if (previousItens.length === 0) {
        setTotal(0);
      }
      const data = previousItens.map((item: CardProps) => item.value);
      var number = 0;
      for (var i = 0; i < data.length; i++) {
        number = number += parseFloat(data[i]);
        const transform = number.toString();
        const result = transform.substr(0, 6);
        const decimalResult = transform.substr(0, 5);

        if (transform.length < 4) {
          setTotal(Number(decimalResult));
        }
        if (transform.length > 4) {
          setTotal(Number(result));
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      handleAddItem();
    }, [handleAddItem]),
  );

  return (
    <Container>
      <StatusBar backgroundColor={'#040fa7'} />

      <HomeHeader />

      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          width: '100%',
        }}>
        <Text />
        <Text style={{padding: 4}}>
          {itemsInTheBag === 0
            ? 'sacola está vazia'
            : itemsInTheBag === 1
            ? `temos ${itemsInTheBag} item na sacola`
            : `temos ${itemsInTheBag} itens na sacola`}
        </Text>
      </View>
      <View style={styles.CardView}>
        <View
          style={[
            styles.CardView,
            {
              height: 115,
              backgroundColor: '#FDCC4E',
              width: '100%',
              borderRadius: 6,
            },
          ]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{minWidth: '22%', maxWidth: '27%'}}>
              <InputText value={unity} seted={setUnity} />
            </View>

            <MoneyInput value={value} seted={setValue} />

            <View style={{left: 22}}>
              <AmountInput value={amount} seted={setAmount} />
            </View>

            <SelectValue>
              <TouchableOpacity
                style={{width: '100%'}}
                onPress={() => {
                  setSelectedValue(true);
                }}>
                <Text
                  style={[
                    styles.selectValueInput,
                    {backgroundColor: selectedValue ? '#040fa7' : '#FDCC4E'},
                  ]}>
                  Unitário {'\n'} {changePrice ? null : value}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{width: '100%'}}
                onPress={() => {
                  setValue(result);
                  setChangePrice(true);
                  setSelectedValue(false);
                }}>
                <Text
                  style={[
                    styles.selectValueInput,
                    {
                      backgroundColor: selectedValue ? '#FDCC4E' : '#040fa7',
                    },
                  ]}>
                  Multi. {'\n'} {changePrice ? value : result}
                </Text>
              </TouchableOpacity>
            </SelectValue>

            <TouchableOpacity
              style={{left: 40, top: 6}}
              onPress={() => handleMoreItens()}>
              <Icon name="plus-square" size={30} color="#040fa7" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <FlatList
        data={itensContainer}
        keyExtractor={item => item.id}
        style={{minWidth: '40%', minHeight: '20%'}}
        contentContainerStyle={{minWidth: '40%', minHeight: '20%'}}
        renderItem={({item}) => (
          <Card data={item} onPress={() => handleRemove(item.id)} />
        )}
      />

      <TabContainer>
        <Text style={[styles.headerText, {bottom: 26}]}>VALOR TOTAL: </Text>
        <Text style={[styles.headerText, {bottom: 26}]}>R$ {total}</Text>
        <TouchableOpacity
          onPress={() => handleTotal()}
          style={{
            maxHeight: '40%',
            bottom: 20,
          }}>
          <LottieView
            style={{
              height: '78%',
              left: 5,
            }}
            source={require('../../assets/animations/reload.json')}
            autoPlay
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            emptyBag ? null : setClearModal(true);
          }}
          style={[
            styles.clean,
            {backgroundColor: emptyBag ? '#ccc' : '#FDCC4E'},
          ]}>
          <Text>Finalizar compra</Text>
        </TouchableOpacity>
      </TabContainer>
      <ClearModal
        visible={clearmodal}
        close={() => {
          setClearModal(false);
        }}
        remove={() => {
          handleRemoveAll();
        }}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
  },

  clean: {
    width: '40%',
    height: '30%',
    position: 'absolute',
    bottom: 19,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  CardView: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectValueInput: {
    textAlign: 'center',
    color: '#fff',
    borderRadius: 4,
    padding: 4,
  },
});
