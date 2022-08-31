/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function TabContainer({
  Total,
  bag,
  setModal,
  setSaveModal,
}: {
  Total: number;
  bag: boolean;
  setModal: () => void;
  setSaveModal: () => void;
}) {
  return (
    <View style={styles.Container}>
      <View style={styles.ValueContainer}>
        <Text style={[styles.headerText, {bottom: 26}]}>VALOR TOTAL: </Text>
        <Text style={[styles.headerText, {bottom: 26}]}>R$ {Total}</Text>
      </View>
      <View style={styles.ButtonsView}>
        <TouchableOpacity
          onPress={setModal}
          style={[styles.clean, {backgroundColor: bag ? '#ccc' : '#FDCC4E'}]}>
          <Text style={{fontFamily: 'Literata-Italic-VariableFont_opsz,wght'}}>
            Limpar carrinho
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            bag ? null : setSaveModal();
          }}
          style={[styles.clean, {backgroundColor: bag ? '#ccc' : '#FDCC4E'}]}>
          <Text style={{fontFamily: 'Literata-Italic-VariableFont_opsz,wght'}}>
            Salvar compra
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
