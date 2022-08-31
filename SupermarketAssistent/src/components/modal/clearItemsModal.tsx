/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import MyAppText from '../myAppText/text';
import theme from '../../global/styles/theme';

const ClearModal = ({
  visible,
  onPressOut,
  onPressDelete,
}: {
  onPressDelete: () => void;
  onPressOut: () => void;
  visible: boolean;
}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
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
            minHeight: '20%',
            backgroundColor: theme.colors.primary,
            borderRadius: 10,
          }}>
          {loading ? (
            <View style={styles.lottieViews}>
              <LottieView
                source={require('../../assets/animations/shopping-cart.json')}
                autoPlay
              />
            </View>
          ) : success ? (
            <View style={styles.lottieViews}>
              <LottieView
                style={{bottom: '6%', width: '40%'}}
                source={require('../../assets/animations/success.json')}
                autoPlay
                loop={false}
              />
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => {
                  setTimeout(() => {
                    setSuccess(false);
                  }, 3000);

                  onPressOut();
                }}>
                <MyAppText styling={''} textContent="Voltar" />
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <MyAppText
                styling={{textAlign: 'center', padding: 26, color: '#fff'}}
                textContent={
                  'Você está prestes a limpar sua lista de compras e esta ação não pode ser desfeita!'
                }
              />

              <View
                style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <TouchableOpacity onPress={onPressOut} style={styles.button}>
                  <MyAppText styling={''} textContent="Cancelar" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setLoading(true);
                    setTimeout(() => {
                      setSuccess(true);
                      setLoading(false);
                      onPressDelete();
                    }, 6200);
                  }}
                  style={styles.button}>
                  <MyAppText styling={''} textContent="Prosseguir" />
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      }
    />
  );
};
export default ClearModal;

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
});
