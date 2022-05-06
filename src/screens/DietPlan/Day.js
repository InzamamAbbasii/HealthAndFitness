import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import CommonStyle from '../../styles/CommonStyle';

const Day = ({navigation, route}) => {
  const [daysList, setDaysList] = useState([]);
  const helloWorld = () => {
    alert('Hello World');
  };
  useEffect(() => {
    setDaysList([]);
    if (route.params.duration === '1') {
      setDaysList([{Day: '1'}]);
    } else if (route.params.duration === '7') {
      for (let i = 1; i <= 7; i++) {
        setDaysList(daysList => [
          ...daysList,
          {
            Day: i,
          },
        ]);
      }
    } else if (route.params.duration === '30') {
      for (let i = 1; i <= 30; i++) {
        setDaysList(daysList => [
          ...daysList,
          {
            Day: i,
          },
        ]);
      }
    }
  }, []);

  return (
    <View>
      <FlatList
        data={daysList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={item => {
          return (
            <TouchableOpacity
              style={[
                CommonStyle.cardView,
                {
                  backgroundColor:
                    route.params.ActiveDay === item.item.Day
                      ? '#000000'
                      : '#fff',
                },
              ]}
              onPress={() =>
                navigation.navigate('PlanDetail', {
                  Calories: route.params.Calories,
                  duration: route.params.duration,
                  planId: route.params.planId,
                  Day: item.item.Day,
                })
              }>
              <Text
                style={[
                  CommonStyle.boldText,
                  {
                    color:
                      route.params.ActiveDay === item.item.Day
                        ? '#fff'
                        : 'orange',
                  },
                ]}>
                Day {item.item.Day}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Day;
