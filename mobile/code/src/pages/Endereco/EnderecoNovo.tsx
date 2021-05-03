import React, { useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { Button } from 'react-native-elements';

import { Formik, Field } from 'formik'
import CustomHeader from '../../components/Header'
import CustomInput from '../../components/Input'
import CustomInputMask from '../../components/InputMask'
import { useCart } from '../../contexts/carrinhoContext'

import * as yup from 'yup'
// import style from './styles'
import axios from 'axios'

import firebase from '../../services/firebaseConection'
import { useNavigation } from '@react-navigation/native';
import { useAutenticacao } from '../../contexts/autenticacaoContext';

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



export function EnderecoNovo() {
    const navigation = useNavigation()
    const { usuario } = useAutenticacao()


    const validationSchema = yup.object().shape({

        logradouro: yup
            .string()
            .required('O campo logradouro é obrigatório'),

        numero: yup
            .string()
            .required('O campo numero é obrigatório'),

        bairro: yup
            .string()
            .required('O campo bairro é obrigatório'),

        cidade: yup
            .string()
            .required('O campo cidade é obrigatório'),

        estado: yup
            .string()
            .required('O campo estado é obrigatório')
            .length(2, ({ length }) => `O estado deve ter ${length} caracteres.`),

        // cep: yup
        //     .string()
        //     .length(9, ({ length }) => `O CEP deve ter ${length - 1 } caracteres.`),
    })

    const { limparCarrinho } = useCart()

    const buscarCep = async (value: string, setFieldValue: any) => {
        let cep = value.replace('-', '') // remover a formatação
        if (!cep.length || cep.length !== 8) {
            Alert.alert('CEP inválido')
        } else {
            try {
                const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
                const { logradouro, bairro, localidade: cidade, uf: estado } = data
                setFieldValue('logradouro', logradouro)
                setFieldValue('bairro', bairro)
                setFieldValue('cidade', cidade)
                setFieldValue('estado', estado)
                setFieldValue('cep', cep)
            } catch (err) {
                Alert.alert(err)
            }
        }

    }


    const atualizar = async (values: EnderecoProps) => {
        try {

            const { logradouro, numero, complemento, bairro, cidade, estado } = values
            await firebase.firestore().collection('usuario').doc(usuario).update({

                // para adicionar novo endereco no array
                endereco: firebase.firestore.FieldValue.arrayUnion({
                    entrega: true,
                    logradouro: logradouro,
                    numero: numero,
                    complemento: complemento,
                    bairro: bairro,
                    cidade: cidade,
                    estado: estado,
                })
            }).then(() => {
                Alert.alert('Cadastrado com sucesso')
                limparCarrinho()
                navigation.navigate('Home')
            }).catch((err) => {
                Alert.alert(err)
            })


        } catch (error) {
            Alert.alert(error)
        }
    }

    return (

        <View style={{ flex: 1 }}>

            <CustomHeader navigation={navigation} title={'Novo Endereço'} />


            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#f0f0f0', }}>
                <ScrollView showsVerticalScrollIndicator={false}    >

                    <Formik validationSchema={validationSchema}

                        initialValues={{
                            cep: '',
                            logradouro: '',
                            numero: '',
                            complemento: '',
                            bairro: '',
                            cidade: '',
                            estado: '',
                            entrega: true
                        }}

                        onSubmit={(values: EnderecoProps) => {
                            atualizar(values)
                        }}
                    >
                        {({ handleSubmit,
                            setFieldValue, // modificar valores do campo de endereco 
                            isValid // verifica se o objeto é lido

                        }) => (
                            <>

                                <Field
                                    component={CustomInputMask}
                                    name='cep'
                                    mask="[00000]-[000]"
                                    action={(cep: string) => buscarCep(cep, setFieldValue)}
                                    icon='search'
                                    placeholder='Pesquisar'
                                    label='Pesquisar CEP'
                                />


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


                                <Button
                                    buttonStyle={{ margin: 20, borderRadius: 20, padding: 10, marginBottom: 20 }}
                                    onPress={handleSubmit}
                                    title='Finalizar'
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
