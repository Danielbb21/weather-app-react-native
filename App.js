import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import WeatherInfo from './components/WeatherInfo';
import UnitsPicker from './components/UnitsPicker';
import { colors } from './utils';
import ReloadIcon from './components/ReloadIcon';
import WeatherDetails from './components/WeatherDetails';
import { WEATHER_API_KEY } from '@env';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SearchWeather from './Pages/SearchWeather';
import Home from './Pages/Home';
import { Provider } from 'react-redux';
import { store } from './store/store';

export default function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWheater] = useState(null);
  const [unitsSystem, setUnitsSystem] = useState('metric');
  
    const Stack = createNativeStackNavigator();
   
    return (
      <Provider store={store}>
        <NavigationContainer >
          {/* <View style={styles.container}>
          <StatusBar style="auto" />

          <View style={styles.main}>
            <ReloadIcon load={load} />
            <UnitsPicker unitsSystem={unitsSystem} setUnitsSystem={setUnitsSystem} />
            <WeatherInfo currentWeather={currentWeather} />
          </View>
          <WeatherDetails currentWheater={currentWeather} unitsSystem={unitsSystem} />


        </View> */}
          {/* <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused
                  ? 'home'
                  : 'home';

              } else if (route.name === 'Search') {
                iconName = focused ? 'search' : 'search';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}>
            <Tab.Screen name="Search" component={SearchWeather} />
            <Tab.Screen name="Home" component={Home} />

          </Tab.Navigator> */}
          <Stack.Navigator>
            <Stack.Screen name="Search" component={SearchWeather} />
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
 
