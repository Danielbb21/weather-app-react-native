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
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchWeather from './Pages/SearchWeather';
import Home from './Pages/Home';

export default function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWheater] = useState(null);
  const [unitsSystem, setUnitsSystem] = useState('metric');
  useEffect(() => {

    load();
  }, [unitsSystem]);

  async function load() {
    setCurrentWheater(null);
    setErrorMessage(null);
    console.log('aqui123');
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log(status);

      if (status !== 'granted') {

        setErrorMessage('Acess to location is needed to run the app')
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High
      });
      console.log(location);
      const { latitude, longitude } = location.coords;


      const weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`;

      const response = await fetch(weather_url);

      const data = await response.json();

      if (response.ok) {
        setCurrentWheater(data);
      }
      else {
        setErrorMessage(data.message);
      }

    }
    catch (err) {
      setErrorMessage(err.message);
      console.log(err.message);
    }

  }
  if (currentWeather) {
    const HomePage = ({ route, navigation }) => {
      if (route.params) {
        const { latitude, longitude } = route.params;
        console.log('Latitude', latitude);
        console.log('Longitude', longitude);
      }
      return (
        <View style={styles.container}>
          <StatusBar style="auto" />

          <View style={styles.main}>
            <ReloadIcon load={load} />
            <UnitsPicker unitsSystem={unitsSystem} setUnitsSystem={setUnitsSystem} />
            <WeatherInfo currentWeather={currentWeather} />
          </View>
          <WeatherDetails currentWheater={currentWeather} unitsSystem={unitsSystem} />


        </View>

      )
    }
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();
    return (
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
        <Tab.Navigator screenOptions={({ route }) => ({
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

        </Tab.Navigator>
      </NavigationContainer>
    );
  }
  else if (errorMessage) {

    return (
      <View style={styles.container}>
        <ReloadIcon load={load} />
        <Text style={{ textAlign: 'center' }}> error: {errorMessage}</Text>

        <StatusBar style="auto" />
      </View>
    );
  }
  else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />

        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',
  },
  main: {
    justifyContent: 'center',
    flex: 1
  },

});
