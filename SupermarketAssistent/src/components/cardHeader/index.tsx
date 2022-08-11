/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity, View, Text} from 'react-native';

export default function HeaderForm() {
  const navigation = useNavigation();

  return (
    <View
      style={{
        width: '100%',
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#040fa7',
      }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="left" size={32} color="#FDCC4E" />
      </TouchableOpacity>

      <Text style={{color: '#fff'}}>Novo Item</Text>
    </View>
  );
}
