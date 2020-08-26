import React, {Component} from 'react';
import {Text, View, TouchableWithoutFeedback} from 'react-native';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import Resource from './Reusable/Resource';
import LoadingFullScreen from './Reusable/LoadingFullScreen';
import Limiter from './Reusable/Limiter';
import {THEME} from '../Config/Theme';
const BASE = 'http://api.alquran.cloud/v1';

export default class SurahDetail extends Component {
  constructor(props) {
    super(props)
    
    let surahNumber = props.route.params?.surahNumber
    this.state = {
       surahNumber
    }
  }
  
  render() {
    const {surahNumber} = this.state

    return (
      <View style={{flex: 1,backgroundColor:'#fff'}}>
        <Resource url={`${BASE}/surah/${surahNumber}/editions/ar.muyassar,id.indonesian`}>
          {({loading, error, payload}) => {
            if (loading) return <LoadingFullScreen />;
            else if (error)
              return <Text>Terjadi kesalahan, {error.message}</Text>;
            else if (payload.status != 'OK')
              return (
                <Text>Terjadi kesalahan, harap coba lagi beberapa saat</Text>
              );

            let editions = payload.data
            let surahDetail = editions[0]
            let surahDetailIndonesia = editions[1]
            let ayahs = surahDetail.ayahs.map((ayah, i) => ({...ayah, textIndonesia: surahDetailIndonesia.ayahs[i].text}))
            // console.warn(ayahs)
            return (
              <Limiter
                data={ayahs}
                limit={10}
                renderItem={this.renderAyah}
              />
            );
          }}
        </Resource>
      </View>
    );
  }

  renderAyah = ({item: {
    number,
    text,
    textIndonesia,
    numberInSurah,
    juz,
    manzil,
    page,
    ruku,
    hizbQuarter,
    sajda
  },index}) => {
    return (
    <TouchableWithoutFeedback>
      <View>
        <Text>{text}</Text>
        <Text>{number}. {textIndonesia}</Text>
      </View>
    </TouchableWithoutFeedback>
    )
  }
  
}
