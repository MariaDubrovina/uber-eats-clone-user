import {FlatList, ActivityIndicator, Pressable } from 'react-native';
import { View, Text } from 'react-native';
import MenuItem from '../../components/MenuItem';
import Header from './Header';
import styles from './styles';
import { useRoute } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { Restaurant, Dish } from '../../models';
import { useBasketContext } from '../../context/BasketContext';
import { useNavigation } from "@react-navigation/native";


const RestaurantDetailsPage = () => {
    const navigation = useNavigation();
    const [restaurant, setRestaurant] = useState();
    const [dishes, setDishes] = useState([]);

    const route = useRoute();
    
    const id = route.params?.id;

    const {setRestaurant: setBasketRestaurant, basket, basketItems} = useBasketContext();

    const fetchRestaurant = async () => {
      //fetch the restaurant by id
      if (id) {
        const response = await DataStore.query(Restaurant, id);
        setRestaurant(response);

        const dishResponse = await DataStore.query(Dish, (dish) => dish.restaurantID('eq', id) );
        setDishes(dishResponse);
      }
      
    };


    useEffect(() => {
      setBasketRestaurant(null);
      fetchRestaurant();
    }, [id])

    useEffect(() => {
      setBasketRestaurant(restaurant);
      fetchRestaurant();
    }, [restaurant])

    if (!restaurant) {
      return <ActivityIndicator color='grey' size='large' style={styles.indicator} />;
    }

    return(
        
      <View style={styles.page}>
        
          <FlatList 
              ListHeaderComponent={() => <Header restaurant={restaurant}/>}
              data={dishes}
              renderItem={({item}) => <MenuItem dish={item} /> }
              showsVerticalScrollIndicator={false} 
                
            />

            {basket && (
            <Pressable onPress={() => navigation.navigate('Basket')} style={styles.button}>
                <Text style={styles.buttonText}>Open Basket ({basketItems.length})</Text>    
            </Pressable>
            )} 
         

      </View>
       
      
      
    )
};

export default RestaurantDetailsPage;

