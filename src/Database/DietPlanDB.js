import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({
  name: 'HealthAndFitnessDB.db',
  createFromLocation: 1,
});

//TODO: save foods data in FOODs table in database
const saveFoodItems = (
  name,
  description,
  calories,
  carbs,
  fat,
  protein,
  base64Image,
) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      function (txn) {
        txn.executeSql(
          'insert into Foods (Name,Description,Calories,Carbs,Fat,Protein,Image) values (?,?,?,?,?,?,?)',
          [name, description, calories, carbs, fat, protein, base64Image],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              resolve('Data Inserted Successfully!');
            } else {
              reject('Oops! Data not inserted.');
            }
          },
        );
      },
      error => reject(error.message),
    );
  });
};

//TODO: save Plan data in Plan table in database
const savePlan = (name, description, calories, duration, base64Image) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      function (txn) {
        txn.executeSql(
          'insert into Plan (Name,Description,Calories,Duration,Image) values (?,?,?,?,?)',
          [name, description, calories, duration, base64Image],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              resolve(results.insertId);
            } else {
              reject('Oops! Data not inserted.');
            }
          },
        );
      },
      error => reject(error.message),
    );
  });
};
//TODO: save Plan detail i.e mealTime, food id, plan id, etc. in PlanDetail table in database
const savePlanDetail = (mealTime, fid, pid, day) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      function (txn) {
        txn.executeSql(
          'insert into PlanDetail (MealTime,Fid,Pid,Day) values (?,?,?,?)',
          [mealTime, fid, pid, day],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              resolve(results.insertId);
            } else {
              reject('Oops! Data not inserted.');
            }
          },
        );
      },
      error => reject(error.message),
    );
  });
};

//TODO: getting all food names from database that is stored in Foods table
const getAllFoodItemsName = () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      function (txn) {
        txn.executeSql('select * from Foods', [], (tx, results) => {
          var foodList = [];
          for (let i = 0; i < results.rows.length; i++) {
            foodList.push(results.rows.item(i).Name);
          }

          resolve(foodList);
        });
      },
      error => reject(error.message),
    );
  });
};

// TODO: getting detail of all food items i.e, name,image,descripteion etc.
const getAllFoodItems = () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      function (txn) {
        txn.executeSql('select * from Foods', [], (tx, results) => {
          var foodList = [];
          for (let i = 0; i < results.rows.length; i++) {
            let obj = {
              Fid: results.rows.item(i).Fid,
              Name: results.rows.item(i).Name,
              Description: results.rows.item(i).Description,
              Calories: results.rows.item(i).Calories,
              Carbs: results.rows.item(i).Carbs,
              Fat: results.rows.item(i).Fat,
              Protein: results.rows.item(i).Protein,
              Image: results.rows.item(i).Image,
              Selected: false,
            };
            foodList.push(obj);
          }
          resolve(foodList);
        });
      },
      error => reject(error.message),
    );
  });
};

// TODO: getting detail of  Breakfast according to plan
const getBreakfastDetail = (pid, day) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      function (txn) {
        txn.executeSql(
          `SELECT * FROM PlanDetail  JOIN Foods on PlanDetail.Fid=Foods.Fid WHERE MealTime like 'breakfast' and PlanDetail.Pid=${pid} and Day=${day}`,
          [],
          (tx, results) => {
            var list = [];
            for (let i = 0; i < results.rows.length; i++) {
              list.push(results.rows.item(i));
            }
            resolve(list);
          },
        );
      },
      error => reject(error.message),
    );
  });
};

// TODO: getting detail of  Lunch according to plan
const getLunchDetail = (pid, day) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      function (txn) {
        txn.executeSql(
          `SELECT * FROM PlanDetail  JOIN Foods on PlanDetail.Fid=Foods.Fid WHERE MealTime like 'Lunch' and PlanDetail.Pid=${pid} and Day=${day}`,
          [],
          (tx, results) => {
            var list = [];
            for (let i = 0; i < results.rows.length; i++) {
              list.push(results.rows.item(i));
            }
            resolve(list);
          },
        );
      },
      error => reject(error.message),
    );
  });
};

// TODO: getting detail of  Lunch according to plan
const getDinnerDetail = (pid, day) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      function (txn) {
        txn.executeSql(
          `SELECT * FROM PlanDetail  JOIN Foods on PlanDetail.Fid=Foods.Fid WHERE MealTime like 'Dinner' and PlanDetail.Pid=${pid} and Day=${day}`,
          [],
          (tx, results) => {
            var list = [];
            for (let i = 0; i < results.rows.length; i++) {
              list.push(results.rows.item(i));
            }
            resolve(list);
          },
        );
      },
      error => reject(error.message),
    );
  });
};

