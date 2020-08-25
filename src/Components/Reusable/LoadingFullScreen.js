import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {THEME} from '../../Config/Theme';

export default function LoadingFullScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={80} color={THEME.main} />
      <Text
        style={{
          marginTop: 8,
          fontFamily: 'sans-serif-light',
          fontWeight: 'bold',
        }}>
        Loading...
      </Text>
    </View>
  );
}
