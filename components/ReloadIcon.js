import React from 'react'
import { View, Platform, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'; 
import { colors } from '../utils';
export default function ReloadIcon({load}) {
    const reloadIconName = Platform.OS === 'ios' ? 'ios-refresh' : 'md-refresh'
    return (
        <View style ={styles.reload}>
            <Ionicons name={reloadIconName} size={24} color={colors.PRIMARY_COLOR} onPress = { load}/>
        </View>
    )
}

const styles = StyleSheet.create({
    reload:{
        position: 'absolute',
        top: 100,
        right: 20
    }
})