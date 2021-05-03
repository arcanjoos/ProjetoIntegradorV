import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { View, Text, Button, TouchableOpacity, ScrollView, Image, Dimensions, PermissionsAndroid, StatusBar, StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

import firebase from '../../services/firebaseConection'

// USANDO API DE TESTE
import api from '../../services/apiMapaSaude'



import Header from '../../components/Header'

export function Padaria() {
    const navigation = useNavigation()
    // return (
    //     <Text>asf</Text>
    // )

    // }

    const [padaria, setPadaria] = useState([])
    const [ponto, setPonto] = useState([])

    const [origem, setOrigem] = useState({
        latitude: -18.5917875,
        longitude: -46.6660613,
        latitudeDelta: 0.3,
        longitudeDelta: 0.3,
    })

    const raio = 15

    const getPontos = async () => {
        const { data } = await api.get(`rest/estabelecimentos/latitude/${origem.latitude}/longitude/${origem.longitude}/raio/${raio}`)

        setPonto(data)
    }

    //   const getPadarias = async () => {
    //         try {
    //             await firebase.firestore().collection('padaria').get().then((querySnapshot) => {
    //                 const data = []
    //                 querySnapshot.forEach(doc => {
    //                     data.push({
    //                         ...doc.data(),
    //                         id: doc.id
    //                     })

    //                 })
    //                 setPadaria(data)

    //             })
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }



    useEffect(() => {
        //         getPadarias() // buscando padarias do firebase

        getPontos() // buscando postos de saude da api 
    }, [])

    return (

        <View style={{ flex: 1 }}>
            <Header title={'Padarias Parceiras'} navigation={navigation} isHome={true} />

            <MapView style={{ flex: 1, height, width }}
                showsUserLocation={true}
                //enablePoweredByContainer='false'
                region={origem}
            >
                <Marker title='Minha Posição' coordinate={origem} />

                {ponto?.map((item: any, i) => {

                    return (
                        <Marker key={i}
                            title={item?.nomeFantasia}
                            coordinate={{ latitude: item?.lat, longitude: item?.long }}
                            onPress={() => navigation.navigate('PadariaDetalhes', { data: item })}
                        />

                    )
                })}
            </MapView>



        </View>
    )
}

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingTop: StatusBar.currentHeight,
        backgroundColor: "#ecf0f1",
        padding: 8
    },
    map: {
        flex: 1,
        width: width,
        height: height,
    },
    item: {
        margin: 24,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center"
    }
});
