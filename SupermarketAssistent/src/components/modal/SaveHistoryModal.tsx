/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
} from 'react-native';
import Modal from 'react-native-modal';
import {SavePurchase} from '../../hooks/savePurchase';
import LottieView from 'lottie-react-native';
import MyAppText from '../myAppText/text';
import theme from '../../global/styles/theme';

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
  const [loading, setLoading] = useState(false);

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
            minHeight: height ? '42%' : '28%',
            backgroundColor: theme.colors.primary,
            borderRadius: 10,
          }}>
          <MyAppText
            styling={{
              textAlign: 'center',
              padding: 26,
              color: '#fff',
              fontSize: 20,
            }}
            textContent={`Valor da compra R$ ${TotalValue}`}
          />

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
              <MyAppText styling={''} textContent="Voltar" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setLoading(true);
                Keyboard.dismiss();
                setTimeout(() => {
                  onPressOut();
                  SavePurchase({
                    Total: TotalValue,
                    Comment: inputValue,
                    SuccessMessage: ToastSms,
                  });
                  setLoading(false);
                  setComment('');
                }, 2000);
              }}
              style={styles.button}>
              {loading ? (
                <LottieView
                  style={{width: '90%'}}
                  source={require('../../assets/animations/insiderLoading.json')}
                  autoPlay
                />
              ) : (
                <MyAppText styling={''} textContent="Salvar" />
              )}
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
    backgroundColor: theme.colors.secundary,
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
    backgroundColor: theme.colors.secundary,
    borderRadius: 6,
    width: '24%',
    height: '20%',
  },
  inputContainer: {
    backgroundColor: theme.colors.secundary,
    maxWidth: '80%',
    justifyContent: 'center',
    left: '10%',
    textAlign: 'center',
    borderRadius: 8,
  },
});
