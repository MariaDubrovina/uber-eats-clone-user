import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import BasketItem from '../../components/BasketItem';
import { useBasketContext } from '../../context/BasketContext';
import { useOrderContext } from '../../context/OrderContext';
import { useNavigation } from "@react-navigation/native";


const Basket = () => {
    const {restaurant, basketItems, subtotalPrice, totalPrice} = useBasketContext();
    const {createNewOrder} = useOrderContext();
    const navigation = useNavigation();

    const onCreateOrder = async () => {
        const newOrder = await createNewOrder();
        navigation.navigate('OrdersTab', {
            screen: "Order",
            params: { id: newOrder.id },
          })
    };

    return(
        <View style={styles.container}>
                
            <Text style={styles.title}>{restaurant?.name}</Text>
            <Text style={styles.subtitle}>Your Items </Text> 
            <FlatList 
                data={basketItems}
                renderItem={({item}) => <BasketItem dish={item}/> }
                showsVerticalScrollIndicator={false}
            />  
            <View style={styles.devider}></View>
            <View style={styles.row}>
                <Text style={styles.subtitle}>Subtotal </Text>
                <Text style={styles.price}>${subtotalPrice.toFixed(1)} </Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.subtitle}>Total </Text>
                <Text style={styles.price}>${totalPrice.toFixed(1)} </Text>
            </View>

            <Pressable onPress={onCreateOrder} style={styles.button}>
                <Text style={styles.buttonText}>Create Order</Text>    
            </Pressable>    
        </View>
     
    )
};

export default Basket;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      paddingVertical: 50,
      paddingLeft: 10,
      paddingRight: 10
      
    },
   
    title: {
      fontSize: 30,
      fontWeight: 'bold',   
    },
    subtitle: {
      fontSize: 20,
      color: 'black',
      marginVertical: 15    
    },
    devider: {
        height: 1,
        backgroundColor: 'lightgrey',
        marginVertical: 10
    },
   
    quantity: {
        fontSize: 25,
        marginHorizontal: 29
    },
    button: {
        backgroundColor: 'black',
        marginTop: 20,
        padding: 20,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    price: {
        marginLeft: 'auto',
        fontSize: 17,
      }
  
  });