import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import CommonStyle from '../../styles/CommonStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import {Avatar} from 'react-native-paper';
import * as ImagePicker from 'react-native-image-picker';
import {saveFoodItems, getAllFoodItemsName} from '../../Database/DietPlanDB';

const CreateFood = () => {
  const [image, setImage] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [calories, setCalories] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [protein, setProtein] = useState('');

  const saveFood = async () => {
    if (
      name.length == 0 ||
      calories.length == 0 ||
      carbs.length == 0 ||
      fat.length == 0 ||
      protein.length == 0
    ) {
      alert('Please fill all required fields.');
    } else {
      await saveFoodItems(
        name,
        description,
        calories,
        carbs,
        fat,
        protein,
        base64Image,
      )
        .then(res => {
          alert(res);
          setImage(null);
          setBase64Image(null);
          setName('');
          setDescription('');
          setCalories('');
          setCarbs('');
          setFat('');
          setProtein('');
        })
        .catch(err => alert(err));

      // await getAllFoodItemsName()
      //   .then(res => console.log(res))
      //   .catch(err => alert(err));
    }
  };
  const chooseImage = () => {
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
        setImage(response.assets[0].uri); //store image path
        setBase64Image(response.assets[0].base64); //store base64 string of image
      }
    });
  };
  return (
    <ScrollView
      style={CommonStyle.scrollView}
      showsVerticalScrollIndicator={false}>
      <TouchableOpacity
        style={styles.btnChooseImage}
        onPress={() => chooseImage()}>
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
        <Text style={styles.foodText}>
          Food Name <Text style={{color: 'red'}}>*</Text>
        </Text>
        <TextInput
          style={CommonStyle.textInput}
          value={name}
          placeholder={'ex.Apple'}
          onChangeText={text => setName(text)}
        />
      </View>
      <View style={CommonStyle.rowView}>
        <Text style={styles.foodText}>Quantity</Text>
        <TextInput
          style={CommonStyle.textInput}
          placeholder={'ex.100g'}
          value={description}
          onChangeText={text => setDescription(text)}
        />
      </View>

      <View style={CommonStyle.rowView}>
        <Text style={styles.foodText}>
          Calories <Text style={{color: 'red'}}>*</Text>
        </Text>
        <TextInput
          style={CommonStyle.textInput}
          keyboardType={'decimal-pad'}
          placeholder={'ex.52'}
          value={calories}
          onChangeText={text => setCalories(text)}
        />
        <Text>kcal</Text>
      </View>

      <View style={CommonStyle.rowView}>
        <Text style={styles.foodText}>
          Carbs <Text style={{color: 'red'}}>*</Text>
        </Text>
        <TextInput
          style={CommonStyle.textInput}
          keyboardType={'decimal-pad'}
          placeholder={'ex.14'}
          value={carbs}
          onChangeText={text => setCarbs(text)}
        />
        <Text>grams</Text>
      </View>

      <View style={CommonStyle.rowView}>
        <Text style={styles.foodText}>
          Fat <Text style={{color: 'red'}}>*</Text>
        </Text>
        <TextInput
          style={CommonStyle.textInput}
          keyboardType={'decimal-pad'}
          placeholder={'ex.0.2'}
          value={fat}
          onChangeText={text => setFat(text)}
        />
        <Text>grams</Text>
      </View>
      <View style={CommonStyle.rowView}>
        <Text style={styles.foodText}>
          Protein <Text style={{color: 'red'}}>*</Text>
        </Text>
        <TextInput
          style={CommonStyle.textInput}
          keyboardType={'decimal-pad'}
          placeholder={'ex.0.3'}
          value={protein}
          onChangeText={text => setProtein(text)}
        />
        <Text>grams</Text>
      </View>
      <TouchableOpacity style={CommonStyle.btn} onPress={() => saveFood()}>
        <Text style={CommonStyle.btnText}> Save </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreateFood;

const styles = StyleSheet.create({
  foodText: {
    width: 130,
    color: '#000',
  },
  btnChooseImage: {
    height: 150,
    width: 150,
    borderRadius: 150,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
    borderWidth: 5,
    borderColor: 'orange',
    // elevation: 6,
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
});
