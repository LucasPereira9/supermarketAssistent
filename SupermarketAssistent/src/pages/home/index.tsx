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
import {Container, SelectValue} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {Card, CardProps} from '../../components/cards';
import {useFocusEffect} from '@react-navigation/native';
import ClearModal from '../../components/modal/clearItemsModal';
import uuid from 'uuid/v4';
import HomeHeader from '../../components/homeHeader';
import MoneyInput from '../../components/moneyInput';
import InputText from '../../components/textInput';
import TabContainer from '../../components/TabContainer';

export default function Home() {
  const [unity, setUnity] = useState('');
  const [value, setValue] = useState<any>('');
  const [amount, setAmount] = useState('');

  const [total, setTotal] = useState<number>(0);
  const [itemsInTheBag, setItemsInTheBag] = useState(0);
  const [clearmodal, setClearModal] = useState<boolean>(false);
  const [itensContainer, setItensContainer] = useState<CardProps[]>([]);
  const [selectedValue, setSelectedValue] = useState(true);
  const [changePrice, setChangePrice] = useState(false);

  const emptyBag = itemsInTheBag < 2;
  const empty =
    unity === '' || value === '' || value.length < 5 || amount === '';

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
      setAmount('1');
      setChangePrice(false);
      setSelectedValue(true);
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
            ? 'A sacola está vazia'
            : itemsInTheBag === 1
            ? `${itemsInTheBag} item na sacola`
            : `${itemsInTheBag} itens na sacola`}
        </Text>
      </View>
      <View style={styles.CardView}>
        <View
          style={[
            styles.CardView,
            {
              height: 135,
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
            <View style={{width: '18%', right: 18}}>
              <InputText
                type={'default'}
                Text={'Item'}
                value={unity}
                setFunction={setUnity}
              />
            </View>

            <MoneyInput value={value} seted={setValue} />

            <View style={{width: '17%', left: 10}}>
              <InputText
                type={'numeric'}
                Text={'Quant.'}
                value={String(amount)}
                setFunction={setAmount}
              />
            </View>

            <SelectValue>
              <TouchableOpacity
                style={{width: '100%'}}
                onPress={() => {
                  setSelectedValue(true);
                  setChangePrice(false);
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
                  selectedValue ? setValue(result) : null;
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
                  Multiplicado {'\n'} {changePrice ? value : result}
                </Text>
              </TouchableOpacity>
            </SelectValue>

            <TouchableOpacity
              style={{left: 50, top: 6}}
              onPress={() => {
                empty ? null : handleMoreItens();
              }}>
              <Icon
                name="plus-square"
                size={30}
                color={empty ? '#727070' : '#040fa7'}
              />
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

      <TabContainer
        Total={total}
        setTotal={() => handleTotal()}
        bag={emptyBag}
        setModal={() => (emptyBag ? null : setClearModal(true))}
      />

      <ClearModal
        visible={clearmodal}
        onPressOut={() => {
          setClearModal(false);
        }}
        onPressDelete={() => handleRemoveAll()}
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
