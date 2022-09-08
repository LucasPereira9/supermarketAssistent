/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */

import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import theme from '../../global/styles/theme';

export type HistoryProps = {
  id: string;
  date: string;
  value: string;
  time: string;
  Comment: string;
};
type Props = {
  data: HistoryProps;
  onPress: () => void;
};

export function HistoryCard({data, onPress}: Props) {
  return (
    <View style={styles.CardView}>
      <View
        style={[
          styles.CardView,
          {
            backgroundColor: theme.colors.secundary,
            flexDirection: 'row',
            minHeight: 150,
            borderRadius: 20,
          },
        ]}>
        <View style={styles.littleContainers}>
          <Text style={styles.text}>
            <Text style={{fontWeight: 'bold'}}>Valor:</Text> R${' '}
            {data.value.toLocaleString().replace('.', ',')}
          </Text>
          <Text style={styles.text}>
            <Text style={{fontWeight: 'bold'}}>Data:</Text> {data.date}
          </Text>

          <Text style={styles.text}>
            <Text style={{fontWeight: 'bold'}}>Horário:</Text> {data.time}
          </Text>
        </View>
        <View
          style={[styles.littleContainers, {maxWidth: '70%', minWidth: '45%'}]}>
          <Text
            style={[
              styles.text,
              {
                minWidth: '50%',
                maxWidth: '70%',
                textAlign: 'center',
              },
            ]}>
            <Text
              style={{
                fontWeight: 'bold',
              }}>
              Comentário {'\n'}
            </Text>
            {data.Comment}
          </Text>
        </View>
        <TouchableOpacity onPress={onPress} style={{top: 55, right: 6}}>
          <Icon name="trash-2" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  CardView: {
    minWidth: '80%',
    padding: 10,
    justifyContent: 'center',
  },
  littleContainers: {
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 10,
  },
  text: {
    color: '#000',
    fontFamily: 'RobotoSlab-VariableFont_wght',
    borderBottomWidth: 1,
    padding: 8,
    borderBottomColor: theme.colors.primary,
  },
});
