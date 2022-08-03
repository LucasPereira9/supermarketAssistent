import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function HeaderOptions() {
  return (
    <View style={styles.container}>
      <Text>ITEM</Text>
      <Text>VALOR</Text>
      <Text>QUANTIDADE</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: '60%',
    left: '3.6%',
    justifyContent: 'space-around',
    flexDirection: 'row',
    padding: 20,
  },
});
