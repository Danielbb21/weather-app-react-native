import React from 'react'
import { View, StyleSheet, Platform  } from 'react-native'
import {Picker} from '@react-native-community/picker';

export default function UnitsPicker({unitsSystem, setUnitsSystem}) {
    
    return (
        <View style= {styles.main}>
            <Picker selectedValue = {unitsSystem} onValueChange= {(item) => setUnitsSystem(item)} mode="dropdown" itemStyle={{fontSize: 12}}>
                <Picker.Item label = "C°" value = "metric" />
                <Picker.Item label = "F°" value = "imperial" />
            </Picker>
            
        </View>
    )
}

const styles = StyleSheet.create({
    main:{
        position: 'absolute',
        ...Platform.select({
            ios: {
                top: 20
            },
            android:{
                top: 30,
                
            }
        
        }),
        color: 'red',
        height: 50,
        
        left: 20,
        width: 100
    }
})