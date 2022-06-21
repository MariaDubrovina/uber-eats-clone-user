import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';
import TrackingOrderOnMap from '../screens/TrackingOrderOnMap';

const Tab = createMaterialTopTabNavigator();

function OrderDetailsNavigator({route}) {
  const id = route.params?.id;

  return (
    <Tab.Navigator>
      <Tab.Screen name="Details">
          {() => <OrderDetailsScreen id={id} />}
      </Tab.Screen>
      <Tab.Screen name="Map">
      {() => <TrackingOrderOnMap id={id} />}
      </Tab.Screen> 
    </Tab.Navigator>
  );
};

export default OrderDetailsNavigator;