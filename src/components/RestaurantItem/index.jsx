import { StyleSheet, Text, View, Image } from 'react-native';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RestaurantItem = ({ restaurant }) => {

  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('Restaurant', {id: restaurant.id});
  };


    return(
        <Pressable onPress={onPress} style={styles.restaurantContainer}>
        <Image source={{ uri:restaurant.image }}
               style={styles.image} />
        <View style={styles.row}>
          <View>
            <Text style={styles.title}>{restaurant.name}</Text>
            <Text style={styles.subtitle}>${restaurant.deliveryFee.toFixed(1)} &#8226; {restaurant.minDeliveryTime}-{restaurant.maxDeliveryTime} min</Text>
          </View>

          <View>
            <Text style={styles.rating}>{restaurant.rating.toFixed(1)}</Text>
          </View>

        </View>
      </Pressable>
    )
};

export default RestaurantItem;

const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      justifyContent: "space-between",
    },
    rating: {
      textAlign: 'center',
      textAlignVertical: 'center',
      backgroundColor: 'lightgray',
      width: 30,
      height: 30,
      borderRadius: 20,
      
    },
    restaurantContainer: {
      width: '100%',
      marginVertical: 10
    },
    image: {
      width: '100%',
      aspectRatio: 5 / 3,
      marginBottom: 5
    },
    title: {
      fontSize: 16,
      fontWeight: '500',
      marginVertical: 5
    },
    subtitle: {
      color: 'grey',
      
    },
  
  });