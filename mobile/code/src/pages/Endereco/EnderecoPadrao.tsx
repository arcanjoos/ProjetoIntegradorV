import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { View, Text, Alert, } from 'react-native'
import { Button } from 'react-native-elements'
import { Card, Title, Switch, } from 'react-native-paper'

import { useCart } from '../../contexts/carrinhoContext'
import { useAutenticacao } from '../../contexts/autenticacaoContext'
import Header from '../../components/Header'

import firebase from '../../services/firebaseConection'
import { useNavigation } from '@react-navigation/native'
import { CardEndereco } from '../../components/CardEndereco'


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

export function EnderecoPadrao() {
    const navigation = useNavigation()

    const { limparCarrinho } = useCart()
    const { usuario } = useAutenticacao()

    // const [endereco, setEndereco] = useState<EnderecoProps>()

    const [enderecoFiltrado, setEnderecoFiltrado] = useState([])

    const getEnderecoUsuario = async () => {
        try {
            await firebase.firestore().collection('usuario').doc(usuario).onSnapshot((onSnapshot) => {

                const { endereco }: any = onSnapshot.data(); // pra pegar só o endereço

                setEnderecoFiltrado(endereco)
            })
        } catch (error) {
            console.log(error)
        }
    }


    const atualizarEndereco = async (endereco: any) => {
        await firebase.firestore().collection('usuario')
            .doc(usuario).update({
                endereco
            })
    }

    const finalizar = async () => {

        await atualizarEndereco(enderecoFiltrado)

        Alert.alert('Salvo com sucesso')
        limparCarrinho()
        navigation.navigate('Home')
    }

    useEffect(() => {
        getEnderecoUsuario()
    }, [])


    const setCheck = async (index: any) => {
        const enderecoAtualizado = [] as any
        // pra verificar se tem mais de um endereco de entrega
        let contador = 0

        enderecoFiltrado.map((x: any, i: number) => {

            let { entrega } = x

            {
                i !== index
                    ? //if
                    enderecoAtualizado.push(x)
                    :  // else
                    enderecoAtualizado.push({ ...x, entrega: !entrega })
            }
        })

        enderecoAtualizado.map((x: any) => {

            let { entrega } = x

            if (entrega == true) {
                contador++
            }

            if (contador > 1) {
                Alert.alert('Selecione apenas um endereço para entrega')
                setCheck(false)

            } else if (contador < 0) {
                Alert.alert('Selecione um endereço para entrega')

            }

        })

        setEnderecoFiltrado(enderecoAtualizado)
    }


    const Item = ({ item, index }: { item: EnderecoProps, index: number }) => {
        const { logradouro, numero, complemento, bairro, cidade, estado, entrega } = item

        return (
            <Card style={{ flex: 1, justifyContent: 'center', alignContent: 'center', margin: 10, padding: 20 }}>

                {entrega ? <Title>Endereco de Entrega</Title>
                    : <View />
                }
                <Text>{logradouro} nº {numero}, {complemento}</Text>
                <Text>{bairro}, {cidade}, {estado} </Text>

                <Text> {entrega}</Text>

                {/* <CheckBox
                    center
                    title='Endereço Atual de Entrega'
                    checked={entrega}
                    onPress={() => setCheck(index)}
                /> */}


                <Switch color={'#E22C43'} value={entrega} onValueChange={() => setCheck(index)} />

                {entrega ?
                    <Button title="Finalizar" buttonStyle={{ marginTop: 15 }} onPress={finalizar} />
                    : <View />
                }
            </Card>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#f0f0f0'}}>
            <Header navigation={navigation} title={'Finalizar'} />

            <FlatList
                showsVerticalScrollIndicator={false}
                data={enderecoFiltrado}
                renderItem={({ item, index }: any) => (<CardEndereco renderItem={item} action={() => setCheck(index)} finalizar={() => finalizar()} />)}
                keyExtractor={({ id }: any) => id}
            />

            <Button title="Cadastrar Novo Endereço" buttonStyle={{  margin : 20,marginTop: 15, borderRadius: 20, padding: 10 }} onPress={() => navigation.navigate('EnderecoNovo')} />

        </View>

    )
}