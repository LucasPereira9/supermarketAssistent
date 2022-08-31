import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import uuid from 'uuid/v4';

export async function SavePurchase({
  Total,
  Comment,
  SuccessMessage,
}: {
  Total: number;
  Comment: string;
  SuccessMessage: () => void;
}) {
  const {getItem, setItem} = useAsyncStorage('@supermarketHistory');
  try {
    const id = uuid();
    const NewItem = {
      id,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      value: Total,
      Comment,
    };
    const response = await getItem();
    const previousItens = response ? JSON.parse(response) : [];
    const data = [NewItem, ...previousItens];
    SuccessMessage();

    await setItem(JSON.stringify(data));
  } catch (error) {
    console.log(error);
    Alert.alert('deu ruim');
  }
}
