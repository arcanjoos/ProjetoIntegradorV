import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native'
import { Button } from 'react-native-elements'
import { Formik, Field } from 'formik'
import { useNavigation } from '@react-navigation/native'

import CustomHeader from '../components/Header'
import CustomInput from '../components/Input'
import CustomInputMask from '../components/InputMask'

import axios from 'axios'
import * as yup from 'yup'




import firebase from '../services/firebaseConection'

interface EnderecoProps {
    cep: string,
    logradouro: string,
    numero: string,
    complemento: string,
    bairro: string,
    cidade: string,
    estado: string,
    entrega: boolean
}

interface PessoaProps {
    nome: string,
    telefone: string,
}

interface UsuarioProps extends EnderecoProps, PessoaProps {
    senha: string,
    email: string,
}

export function Cadastro() {
    const navigation = useNavigation()

    const validationSchema = yup.object().shape({

        nome: yup
            .string()
            .required('O campo nome é obrigatório.👆'),

        email: yup
            .string()
            .email('Digite um email válido.🙁')
            .required('O campo email é obrigatório.👆'),

        telefone: yup
            .string()
            .min(9, ({ min }) => `O telefone deve ter pelo menos ${min} caracteres.🙁`)
            .required('O campo telefone é obrigatório.👆'),

        senha: yup
            .string()
            .min(6, ({ min }) => `A senha deve ter pelo menos ${min} caracteres.🙁'`)
            .required('O campo senha é obrigatório.👆'),

        logradouro: yup
            .string()
            .required('O campo logradouro é obrigatório.👆'),

        numero: yup
            .string()
            .required('O campo numero é obrigatório.👆'),

        // complemento: yup
        //     .string()
        //     .required('O campo complemento é obrigatório.👆'),

        bairro: yup
            .string()
            .required('O campo bairro é obrigatório.👆'),

        cidade: yup
            .string()
            .required('O campo cidade é obrigatório.👆'),

        estado: yup
            .string()
            .required('O campo estado é obrigatório.👆')
            .length(2, ({ length }) => `O estado deve ter ${length} caracteres.🙁'`),

        cep: yup
            .string()
            .required('O campo estado é obrigatório.👆')
        //  .length(9, ({ length }) => `O CEP deve ter ${length - 1} caracteres.`),
    })

    const [exist, setExist] = useState(false)

    const buscarCep = async (value: string, setFieldValue: any) => {
        let cep = value.replace('-', '') // remover a formatação
        if (!cep.length || cep.length !== 8) {
            Alert.alert('CEP inválido. 🙁')
        } else {
            try {
                const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
                const { logradouro, bairro, localidade: cidade, uf: estado } = data
                setFieldValue('logradouro', logradouro)
                setFieldValue('bairro', bairro)
                setFieldValue('cidade', cidade)
                setFieldValue('estado', estado)
                setFieldValue('cep', cep)
                setExist(true)
            } catch (err) {
                Alert.alert(err)
            }
        }

    }


    const cadastrar = (values: UsuarioProps) => {
        const { email, senha, nome, telefone, logradouro, numero, complemento, bairro, cidade, estado } = values

        // criar usuario no auth do firebase
        firebase.auth().createUserWithEmailAndPassword(email, senha).then(

            (data) => {

                const usuarioId = data?.user?.uid // para não aceitar valor nulo



                // criar usuario no firestore
                firebase.firestore().collection('usuario').doc(usuarioId).set({
                    nome: nome,
                    email: email,
                    telefone: telefone,
                    endereco: [{
                        entrega: true,
                        logradouro: logradouro,
                        numero: numero,
                        complemento: complemento,
                        bairro: bairro,
                        cidade: cidade,
                        estado: estado,
                    }]
                })
                navigation.navigate('Logado')

            }).catch((err) => {
                Alert.alert(err)
            })

    }

    return (

        <View style={{ flex: 1 }}>

            <CustomHeader isHome={false} navigation={navigation} title={'Cadastro de Usuários'} />

            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff', }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >

                    <Formik validationSchema={validationSchema}

                        initialValues={{
                            email: '',
                            senha: '',
                            nome: '',
                            telefone: '',
                            cep: '',
                            logradouro: '',
                            numero: '',
                            complemento: '',
                            bairro: '',
                            cidade: '',
                            estado: '',
                            entrega: true,
                        }}

                        onSubmit={(values: UsuarioProps) => {
                            cadastrar(values)
                        }}
                    >
                        {({ handleSubmit,
                            setFieldValue, // modificar valores do campo de endereco 
                            isValid // verifica se o objeto é lido

                        }) => (
                            <>
                                <Field
                                    component={CustomInput}
                                    name='nome'
                                    icon={'person'}
                                    placeholder='Nome'
                                    label='Nome'
                                />

                                <Field
                                    component={CustomInputMask}
                                    name='telefone'
                                    icon={'call'}
                                    mask="([00]) [00000]-[0000]"
                                    placeholder='Telefone'
                                    label='Telefone'
                                    keyboardType='numeric'
                                    action={() => { }}
                                />

                                <Field
                                    component={CustomInput}
                                    name='email'
                                    icon={'mail'}
                                    placeholder='Email'
                                    label='Email'
                                    keyboardType='email-address'
                                />

                                <Field
                                    component={CustomInput}
                                    name='senha'
                                    icon={'lock-open'}

                                    placeholder='Senha'
                                    label='Senha'
                                    secureTextEntry
                                />

                                <Field
                                    component={CustomInputMask}
                                    name='cep'
                                    mask="[00000]-[000]"
                                    action={(cep: string) => buscarCep(cep, setFieldValue)}
                                    icon='search'
                                    placeholder='Pesquisar'
                                    label='Pesquisar CEP'
                                />

                                {exist

                                    ?
                                    <View>
                                        <Field
                                            component={CustomInput}
                                            icon='location'
                                            name='logradouro'
                                            placeholder='Logradouro'
                                            label='Logradouro'
                                        />

                                        <Field
                                            icon='location'
                                            component={CustomInput}
                                            name='numero'
                                            placeholder='Número'
                                            label='Número'
                                        />

                                        <Field
                                            icon='location'
                                            component={CustomInput}
                                            name='complemento'
                                            placeholder='Complemento'
                                            label='Complemento'
                                        />

                                        <Field
                                            icon='location'
                                            component={CustomInput}
                                            name='bairro'
                                            placeholder='Bairro'
                                            label='Bairro'
                                        />

                                        <Field
                                            icon='location'
                                            component={CustomInput}
                                            name='cidade'
                                            placeholder='Cidade'
                                            label='Cidade'
                                        />

                                        <Field
                                            icon='location'
                                            component={CustomInput}
                                            name='estado'
                                            placeholder='Estado'
                                            label='Estado'
                                        />
                                    </View>
                                    :
                                    <View />
                                }


                                <Button buttonStyle={style.button}
                                    onPress={handleSubmit}
                                    title='Cadastrar'
                                    disabled={!isValid}
                                />

                            </>
                        )}
                    </Formik>
                </ScrollView>

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
        margin: 50,
        marginHorizontal: 30,
        justifyContent: 'center',
        marginBottom: 10,

    },

    buttonBuscarCep: {
        backgroundColor: 'red',
        borderRadius: 20,
        borderWidth: 7,
        borderColor: 'red',
        width: '100%',
        marginTop: 20,
        marginHorizontal: 30,
        justifyContent: 'center',
        marginBottom: 10,

    },

    text: {
        marginLeft: 10,
        margin: 30,
        marginBottom: -5,
        color: '#0b2031',
        fontSize: 20,
        fontWeight: 'bold'

    },

    input: {
        backgroundColor: 'white',
        textAlign: 'center',
        borderRadius: 50,
        borderWidth: 7,
        borderColor: '#DCDCDC',
        width: '100%'
    },

    textCad: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },

})