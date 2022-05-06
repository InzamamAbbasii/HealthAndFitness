import {View, Text, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  getSnackDetail,
  getBreakfastDetail,
  getLunchDetail,
  getDinnerDetail,
  deleteFood_PlanDetail,
} from '../../Database/DietPlanDB';
import {Avatar, Button, Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';

const PlanDetail = ({navigation, route}) => {
  const [breakfastList, setBreakfastList] = useState([]);
  const [lunchList, setLunchList] = useState([]);
  const [dinnerList, setDinnerList] = useState([]);
  const [snackList, setSnackList] = useState([]);
  const [planId, setPlanId] = useState(route.params.planId);
  const [breakfastCalories, setBreakfastCalories] = useState(0);
  const [dinnerCalories, setDinnerCalories] = useState(0);
  const [lunchCalories, setLunchCalories] = useState(0);
  const [snackCalories, setSnackCalories] = useState(0);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });
    return unsubscribe;
  }, [navigation]);

  const arraySum = list => {
    let sum = 0;
    for (let index = 0; index < list.length; index++) {
      sum = sum + list[index].Calories;
    }
    return sum;
  };

  const getData = async () => {
    let day = 1;
    if (typeof route.params.Day != 'undefined') {
      day = route.params.Day;
    }
    await getBreakfastDetail(planId, day)
      .then(res => {
        setBreakfastList(res);
        const sum = arraySum(res);
        setBreakfastCalories(sum);
      })
      .catch(err => alert(err));

    await getLunchDetail(planId, day)
      .then(res => {
        setLunchList(res);
        const sum = arraySum(res);
        setLunchCalories(sum);
      })
      .catch(err => alert(err));

    await getDinnerDetail(planId, day)
      .then(res => {
        setDinnerList(res);
        const sum = arraySum(res);
        setDinnerCalories(sum);
      })
      .catch(err => alert(err));

    await getSnackDetail(planId, day)
      .then(res => {
        setSnackList(res);
        const sum = arraySum(res);
        setSnackCalories(sum);
      })
      .catch(err => alert(err));
  };

  const BreakfastImage = props => (
    <Avatar.Image
      {...props}
      source={require('../../assets/images/breakfast.png')}
    />
  );
  const LunchImage = props => (
    <Avatar.Image
      {...props}
      source={require('../../assets/images/lunch.png')}
    />
  );
  const DinnerImage = props => (
    <Avatar.Image
      {...props}
      source={require('../../assets/images/dinner.png')}
    />
  );
  const SnackImage = props => (
    <Avatar.Image
      {...props}
      source={require('../../assets/images/snack.png')}
    />
  );

  const deleteFoodItem = async item => {
    if (typeof route.params.Day !== 'undefined') {
      await deleteFood_PlanDetail(
        item.MealTime,
        item.Fid,
        item.Pid,
        route.params.Day,
      )
        .then(res => getData())
        .catch(err => alert(err));
    } else if (route.params.duration === '30') {
      for (let i = 1; i <= 30; i++) {
        await deleteFood_PlanDetail(item.MealTime, item.Fid, item.Pid, i)
          .then(res => getData())
          .catch(err => alert(err));
      }
    } else if (route.params.duration === '7') {
      for (let i = 1; i <= 7; i++) {
        await deleteFood_PlanDetail(item.MealTime, item.Fid, item.Pid, i)
          .then(res => getData())
          .catch(err => alert(err));
      }
    } else {
      await deleteFood_PlanDetail(item.MealTime, item.Fid, item.Pid, 1)
        .then(res => getData())
        .catch(err => alert(err));
    }
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Card style={{marginVertical: 5, marginHorizontal: 10}}>
        <Card.Title title="Breakfast" left={BreakfastImage} />
        <Card.Content>
          {breakfastList.map((item, key) => (
            <View key={key}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Avatar.Image
                  size={40}
                  source={{uri: `data:image/png;base64,${item.Image}`}}
                />
                <View style={{flex: 1}}>
                  <Text style={{fontSize: 16, color: '#000', marginLeft: 10}}>
                    {item.Name}
                  </Text>
                  <Text style={{marginLeft: 10}}>Calories {item.Calories}</Text>
                </View>

                <Icon
                  name="cross"
                  size={30}
                  color="red"
                  onPress={() => deleteFoodItem(item)}
                />
              </View>

              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#ddd',
                  marginVertical: 5,
                }}></View>
            </View>
          ))}
        </Card.Content>
        <Card.Actions>
          <Button
            onPress={() =>
              navigation.navigate('FoodsList', {
                Selected: 'Breakfast',
                planId: planId,
                planCalories: route.params.Calories,
                duration: route.params.duration,
                Day: route.params.Day,
                totalCalories:
                  breakfastCalories +
                  lunchCalories +
                  dinnerCalories +
                  snackCalories,
              })
            }>
            Add Food
          </Button>
          <Text style={{textAlign: 'right', flex: 1, marginRight: 10}}>
            Total Calories : {breakfastCalories}
          </Text>
        </Card.Actions>
      </Card>

      <Card style={{marginVertical: 5, marginHorizontal: 10}}>
        <Card.Title title="Lunch" left={LunchImage} />
        <Card.Content>
          {lunchList.map((item, key) => (
            <View key={key}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Avatar.Image
                  size={40}
                  source={{uri: `data:image/png;base64,${item.Image}`}}
                />
                <View style={{flex: 1}}>
                  <Text style={{fontSize: 16, color: '#000', marginLeft: 10}}>
                    {item.Name}
                  </Text>
                  <Text style={{marginLeft: 10}}>Calories {item.Calories}</Text>
                </View>
                <Icon
                  name="cross"
                  size={30}
                  color="red"
                  onPress={() => deleteFoodItem(item)}
                />
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#ddd',
                  marginVertical: 5,
                }}></View>
            </View>
          ))}
        </Card.Content>
        <Card.Actions>
          <Button
            onPress={() =>
              navigation.navigate('FoodsList', {
                Selected: 'Lunch',
                planId: planId,
                planCalories: route.params.Calories,
                duration: route.params.duration,
                Day: route.params.Day,
                totalCalories:
                  breakfastCalories +
                  lunchCalories +
                  dinnerCalories +
                  snackCalories,
              })
            }>
            Add Food
          </Button>
          <Text style={{textAlign: 'right', flex: 1, marginRight: 10}}>
            Total Calories : {lunchCalories}
          </Text>
        </Card.Actions>
      </Card>

      <Card style={{marginVertical: 5, marginHorizontal: 10}}>
        <Card.Title title="Dinner" left={DinnerImage} />
        <Card.Content>
          {dinnerList.map((item, key) => (
            <View key={key}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Avatar.Image
                  size={40}
                  source={{uri: `data:image/png;base64,${item.Image}`}}
                />
                <View style={{flex: 1}}>
                  <Text style={{fontSize: 16, color: '#000', marginLeft: 10}}>
                    {item.Name}
                  </Text>
                  <Text style={{marginLeft: 10}}>Calories {item.Calories}</Text>
                </View>
                <Icon
                  name="cross"
                  size={30}
                  color="red"
                  onPress={() => deleteFoodItem(item)}
                />
              </View>

              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#ddd',
                  marginVertical: 5,
                }}></View>
            </View>
          ))}
        </Card.Content>
        <Card.Actions>
          <Button
            onPress={() =>
              navigation.navigate('FoodsList', {
                Selected: 'Dinner',
                planId: planId,
                planCalories: route.params.Calories,
                duration: route.params.duration,
                Day: route.params.Day,

                totalCalories:
                  breakfastCalories +
                  lunchCalories +
                  dinnerCalories +
                  snackCalories,
              })
            }>
            Add Food
          </Button>
          <Text style={{textAlign: 'right', flex: 1, marginRight: 10}}>
            Total Calories : {dinnerCalories}
          </Text>
        </Card.Actions>
      </Card>

      <Card style={{marginVertical: 5, marginHorizontal: 10}}>
        <Card.Title title="Snack" left={SnackImage} />
        <Card.Content>
          {snackList.map((item, key) => (
            <View key={key}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Avatar.Image
                  size={40}
                  source={{uri: `data:image/png;base64,${item.Image}`}}
                />
                <View style={{flex: 1}}>
                  <Text style={{fontSize: 16, color: '#000', marginLeft: 10}}>
                    {item.Name}
                  </Text>
                  <Text style={{marginLeft: 10}}>Calories {item.Calories}</Text>
                </View>
                <Icon
                  name="cross"
                  size={30}
                  color="red"
                  onPress={() => deleteFoodItem(item)}
                />
              </View>

              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#ddd',
                  marginVertical: 5,
                }}></View>
            </View>
          ))}
        </Card.Content>
        <Card.Actions>
          <Button
            onPress={() =>
              navigation.navigate('FoodsList', {
                Selected: 'Snack',
                planId: planId,
                planCalories: route.params.Calories,
                duration: route.params.duration,
                Day: route.params.Day,

                totalCalories:
                  breakfastCalories +
                  lunchCalories +
                  dinnerCalories +
                  snackCalories,
              })
            }>
            Add Food
          </Button>
          <Text style={{textAlign: 'right', flex: 1, marginRight: 10}}>
            Total Calories : {snackCalories}
          </Text>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
};

export default PlanDetail;
