import React from 'react'
import { View, Text, StyleSheet, } from 'react-native'
import { Button } from 'react-native-elements'
import { Card, Title, Switch, } from 'react-native-paper'


interface EnderecoProps {
    cep: string,
    logradouro: string,
    numero: string,
    complemento?: string,
    bairro: string,
    cidade: string,
    estado: string,
    entrega: boolean
}
interface EnderecoProps {
    renderItem: EnderecoProps,
    action: () => void,
    finalizar: () => void

}


export function CardEndereco({ renderItem, action, finalizar }: any) {

    const { logradouro, numero, complemento, bairro, cidade, estado, entrega } = renderItem

    return (
        <Card style={st.container}>

            {entrega ? <Title style={st.title}>Endereco Atual de Entrega</Title>
                : <View />
            }
            <Text style={st.descricao}>{logradouro} nº {numero}, {complemento}</Text>
            <Text style={st.descricao}>{bairro}, {cidade}, {estado} </Text>


            {/* <CheckBox
                center
                title='Endereço Atual de Entrega'
                checked={entrega}
                onPress={() => setCheck(index)}
            /> */}

            <Switch color={'#E22C43'} value={entrega} onValueChange={action} />

            {entrega
                ? <Button title="Finalizar" buttonStyle={st.button} onPress={finalizar} />
                : <View />
            }
        </Card>
    )
}


const st = StyleSheet.create({
    container: { flex: 1, borderRadius: 20, justifyContent: 'center', alignContent: 'center', margin: 10, padding: 20 },
    imagem: {
        borderRadius: 50,
        width: 100,
        height: 100,
    },
    title: { marginLeft: 5, marginBottom: 10, textTransform: 'capitalize', fontSize: 24 },
    content: { width: '65%', marginLeft: 50 },
    descricao: { marginLeft: 5, fontSize: 15 },
    preco: { marginTop: 25, color: 'red', fontWeight: 'bold' },
    button: { marginTop: 15, backgroundColor: "#E22C43", alignItems: 'flex-end', borderRadius: 20, padding: 10 }
})