import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import CommonStyle from '../../styles/CommonStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import {Avatar} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'react-native-image-picker';
import {savePlan} from '../../Database/DietPlanDB';

const CreatePlan = ({navigation}) => {
  const [image, setImage] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [calories, setCalories] = useState('');
  const [duration, setDuration] = useState('1');
  const next = async () => {
    if (name.length == 0 || calories.length == 0) {
      alert('Please fill all required fields.');
    } else {
      await savePlan(name, desc, calories, duration, base64Image)
        .then(res => {
          if (typeof res !== 'undefined') {
            navigation.navigate('PlanDetail', {
              name,
              desc,
              Calories: calories,
              duration,
              planId: res,
            });
            setImage(null);
            setBase64Image(null);
            setCalories('');
            setDesc('');
            setName('');
          }
        })
        .catch(err => alert(err));
    }
  };

  const launchImageLibrary = () => {
    let options = {
      skipBackup: true,
      path: 'images',
      includeBase64: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        setImage(response.assets[0].uri);
        setBase64Image(response.assets[0].base64); //store base64 string of image
      }
    });
  };
  return (
    <ScrollView
      style={CommonStyle.scrollView}
      contentContainerStyle={{flexGrow: 1}}>
      <View style={CommonStyle.container}>
        <TouchableOpacity
          style={styles.btnChooseImage}
          onPress={() => launchImageLibrary()}>
          {image === null ? (
            <Icon
              name="md-camera"
              size={40}
              color="orange"
              style={styles.cameraIcon}
            />
          ) : (
            <Avatar.Image size={140} source={{uri: image}} />
          )}
        </TouchableOpacity>
        <View style={CommonStyle.rowView}>
          <Text style={styles.text}>
            Plan Name <Text style={{color: 'red'}}>*</Text>
          </Text>
          <TextInput
            style={CommonStyle.textInput}
            value={name}
            placeholder={'ex.Weight Gain'}
            onChangeText={text => setName(text)}
          />
        </View>
        <View style={CommonStyle.rowView}>
          <Text style={styles.text}>Plan Description</Text>
          <TextInput
            style={CommonStyle.textInput}
            value={desc}
            multiline
            placeholder={'ex.7 Day Diet Plan for Weight Gain'}
            onChangeText={text => setDesc(text)}
          />
        </View>
        <View style={CommonStyle.rowView}>
          <Text style={styles.text}>
            Plan Calories <Text style={{color: 'red'}}>*</Text>
          </Text>
          <TextInput
            style={CommonStyle.textInput}
            value={calories}
            placeholder={'ex.2000'}
            keyboardType={'decimal-pad'}
            onChangeText={text => setCalories(text)}
          />
        </View>

        <View style={CommonStyle.rowView}>
          <Text style={styles.text}>
            Plan Duration <Text style={{color: 'red'}}>*</Text>
          </Text>
          <Picker
            style={styles.picker}
            mode={'dropdown'}
            selectedValue={duration}
            onValueChange={(itemValue, itemIndex) => setDuration(itemValue)}>
            <Picker.Item label="Single Day" value="1" />
            <Picker.Item label="Weekly" value="7" />
            <Picker.Item label="Monthly" value="30" />
          </Picker>
        </View>

        <TouchableOpacity style={CommonStyle.btn} onPress={() => next()}>
          <Text style={CommonStyle.btnText}> Next </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreatePlan;
const styles = StyleSheet.create({
  text: {
    width: 130,
    color: '#000',
  },
  btnChooseImage: {
    height: 150,
    width: 150,
    borderRadius: 150,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 30,
    borderWidth: 5,
    borderColor: 'orange',
  },
  foodImage: {
    resizeMode: 'cover',
    height: 100,
    width: 100,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: '35%',
    left: '35%',
  },
  picker: {
    backgroundColor: '#eee',
    flex: 1,
    marginLeft: 25,
  },
});
