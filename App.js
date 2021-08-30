import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';

const WEATHER_API_KEY = '6361906f73dbe8da371a0150acc8205b';

export default function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWheater] = useState(null);
  useEffect(() =>{
    load()
  } ,[]);
  
  async function load(){
    try{
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log(status);
      if(status !== 'granted'){
        
        setErrorMessage('Acess to location is needed to run the app')
        return;
      }
      let latitude, longitude;
      // const location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.High})
      // 
      
      const weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${12.972159}&lon=${39.2674077}&appid=${WEATHER_API_KEY}`;
      
      const response = await fetch(weather_url);
                
                const data = await response.json();
                console.log('dsata', data);
                if(response.ok){
                  setCurrentWheater(data);
                }
                else{
                  setErrorMessage(data.message);
                }
    
    }
    catch(err){
      console.log(err.message);
    }
    
  }
  if(currentWeather){
    const {main: {temp}} = currentWeather;
    console.log('TEMP', temp);
   return (
      <View style={styles.container}>
        <Text> aqui: {temp}</Text>
  
        <StatusBar style="auto" />
      </View>
    );
  }
  else{
    
   return  (
      <View style={styles.container}>
        
        <Text> error: {errorMessage}</Text>
  
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    // backgroundColor: '#faf',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
