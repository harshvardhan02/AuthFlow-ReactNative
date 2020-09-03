import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native'
import Swiper from 'react-native-swiper'
const { width, height } = Dimensions.get('window');

export default class NotificationScreen extends Component {
    render() {
        return (
            <Swiper style={styles.wrapper} showsButtons={false} horizontal={false} showsPagination={false}>
                <View style={styles.slide1}>
                    <Image style={{
                        width: width * 0.90,
                        height: height * 0.80,
                        resizeMode: 'contain',
                        borderRadius: 10
                    }} source={require('../../assets/extraction.jpg')} />
                </View>
                <View style={styles.slide2}>
                    <Image style={{
                        width: width * 0.90,
                        height: height * 0.90,
                        resizeMode: 'contain',
                        borderRadius: 10
                    }} source={require('../../assets/mirzapur.jpg')} />
                </View>
                <View style={styles.slide3}>
                    <Image style={{
                        width: width * 0.90,
                        height: height * 0.90,
                        resizeMode: 'contain',
                        borderRadius: 10
                    }} source={require('../../assets/money.jpg')} />
                </View>
            </Swiper>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {},
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    }
})
