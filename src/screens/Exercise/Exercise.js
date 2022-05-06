import React, {useEffect} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import CommonStyle from '../../styles/CommonStyle';

const Exercise = ({navigation, route}) => {
  useEffect(() => {
    navigation.setOptions({
      title: route.params.Name,
    });
  }, [navigation]);

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#eef'}}>
      <View style={[CommonStyle.cardView, {padding: 0}]}>
        <Image
          source={route.params.Image}
          resizeMode={'stretch'}
          style={{height: 300, width: '100%'}}
        />
      </View>
      <View style={[CommonStyle.cardView, {borderRadius: 10}]}>
        <Text style={CommonStyle.boldText}>Workout :</Text>
        <Text style={CommonStyle.text}> {route.params.Name}</Text>
        <Text style={CommonStyle.boldText}>Description:</Text>
        <Text style={CommonStyle.text_1}>{route.params.Description}</Text>
      </View>
    </ScrollView>
  );
};

export default Exercise;
