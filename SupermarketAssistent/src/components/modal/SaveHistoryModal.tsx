/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';

const SaveModal = ({
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
            backgroundColor: '#040fa7',
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
                <Text
                  style={{
                    fontFamily: 'Literata-Italic-VariableFont_opsz,wght',
                  }}>
                  Voltar
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <Text
                style={{
                  textAlign: 'center',
                  padding: 26,
                  color: '#fff',
                }}>
                Você está prestes a limpar sua lista de compras {'\n'}e esta
                ação não pode ser desfeita!
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <TouchableOpacity onPress={onPressOut} style={styles.button}>
                  <Text>Cancelar</Text>
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
                  <Text>Prosseguir</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
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
});
