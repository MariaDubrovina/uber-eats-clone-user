import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import RestaurantDetailsPage from '../screens/RestaurantScreen';
import OrdersScreen from '../screens/OrdersScreen';
import MenuItemScreen from '../screens/MenuItemScreen';
import Basket from '../screens/Basket';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAuthContext } from '../context/AuthContext';
import { ActivityIndicator, StyleSheet } from "react-native";
import OrderDetailsNavigator from './OrderDetailsNavigator';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const OrdersStack = createNativeStackNavigator();

const Navigation = () => {
    const {dbUser} = useAuthContext();

    if (dbUser === null) {
        return <ActivityIndicator color='grey' size='large' style={styles.indicator} />;
    }

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {dbUser ? (
                <Stack.Screen name='HomeTabs' component={MyTabs} />
            ) : (
                <Stack.Screen name='Profile' component={ProfileScreen} />
            )}
                 
        </Stack.Navigator>
    );
}

const MyTabs = () => {
    return (
      <Tab.Navigator screenOptions={{headerShown: false}} barStyle={{ backgroundColor: 'white' }}>
        <Tab.Screen 
            name="Home" 
            component={HomeStackNavigator}
            options={{tabBarIcon: ({color}) => <AntDesign name="home" size={24} color={color} />}}
            />
        <Tab.Screen 
            name="OrdersTab" 
            component={OrdersStackNavigator} 
            options={{tabBarIcon: ({color}) => <FontAwesome5 name="list-alt" size={24} color={color} />}}
            />
        <Tab.Screen 
            name="Profile" 
            component={ProfileScreen}
            options={{tabBarIcon: ({color}) => <FontAwesome5 name="user" size={24} color={color} />}}
            />
      </Tab.Navigator>
    );
  }

  const HomeStackNavigator = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name='Restaurants' component={HomeScreen} />
            <HomeStack.Screen 
                name='Restaurant' 
                component={RestaurantDetailsPage}
                options={{headerShown: false}}
                />
            <HomeStack.Screen name='Dish' component={MenuItemScreen} />
            <HomeStack.Screen name='Basket' component={Basket} />
        </HomeStack.Navigator>
    );
}

const OrdersStackNavigator = () => {
   

    return (
        <OrdersStack.Navigator>
            <OrdersStack.Screen name='Orders' component={OrdersScreen} />
            <OrdersStack.Screen 
                name='Order' 
                component={OrderDetailsNavigator}
               
                />
        </OrdersStack.Navigator>
    );
};

const styles = StyleSheet.create({
    
    indicator: {
        position: 'absolute', //to keep on the top of the page
        top: '50%',
        left: '50%',
      },
    
  });

export default Navigation;