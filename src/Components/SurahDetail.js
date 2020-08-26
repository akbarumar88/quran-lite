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
    super(props);

    let surahNumber = props.route.params?.surahNumber;
    let surahName = props.route.params?.surahName;
    props.navigation.setOptions({title: surahName});
    this.state = {
      surahNumber,
      surahName,
    };
  }

  render() {
    const {surahNumber} = this.state;

    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Resource
          url={`${BASE}/surah/${surahNumber}/editions/quran-simple,id.indonesian`}>
          {({loading, error, payload}) => {
            if (loading) return <LoadingFullScreen />;
            else if (error)
              return <Text>Terjadi kesalahan, {error.message}</Text>;
            else if (payload.status != 'OK')
              return (
                <Text>Terjadi kesalahan, harap coba lagi beberapa saat</Text>
              );

            let editions = payload.data;
            let surahDetail = editions[0];
            let surahDetailIndonesia = editions[1];
            let ayahs = surahDetail.ayahs.map((ayah, i) => ({
              ...ayah,
              textIndonesia: surahDetailIndonesia.ayahs[i].text,
            }));
            // console.warn(ayahs)
            return (
              <Limiter data={ayahs} limit={10} renderItem={this.renderAyah} />
            );
          }}
        </Resource>
      </View>
    );
  }

  renderAyah = ({
    item: {
      number,
      text,
      textIndonesia,
      numberInSurah,
      juz,
      manzil,
      page,
      ruku,
      hizbQuarter,
      sajda,
    },
    index,
  }) => {
    let isGanjil = (index + 1) % 2 != 0;
    if (index == 0) {
      // Hilangkan Bismillah pada awal ayat pertama
      text = text.replace(/بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ /, '');
    }
    return (
      <TouchableWithoutFeedback>
        <View
          style={{
            backgroundColor: isGanjil ? '#fff' : '#f5f5f5',
            paddingVertical: 20,
            paddingHorizontal: 20,
          }}>
          <Text style={{fontSize: 32, fontFamily: 'Othmani-Italic'}}>
            {text}
          </Text>
          <Text
            style={{
              marginTop: 16,
              fontSize: 16,
              color: '#444',
              lineHeight: 24,
              // fontStyle: 'italic',
              fontFamily: 'OpenSans-Italic',
            }}>
            {numberInSurah}. {textIndonesia}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };
}
