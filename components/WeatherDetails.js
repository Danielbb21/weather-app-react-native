import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from '../utils'
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
const { PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR } = colors;

export default function WeatherDetails({ currentWheater, unitsSystem }) {
    const {
        main: { feels_like, humidity, pressure },
        wind: {speed},

    } = currentWheater;
    const windSpeed = unitsSystem === 'metric' ? `${Math.round(speed)} m/s` : `${Math.round(speed)} miles/h`;

    return (
        <View style={styles.wheatherDetails}>
            <View style={styles.wheatherDetailsRow}>
                <View style={{ ...styles.wheatherDetailsBox, borderRightWidth: 1, borderRightColor: BORDER_COLOR }}>
                    <View style={styles.wheatherDetailsRow}>
                        <FontAwesome5 name="temperature-low" size={25} color={PRIMARY_COLOR} />
                        <View style = {styles.wheatherDetailsItems}>
                            <Text >Feells Like: </Text>
                            <Text style = {styles.textSecondary}>{feels_like}°</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.wheatherDetailsBox}>

                <View style={styles.wheatherDetailsRow}>
                        <MaterialCommunityIcons name="water" size={30} color={SECONDARY_COLOR} />
                        <View style = {styles.wheatherDetailsItems}>
                            <Text >Humidity: </Text>
                            <Text style = {styles.textSecondary}>{humidity}%</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{...styles.wheatherDetailsRow, borderTopColor: BORDER_COLOR, borderTopWidth: 1}}>
                <View style={{ ...styles.wheatherDetailsBox, borderRightWidth: 1, borderRightColor: BORDER_COLOR }}>
                    <View style={styles.wheatherDetailsRow}>
                        <MaterialCommunityIcons name = "weather-windy"  size = {30} color = {PRIMARY_COLOR}/>
                        <View style = {styles.wheatherDetailsItems}>
                            <Text >Wind speed: </Text>
                            <Text style = {styles.textSecondary}>{windSpeed}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.wheatherDetailsBox}>

                <View style={styles.wheatherDetailsRow}>
                        <MaterialCommunityIcons name="speedometer" size={30} color={PRIMARY_COLOR} />
                        <View style = {styles.wheatherDetailsItems}>
                            <Text >Presure: </Text>
                            <Text style = {styles.textSecondary}>{pressure} hPa</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wheatherDetails: {
        marginTop: 'auto',
        margin: 25,
        borderWidth: 1,
        borderColor: BORDER_COLOR,
        borderRadius: 10,
    },
    wheatherDetailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    wheatherDetailsBox: {
        flex: 1,
        padding: 20
    },
    wheatherDetailsItems:{
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    textSecondary:{
        color: SECONDARY_COLOR,
        fontSize: 15,
        fontWeight: '700',
        margin: 7
    }
})