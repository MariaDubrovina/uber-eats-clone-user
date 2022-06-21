import { StyleSheet, Text, View, Image } from 'react-native';

const BasketItem = ({ dish }) => {
    return(
        <View style={styles.container}>
            <View>  
              <Text style={styles.quantityContainer}>{dish.quantity}</Text>
            </View> 
            <Text style={styles.dishTitle}>{dish.Dish.name} </Text>    
            <Text style={styles.price}>${dish.Dish.price}</Text>
          
        </View>
     
    )
};

export default BasketItem;

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
      paddingHorizontal: 15
    },
   
    quantityContainer: {
      
      backgroundColor: 'lightgrey',
      paddingHorizontal:7,
      paddingVertical: 2,
      borderRadius: 2
      
    },
    dishTitle: {
      fontSize: 17,
      paddingHorizontal: 10,
      fontWeight: 'bold',
      letterSpacing: 0.5    
    },
    price: {
      marginLeft: 'auto',
      fontSize: 17,
    }
  
  });