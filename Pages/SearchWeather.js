import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon } from '@expo/vector-icons/build/createIconSet';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../utils/index'
const { PRIMARY_COLOR } = colors;
export default function SearchWeather({navigation}) {
    const [enteredText, setEnteredText] = useState('');

    return (
        <View style={styles.mainPage}>
            <Text style = {{fontSize: 18, marginLeft: 10, marginBottom: 10, marginTop: 5}}>Type your location here:</Text>
            <TextInput style={styles.inputField} label="teste" value = {enteredText} onChangeText={text => setEnteredText(text)}
/>
            <View style={styles.buttonPlace}>
                <TouchableOpacity style={styles.buttons} onPress = {() => navigation.navigate('Home')}>
                    <Text style ={{color: 'white', fontWeight: 'bold', fontSize: 15}}> Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity  style={styles.buttons}>
                    
                        <MaterialCommunityIcons  name="target" size={30} color='white' />
                   
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