// TODO: getting detail of  Snack according to plan
const getSnackDetail = (pid, day) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      function (txn) {
        txn.executeSql(
          `SELECT * FROM PlanDetail  JOIN Foods on PlanDetail.Fid=Foods.Fid WHERE MealTime like 'snack' and PlanDetail.Pid=${pid} and Day=${day}`,
          [],
          (tx, results) => {
            var list = [];
            for (let i = 0; i < results.rows.length; i++) {
              list.push(results.rows.item(i));
            }
            resolve(list);
          },
        );
      },
      error => reject(error.message),
    );
  });
};

// TODO: getting detail of  all plans i.e, plan name, description,calories , duration etc.
const getAllPlans = () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      function (txn) {
        txn.executeSql(`SELECT * FROM Plan `, [], (tx, results) => {
          var list = [];
          for (let i = 0; i < results.rows.length; i++) {
            list.push(results.rows.item(i));
          }
          resolve(list);
        });
      },
      error => reject(error.message),
    );
  });
};

//TODO: save activated Plan detail i.e plan id,activation date&time, etc. in ActivatedPlan table in database
const saveActivatedPlan = pid => {
  return new Promise(async (resolve, reject) => {
    const currentDateTime = new Date().toString();
    await getActivatedPlan()
      .then(res => {
        if (res.length == 0) {
          //insert  record if there is no active plan
          db.transaction(
            function (txn) {
              txn.executeSql(
                'insert into ActivatedPlan (Pid,ActivationTime) values (?,?)',
                [pid, currentDateTime],
                (tx, results) => {
                  if (results.rowsAffected > 0) {
                    resolve('Data Inserted Successfully!');
                  } else {
                    reject('Oops! Data not inserted.');
                  }
                },
              );
            },
            error => reject(error.message),
          );
        } else {
          //update record if already another plan is activate
          db.transaction(
            function (txn) {
              txn.executeSql(
                'Update ActivatedPlan SET Pid = ? , ActivationTime=? ',
                [pid, currentDateTime],
                (tx, results) => {
                  if (results.rowsAffected > 0) {
                    resolve('Plan Updated Successfully!');
                  } else {
                    reject('Oops! Data not updated.');
                  }
                },
              );
            },
            error => reject(error.message),
          );
        }
      })
      .catch(err => reject(err));
  });
};

// TODO: getting detail of  all plans i.e, plan name, description,calories , duration etc.
const getActivatedPlan = () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      function (txn) {
        txn.executeSql(
          `SELECT * from ActivatedPlan JOIN Plan on ActivatedPlan.Pid=Plan.Pid `,
          [],
          (tx, results) => {
            var list = [];
            for (let i = 0; i < results.rows.length; i++) {
              list.push(results.rows.item(i));
            }
            resolve(list);
          },
        );
      },
      error => reject(error.message),
    );
  });
};

//TODO: delete food from plan
const deleteFood_PlanDetail = (mealTime, fid, pid, day) => {
  console.log(day);
  return new Promise((resolve, reject) => {
    db.transaction(function (txn) {
      txn.executeSql(
        'DELETE FROM PlanDetail WHERE MealTime=? and Fid=? and Pid=? and Day=?',
        [mealTime, fid, pid, day],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            resolve('Deleted Successfully!');
          } else {
            reject('Oops! Data not Deleted.');
          }
        },
      );
    });
  });
};

//TODO: delete plan from database
const deletePlan = planid => {
  return new Promise((resolve, reject) => {
    db.transaction(
      function (txn) {
        txn.executeSql(
          'DELETE FROM Plan WHERE Pid=?',
          [planid],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              resolve('Deleted Successfully!');
            } else {
              reject('Oops! Data not Deleted.');
            }
          },
        );
        txn.executeSql(
          'DELETE FROM PlanDetail WHERE Pid=?',
          [planid],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              resolve('Deleted Successfully!');
            } else {
              reject('Oops! Data not Deleted.');
            }
          },
        );
      },
      error => reject(error.message),
    );
  });
};

//TODO: delete plan from database
const deleteActivePlan = () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      function (txn) {
        txn.executeSql('DELETE from ActivatedPlan', [], (tx, results) => {
          if (results.rowsAffected > 0) {
            resolve('Deleted Successfully!');
          } else {
            reject('Oops! Data not Deleted.');
          }
        });
      },
      error => reject(error.message),
    );
  });
};

export {
  //save
  saveFoodItems,
  savePlan,
  savePlanDetail,
  //get
  getAllFoodItemsName,
  getAllFoodItems,
  getBreakfastDetail,
  getLunchDetail,
  getDinnerDetail,
  getSnackDetail,
  getAllPlans,
  saveActivatedPlan,
  getActivatedPlan,
  //delete
  deletePlan,
  deleteFood_PlanDetail,
  deleteActivePlan,
};
