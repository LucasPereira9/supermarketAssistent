/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  View,
  Alert,
  Keyboard,
} from 'react-native';
import {Container, SelectValue, EmptyView} from './styles';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {Card, CardProps} from '../../components/cards';
import ClearModal from '../../components/modal/clearItemsModal';
import SaveModal from '../../components/modal/SaveHistoryModal';
import uuid from 'uuid/v4';
import HomeHeader from '../../components/homeHeader';
import MoneyInput from '../../components/moneyInput';
import InputText from '../../components/textInput';
import TabContainer from '../../components/TabContainer';
import LottieView from 'lottie-react-native';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import Toast from 'react-native-toast-message';

export default function Home() {
  const [unity, setUnity] = useState('');
  const [value, setValue] = useState<any>('');
  const [amount, setAmount] = useState('');

  const [total, setTotal] = useState<number>(0);
  const [itemsInTheBag, setItemsInTheBag] = useState(0);
  const [clearmodal, setClearModal] = useState<boolean>(false);
  const [itensContainer, setItensContainer] = useState<CardProps[]>([]);
  const [selectedValue, setSelectedValue] = useState(true);
  const [changePrice, setChangePrice] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newData, setNewData] = useState<any>(itensContainer);
  const [focus, setFocus] = useState(false);
  const [openedSaveModal, setOpenedSaveModal] = useState(false);
  const [savedComment, setSavedComment] = useState('');

  const emptyBag = itemsInTheBag === 0;
  const empty =
    unity === '' || value === '' || value.length < 5 || amount === '';

  const {getItem, setItem, removeItem} = useAsyncStorage(
    '@supermarketAssistent',
  );
  const multiply = Number(value) * Number(amount);
  const fixed = parseFloat(String(multiply));
  let result = String(fixed).substr(0, 5);

  const showToast = () => {
    console.log('works');
    Toast.show({
      type: 'success',
      text1: 'Compra Salva com sucesso!',
    });
  };

  const searchName = (input: string) => {
    let data = itensContainer;
    let searchData = data.filter(item => {
      return item.unity.toLowerCase().includes(input.toLowerCase());
    });
    setNewData(searchData);
  };

  async function handleMoreItens() {
    try {
      const id = uuid();
      const NewItem = {
        id,
        unity,
        value,
        amount,
      };
      const response = await getItem();
      const previousItens = response ? JSON.parse(response) : [];
      const data = [NewItem, ...previousItens];

      await setItem(JSON.stringify(data));

      result = '0';
      setUnity('');
      setValue('');
      setAmount('1');
      setChangePrice(false);
      setSelectedValue(true);
      handleAddItem();
    } catch (error) {
      console.log(error);
      Alert.alert('deu ruim');
    }
  }

  async function handleAddItem() {
    try {
      const response = await getItem();

      const data = response ? JSON.parse(response) : [];
      setItensContainer(data);
      setNewData(data);
      setItemsInTheBag(data.length);
      handleTotal();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRemove(id: string) {
    const response = await getItem();
    const previousItens = response ? JSON.parse(response) : [];
    const data = previousItens.filter((item: CardProps) => item.id !== id);
    setItem(JSON.stringify(data));
    setItensContainer(data);
    setNewData(data);
    setItemsInTheBag(data.length);
    handleTotal();
  }

  async function handleEdit(id: string) {
    setFocus(true);
    const response = await getItem();
    const previousItens = response ? JSON.parse(response) : [];
    const data = previousItens.filter((item: CardProps) => item.id === id);
    const goEdit = previousItens.filter((item: CardProps) => item.id !== id);
    setUnity(data[0].unity);
    setValue(data[0].value);
    setAmount(data[0].amount);
    setItem(JSON.stringify(goEdit));

    handleTotal();
  }

  async function handleRemoveAll() {
    await removeItem();
    setItensContainer([]);
    setNewData([]);
    setItemsInTheBag(0);
    setTotal(0);
  }
  async function handleTotal() {
    try {
      const response = await getItem();
      const previousItens = response ? JSON.parse(response) : [];
      if (previousItens.length === 0) {
        setTotal(0);
      }
      const data = previousItens.map((item: CardProps) => item.value);
      var number = 0;
      for (var i = 0; i < data.length; i++) {
        number = number += parseFloat(data[i]);
        const transform = number.toString();
        const result = transform.substr(0, 6);
        const decimalResult = transform.substr(0, 5);

        if (transform.length < 4) {
          setTotal(Number(decimalResult));
        }
        if (transform.length > 4) {
          setTotal(Number(result));
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container>
      <StatusBar backgroundColor={'#040fa7'} />
      <HomeHeader />
      <Toast />
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
        }}>
        <View style={styles.searchContainer}>
          <Icon style={{padding: 4}} name="search" size={20} color="#040fa7" />
          <TextInput
            style={{color: '#000'}}
            placeholder="Buscar item"
            onChangeText={input => {
              searchName(input);
            }}
          />
        </View>

        <Text
          style={{
            padding: 4,
            fontFamily: 'RobotoSlab-VariableFont_wght',
          }}>
          {itemsInTheBag === 0
            ? ''
            : itemsInTheBag === 1
            ? `${itemsInTheBag} item no carrinho`
            : `${itemsInTheBag} itens no carrinho`}
        </Text>
      </View>
      <View style={styles.CardView}>
        <View
          style={[
            styles.CardView,
            {
              height: 135,
              backgroundColor: '#FDCC4E',
              width: '100%',
              borderRadius: 6,
            },
          ]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{width: '20%', right: 18}}>
              <InputText
                type={'default'}
                Text={'Item'}
                value={unity}
                setFunction={setUnity}
              />
            </View>

            <MoneyInput focus={focus} value={value} seted={setValue} />

            <View style={{width: '17%', left: 10}}>
              <InputText
                type={'numeric'}
                Text={'Quant.'}
                value={String(amount)}
                setFunction={setAmount}
              />
            </View>

            <SelectValue>
              <TouchableOpacity
                style={{width: '100%'}}
                onPress={() => {
                  setSelectedValue(true);
                  setChangePrice(false);
                }}>
                <Text
                  style={[
                    styles.selectValueInput,
                    {
                      backgroundColor: selectedValue ? '#040fa7' : '#FDCC4E',
                      fontFamily: 'RobotoSlab-VariableFont_wght',
                    },
                  ]}>
                  Unitário {'\n'} {changePrice ? null : value}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{width: '100%'}}
                onPress={() => {
                  selectedValue ? setValue(result) : null;
                  setChangePrice(true);
                  setSelectedValue(false);
                }}>
                <Text
                  style={[
                    styles.selectValueInput,
                    {
                      backgroundColor: selectedValue ? '#FDCC4E' : '#040fa7',
                      fontFamily: 'RobotoSlab-VariableFont_wght',
                    },
                  ]}>
                  Multiplicado {'\n'} {changePrice ? value : result}
                </Text>
              </TouchableOpacity>
            </SelectValue>
            <TouchableOpacity
              style={{
                left: '98%',
                position: 'absolute',
                height: '82%',
              }}
              onPress={() => {
                Keyboard.dismiss();
                empty ? null : handleMoreItens();
              }}>
              {empty ? (
                <LottieView
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  source={require('../../assets/animations/addMoreGray.json')}
                  autoPlay
                  loop={false}
                />
              ) : (
                <LottieView
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  source={require('../../assets/animations/addMore.json')}
                  autoPlay
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {emptyBag ? (
        <EmptyView>
          <Text style={styles.emptyBagText}>Sacola Vazia</Text>
          <Text style={styles.emptyBagText}>Já possui itens salvos?</Text>
          <TouchableOpacity
            onPress={() => {
              setLoading(true);
              setTimeout(() => {
                handleAddItem();
                setLoading(false);
              }, 2000);
            }}
            style={styles.moreItensButton}>
            {loading ? (
              <LottieView
                style={{
                  width: '40%',
                  height: '95%',
                }}
                source={require('../../assets/animations/moreItensLoad.json')}
                autoPlay
              />
            ) : (
              <Text>Carregar itens</Text>
            )}
          </TouchableOpacity>
        </EmptyView>
      ) : (
        <FlatList
          data={newData}
          keyExtractor={item => item.id}
          style={{minWidth: '40%', minHeight: '20%'}}
          contentContainerStyle={{minWidth: '40%', minHeight: '20%'}}
          renderItem={({item}) => (
            <Card
              data={item}
              onEdit={() => handleEdit(item.id)}
              onPress={() => handleRemove(item.id)}
            />
          )}
        />
      )}
      <TabContainer
        Total={total}
        bag={emptyBag}
        setModal={() => (emptyBag ? null : setClearModal(true))}
        setSaveModal={() => (emptyBag ? null : setOpenedSaveModal(true))}
      />
      <ClearModal
        visible={clearmodal}
        onPressOut={() => {
          setClearModal(false);
        }}
        onPressDelete={() => handleRemoveAll()}
      />
      <SaveModal
        ToastSms={() => showToast()}
        inputValue={savedComment}
        setComment={setSavedComment}
        TotalValue={total}
        visible={openedSaveModal}
        onPressOut={() => {
          setOpenedSaveModal(false);
        }}
        onPressDelete={() => handleRemoveAll()}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'RobotoSlab-VariableFont_wght',
  },

  CardView: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectValueInput: {
    textAlign: 'center',
    color: '#fff',
    borderRadius: 4,
    padding: 2,
  },
  moreItensButton: {
    width: 120,
    margin: 10,
    backgroundColor: '#f1bb32',
    height: '12%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  emptyBagText: {
    color: '#5f5d5d',
  },
  searchContainer: {
    backgroundColor: '#FDCC4E',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#040fa7',
    height: '80%',
    top: 4,
    left: 12,
    borderRadius: 8,
  },
});
