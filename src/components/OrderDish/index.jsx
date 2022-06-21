import { Text, View, Image } from 'react-native';
import { Pressable } from 'react-native';
import styles from "./styles";
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { OrderItem } from '../../models';
import { DataStore } from 'aws-amplify';


const OrderDish = ({ order }) => {
    const [orderItems, setOrderItems] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        DataStore.query(OrderItem, (oi) => oi.orderID('eq', order.id)).then(setOrderItems);
    }, []);
    
    const onPress = () => {
        navigation.navigate('Order', {id: order.id});
      };

    return(
        <Pressable onPress={onPress} style={styles.root}>
        <Image style={styles.image} source={{ uri: order.Restaurant.image}} />

        <View style={styles.rightContainer}>
            <Text style={styles.title} numberOfLines={3} >{order.Restaurant.name}</Text>           
            <Text style={styles.price}>{orderItems.length} items &#8226; ${order.total.toFixed(1)}</Text>
            <Text style={styles.date}>{order.createdAt} &#8226; {order.status}</Text>
        </View>
    </Pressable>
    )
};

export default OrderDish;

