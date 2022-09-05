import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';
import theme from '../../global/styles/theme';
import MyAppText from '../myAppText/text';
import Icon from 'react-native-vector-icons/Feather';

export default function HomeHeader() {
  const navigation = useNavigation();

  function showToast() {
    ToastAndroid.show('Botão em manutenção!', ToastAndroid.BOTTOM);
  }
  return (
    <>
      <View style={styles.Header}>
        <Image
          resizeMode="contain"
          style={styles.clientPhoto}
          source={require('../../assets/smallLogo.png')}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('history')}
          style={styles.historyButton}>
          <MyAppText styling={''} textContent="Histórico de compras" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={showToast} style={styles.configButton}>
        <Icon name="settings" size={26} color={theme.colors.secundary} />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  Header: {
    width: '100%',
    height: '26%',
    backgroundColor: theme.colors.primary,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '10%',
  },
  clientPhoto: {
    right: '10%',
    width: '100%',
    height: '100%',
    top: 22,
  },
  historyButton: {
    borderRadius: 4,
    backgroundColor: theme.colors.secundary,
    width: '50%',
    left: '33%',
    top: 20,
  },
  configButton: {
    position: 'absolute',
    top: '6%',
    left: '88%',
  },
});
