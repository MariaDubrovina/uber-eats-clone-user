import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation';
import { withAuthenticator } from "aws-amplify-react-native";
import { Amplify } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import AuthContextProvider from './src/context/AuthContext';
import BasketContextProvider from './src/context/BasketContext';
import OrderContextProvider from './src/context/OrderContext';
Amplify.configure({...awsconfig, Analytics: {disabled: true}});


function App() {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <BasketContextProvider>
          <OrderContextProvider>
            <Navigation />
          </OrderContextProvider>
        </BasketContextProvider>
      </AuthContextProvider>
        <StatusBar style="auto" />
        
    </NavigationContainer>
  );
}

export default withAuthenticator(App);


