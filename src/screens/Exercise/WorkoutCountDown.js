import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView, Image, LogBox} from 'react-native';
import {
  playSound1,
  playSound2,
  releaseAllSounds,
  stopAllSounds,
} from '../../Components/WorkoutSounds';
import AwesomeAlert from 'react-native-awesome-alerts';
import CommonStyle from '../../styles/CommonStyle';
import {getImage} from '../../Components/WorkoutImages';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import {getSingleExercise} from '../../Database/ExercisesDB';
import AntDesign from 'react-native-vector-icons/AntDesign';
import KeepAwake from 'react-native-keep-awake';

const WorkoutCountDown = () => {
  //workout default values
  const [Id, setId] = useState(1);
  const [Name, setName] = useState('');
  const [lastWorkout, setLastWorkout] = useState(12); //total exercises count
  const [workoutDuration, setWorkoutDuration] = useState(30); //duration : 30 secs
  const [restDuration, setRestDuration] = useState(10); //rest : 10 secs
  const [kcal_per_Workout, setKcal_per_Workout] = useState(0); //each workout kcal

  // handle workout
  const [isPlaying, setIsPlaying] = useState(false);
  const [key, setKey] = useState(0); //to repeat count down
  const [isCountdown, setIsCountdown] = useState(false);
  const [isRest, setIsRest] = useState(false);
  const [duration, setDuration] = useState(workoutDuration);
  const [done, setDone] = useState(false); //to show alert after all exercises complete

  //handle workout complete alert
  const [exerciseCount, setExerciseCount] = useState(0);
  const [kcalCount, setKcalCount] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  //handle next/previous icons
  const [disableNext, setDisableNext] = useState(false);
  const [disablePrevious, setDisablePrevious] = useState(true);

  useEffect(() => {
    getData();
    LogBox.ignoreAllLogs();
    KeepAwake.activate();

    return () => {
      KeepAwake.deactivate();
      releaseAllSounds();
    };
  }, [Id]);

  const getData = async () => {
    await getSingleExercise(Id)
      .then(res => {
        setId(res.Id);
        setName(res.Name);
        setKcal_per_Workout(res.Calories);
      })
      .catch(err => alert(err));
  };

  const onPlay = () => {
    playSound1().then(() => {
      setIsPlaying(true);
      setKey(key + 1);
    });
  };

  const onStop = () => {
    stopAllSounds();
    setIsPlaying(false);
    setIsCountdown(false);
    setKey(key + 1);
    setIsRest(false);
  };

  const playCountdown = () => {
    if (isCountdown == false) {
      playSound2();
      setIsCountdown(true);
    }
  };

  const handleComplete = async () => {
    setIsCountdown(false);
    if (Id == lastWorkout) {
      //adding last exercise data
      setExerciseCount(exerciseCount + 1);
      setKcalCount(kcalCount + parseFloat(kcal_per_Workout));
      setTotalDuration(totalDuration + workoutDuration); // 30 is each exercise duration

      if (!done) setDone(true);
      //reset timer
      setIsPlaying(false);
      setDuration(workoutDuration);
    } else {
      if (!isRest) {
        //handle rest
        setIsRest(true);
        await wait(2000);
        setIsPlaying(true);
        setKey(key + 1);
        setDuration(restDuration);
      } else {
        //setting values for workout completion alert
        setExerciseCount(exerciseCount + 1);
        setKcalCount(kcalCount + parseFloat(kcal_per_Workout));
        setTotalDuration(totalDuration + workoutDuration); //  add duration of each exercise
        //handle workout
        handleNext(); //to start next exercise
      }
    }
  };

  const handlePrevious = async () => {
    await wait(1000); //wait 1 sec
    if (Id > 1) {
      setDisableNext(false);
      setId(Id - 1);
      setKey(key + 1); //to restart timer
      setIsPlaying(false);
      stopAllSounds(); //to stop all previous sounds
      setIsRest(false);
      playSound1().then(() => {
        setIsPlaying(true);
        setDuration(workoutDuration);
      });
    } else {
      setDisablePrevious(true);
    }
  };

  const handleNext = async () => {
    await wait(500); //wait 500 milliseconds
    if (Id < lastWorkout) {
      setDisablePrevious(false);
      setId(Id + 1);
      setKey(key + 1); //to restart timer
      setIsPlaying(false); //to stop timer until stater sound complete
      setIsRest(false); //to stop rest timer
      stopAllSounds(); //to stop all previous sounds
      setDuration(workoutDuration);
      playSound1().then(() => {
        setIsPlaying(true);
      });
    } else {
      setDisableNext(true);
    }
  };

  const wait = ms => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve(true);
      }, ms),
    );
  };
  const time_convert = num => {
    // var sec_num = parseInt(this, 10); // don't forget the second param
    var hours = Math.floor(num / 3600);
    var minutes = Math.floor((num - hours * 3600) / 60);
    var seconds = num - hours * 3600 - minutes * 60;

    if (hours < 10) hours = '0' + hours;

    if (minutes < 10) minutes = '0' + minutes;

    if (seconds < 10) seconds = '0' + seconds;

    return minutes + ':' + seconds;
  };
  const clearAlertValues = () => {
    setExerciseCount(0);
    setKcalCount(0);
    setTotalDuration(0);
  };
  const AllExercisesDone_Alert = () => {
    return (
      <AwesomeAlert
        show={done}
        showProgress={false}
        customView={
          <View
            style={{
              width: '100%',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/images/trophy.png')}
              style={{height: 100, width: 100}}
            />
            <Text style={CommonStyle.boldText}>Completed</Text>
            <View
              style={[
                CommonStyle.rowView,
                {
                  justifyContent: 'space-between',
                  width: '100%',
                },
              ]}>
              <View style={{alignItems: 'center'}}>
                <Text style={CommonStyle.boldText}>{exerciseCount}</Text>
                <Text style={{color: '#000'}}>Exercises</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={CommonStyle.boldText}>{kcalCount}</Text>
                <Text style={{color: '#000'}}>kcal</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={CommonStyle.boldText}>
                  {time_convert(totalDuration)}
                </Text>
                <Text style={{color: '#000'}}>Duration</Text>
              </View>
            </View>
          </View>
        }
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        cancelText="No, cancel"
        confirmText="Ok"
        confirmButtonColor="#DD6B55"
        confirmButtonStyle={{width: 60, padding: 10, alignItems: 'center'}}
        onCancelPressed={() => {
          setDone(false);
        }}
        onConfirmPressed={() => {
          clearAlertValues();
          setDone(false);
        }}
      />
    );
  };
  return (
    <ScrollView contentContainerStyle={{flex: 1}}>
      <View style={[CommonStyle.container, {justifyContent: 'flex-start'}]}>
        <AllExercisesDone_Alert />
        <Image
          source={getImage(Id)}
          style={{
            width: '100%',
            height: 250,
          }}
          resizeMode={'stretch'}
        />
        <Text
          style={[CommonStyle.boldText, {color: 'orange', marginBottom: 5}]}>
          {Id}/{lastWorkout}
        </Text>
        <Text style={[CommonStyle.boldText, {marginBottom: 20}]}>{Name}</Text>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: 200,
          }}>
          <CountdownCircleTimer
            key={key}
            size={200}
            isPlaying={isPlaying}
            duration={duration}
            rotation={'clockwise'}
            isSmoothColorTransition={true}
            colors={['#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2]}
            onComplete={() => handleComplete()}>
            {({remainingTime}) => {
              if (remainingTime == 11) playCountdown();
              return (
                <View
                  style={{
                    alignItems: 'center',
                  }}>
                  {isRest ? (
                    <Text style={[CommonStyle.boldText, {color: 'red'}]}>
                      Rest
                    </Text>
                  ) : (
                    <Text style={[CommonStyle.boldText, {color: 'orange'}]}>
                      Workout
                    </Text>
                  )}

                  <Text
                    style={{color: '#000', fontSize: 20, fontWeight: 'bold'}}>
                    {remainingTime}{' '}
                  </Text>
                </View>
              );
            }}
          </CountdownCircleTimer>
        </View>
        <View
          style={[
            CommonStyle.rowView,
            {
              width: '90%',
              marginTop: 15,
            },
          ]}>
          <AntDesign
            name="leftcircle"
            color={disablePrevious ? '#ccc' : 'orange'}
            size={50}
            onPress={() => handlePrevious()}
          />
          {isPlaying ? (
            <AntDesign
              name="pausecircle"
              color={'orange'}
              size={50}
              onPress={() => onStop()}
            />
          ) : (
            <AntDesign
              name="play"
              color={'orange'}
              size={50}
              onPress={() => onPlay()}
            />
          )}
          <AntDesign
            name="rightcircle"
            color={disableNext ? '#ccc' : 'orange'}
            size={50}
            onPress={() => handleNext()}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default WorkoutCountDown;
