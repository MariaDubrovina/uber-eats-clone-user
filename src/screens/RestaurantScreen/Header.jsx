import { View, Text, Image } from 'react-native';
import {Ionicons, FontAwesome} from '@expo/vector-icons';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';


const Header = ({restaurant}) => {

    const navigation = useNavigation();

    return(
        
      <View style={styles.page}>
        <Image source={{ uri:restaurant.image }}
               style={styles.image}
                />

          
          <Ionicons 
            name="arrow-back-circle" 
            size={45} color="white" 
            style={styles.iconContainer}
            onPress={() => navigation.goBack()}
          />
         

          <View style={styles.info}>
            <Text style={styles.title}>{restaurant.name}</Text>
            <Text style={styles.subtitle}>
              ${restaurant.deliveryFee.toFixed(1)} &#8226; {restaurant.minDeliveryTime}-{restaurant.maxDeliveryTime} min &#8226; {restaurant.rating.toFixed(1)}
              <FontAwesome name="star" size={14} color="orange" />
            </Text>
            
          </View>

         
          <Text style={styles.menuTitle}>Menu</Text>
          

      </View>
       
      
      
    )
};

export default Header;