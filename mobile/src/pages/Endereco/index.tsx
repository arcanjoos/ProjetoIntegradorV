import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { useCart } from '../../contexts/carrinhoContext'
import Header from '../../components/Header'
import { useNavigation } from '@react-navigation/native'

export function Endereco() {

    const navigation = useNavigation()

    return (
        <View style={{ flex: 1 }}>
            <Header navigation={navigation} title={'Endereço de Entrega'} />


            <View style={styles.containerInsert}>

                <Button title="Endereço Padrão" buttonStyle={styles.button} onPress={() => navigation.navigate('EnderecoPadrao')} />

                <Button title="Cadastrar novo endereço" buttonStyle={styles.button} onPress={() => navigation.navigate('EnderecoNovo')} />

            </View>


        </View>

    )

}


const styles = StyleSheet.create({
    containerInsert: {
        flex: 1,
        // width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#DDD"
    },
    input: {
        fontSize: 15,
        height: 50,
        borderWidth: 5,
        borderRadius: 15,
        marginBottom: 15,
        paddingHorizontal: 25,
        borderColor: "#0B2031",
    },
    button: {
        // backgroundColor: '#2089dc',
        // borderRadius: 5,
        // borderWidth: 10,
        borderColor: '#2089dc',
        width: 300,
        // margin: 100,
        padding: 10,
        height: 50,
        // width: '100%',
        marginHorizontal: 30,
        justifyContent: 'center',
        marginBottom: 5,
        backgroundColor: "#2089dc",

        borderRadius: 20,
        //  padding: 10

    },

    text: {
        marginLeft: 10,
        margin: 30,
        marginBottom: -5,
        color: '#0b2031',
        fontSize: 20,
        fontWeight: 'bold'

    },

    // input: {
    //     backgroundColor: 'white',
    //     textAlign: 'center',
    //     borderRadius: 50,
    //     borderWidth: 7,
    //     borderColor: '#DCDCDC',
    //     width: '100%'
    // },
})