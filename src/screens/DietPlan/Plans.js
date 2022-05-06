import {View, Text, FlatList, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Card} from 'react-native-paper';
import {
  getAllPlans,
  saveActivatedPlan,
  deletePlan,
} from '../../Database/DietPlanDB';

const Plans = ({navigation}) => {
  const [plansList, setPlansList] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await getAllPlans()
      .then(res => {
        setPlansList(res);
      })
      .catch(err => alert(err));
  };
  const activatePlan = async pid => {
    await saveActivatedPlan(pid)
      .then(res => alert('Plan Activated Successfully!'))
      .catch(err => alert(err));
  };
  const showAlert = pid => {
    Alert.alert('Alert !', 'What you want to do with this plan?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => {
          Alert.alert(
            'Delete !',
            'Are you sure you want to delete this plan?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'Yes',
                onPress: async () => {
                  await deletePlan(pid)
                    .then(res => {
                      alert(res);
                      const newData = plansList.filter(item => {
                        return item.Pid != pid;
                      });
                      setPlansList(newData);
                    })
                    .catch(err => alert(err));
                },
              },
            ],
          );
        },
      },
      {text: 'Activate', onPress: () => activatePlan(pid)},
    ]);
  };
  return (
    <View>
      <FlatList
        data={plansList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={item => {
          return (
            <Card
              style={{marginVertical: 5, marginHorizontal: 10}}
              onLongPress={() => showAlert(item.item.Pid)}
              onPress={() =>
                navigation.navigate('Day', {
                  planId: item.item.Pid,
                  Calories: item.item.Calories,
                  duration: item.item.Duration,
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

export default Plans;
