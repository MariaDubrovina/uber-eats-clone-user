import { StyleSheet, Text, View, Image } from 'react-native';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MenuItem = ({ dish }) => {

  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('Dish', {id: dish.id});
  };

    return(
        <Pressable onPress={onPress} style={styles.container}>
                
            <Text style={styles.title}>{dish.name}</Text>
            <Text style={styles.description}>{dish.description} </Text>    
            <Text style={styles.price}>${dish.price}</Text>
          
        </Pressable>
     
    )
};

export default MenuItem;

const styles = StyleSheet.create({
    container: {
      borderBottomColor: 'lightgrey',
      borderBottomWidth: 1,
      paddingVertical: 20,
      marginHorizontal: 15
    },
   
    title: {
      fontSize: 17,
      fontWeight: '600',
      letterSpacing: 0.5
      
    },
    description: {
      color: 'grey',
      marginVertical: 5    
    },
  
  });