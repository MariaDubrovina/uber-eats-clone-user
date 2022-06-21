import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { Pressable } from 'react-native';
import { DataStore } from 'aws-amplify';
import { Dish } from '../../models';
import { useRoute } from '@react-navigation/native';
import { useBasketContext } from '../../context/BasketContext';
import { useNavigation } from "@react-navigation/native";
import { Alert } from 'react-native';

const MenuItemScreen = () => {
    const [quantity, setQuantity] = useState(1);
    const [dish, setDish] = useState();

    const route = useRoute();
    
    const id = route.params?.id;

    const {addItemToBasket} = useBasketContext();
    const navigation = useNavigation();

    useEffect(() => {
        if (id) {
            DataStore.query(Dish, id).then(setDish);
        }
       
    }, [id]);

    const addToBasket = async () => {
        await addItemToBasket(dish, quantity);
        Alert.alert('Done',
         'Meal added to the Basket',
         [
           
            { text: "OK", onPress: () => navigation.goBack() }
          ]);
    };

    const onMinus = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
        
    };

    const onPlus = () => {
        setQuantity(quantity + 1);
    };

    const totalPrice = () => {
        return (quantity*dish.price).toFixed(2); // 2 digits after dot
    };

    if (!dish) {
        return <ActivityIndicator color='grey' size='large' style={styles.indicator} />;
      }

    return(
        <View style={styles.container}>
                
            <Text style={styles.title}>{dish.name}</Text>
            <Text style={styles.description}>{dish.description} </Text>    
            <View style={styles.devider}></View>

            <View style={styles.row}>
                <AntDesign name="minuscircleo" size={50} color="black" onPress={onMinus} />
                <Text style={styles.quantity}>{quantity}</Text>
                <AntDesign name="pluscircleo" size={50} color="black" onPress={onPlus} />
            </View>

            <Pressable onPress={addToBasket} style={styles.button}>
                <Text style={styles.buttonText}>Add {quantity} to basket (${totalPrice()})</Text>    
            </Pressable>    
        </View>
     
    )
};

export default MenuItemScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      paddingVertical: 50,
      paddingHorizontal: 15
      
    },
   
    title: {
      fontSize: 30,
      fontWeight: 'bold',   
    },
    description: {
      fontSize: 20,
      color: 'grey',
      marginVertical: 5    
    },
    devider: {
        height: 1,
        backgroundColor: 'lightgrey',
        marginVertical: 10
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40
    },
    quantity: {
        fontSize: 25,
        marginHorizontal: 29
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
    indicator: {
        position: 'absolute', //to keep on the top of the page
        top: '50%',
        left: '50%',
    }
  
  });