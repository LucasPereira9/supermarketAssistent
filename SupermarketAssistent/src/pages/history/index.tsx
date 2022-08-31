/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {HistoryCard, HistoryProps} from '../../components/historyCards';
import Icon from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MyAppText from '../../components/myAppText/text';

const History = () => {
  const {getItem, setItem} = useAsyncStorage('@supermarketHistory');
  const [itensContainer, setItensContainer] = useState<HistoryProps[]>([]);
  const navigation = useNavigation();

  async function handleAddItem() {
    try {
      const response = await getItem();

      const data = response ? JSON.parse(response) : [];
      setItensContainer(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRemove(id: string) {
    const response = await getItem();
    const previousItens = response ? JSON.parse(response) : [];
    const data = previousItens.filter((item: HistoryProps) => item.id !== id);
    setItem(JSON.stringify(data));
    setItensContainer(data);
  }

  useFocusEffect(
    useCallback(() => {
      handleAddItem();
    }, [handleAddItem]),
  );
  return (
    <View style={styles.historyContainer}>
      <View style={styles.headerView}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="left" size={44} color="#FDCC4E" />
        </TouchableOpacity>
      </View>
      {itensContainer.length === 0 ? (
        <View
          style={{
            height: '30%',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <MyAppText
            styling={{color: '#FDCC4E'}}
            textContent="Nenhum registro no histórico"
          />
        </View>
      ) : (
        <FlatList
          data={itensContainer}
          keyExtractor={item => item.id}
          style={{minWidth: '40%', minHeight: '20%'}}
          contentContainerStyle={{minWidth: '40%', minHeight: '20%'}}
          renderItem={({item}) => (
            <HistoryCard data={item} onPress={() => handleRemove(item.id)} />
          )}
        />
      )}
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  historyContainer: {
    flex: 1,
    backgroundColor: '#040fa7',
  },
  headerView: {
    height: '16%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
