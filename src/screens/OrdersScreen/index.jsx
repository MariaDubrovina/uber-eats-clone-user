import {FlatList } from 'react-native';
import { View, StyleSheet } from 'react-native';
import OrderDish from '../../components/OrderDish';
import { useOrderContext } from '../../context/OrderContext';

const OrdersScreen = () => {
  const {orders} = useOrderContext();

    return(
      <View style={styles.page}>
        <FlatList 
        data={orders}
        renderItem={({item}) => <OrderDish order={item}/> }
        showsVerticalScrollIndicator={false}
      />
      </View> 
    )
};

export default OrdersScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    width: '100%',
    
  },

});