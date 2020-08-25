import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {TouchableNativeFeedback} from 'react-native-gesture-handler'
import Resource from './Reusable/Resource';
import LoadingFullScreen from './Reusable/LoadingFullScreen';
import Limiter from './Reusable/Limiter';
import {THEME} from '../Config/Theme';
const BASE = 'http://api.alquran.cloud/v1';

export default class Surah extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Resource url={`${BASE}/surah`}>
          {({loading, error, payload}) => {
            if (loading) return <LoadingFullScreen />;
            else if (error)
              return <Text>Terjadi kesalahan, {error.message}</Text>;
            else if (payload.status != 'OK')
              return (
                <Text>Terjadi kesalahan, harap coba lagi beberapa saat</Text>
              );

            return (
              <Limiter
                data={payload.data}
                limit={10}
                renderItem={this.renderSurah}
              />
            );
          }}
        </Resource>
      </View>
    );
  }

  renderSurah = ({item, index}) => {
    const {
      number,
      name,
      englishName,
      englishNameTranslation,
      numberOfAyahs,
      revelationType,
    } = item;
    return (
      <TouchableNativeFeedback>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderBottomWidth:1,
            borderBottomColor:'#ddd',
          }}>
          <Text>{number}.</Text>
          <View style={{marginLeft: 24}}>
            <Text style={{color: THEME.main, fontSize: 16}}>{englishName}</Text>
            <Text>
              {englishNameTranslation} ({numberOfAyahs})
            </Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  };
}
