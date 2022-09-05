/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import theme from '../../global/styles/theme';
import MyAppText from '../myAppText/text';

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
        <MyAppText
          styling={[styles.headerText, {bottom: 26}]}
          textContent="Valor Total: "
        />
        <MyAppText
          styling={[styles.headerText, {bottom: 26}]}
          textContent={`R$ ${Total}`}
        />
      </View>
      <View style={styles.ButtonsView}>
        <TouchableOpacity
          onPress={setModal}
          style={[
            styles.clean,
            {backgroundColor: bag ? '#ccc' : theme.colors.secundary},
          ]}>
          <MyAppText styling={''} textContent="Limpar carrinho" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            bag ? null : setSaveModal();
          }}
          style={[
            styles.clean,
            {backgroundColor: bag ? '#ccc' : theme.colors.secundary},
          ]}>
          <MyAppText styling={''} textContent="Salvar compra" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    minWidth: '100%',
    height: '16%',
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'RobotoSlab-VariableFont_wght',
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
