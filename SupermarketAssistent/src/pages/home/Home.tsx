/* eslint-disable react-native/no-inline-styles */
import React from 'react';
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

export default function Home() {
  const [teste, setTeste] = React.useState(false);
  const items = [
    {
      checked: Boolean(teste),
      item: 'Item 1',
      valor: '2,35',
      quantidade: '1',
    },
    {
      checked: Boolean(teste),
      item: 'Item 2',
      valor: '4,66',
      quantidade: '2',
    },
    {
      checked: Boolean(teste),
      item: 'Item 3',
      valor: '66,80',
      quantidade: '3',
    },
  ];

  function handleMoreItens() {
    items.push({
      checked: Boolean(teste),
      item: 'Item 4',
      valor: '4,66',
      quantidade: '2',
    });
  }
  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor={'#ffffff'} />
      <Header>
        <Text style={styles.headerText}>LISTA DE COMPRAS</Text>
      </Header>
      <ScrollView>
        {items.map((item, index) => (
          <View key={index} style={styles.ListView}>
            <TouchableOpacity
              onPress={() => {
                setTeste(!teste);
              }}>
              <Square
                name={item.checked ? 'check-square' : 'square'}
                size={20}
                color="#000000"
              />
            </TouchableOpacity>
            <Text>{item.item}</Text>
            <Text>R$ {item.valor}</Text>
            <Text>{item.quantidade}</Text>
          </View>
        ))}
      </ScrollView>
      <AddItems>
        <TouchableOpacity
          onPress={() => {
            handleMoreItens();
            console.log(items);
          }}>
          <Icon name="pluscircle" size={60} color="#fff" />
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
});
