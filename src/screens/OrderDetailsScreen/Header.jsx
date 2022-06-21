import { View, Text, Image } from 'react-native';
import {Ionicons, FontAwesome} from '@expo/vector-icons';
import styles from './styles';


const Header = ({order}) => {
    return(
        
      <View style={styles.page}>
        <Image source={{ uri:order.Restaurant.image }}
               style={styles.image}
                />

          
          <Ionicons name="arrow-back-circle" size={45} color="white" style={styles.iconContainer} />
         

          <View style={styles.info}>
            <Text style={styles.title}>{order.Restaurant.name}</Text>
            <Text style={styles.subtitle}>
              {order.status} &#8226; {order.createdAt}
            </Text>
            
          </View>

         
          <Text style={styles.menuTitle}>Your Order</Text>
          

      </View>
       
      
      
    )
};

export default Header;

