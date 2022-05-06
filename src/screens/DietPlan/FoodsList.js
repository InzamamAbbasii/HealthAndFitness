import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {getAllFoodItems, savePlanDetail} from '../../Database/DietPlanDB';
import CommonStyle from '../../styles/CommonStyle';
import {Avatar, Checkbox} from 'react-native-paper';

const FoodsList = ({navigation, route}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [foodList, setFoodList] = useState([]);
  const [foodListCopy, setFoodListCopy] = useState([]);
  const [selected, setSelected] = useState(false);
  const [totalCalories, setTotalCalories] = useState(
    route.params.totalCalories,
  );
  useEffect(() => {
    getFoodList();
  }, []);
  const getFoodList = async () => {
    await getAllFoodItems()
      .then(res => {
        setFoodList(res);
        setFoodListCopy(res);
      })
      .catch(err => alert(err));
  };

  const savePlanData = async (fid, foodCalories) => {
    if (typeof route.params.Day !== 'undefined') {
      let day = parseInt(route.params.Day);
      await savePlanDetail(route.params.Selected, fid, route.params.planId, day)
        .then(res => {
          console.log(res);
        })
        .catch(err => alert(err));
    } else if (route.params.duration === '30') {
      //save plan for one month
      for (let i = 1; i <= 30; i++) {
        await savePlanDetail(route.params.Selected, fid, route.params.planId, i)
          .then(res => {
            console.log(res);
          })
          .catch(err => alert(err));
      }
    } else if (route.params.duration === '7') {
      //save plan for seven days
      for (let i = 1; i <= 7; i++) {
        await savePlanDetail(route.params.Selected, fid, route.params.planId, i)
          .then(res => {
            console.log(res);
          })
          .catch(err => alert(err));
      }
    } else {
      //save for single day
      await savePlanDetail(route.params.Selected, fid, route.params.planId, 1)
        .then(res => {
          console.log(res);
        })
        .catch(err => alert(err));
    }
  };

  const handleCheckbox = selectedItem => {
    const selectedCalories = selectedItem.item.Calories + totalCalories;

    if (selectedCalories <= route.params.planCalories) {
      const newData = foodList.map(item => {
        if (item.Fid === selectedItem.item.Fid) {
          setTotalCalories(totalCalories + selectedItem.item.Calories);
          savePlanData(selectedItem.item.Fid);
          return {
            ...item,
            Selected: !selectedItem.item.Selected,
          };
        } else {
          return {...item};
        }
      });
      setFoodList(newData);
    } else {
      alert('Calories limit exceeded.');
    }
  };

  const searchFoodByName = text => {
    setSearchQuery(text);
    if (text) {
      const newData = foodList.filter(item => {
        return item.Name.includes(text);
      });
      setFoodList(newData);
    } else {
      setFoodList(foodListCopy);
    }
  };
  return (
    <View style={CommonStyle.container}>
      <Searchbar
        style={{margin: 10}}
        placeholder="Search Food"
        onChangeText={text => searchFoodByName(text)}
        value={searchQuery}
      />

      <FlatList
        style={{width: '100%'}}
        data={foodList}
        keyExtractor={(item, index) => item.Fid.toString()}
        renderItem={item => {
          return (
            <View style={[CommonStyle.cardView, {flexShrink: 1}]}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Avatar.Image
                  source={{uri: `data:image/png;base64,${item.item.Image}`}}
                  style={{marginRight: 15}}
                />
                <View
                  style={[
                    CommonStyle.rowView,
                    {
                      padding: 0,
                      width: '75%',
                      flexShrink: 1,
                    },
                  ]}>
                  <View style={{flex: 1}}>
                    <Text style={CommonStyle.boldText}>{item.item.Name}</Text>
                    <Text>Calories {item.item.Calories}</Text>
                  </View>
                  <Checkbox
                    status={item.item.Selected ? 'checked' : 'unchecked'}
                    onPress={() => {
                      handleCheckbox(item);
                    }}
                  />
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default FoodsList;
