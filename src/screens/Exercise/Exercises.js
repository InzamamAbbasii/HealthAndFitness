import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Pressable} from 'react-native';
import {getAllExercises} from '../../Database/ExercisesDB';
import {Avatar} from 'react-native-paper';
import CommonStyle from '../../styles/CommonStyle';
import {getImage} from '../../Components/WorkoutImages';

const Exercises = ({navigation}) => {
  const [exercisesList, setExercisesList] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await getAllExercises()
      .then(res => setExercisesList(res))
      .catch(err => alert(err));
  };

  return (
    <View>
      <FlatList
        style={{marginBottom: 50}}
        data={exercisesList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(item, index) => {
          return (
            <Pressable
              style={CommonStyle.cardView}
              onPress={() =>
                navigation.navigate('Exercise', {
                  Id: item.item.Id,
                  Name: item.item.Name,
                  Description: item.item.Description,
                  Image: getImage(item.item.Id),
                })
              }>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Avatar.Image
                  source={getImage(item.item.Id)}
                  style={{marginRight: 20}}
                />
                <Text style={CommonStyle.boldText}>{item.item.Name}</Text>
              </View>
            </Pressable>
          );
        }}
      />
      <View
        style={[
          CommonStyle.cardView,
          {
            position: 'absolute',
            bottom: 4,
            margin: 0,
            padding: 0,
            width: '94%',
          },
        ]}>
        <Pressable
          onPress={() => navigation.navigate('WorkoutCountDown')}
          style={[
            CommonStyle.btn,
            {
              margin: 0,
            },
          ]}>
          <Text style={CommonStyle.btnText}> Start </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Exercises;
