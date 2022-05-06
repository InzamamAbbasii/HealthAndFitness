import React from 'react';
import {Text, Image, TouchableHighlight, ScrollView} from 'react-native';
import CommonStyle from '../styles/CommonStyle';

const HomeScreen = ({navigation}) => {
  return (
    <ScrollView>
      <Image
        style={{width: '100%', height: 250, resizeMode: 'stretch'}}
        source={require('../assets/images/3.jpg')}
      />
      <TouchableHighlight
        style={[CommonStyle.btn, {height: 150}]}
        onPress={() => navigation.navigate('Dashboard_Diet')}>
        <Text style={[CommonStyle.btnText, {fontSize: 26}]}>Diet </Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={[CommonStyle.btn, {height: 150}]}
        onPress={() => navigation.navigate('Exercises')}>
        <Text style={[CommonStyle.btnText, {fontSize: 26}]}>Exercises</Text>
      </TouchableHighlight>
    </ScrollView>
  );
};

export default HomeScreen;
