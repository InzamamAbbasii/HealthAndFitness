import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({
  name: 'HealthAndFitnessDB.db',
  createFromLocation: 1,
});

// TODO: getting list of all exercises detail from database (Exercise Table)
const getAllExercises = () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      function (txn) {
        txn.executeSql('select * from Exercises', [], (tx, results) => {
          var exercisesList = [];
          for (let i = 0; i < results.rows.length; i++) {
            exercisesList.push(results.rows.item(i));
          }
          resolve(exercisesList);
        });
      },
      error => reject(error.message),
    );
  });
};

// TODO: getting single exercise detail from database (Exercise Table)
const getSingleExercise = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      function (txn) {
        txn.executeSql('select * from Exercises Where Id=?', [id], (tx, results) => {
          resolve(results.rows.item(0));
        });
      },
      error => reject(error.message),
    );
  });
};

export {getAllExercises,getSingleExercise};
