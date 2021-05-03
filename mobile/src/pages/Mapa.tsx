import React, { useEffect, useState, useRef } from 'react';
// import { Button, View, Text, Dimensions } from 'react-native';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import MapView, { Marker } from 'react-native-maps';
// import MapViewDirections from 'react-native-maps-directions';

// import Header from '../components/Header'

// const { height, width } = Dimensions.get('window')

// function Mapa({ navigation }) {

//     const mapEl = useRef()
//     const [origem, setOrigem] = useState({
//         latitude: -18.5917875,
//         longitude: -46.6660613,
//         latitudeDelta: 0.3,
//         longitudeDelta: 0.3,
//     })

//     const [destino, setDestino] = useState(null)
//     const [distancia, setDistancia] = useState(0.000)

//     function getLocalizacaoAtual() {
//         // try {
//         //     // DEPRECIADO USANDO APENAS PARA TESTE -> TEM QUE TROCAR DEPOIS
//         //     navigator.geolocation.getCurrentPositionAsync((position) => {
//         //         console.log(position)
//         //     })
//         // } catch (err) {
//         //     alert(err)
//         // }

//     }

//     useEffect(() => {
//         getLocalizacaoAtual()
//     }, [])

//     return (
//         <View>

//             <Header title={'Mapa'} navigation={navigation} />
//             {/* SO EXIBE A DISTANCIA DEPOIS DE TER UM DESTINO */}
//             {destino && destino !== null &&
//                 < View style={{ justifyContent: 'center', alignItems: 'center', }}>
//                     <Text>Distancia: {distancia.toFixed(2).replace('.', ',')} Km</Text>
//                     <Button title='Limpar' onPress={() => { setDestino(null), setDistancia(null) }} />
//                 </View>
//             }

//             <View>
//                 <MapView style={{ width, height }}
//                     showsUserLocation={true}
//                     enablePoweredByContainer={false}
//                     region={origem}
//                     ref={mapEl} // referencia para omap direction conseguir acessar
//                 >
//                     <Marker title='Minha posição' description='Localização atual' pinColor='blue' coordinate={origem} onPress={() => alert('Minha posição')} />

//                     <MapViewDirections
//                         destination={destino}
//                         origin={origem}
//                         apikey={env.process.GOOGLE_API_FATURAMENTO}
//                         strokeColor={'#333'} // cor da linha
//                         strokeWidth={10}  // alterar espessura da linha do trajeto
//                         onReady={({ coordinates, distance }) => {
//                             setDistancia(distance)

//                             // acessando a refencia do mapaa
//                             mapEl.current.fitToCoordinates(
//                                 coordinates,
//                                 {
//                                     edgePadding:// para afastar linha do trajeto da borda do dispositivo
//                                         { top: 50, bottom: 50, left: 50, rigth: 50 }
//                                 }

//                             )
//                         }}
//                     />

//                     {/* SO APARECER O MARCADOR DESTINO SE O CARA JA TIVER INFORMADO PRA ONDE VAI */}
//                     {destino &&
//                         <Marker title='Minha posição' description='Localização atual' pinColor='green' coordinate={destino} onPress={() => alert(destino.nome)} />
//                     }

//                 </MapView>

//                 {/* SO APARECER INPUT SE O CARA NÃO TIVER INFORMADO PRA ONDE VAI */}

//                 {!destino &&
//                     <GooglePlacesAutocomplete
//                         placeholder='Para onde vamos ?'
//                         placeholderTextColor='#333'
//                         enablePoweredByContainer={false}
//                         fetchDetails
//                         query={{
//                             key: env.process.GOOGLE_API_FATURAMENTO,
//                             language: 'pt-br',
//                         }}

//                         styles={{
//                             container: {
//                                 position: 'absolute',
//                                 top: 20,
//                                 width: '100%',
//                             },
//                             textInputContainer: {
//                                 flex: 1,
//                                 backgroundColor: "transparent",
//                                 height: 54,
//                                 marginHorizontal: 20,
//                                 borderTopWidth: 0,
//                             },
//                             textInput: {

//                                 height: 54,
//                                 borderColor: "#DDD",
//                             },
//                             listView: {
//                                 backgroundColor: '#0f0',
//                                 marginTop: 10,
//                                 marginHorizontal: 20
//                             },
//                             row: {
//                                 padding: 10
//                             }
//                         }}

//                         onPress={(data, { geometry }) => {
//                             const { lat: latitude, lng: longitude } = geometry.location

//                             setDestino({
//                                 nome: data.description,
//                                 latitude, longitude,
//                                 latitudeDelta: 0.3,
//                                 longitudeDelta: 0.3
//                             })
//                         }}
//                     />
//                 }
//             </View>
//             {/* <View style={{ flex: 1 }}>
//                 <Text>Hora de acordar bando de corno</Text>
//             </View> */}


//         </View >
//     )
// }

// export default Mapa