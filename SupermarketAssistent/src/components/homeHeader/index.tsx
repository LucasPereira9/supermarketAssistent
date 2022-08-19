import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

export default function HomeHeader() {
  return (
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
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
  },
});
