/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Container, AddItems} from './styles';
import Icon from 'react-native-vector-icons/AntDesign';

const items = [
  {item: 'Item 1', valor: 'valor1', quantidade: 'quantidade1'},
  {item: 'Item 2', valor: 'valor2', quantidade: 'quantidade2'},
  {item: 'Item 3', valor: 'valor3', quantidade: 'quantidade3'},
];

export default function Home() {
  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor={'#ffffff'} />
      <ScrollView>
        {items.map((item, index) => (
          <View key={index} style={{flexDirection: 'row'}}>
            <Text>{item.item}</Text>
            <Text>{item.valor}</Text>
            <Text>{item.quantidade}</Text>
          </View>
        ))}
      </ScrollView>
      <AddItems>
        <TouchableOpacity>
          <Icon name="pluscircle" size={60} color="#fff" />
        </TouchableOpacity>
      </AddItems>
    </Container>
  );
}
