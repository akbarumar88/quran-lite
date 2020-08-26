/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, Text} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Main from './src/Components/Main';
import SurahDetail from './src/Components/SurahDetail'
import { THEME } from './src/Config/Theme';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: '#fff',
          headerStyle: {backgroundColor: THEME.main},
        }}>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{title: "Qur'an Lite"}}
        />
        <Stack.Screen
          name="SurahDetail"
          component={SurahDetail}
          options={{title: "..."}}
        />
        {/* <Stack.Screen name="Juz" /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
