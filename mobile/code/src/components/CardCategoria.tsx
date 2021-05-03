import React from 'react'
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Text } from 'react-native-elements'
import { Card, Title, Paragraph } from 'react-native-paper'


interface ProdutoProps {
    id: string,
    nome: string,
    descricao: string,
    imagem: string,
    preco: number,
    categoria: string,
    quantidade: number,
}


export function CardCategoria({ renderItem, action, quantidade }: { renderItem: any, action: () => void, quantidade: number }) {

    const { id, nome, descricao, imagem, preco, categoria } = renderItem

    return (
        <Card style={st.container}>
            <TouchableOpacity
                onPress={action}
                style={{ margin: 10, padding: 10 }}>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginRight: 20, }}>
                        <View style={{ flexDirection: 'column', flex: 1 }}>
                            <Image
                                style={st.imagem}
                                source={{ uri: imagem }}
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'column', flex: 1 }}>
                        <Title>{categoria}</Title>
                        {quantidade > 2 ?
                            <Paragraph style={st.descricao}>Veja nossas variedades de {categoria}</Paragraph>
                            :
                            <Paragraph style={st.descricao}>Mais de {quantidade} variedades de {categoria}</Paragraph>

                        }

                    </View>
                </View>
            </TouchableOpacity>
        </Card>
    )
}


const st = StyleSheet.create({
    container: { borderRadius: 20, margin: 10 },
    imagem: {
        borderRadius: 50,
        width: 100,
        height: 100,
    },
    title: { marginLeft: 5, fontSize: 18 },
    content: { width: '65%', marginLeft: 50 },
    descricao: { marginLeft: 5, fontSize: 15, flex: 1 },
    preco: { marginTop: 25, color: 'red', fontWeight: 'bold' }
})
