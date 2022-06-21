import {FlatList } from 'react-native';
import RestaurantItem from '../../components/RestaurantItem';
import { View, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { Restaurant } from '../../models';

const HomeScreen = () => {

    const [restaurants, setRestaurants] = useState([]);

    const fetchRestaurants = async () => {
      const response = await DataStore.query(Restaurant);
      setRestaurants(response);
    };

    useEffect(() => {
      fetchRestaurants();
    }, [])

    return(
      <View style={styles.page}>
        <FlatList 
        data={restaurants}
        renderItem={({item}) => <RestaurantItem restaurant={item}/> }
        showsVerticalScrollIndicator={false}
      />
      </View> 
    )
};

export default HomeScreen;

const styles = StyleSheet.create({
  page: {
    padding: 10
  },

});