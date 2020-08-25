import React, {Component} from 'react';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Surah from './Surah';
import Juz from './Juz';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { THEME } from '../Config/Theme';


const Tab = createMaterialBottomTabNavigator();

export default class Main extends Component {
  render() {
    return (
      <Tab.Navigator shifting barStyle={{backgroundColor: THEME.main}}>
        <Tab.Screen
          options={{
            tabBarIcon: ({focused, color}) => {
              return <FontAwesome5 color={color} name="book-open" size={20} />;
            },
          }}
          name="Surah"
          component={Surah}
        />
        <Tab.Screen
          name="Juz"
          component={Juz}
          options={{
            tabBarIcon: ({focused, color}) => {
              return <FontAwesome5 color={color} name="map" size={20} />;
            },
          }}
        />
      </Tab.Navigator>
    );
  }
}
