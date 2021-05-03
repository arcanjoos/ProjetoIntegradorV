import React from 'react'
import { View, Image, StyleSheet, Alert, TouchableOpacity, Animated, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { Card, Title, Paragraph } from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable';

interface ProdutoProps {
    id: string,
    nome: string,
    descricao: string,
    imagem: string,
    preco: number,
    categoria: string,
    quantidade: number
}

export function CardProdutoCarrinho({ renderItem, adicionar, remover, deletar }: {
    renderItem: ProdutoProps,
    adicionar: (item: ProdutoProps) => void,
    remover: (item: ProdutoProps) => void,
    deletar: (item: ProdutoProps) => void
}) {



    const { nome, descricao, imagem, preco, quantidade } = renderItem
    let subtotal = preco * quantidade

    function handleRemove(item: ProdutoProps) {
        Alert.alert('Remover', `Deseja remover ${item.descricao}?`, [
            {
                text: 'Não. 🙏', style: 'cancel'
            },
            {
                text: 'Sim. 😢', onPress: async () => {
                    try {

                        deletar(renderItem)
                    } catch (error) {
                        Alert.alert('Não foi possivel remover. 😢')
                    }
                }
            }
        ])
        // 
    }

    return (

        <Swipeable
            overshootRight={false}
            renderRightActions={() => (
                <Animated.View style={styles.containerRect}>
                    <TouchableOpacity onPress={() => handleRemove(renderItem)} >
                        <RectButton style={styles.buttonRemove}>
                            <Ionicons name='trash' size={80} color='#fff' />
                        </RectButton>
                    </TouchableOpacity>
                </Animated.View>
            )}
        >

            <RectButton>
                <Card style={styles.container}>
                    <Card.Content>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ marginRight: 20, flex: 1 }}>
                                <Image
                                    style={styles.imagem}
                                    source={{ uri: imagem }}
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Title>{nome}</Title>
                                <Paragraph style={styles.descricao}>{descricao}</Paragraph>
                                <Paragraph style={styles.preco}> R$ {preco.toFixed(2).replace('.', ',')}</Paragraph>

                                <View style={{ justifyContent: 'center', flexDirection: 'row', marginLeft: -50, marginTop: 10 }} >

                                    <TouchableOpacity onPress={() => { remover(renderItem) }} >
                                        <Ionicons name='remove-circle' size={30} color='#dc3545' />
                                    </TouchableOpacity>

                                    <Paragraph style={styles.quantidade}>{quantidade}</Paragraph>

                                    <TouchableOpacity onPress={() => { adicionar(renderItem) }}>
                                        <Ionicons name='add-circle' size={30} color='#198754' />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>


                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 15, }}>
                            <Paragraph style={{ margin: 20, color: 'red' }}> R$ {subtotal.toFixed(2).replace('.', ',')}</Paragraph>
                        </View>
                    </Card.Content>


                </Card >
            </RectButton>
        </Swipeable>

    )
}

const styles = StyleSheet.create({
    containerRect: {
        width: '45%',
        // flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 25,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'red',  //colors.shape,
        marginVertical: 2,
    },
    buttonRemove: {
        // width: 120,
        // height: 85,
        flex: 1,
        marginTop: 15,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',

        // right: 20,
        paddingLeft: 15
    },
    container: { borderRadius: 20, margin: 10 },
    imagem: {
        borderRadius: 50,
        width: 100,
        height: 100,
    },
    title: { marginLeft: 5, fontSize: 18 },
    content: { width: '65%', marginLeft: 50 },
    descricao: { marginLeft: 5, fontSize: 15 },
    quantidade: { margin: 20, },
    preco: { marginTop: 25, color: 'red', fontWeight: 'bold', }
})