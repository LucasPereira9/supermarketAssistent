/* eslint-disable react/react-in-jsx-scope */
import React, {useEffect, useState} from 'react';
import home from './src/pages/home/index';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import History from './src/pages/history';
import {ThemeProvider} from 'styled-components';
import theme from './src/global/styles/theme';
import AnimatedSplash from 'react-native-animated-splash-screen';

const Stack = createStackNavigator();

export default function Routes() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 3000);
  }, []);
  return (
    <AnimatedSplash
      translucent={true}
      isLoaded={loaded}
      logoImage={require('./src/assets/supermarketLogo.png')}
      backgroundColor={theme.colors.primary}
      logoHeight={260}
      logoWidth={260}>
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
    </AnimatedSplash>
  );
}
