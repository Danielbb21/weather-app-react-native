import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { colors } from '../utils';
const { PRIMARY_COLOR } = colors;
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

export default function PreviusSearches({ city, country, state_code, execute }) {
    console.log('city', city);
    
    return (
        <View style={styles.component}>
            <View style={styles.searchInfo}>
                <Text style={styles.cityInfo}>
                    {city}
                </Text>

                <Text>
                    {state_code ? `${state_code}, ${country}` : `${country}`}
                  
                </Text>




            </View>
            <TouchableOpacity>
               <MaterialCommunityIcons name='arrow-right' size = {25} color = {PRIMARY_COLOR} style = {{marginRight: 10}} onPress = {execute}/>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    component: {
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 5,
        width: '90%',
        height: 75,
        backgroundColor: '#D3D3D3'
    },
    searchInfo: {
        justifyContent: 'center',
        
        marginLeft: 15,
        // justifyContent: 'center',
        
        height: '60%',
        paddingLeft: 5,
        borderLeftWidth: 3,
        borderRadius: 2,
        borderLeftColor: PRIMARY_COLOR
    },
    cityInfo: {
        fontWeight: 'bold',
    },
    otherInfo: {
        flexDirection: 'row',
    }
})