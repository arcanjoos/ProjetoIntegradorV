
import * as React from 'react';
import { StyleSheet, View, Text, ImageBackground, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome'
const imagemFundo = require('../assets/imagemFundo/fundo.jpeg')

export function Inicio() {
    const navigation = useNavigation()

    return (
        <View style={style.container}>
            <ImageBackground
                source={imagemFundo}
                style={style.image}
            >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                    <View style={{ marginBottom: 10 }}>
                        <Text style={style.text}>Padaria </Text>
                        <Text style={style.text}>Delivery</Text>

                    </View>
                    <View style={{ margin: 40 }}>
                        <Icon name='coffee' size={60} color='#ffffff' />
                    </View>

                    <View style={{ marginBottom: 1 }}>

                        <Button buttonStyle={style.button} title="Entrar com email" onPress={() => navigation.navigate('Login')} />
                    </View>

                    <View style={{ marginBottom: -40 }}>
                        <Button buttonStyle={style.buttonCadastro} title="Criar conta gratuita" onPress={() => navigation.navigate('Cadastro')} />
                    </View>
                </View>

            </ImageBackground>
        </View>
    );
}



const style = StyleSheet.create({
    button: {
        backgroundColor: '#f00',
        borderRadius: 100,
        borderWidth: 8,
        borderColor: '#f00',
        width: 300,
        margin: 1,
        justifyContent: 'center',
        // marginBottom: -15

    },
    buttonGoogle: {
        backgroundColor: 'transparent',
        borderRadius: 20,
        // borderWidth: 7,
        borderColor: 'white',
        width: 300,
        height: 45,
        // margin: 100,
        marginTop: 100,
        marginLeft: 15,

        justifyContent: 'center',
        marginBottom: 20,
    },

    buttonCadastro: {
        backgroundColor: 'transparent',
        borderRadius: 100,
        borderWidth: 5,
        borderColor: 'transparent',
        width: 300,
        margin: 1,
        justifyContent: 'center',

    },

    text: {
        color: 'white',
        fontSize: 50,
        fontWeight: 'bold'


    },

    container: {
        flex: 1,
        flexDirection: 'column'
    },

    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: 'center'
    },

})