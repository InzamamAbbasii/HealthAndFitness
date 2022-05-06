import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
// DietPlan Screens
import Dashboard_Diet from './src/screens/DietPlan/Dashboard_Diet';
import CreateFood from './src/screens/DietPlan/CreateFood';
import CreatePlan from './src/screens/DietPlan/CreatePlan';
import PlanDetail from './src/screens/DietPlan/PlanDetail';
import FoodsList from './src/screens/DietPlan/FoodsList';
import Plans from './src/screens/DietPlan/Plans';
import ActivatedPlans from './src/screens/DietPlan/ActivatedPlans';
import Day from './src/screens/DietPlan/Day';
//Exercise Screens
import Exercises from './src/screens/Exercise/Exercises';
import Exercise from './src/screens/Exercise/Exercise';
import WorkoutCountDown from './src/screens/Exercise/WorkoutCountDown';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      {/* <StatusBar backgroundColor={'orange'} /> */}
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="orange"
        translucent={true}
        networkActivityIndicatorVisible={true}
      />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'orange',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Exercises" component={Exercises} />
        <Stack.Screen name="Exercise" component={Exercise} />
        <Stack.Screen name="Dashboard_Diet" component={Dashboard_Diet} />
        <Stack.Screen name="CreateFood" component={CreateFood} />
        <Stack.Screen name="CreatePlan" component={CreatePlan} />
        <Stack.Screen name="PlanDetail" component={PlanDetail} />
        <Stack.Screen name="FoodsList" component={FoodsList} />
        <Stack.Screen name="Plans" component={Plans} />
        <Stack.Screen name="ActivatedPlans" component={ActivatedPlans} />
        <Stack.Screen name="WorkoutCountDown" component={WorkoutCountDown} />
        <Stack.Screen name="Day" component={Day} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
