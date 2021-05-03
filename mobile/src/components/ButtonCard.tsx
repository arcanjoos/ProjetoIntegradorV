import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import { Card, Title, Paragraph } from 'react-native-paper'

interface ProdutoProps {
    id: string,
    nome: string,
    descricao: string,
    imagem: string,
    preco: number,
    categoria: string,
}

export function ButtonCard({ renderItem, active = false, action }: { renderItem: string, active: boolean, action: () => void }) {

    const st = StyleSheet.create({
        container: { backgroundColor: "#E22C4366", borderRadius: 20, padding: 10, minWidth: 80, margin: 10, },
        ativo: { backgroundColor: '#E22C43', color: '#FFFFFF' },
        texto: { alignItems: 'center', color: '#E22C43', justifyContent: 'center', fontWeight: 'bold', textAlign: 'center'},
        textActive: {  color: '#FFFFFF'  }
    })

    //  const { nome, descricao, imagem, preco, } = renderItem // erro com o tslint




    return (
        <TouchableOpacity style={[st.container, active && st.ativo]} onPress={action}>
            <Text style={[st.texto, active && st.textActive]}>
                {renderItem}
            </Text>
        </TouchableOpacity>
    )



}