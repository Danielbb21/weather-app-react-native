import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { colors } from '../utils';
import UnitsPicker from './UnitsPicker';

const {PRIMARY_COLOR, SECONDARY_COLOR} = colors;

export default function WeatherInfo({currentWeather}) {
    const { main: { temp }, weather:[details], name } = currentWeather;
    const {icon, main, description} = details;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;
    return (
        <View style = {styles.wheatherInfo}>
            
            <Text >
                {name}
            </Text>
            <Image style = {styles.wheatherIcon} source = {{uri: iconUrl}} />
            <Text style = {styles.textPrimary} >
                {temp}°
            </Text>
            <Text style = {styles.whetherDescription}>{description}</Text>
            <Text style = {styles.textSecundary}>{main}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    wheatherInfo:{
        
        
        alignItems: 'center',
        
    },
    whetherDescription:{
        textTransform: 'capitalize',
        fontWeight: 'bold',
        
    },
    wheatherIcon:{
        width: 100,
        height: 100
    },
    textPrimary:{
        fontSize: 40,
        color: PRIMARY_COLOR
    },
    textSecundary:{
        fontSize: 20,
        color: SECONDARY_COLOR,
        fontWeight: '500',
        marginTop: 10
    }
})
