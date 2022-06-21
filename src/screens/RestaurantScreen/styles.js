import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    page: {
        flex: 1,    
      },
    info: {
     padding: 15,
     borderBottomColor: 'lightgrey',
      borderBottomWidth: 1,
    },
    menuTitle: {
      color: 'grey',
      fontSize: 18,
      paddingLeft: 15,
      paddingTop: 15
    },
   
    image: {
      width: '100%',
      aspectRatio: 5 / 3,
      
    },
    iconContainer: {
      position: 'absolute', //to keep on the top of the page
      top: 40,
      left: 15,
      borderRadius: 50
    },
    title: {
      fontSize: 35,
      fontWeight: '600',
      marginVertical: 5
    },
    subtitle: {
      color: 'grey',
      fontSize: 15,
    },
    indicator: {
      position: 'absolute', //to keep on the top of the page
      top: '50%',
      left: '50%',
    },
    button: {
      backgroundColor: 'black',
      marginTop: 'auto',
      padding: 20,
      alignItems: 'center'
  },
  buttonText: {
      color: 'white',
      fontSize: 20,
  },
  
  });