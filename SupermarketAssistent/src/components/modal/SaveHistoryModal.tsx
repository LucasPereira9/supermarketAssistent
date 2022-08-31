/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import {SavePurchase} from '../../hooks/savePurchase';
import KeyboardListener from 'react-native-keyboard-listener';

const SaveModal = ({
  visible,
  inputValue,
  onPressOut,
  TotalValue,
  setComment,
  ToastSms,
}: {
  ToastSms: () => void;
  setComment: Function;
  inputValue: string;
  TotalValue: number;
  onPressDelete: () => void;
  onPressOut: () => void;
  visible: boolean;
}) => {
  const [height, setHeight] = useState(false);
  Keyboard.addListener('keyboardDidShow', () => setHeight(true));
  Keyboard.addListener('keyboardDidHide', () => setHeight(false));

  return (
    <Modal
      isVisible={visible}
      animationIn={'zoomInDown'}
      animationOut={'zoomOutUp'}
      animationInTiming={1000}
      animationOutTiming={800}
      backdropTransitionInTiming={1000}
      backdropTransitionOutTiming={1100}
      children={
        <View
          style={{
            width: '100%',
            minHeight: height ? '44%' : '27%',
            backgroundColor: '#040fa7',
            borderRadius: 10,
          }}>
          <Text
            style={{
              textAlign: 'center',
              padding: 26,
              color: '#fff',
            }}>
            Valor da compra R$ {TotalValue}
          </Text>
          <TextInput
            style={styles.inputContainer}
            value={inputValue}
            onChangeText={string => {
              setComment(string);
            }}
            placeholder={'Adicionar um comentário(opcional)'}
          />

          <View
            style={{
              top: 30,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity onPress={onPressOut} style={styles.button}>
              <Text>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setTimeout(() => {
                  onPressOut();
                  SavePurchase({
                    Total: TotalValue,
                    Comment: inputValue,
                    SuccessMessage: ToastSms,
                  });
                  setComment('');
                }, 2000);
              }}
              style={styles.button}>
              <Text>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
    />
  );
};
export default SaveModal;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FDCC4E',
    width: '30%',
    height: 30,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieViews: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '70%',
    backgroundColor: '#FDCC4E',
    borderRadius: 6,
    width: '24%',
    height: '20%',
  },
  inputContainer: {
    backgroundColor: '#FDCC4E',
    maxWidth: '80%',
    justifyContent: 'center',
    left: '10%',
    textAlign: 'center',
    borderRadius: 8,
  },
});
