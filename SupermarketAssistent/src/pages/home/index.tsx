/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import {Container, AddItems, Header} from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {Card, CardProps} from '../../components/cards';
import {useFocusEffect} from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();
  const [total, setTotal] = useState(0);

  const [itensContainer, setItensContainer] = useState<CardProps[]>([]);

  const {getItem, setItem} = useAsyncStorage('@supermarketAssistent');

  async function handleAddItem() {
    try {
      const response = await getItem();

      const data = response ? JSON.parse(response) : [];
      setItensContainer(data);
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
      const data = previousItens.map((item: CardProps) => item.value);
      var number = 0;
      for (var i = 0; i < data.length; i++) {
        number = number += parseFloat(data[i]);
        const teste = number.toString();
        const result = teste.substr(0, 8);

        const BiggerResult = result.concat('0');
        const LowerResult = result.concat('.00');
        console.log('length', result.length);
        if (result.length === 3 || result.length > 3) {
          setTotal(BiggerResult);
        } else {
          setTotal(LowerResult);
        }
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
      <StatusBar barStyle="dark-content" backgroundColor={'#ffffff'} />
      <Header>
        <Text style={styles.headerText}>LISTA DE COMPRAS</Text>
      </Header>
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
        <Text>VALOR TOTAL:</Text>
        <TouchableOpacity onPress={() => navigation.navigate('NewItems')}>
          <Text>R$ {total}</Text>
        </TouchableOpacity>
      </AddItems>
    </Container>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 26,
  },
  ListView: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#868484',
    minWidth: '90%',
  },
  modalContainer: {
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
});
