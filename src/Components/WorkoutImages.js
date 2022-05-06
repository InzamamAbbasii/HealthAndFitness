const getImage = key => {
  switch (key) {
    case 1:
      return require('../assets/images/exercises/1.jpg');
    case 2:
      return require('../assets/images/exercises/2.jpg');
    case 3:
      return require('../assets/images/exercises/3.jpg');
    case 4:
      return require('../assets/images/exercises/4.jpg');
    case 5:
      return require('../assets/images/exercises/5.jpg');
    case 6:
      return require('../assets/images/exercises/6.jpg');
    case 7:
      return require('../assets/images/exercises/7.jpg');
    case 8:
      return require('../assets/images/exercises/8.jpg');
    case 9:
      return require('../assets/images/exercises/9.jpg');
    case 10:
      return require('../assets/images/exercises/10.jpg');
    case 11:
      return require('../assets/images/exercises/11.jpg');
    case 12:
      return require('../assets/images/exercises/12.jpg');
    default:
      return require('../assets/images/exercises/notfound.png');
  }
};

export {getImage};
