/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import uuid from 'uuid/v4';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';

export default function TabContainer({
  Total,
  setTotal,
  bag,
  setModal,
}: {
  Total: number;
  setTotal: () => void;
  bag: boolean;
  setModal: () => void;
}) {
  const navigation = useNavigation();
  const {getItem, setItem} = useAsyncStorage('@supermarketHistory');

  async function SavePurchase() {
    try {
      const id = uuid();
      const NewItem = {
        id,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        value: Total,
      };
      const response = await getItem();
      const previousItens = response ? JSON.parse(response) : [];
      const data = [NewItem, ...previousItens];

      await setItem(JSON.stringify(data));
    } catch (error) {
      console.log(error);
      Alert.alert('deu ruim');
    }
  }

  return (
    <View style={styles.Container}>
      <View style={styles.ValueContainer}>
        <Text style={[styles.headerText, {bottom: 26}]}>VALOR TOTAL: </Text>
        <Text style={[styles.headerText, {bottom: 26}]}>R$ {Total}</Text>
        <TouchableOpacity
          onPress={setTotal}
          style={{
            maxHeight: '40%',
            bottom: 20,
          }}>
          <LottieView
            style={{
              height: 26,
              left: 3,
            }}
            source={require('../../assets/animations/reload.json')}
            autoPlay
          />
        </TouchableOpacity>
      </View>
      <View style={styles.ButtonsView}>
        <TouchableOpacity
          onPress={setModal}
          style={[styles.clean, {backgroundColor: bag ? '#ccc' : '#FDCC4E'}]}>
          <Text style={{fontFamily: 'Literata-Italic-VariableFont_opsz,wght'}}>
            Limpar Sacola
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            SavePurchase();
          }}
          style={[styles.clean, {backgroundColor: bag ? '#ccc' : '#FDCC4E'}]}>
          <Text style={{fontFamily: 'Literata-Italic-VariableFont_opsz,wght'}}>
            Finalizar compra
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    minWidth: '100%',
    height: '16%',
    backgroundColor: '#040fa7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Literata-Italic-VariableFont_opsz,wght',
  },
  clean: {
    width: '34%',
    margin: 10,
    height: '62%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  ButtonsView: {
    flexDirection: 'row',
  },
  ValueContainer: {
    flexDirection: 'row',
    top: 26,
  },
});
