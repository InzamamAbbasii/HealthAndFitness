import {View, Text, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Card} from 'react-native-paper';
import {getActivatedPlan, deleteActivePlan} from '../../Database/DietPlanDB';

import moment from 'moment';

const ActivatedPlans = ({navigation}) => {
  const [plansList, setPlansList] = useState([]);
  const [activeDay, setActiveDay] = useState(1);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await getActivatedPlan()
      .then(async res => {
        if (res.length > 0) {
          var start = moment(new Date()).format('YYYY-MM-DD');
          var end = moment(new Date(res[0].ActivationTime)).format(
            'YYYY-MM-DD',
          );
          //Difference in number of days
          const diff =
            Math.abs(
              moment(start, 'YYYY-MM-DD')
                .startOf('day')
                .diff(moment(end, 'YYYY-MM-DD').startOf('day'), 'days'),
            ) + 1;
          if (diff > res[0].Duration) {
            //delete active plan
            await deleteActivePlan()
              .then(res => console.log(res))
              .catch(err => alert(err));
          }
          setActiveDay(diff);
          setPlansList(res);
        }
      })
      .catch(err => alert(err));
  };
  return (
    <View>
      <FlatList
        data={plansList}
        keyExtractor={item => item.Pid.toString()}
        renderItem={item => {
          return (
            <Card
              style={{marginVertical: 5, marginHorizontal: 10}}
              onPress={() =>
                navigation.navigate('Day', {
                  planId: item.item.Pid,
                  Calories: item.item.Calories,
                  duration: item.item.Duration,
                  ActiveDay: activeDay,
                })
              }>
              {item.item.Image != null ? (
                <Card.Cover
                  source={{uri: `data:image/png;base64,${item.item.Image}`}}
                />
              ) : (
                <Card.Cover source={require('../../assets/images/img.png')} />
              )}

              <Card.Title title={item.item.Name} />
              <Card.Content>
                {item.item.Description != '' ? (
                  <Text>{item.item.Description}</Text>
                ) : null}
                <Text>
                  Calories {item.item.Calories} , Duration {item.item.Duration}
                </Text>
              </Card.Content>
            </Card>
          );
        }}
      />
    </View>
  );
};

export default ActivatedPlans;
