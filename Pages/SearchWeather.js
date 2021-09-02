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
import { useSelector, useDispatch } from 'react-redux';
import { searchActions } from '../store/SearchSlice';
import PreviusSearches from '../components/PreviusSearches';


export default function SearchWeather({ navigation }) {
    const search = useSelector(state => state.search);
    const dispatch = useDispatch();

    const [hasError, setHasError] = useState('');
    
    const [enteredText, setEnteredText] = useState('');
    const submitApiCallHandler = () => {

        axios.get(`${API}q=${enteredText}`).then(response => {
            setHasError('');
            const { lat, lng } = response.data.results[0].geometry;
            const { city, country, state_code } = response.data.results[0].components;
            let state = state_code;
            const { town } = response.data.results[0].components;
            const { village } = response.data.results[0].components;
            if (country !== 'Brasil' && country !== 'Brazil') {
                state = '';
            }
            const valueCity = city === undefined ? town : city;
            const isVilage = valueCity === undefined ? village : valueCity;
            const data = { city: isVilage, country, state_code: state, latitude: lat, longitude: lng };
            console.log(data);
            setEnteredText('');
            dispatch(searchActions.addSearch(data));
            navigation.navigate('Home', {
                latitude: lat,
                longitude: lng
            })
        }).catch(err => {
         
            setHasError('Sommeting went wrong, verify your text input');
            setEnteredText('');
            console.log(err.message)
        });
    }
    const submitCurrentLocationHandler = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            console.log(status);

            if (status !== 'granted') {
                throw new Error('Acess to location is needed to run the app');
            }
            setHasError('');
            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High
            });
            

            const { latitude, longitude } = location.coords;
            navigation.navigate('Home', {
                latitude,
                longitude
            })
        }
        catch (err) {
            setHasError(err.message)
            
            console.log(err.message);
        }
    }
    const getPreviusSearchWeatherHandler = (element) => {
        navigation.navigate('Home', {
            latitude: element.latitude,
            longitude: element.longitude
        })
    }
    return (
        <View>
            <View style={styles.mainPage}>
                <Text style={{ fontSize: 18, marginLeft: 10, marginBottom: 10, marginTop: 5 }}>Type your location here:</Text>
                <TextInput style={styles.inputField} label="teste" value={enteredText} onChangeText={text => setEnteredText(text)}
                />
                <View style={styles.buttonPlace}>
                    <TouchableOpacity style={styles.buttons} onPress={submitApiCallHandler}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}> Submit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={submitCurrentLocationHandler} style={styles.buttons}>

                        <MaterialCommunityIcons name="target" size={30} color='white' />

                    </TouchableOpacity>

                </View>
                <View style={{ width: '100%', height: '100%' }}>
                    {hasError.length > 0 && <Text style={{ position: 'absolute', top: 75, left: 20, fontSize: 20, fontWeight: 'bold', color: PRIMARY_COLOR }}>{hasError}</Text>}

                    {hasError === '' && search.length > 0 && <Text style={styles.previusTitle}>Previous Searches</Text>}
                    {hasError === '' && search.length > 0 && (
                        search.map(s => {

                            return (<PreviusSearches key={Math.random().toString()} city={s.city} country={s.country} state_code={s.state_code} execute={getPreviusSearchWeatherHandler.bind(null, s)} />)
                        }))

                    }
                    { hasError.length === 0 &&  search.length === 0 && <Text style={{ position: 'absolute', top: 75, left: 50, fontSize: 20, fontWeight: 'bold', color: PRIMARY_COLOR }}>No previus search was foundded</Text>}
                </View>
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

    },
    previusTitle: {
        marginLeft: 10,
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 20,

    }

})
