/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import home from './src/pages/home/index';
import NewItems from './src/pages/newItems/index';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName={'home'}>
          <Stack.Screen name="home" component={home} />
          <Stack.Screen name="NewItems" component={NewItems} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
