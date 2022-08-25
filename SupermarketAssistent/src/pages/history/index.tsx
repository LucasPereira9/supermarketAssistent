/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {FlatList, View} from 'react-native';
import {HistoryCard, HistoryProps} from '../../components/historyCards';

const History = () => {
  const {getItem, setItem} = useAsyncStorage('@supermarketHistory');
  const [itensContainer, setItensContainer] = useState<HistoryProps[]>([]);

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
    <View>
      <FlatList
        data={itensContainer}
        keyExtractor={item => item.id}
        style={{minWidth: '40%', minHeight: '20%'}}
        contentContainerStyle={{minWidth: '40%', minHeight: '20%'}}
        renderItem={({item}) => (
          <HistoryCard data={item} onPress={() => handleRemove(item.id)} />
        )}
      />
    </View>
  );
};

export default History;
