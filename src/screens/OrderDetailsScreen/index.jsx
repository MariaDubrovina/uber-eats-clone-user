import {FlatList, ActivityIndicator } from 'react-native';
import { View } from 'react-native';
import Header from './Header';
import styles from './styles';
import BasketItem from '../../components/BasketItem';
import { useOrderContext } from '../../context/OrderContext';
import { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';





const OrderDetailsScreen = ({id}) => {
    const [order, setOrder] = useState();
    const {getOrderById} = useOrderContext();
    
    useEffect(() => {
      getOrderById(id).then(setOrder);
  }, []);

  if (!order) {
    return <ActivityIndicator color='grey' size='large' style={styles.indicator} />;
  }

    return(
        
      <View style={styles.page}>
        
          <FlatList 
              ListHeaderComponent={() => <Header order={order}/>}
              data={order.items}
              renderItem={({item}) => <BasketItem dish={item} /> }
              showsVerticalScrollIndicator={false} 
                
            />
         

      </View>
       
      
      
    )
};

export default OrderDetailsScreen;

