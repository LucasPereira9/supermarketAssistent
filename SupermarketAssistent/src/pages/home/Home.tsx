/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {Container, AddItems, Header} from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import Square from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import NewItemodal from '../../components/modal';

export default function Home() {
  const [item, setItem] = useState('');
  const [value, setValue] = useState('');
  const [amount, setAmount] = useState('');
  const [itensContainer, setItensContainer] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  function handleMoreItens() {
    const NewItem = {
      item: item,
      value: value,
      amount: amount,
    };
    setItensContainer([...itensContainer, NewItem]);
    setValue('');
    setItem('');
    setAmount('');
  }
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
            <Text>{item.item}</Text>
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
          handleMoreItens();
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
