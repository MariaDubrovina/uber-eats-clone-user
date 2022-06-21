import { View, useWindowDimensions } from "react-native";
import MapView, {Marker} from "react-native-maps";
import { useState, useEffect} from 'react';
import { DataStore } from 'aws-amplify';
import { Order, Driver } from '../../models';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRef } from "react";


const TrackingOrderOnMap = ({id}) => {
    const [order, setOrder] = useState(null);
    const [driver, setDriver] = useState(null);
    const {width, height} = useWindowDimensions();

    const mapRef = useRef(null);


    useEffect(() => {
        DataStore.query(Order, id).then(setOrder);
    },[]);

    useEffect(() => {
        if (!order) {
          return;
        }
        const subscription = DataStore.observe(Order, order.id).subscribe((msg) => {
          if (msg.opType === "UPDATE") {
            setOrder(msg.element);
          }
        });
    
        return () => subscription.unsubscribe();
      }, [order]);
    

    useEffect(() => {
        if (order?.orderDriverId) {
            DataStore.query(Driver, order.orderDriverId).then(setDriver); 
        };

    },[order?.orderDriverId]);

    useEffect(() => {
        if (driver?.lng && driver?.lat) {
          mapRef.current.animateToRegion({
            latitude: driver.lat,
            longitude: driver.lng,
            latitudeDelta: 0.007,
            longitudeDelta: 0.007,
          });
        }
      }, [driver?.lng, driver?.lat]);

      

  useEffect(() => {
    if (!driver) {
      return;
    }
    const subscription = DataStore.observe(Driver, driver.id).subscribe(
      (msg) => {
        if (msg.opType === "UPDATE") {
          setDriver(msg.element);
        }
      }
    );
    return () => subscription.unsubscribe();
  }, [driver]);

    

    return (
        <View style={{flex:1 }}>
            <MapView style={{width, height}} ref={mapRef} >
               {driver?.lat && (
                    <Marker
                    coordinate={{
                        latitude: driver?.lat,
                        longitude: driver?.lng,
                    }}
                    title={driver.name}
                    
                >
                    <View style={{backgroundColor: "green", padding: 5, borderRadius: 20}}>
                        <FontAwesome5 name="car" size={24} color="white" />                      
                    </View>
                </Marker>
               )}
               
               
                 
            </MapView>
        </View>
    );
};

export default TrackingOrderOnMap;