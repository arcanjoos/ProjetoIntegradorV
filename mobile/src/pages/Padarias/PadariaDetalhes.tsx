// <<<<<<< HEAD
// import { useNavigation, useRoute } from '@react-navigation/native';
// import React from 'react';
// import { View, Text } from 'react-native';
// import Header from '../../components/Header'

// export function PadariaDetalhes() {
//     const navigation = useNavigation()
//     const route = useRoute()
//     const { data }: any = route.params

//     return (
//         <View style={{ flex: 1 }}>

//             <Header title={'Detalhes da Padaria'} navigation={navigation} />


//             <View style={{
//                 flex: 1,
//                 justifyContent: 'center',
//                 alignItems: 'center'
//             }}>
//                 <Text style={{ fontSize: 18, marginBottom: 20, fontWeight: 'bold' }}>Padarias Testes</Text>

//                 <Text>Cidade: {data.cidade}</Text>
//                 <Text>Nome Fantasia: {data.nomeFantasia}</Text>
//                 <Text>categoria: {data.categoriaUnidade}</Text>
//             </View>
//         </View>
//     )
// }
// =======
import React, { useState, useEffect } from 'react'
import { View, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Searchbar, Card, Title, Paragraph } from 'react-native-paper'
import { get } from '../../lib/storage'
import firebase from '../../services/firebaseConection'

import CustomHeader from '../../components/Header'
import { useNavigation } from '@react-navigation/core'
import { CardCategoria } from '../../components/CardCategoria'
import { Text } from 'react-native-elements'
import { CardPadaria } from '../../components/CardPadaria'
import { useRoute } from '@react-navigation/native'

interface PadariaProps {
    categoria: string,
    id: string,
    nome: string,
    telefone: string,
    email: string,
    // USANDO PARA TESTE
    cidade: string,
    turnoAtendimento: string,
    nomeFantasia: string,
    // USANDO PARA TESTE
}

export function PadariaDetalhes() {

    const navigation = useNavigation()
    const route = useRoute()
    const { data }: any = route.params 
    const [filteredData, setFilteredData] = useState<[PadariaProps]>([data])

    return (
        <>
            <CustomHeader isHome={false} title={'Padarias'} navigation={navigation} />
  
            <FlatList
                showsVerticalScrollIndicator={false}
                data={filteredData}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <CardPadaria action={() => { }} renderItem={item} />
                )}

            />

        </>
    )
}

const styles = StyleSheet.create({
    containerInsert: {
        //padding: 5,
        backgroundColor: "#DDD"
    },
    input: {
        fontSize: 15,
        height: 50,
        borderWidth: 5,
        borderRadius: 15,
        marginBottom: 15,
        paddingHorizontal: 25,
        borderColor: "#0B2031",
    }
})
