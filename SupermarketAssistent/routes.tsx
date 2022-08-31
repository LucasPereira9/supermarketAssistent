/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import home from './src/pages/home/index';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import History from './src/pages/history';
import {ThemeProvider} from 'styled-components';
import theme from './src/global/styles/theme';

const Stack = createStackNavigator();

export default function Routes() {
  return (
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
  );
}
