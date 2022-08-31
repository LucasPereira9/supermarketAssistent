import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function HomeHeader() {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.Header}>
        <Image
          resizeMode="contain"
          style={styles.clientPhoto}
          source={require('../../assets/Lucas_bit.png')}
        />
        <Text style={styles.headerText}>
          LISTA {'\n'} DE {'\n'} COMPRAS
        </Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('history')}
          style={styles.historyButton}>
          <Text>Histórico de compras</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  Header: {
    width: '100%',
    height: '24%',
    backgroundColor: '#040fa7',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '10%',
    flexDirection: 'row',
  },
  clientPhoto: {
    width: '26%',
    height: '84%',
    borderWidth: 1,
    borderColor: '#FDCC4E',
  },
  headerText: {
    minHeight: '50%',
    fontSize: 21,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'RobotoSlab-VariableFont_wght',
  },
  historyButton: {
    position: 'absolute',
    bottom: 1,
    left: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#FDCC4E',
    width: '40%',
    margin: 10,
  },
});
