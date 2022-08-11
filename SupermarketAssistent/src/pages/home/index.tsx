/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  View,
  Image,
} from 'react-native';
import {Container, AddItems, Header} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {Card, CardProps} from '../../components/cards';
import {useFocusEffect} from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();
  const [total, setTotal] = useState(0);
  const [itemsInTheBag, setItemsInTheBag] = useState(0);

  const [itensContainer, setItensContainer] = useState<CardProps[]>([]);

  const {getItem, setItem} = useAsyncStorage('@supermarketAssistent');

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

        console.log('number: ', number);
        console.log('transf: ', transform);
        console.log('result; ', result);
        console.log('result222; ', decimalResult);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      handleTotal();
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      handleAddItem();
    }, [handleAddItem]),
  );

  return (
    <Container>
      <StatusBar backgroundColor={'#040fa7'} />
      <Header>
        <Image
          resizeMode="contain"
          style={styles.clientPhoto}
          source={require('../../assets/Lucas_bit.png')}
        />
        <Text style={styles.headerText}>
          LISTA {'\n'} DE {'\n'} COMPRAS
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('NewItems')}>
          <Icon
            style={{left: '40%'}}
            name="plus-square"
            size={45}
            color="#FDCC4E"
          />
        </TouchableOpacity>
      </Header>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          width: '100%',
        }}>
        <Text />
        <Text style={{padding: 4}}>temos {itemsInTheBag} items na sacola</Text>
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
      <AddItems>
        <Text style={styles.headerText}>VALOR TOTAL:</Text>
        <Text style={styles.headerText}>R$ {total}</Text>
      </AddItems>
    </Container>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 24,
    color: '#fff',
    padding: 4,
    textAlign: 'center',
  },
  clientPhoto: {
    width: '26%',
    height: '84%',
    borderWidth: 1,
    borderColor: '#FDCC4E',
  },
});
