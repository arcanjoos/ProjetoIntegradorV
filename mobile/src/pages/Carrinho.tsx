import React, { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { Button } from 'react-native-elements'
import { Modal, Portal, Card, TextInput, Chip, Paragraph } from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useCart } from '../contexts/carrinhoContext'
import Header from '../components/Header'
import firebase from '../services/firebaseConection'
import { useNavigation } from '@react-navigation/core'
import { CardProdutoCarrinho } from '../components/CardProdutoCarrinho'
import { useAutenticacao } from '../contexts/autenticacaoContext'

interface ProdutoProps {
    id?: string, // ?opcional
    nome: string,
    quantidade: number,
    preco: number,
}

export function Carrinho() {

    const navigation = useNavigation()
    const { usuario } = useAutenticacao()
    const { adicionar, remover, carrinho, total, removerItem } = useCart()

    const [observacao, setObservacao] = useState<string>('')
    const [formaPagamento, setFormaPagamento] = useState<string>('')

    const [selectFormaPagamento, setSelectFormaPagamento] = useState<boolean>(true)
    const [visible, setVisibilidadeModal] = useState<boolean>(false);
    // const [icon, setIcon] = useState('chevron-up-circle-outline')

    // const trocaIcon = (icon: boolean) => {
    //     icon ? setIcon('chevron-up-circle-outline')
    //         : setIcon('chevron-down-circle-outline')
    //     setCardVisible(icon)
    // }

    const selecionarformaPagamento = () => {
        setSelectFormaPagamento(!visible)
    }


    const visibilidadeModal = () => {
        setVisibilidadeModal(!visible)
    }


    const onChangeFormaPagamento = (txt: string) => {
        setFormaPagamento(txt)
        setSelectFormaPagamento(!selectFormaPagamento)

    }

    const onChange = (txt: string) => {
        setObservacao(txt)
    }


    async function finalizar() {
        let novoCarrinho = [] as ProdutoProps[];

        const dataAtual = new Date() // para salvar como timestamp

        carrinho.map((x: any) => {
            novoCarrinho.push(
                { id: x.id, nome: x.nome, quantidade: x.quantidade, preco: x.preco }) // pra pegar só nome e quantidade
        })

        const dados = {
            idCliente: usuario,
            data: dataAtual,
            itens: novoCarrinho,
            observacao: observacao,
            formaPagamento: formaPagamento,
            finalizado: false
        }

        await firebase.firestore().collection('pedido').add(dados)
            .catch((err: any) => {
                Alert.alert(err)
            })

        setVisibilidadeModal(false)

        Alert.alert('Pedido cadastrado com sucesso')
        navigation.navigate('EnderecoPadrao', { idCliente: dados.idCliente })
    }


    if (!carrinho || carrinho.length === 0) {
        return (
            <View style={{ flex: 1 }}>
                <Header navigation={navigation} isHome={true} title={'Carrinho'} />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 25 }}>Carrinho Vazio</Text>
                    <Text style={{ fontSize: 28 }}>{'😋'}</Text>
                </View>
            </View>

        )
    }

    return (
        <View style={{ flex: 1, }}>
            <Header navigation={navigation} isHome={true} title={'Carrinho'} />

            <FlatList
                data={carrinho}
                showsVerticalScrollIndicator={false}
                keyExtractor={(data) => data.id}
                renderItem={({ item }) => (
                    <CardProdutoCarrinho
                        renderItem={item}
                        adicionar={() => adicionar(item)}
                        remover={() => remover(item)}
                        deletar={() => removerItem(item)}
                    />
                )}
            />




            <Portal>
                <Modal visible={visible} onDismiss={visibilidadeModal} contentContainerStyle={style.input}>
                    <View style={{ height: 50, marginLeft: 20, marginTop: 40 }}>
                        <Text style={{ fontSize: 18, color: '#000', fontWeight: 'bold' }}>Valor Total da Compra </Text>
                        <Text style={{ color: 'red', fontWeight: 'bold' }}>{total.toFixed(2).replace('.', ',')} </Text>
                    </View>

                    <View style={{ margin: 10 }}>
                        {/* <View style={{ height: 250 }}> */}
                        <TextInput
                            mode='outlined'
                            // name='obsevacao'
                            placeholder='Observação'
                            style={style.input}
                            value={observacao}
                            onChangeText={(txt) => onChange(txt)}
                        />
                        <Paragraph style={{ marginBottom: 20, fontSize: 15 }}>Selecione a forma de pagamento</Paragraph>
                        {/* <View style={{ }}> */}
                        <View style={{ margin: 10, flexDirection: 'row' }}>
                            <Chip selected={selectFormaPagamento} selectedColor='#0b2031' style={{ marginHorizontal: 10 }} icon='information' onPress={() => onChangeFormaPagamento('Dinheiro')}>Dinheiro</Chip>
                            <Chip selected={!selectFormaPagamento} style={{ marginHorizontal: 10 }} icon='information' onPress={() => onChangeFormaPagamento('Cartão')}>Cartão</Chip>
                        </View>
                        <Button title='Finalizar' buttonStyle={{ marginTop: 10, borderRadius: 20, padding: 10, paddingHorizontal: 10 }} onPress={finalizar} />

                    </View>

                </Modal>
            </Portal>
            <Button title='Dados para entrega' buttonStyle={{ margin: 10, borderRadius: 20, padding: 10, paddingHorizontal: 10 }} onPress={visibilidadeModal} />

        </View >
    )
}

const style = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        textAlign: 'center',
        padding: 10,
        // marginTop: 20,
        margin: 10,
        borderRadius: 50,
        borderWidth: 0.1,
        borderColor: 'transparent',
        // height: 40,
    },
})