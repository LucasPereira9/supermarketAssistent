/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, Linking, TouchableOpacity, View, Image} from 'react-native';
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
            minHeight: success ? '30%' : '18%',
            backgroundColor: theme.colors.primary,
            borderRadius: 10,
          }}>
          {success ? (
            <View style={styles.lottieViews}>
              <LottieView
                style={{width: '60%', bottom: 20}}
                source={require('../../assets/animations/success.json')}
                autoPlay
                loop={false}
              />
              <MyAppText
                styling={styles.successText}
                textContent="Muito obrigado por usar o meu app!"
              />
              <MyAppText
                styling={styles.successText}
                textContent="Encontrou algum bug? entre em contato comigo abaixo! valeuuu =)"
              />
              <View style={styles.socialMidiaContainer}>
                <TouchableOpacity
                  style={styles.imageContainer}
                  onPress={() => {
                    Linking.openURL('https://www.instagram.com/_lucas__09/');
                  }}>
                  <Image
                    style={[styles.linkImage]}
                    source={require('../../assets/instagram.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.imageContainer}
                  onPress={() => {
                    Linking.openURL(
                      'https://www.linkedin.com/in/lucas-pereira-5280b9206/',
                    );
                  }}>
                  <Image
                    style={[styles.linkImage]}
                    source={require('../../assets/linkedIn.png')}
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[styles.button, {bottom: 20}]}
                onPress={() => {
                  onPressOut();
                  setSuccess(false);
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
                    }, 3000);
                  }}
                  style={styles.button}>
                  {loading ? (
                    <LottieView
                      style={{width: '90%'}}
                      source={require('../../assets/animations/insiderLoading.json')}
                      autoPlay
                    />
                  ) : (
                    <MyAppText styling={''} textContent="Prosseguir" />
                  )}
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
    justifyContent: 'center',
    alignItems: 'center',
  },

  successText: {
    color: '#fff',
    fontSize: 15,
    bottom: 84,
  },
  linkImage: {
    width: 40,
    height: 40,
    margin: 10,
  },
  socialMidiaContainer: {
    flexDirection: 'row',
  },
  imageContainer: {
    bottom: 50,
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.secundary,
  },
});
