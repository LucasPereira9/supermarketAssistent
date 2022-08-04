/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Container, AddItems, Header} from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import Square from 'react-native-vector-icons/Feather';
import NewItemodal from '../../components/modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  const [item, setItem] = useState('');
  const [value, setValue] = useState('');
  const [amount, setAmount] = useState('');
  const [itensContainer, setItensContainer] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  async function handleAddItem() {
    try {
      const response = await AsyncStorage.getItem('@supermarketAssistent');

      const data = response ? JSON.parse(response) : [];
      setItensContainer(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    handleAddItem();
  }, []);

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor={'#ffffff'} />
      <Header>
        <Text style={styles.headerText}>LISTA DE COMPRAS</Text>
      </Header>
      <ScrollView>
        {itensContainer.map((item, index) => (
          <View key={index} style={styles.ListView}>
            <TouchableOpacity onPress={() => {}}>
              <Square name={'square'} size={20} color="#000000" />
            </TouchableOpacity>
            <Text style={{minWidth: '10%', alignSelf: 'center'}}>
              {item.item}
            </Text>
            <Text>R$ {item.value}</Text>
            <Text>{item.amount}</Text>
          </View>
        ))}
      </ScrollView>
      <AddItems>
        <TouchableOpacity
          onPress={() => {
            setOpenModal(true);
          }}>
          <Icon name="pluscircle" size={60} color="#fff" />
        </TouchableOpacity>
      </AddItems>
      <NewItemodal
        isVisible={openModal}
        close={() => {
          handleAddItem();
          setOpenModal(false);
        }}
        item={item}
        setItem={(string: any) => setItem(string)}
        value={value}
        setValue={(string: any) => setValue(string)}
        amount={amount}
        setAmount={(string: any) => setAmount(string)}
      />
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
