import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import Sound from 'react-native-sound';
let sound1, sound2;

const playSound1 = () => {
  return new Promise((resolve, reject) => {
    let url = require('../assets/images/beep.mp3');
    sound1 = new Sound('beep.mp3', Sound.MAIN_BUNDLE, (error, _sound) => {
      if (error) {
        console.log('error' + error.message);
        alert('Something went wrong sound not played');
        reject('error');
      }
      sound1.play(() => {
        resolve('start');
        sound1.release();
      });
    });
  });
};
const stopSound1 = () => {
  if (sound1) {
    sound1.stop(() => {
      console.log('Stop');
      sound1.release();
    });
  }
};
const playSound2 = () => {
  // let url1 = require('../assets/images/countdown.mp3');
  sound2 = new Sound('countdown.mp3', Sound.MAIN_BUNDLE, (error, _sound) => {
    if (error) {
      alert('Somthing went wrong sound not played');
      return;
    }
    sound2.play(() => {
      sound2.release();
    });
  });
};

const stopSound2 = () => {
  if (sound2) {
    sound2.stop(() => {
      console.log('Stop');
      sound2.release();
    });
  }
};

const releaseAllSounds = () => {
  if (sound1) sound1.release();
  if (sound2) sound2.release();
};

const stopAllSounds = () => {
  if (sound1) sound1.stop();
  if (sound2) sound2.stop();
};
export {
  playSound1,
  stopSound1,
  playSound2,
  stopSound2,
  releaseAllSounds,
  stopAllSounds,
};
