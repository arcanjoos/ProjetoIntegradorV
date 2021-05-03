import React from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { Formik, Field } from 'formik'
import { useNavigation } from '@react-navigation/native'
const iconPao = require('../assets/paes-icon.png')


import CustomHeader from '../components/Header'
import CustomInput from '../components/Input'

import * as yup from 'yup'

import { save } from '../lib/storage'


import firebase from '../services/firebaseConection'
import { Image } from 'react-native-elements/dist/image/Image';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface UsuarioProps {
    senha: string,
    email: string,
}


export function Login() {

    const navigation = useNavigation()

    const validationSchema = yup.object().shape({

        email: yup
            .string()
            .email('Digite um email válido. 🙁')
            .required('O campo email é obrigatório. 👆'),
        senha: yup
            .string()
            .min(6, ({ min }) => `A senha deve ter pelo menos ${min} caracteres. 🙁`)
            .required('O campo senha é obrigatório. 👆'),
    })


    const saveLocalStorage = async (nome: string, item: string) => {
        try {
            await save(nome, item)
        } catch (error) {
            Alert.alert('Não foi possivel salvar. 😢')
            console.log(error)
        }
    }


    const xxxxxx = ({ email, senha }: UsuarioProps) => { /// mudar o nome
        firebase.auth().signInWithEmailAndPassword(email, senha)


    }

    const login = ({ email, senha }: UsuarioProps) => {
        firebase.auth().signInWithEmailAndPassword(email, senha).then(doc => {
            const { uid }: any = doc.user
            saveLocalStorage('idUsuario', uid)
            navigation.navigate('Logado');
        }).catch((err) => {
            Alert.alert(err);
        })
    }

    return (

        <View style={{ flex: 1 }}>
            <CustomHeader isHome={false} navigation={navigation} title={'Login de Usuários'} />

            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff', }}>

                <TouchableOpacity style={{ marginBottom: 25, justifyContent: 'center', alignItems: 'center'}}>
                    <Image style={{ width: 100, height: 100, }} source={iconPao} />
                </TouchableOpacity>

                <Formik validationSchema={validationSchema}

                    initialValues={{
                        email: 'joao@teste.com',
                        senha: '123456'
                    }}

                    onSubmit={({ email, senha }) => login({ email, senha })}
                >
                    {({ handleSubmit, isValid }) => (
                        <>
                            <Field
                                component={CustomInput}
                                name='email'
                                placeholder='Email'
                                label='Email'
                                icon={'mail'}
                                keyboardType='email-address'
                            />

                            <Field
                                component={CustomInput}
                                name='senha'
                                placeholder='Senha'
                                label='Senha'
                                icon={'lock-open'}
                                secureTextEntry
                            />

                            <Button buttonStyle={style.button}
                                onPress={handleSubmit}
                                title='Login'
                                disabled={!isValid}
                            />


                        </>
                    )}
                </Formik>
            </View>

        </View>
    )
}


const style = StyleSheet.create({
    button: {
        backgroundColor: 'red',
        borderRadius: 20,
        borderColor: 'red',
        height: 45,
        marginTop: 20,
        marginHorizontal: 30,
        justifyContent: 'center',
        marginBottom: 10,

    },

    text: {
        marginLeft: 10,
        margin: 50,
        marginBottom: -5,
        color: '#0b2031',
        fontSize: 20,
        fontWeight: 'bold'
    },

    textCad: {
        color: '#0b2031',
        fontSize: 30,
        fontWeight: 'bold',
    },

})