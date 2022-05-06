import {View, Text, TouchableHighlight} from 'react-native';
import React from 'react';
import CommonStyle from '../../styles/CommonStyle';

const Dashboard_Diet = ({navigation}) => {
  return (
    <View style={CommonStyle.container}>
      <TouchableHighlight
        style={CommonStyle.btn}
        onPress={() => navigation.navigate('CreateFood')}>
        <Text style={CommonStyle.btnText}> Create Food </Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={CommonStyle.btn}
        onPress={() => navigation.navigate('CreatePlan')}>
        <Text style={CommonStyle.btnText}> Create Plan </Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={CommonStyle.btn}
        onPress={() => navigation.navigate('Plans')}>
        <Text style={CommonStyle.btnText}> Plans </Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={CommonStyle.btn}
        onPress={() => navigation.navigate('ActivatedPlans')}>
        <Text style={CommonStyle.btnText}> Activate Plan </Text>
      </TouchableHighlight>
    </View>
  );
};

export default Dashboard_Diet;
