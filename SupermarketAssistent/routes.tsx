/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import React, {useEffect, useState} from 'react';
import home from './src/pages/home/index';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import History from './src/pages/history';
import {ThemeProvider} from 'styled-components';
import theme from './src/global/styles/theme';
import AnimatedSplash from 'react-native-animated-splash-screen';
import LottieView from 'lottie-react-native';
import {View} from 'react-native';

const Stack = createStackNavigator();

export default function Routes() {
  const [loaded, setLoaded] = useState(false);
  const [lottie, setLottie] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setLottie(true);
    }, 8000);
  }, []);
  return (
    <AnimatedSplash
      translucent={true}
      isLoaded={loaded}
      logoImage={require('./src/assets/animations/animated_Splash.json')}
      backgroundColor={theme.colors.primary}>
      {lottie ? (
        <ThemeProvider theme={theme}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{headerShown: false}}
              initialRouteName={'home'}>
              <Stack.Screen name="home" component={home} />
              <Stack.Screen name="history" component={History} />
            </Stack.Navigator>
          </NavigationContainer>
        </ThemeProvider>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: theme.colors.primary,
            alignItems: 'center',
            alignContent: 'center',
          }}>
          <LottieView
            style={{width: '75%'}}
            source={require('./src//assets/animations/animated_Splash.json')}
            autoPlay
            loop={true}
          />
        </View>
      )}
    </AnimatedSplash>
  );
}
