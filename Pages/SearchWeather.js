import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon } from '@expo/vector-icons/build/createIconSet';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../utils/index';
import axios from 'axios';
const API = 'https://api.opencagedata.com/geocode/v1/json?key=e85809527b0341b18712ec1bacc3aab9&';
const { PRIMARY_COLOR } = colors;
import * as Location from 'expo-location';

export default function SearchWeather({ navigation }) {
    const [enteredText, setEnteredText] = useState('');
    const submitApiCallHandler = () => {
        console.log('VALUE', enteredText);
        axios.get(`${API}q=${enteredText}`).then(response => {
            console.log(response.data.results[0].geometry, response.data.results[0].components);
            const { lat, lng } = response.data.results[0].geometry
            navigation.navigate('Home', {
                latitude: lat,
                longitude: lng
            })
        }).catch(err => console.log(err.message));
    }
    const submitCurrentLocationHandler = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            console.log(status);

            if (status !== 'granted') {
                throw new Error('Acess to location is needed to run the app');
            }

            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High
            });
            console.log(location);
            const { latitude, longitude } = location.coords;
            navigation.navigate('Home', {
                latitude,
                longitude
            })
        }
        catch(err){
            console.log(err.message);
        } 
    }
    return (
        <View style={styles.mainPage}>
            <Text style={{ fontSize: 18, marginLeft: 10, marginBottom: 10, marginTop: 5 }}>Type your location here:</Text>
            <TextInput style={styles.inputField} label="teste" value={enteredText} onChangeText={text => setEnteredText(text)}
            />
            <View style={styles.buttonPlace}>
                <TouchableOpacity style={styles.buttons} onPress={submitApiCallHandler}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}> Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {submitCurrentLocationHandler} style={styles.buttons}>

                    <MaterialCommunityIcons name="target" size={30} color='white' />

                </TouchableOpacity>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainPage: {
        backgroundColor: 'white',

        width: '100%',

        height: '100%'
    },
    inputField: {
        borderWidth: 2,
        borderColor: '#D3D3D3',
        padding: 5,
        borderRadius: 8,
        width: '90%',
        marginLeft: 10
    },
    buttonPlace: {
        // flex: 1, 

        width: '90%',
        marginLeft: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    buttons: {
        marginTop: 10,
        width: 120,
        borderRadius: 10,
        backgroundColor: PRIMARY_COLOR,
        alignItems: 'center',
        justifyContent: 'center',

        padding: 10,

    }

})
