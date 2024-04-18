import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomePage from './src/screens/HomePage';
import ProductPage from './src/screens/ProductPage';
import CartPage from './src/screens/CartPage';
import {Provider} from 'react-redux';
import { MyStore } from './src/redux/MyStore';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';


const Stack = createNativeStackNavigator();

const App = () => {
  let persistor = persistStore(MyStore);
  return (
    <Provider store={MyStore}>
      <PersistGate persistor={persistor}>
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }} />
          <Stack.Screen name="Redux Toolkit Demo" component={ProductPage} options={{ headerShown: false }} />
          <Stack.Screen name="CartPage" component={CartPage} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
