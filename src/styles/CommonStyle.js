import {StyleSheet} from 'react-native';

const CommonStyle = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  rowView: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardView: {
    margin: 5,
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  textInput: {
    borderBottomColor: 'orange',
    borderBottomWidth: 1,
    flex: 1,
    marginLeft: 25,
    fontSize: 18,
    color: '#000',
    padding: 0,
  },
  btn: {
    backgroundColor: 'orange',
    width: '90%',
    height: 50,
    borderRadius: 10,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 20,
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000',
  },
  text: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 7,
  },
  text_1: {
    fontSize: 16,
  },
});

export default CommonStyle;
