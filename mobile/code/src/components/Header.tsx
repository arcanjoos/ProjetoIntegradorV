import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

//https://oblador.github.io/react-native-vector-icons/
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';


export default function CustomHeader({ title, isHome, navigation }: any) {
    return (
        <View style={styles.container} >
            {
                isHome ?
                    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => navigation.openDrawer()}>
                            <Text style={{ marginLeft: 15, color: "#fff", fontSize: 15 }}>
                                <IconEntypo name="menu" size={30} color="#fff" />
                            </Text>
                        </TouchableOpacity>

                    </View>
                    :
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
                        onPress={() => navigation.goBack()}>
                        <Text style={{ marginLeft: 15, color: "#fff", fontSize: 15 }}>
                            <IconAntDesign name="arrowleft" size={30} color="#fff" />
                        </Text>
                    </TouchableOpacity>
            }

            <View style={styles.constainerTitle}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={{ flex: 1 }}>

                <Text>

                </Text>

            </View>

        </View >

    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 50,
        backgroundColor: "#0B2031",
    },

    constainerTitle: {
        flex: 1.5,
        justifyContent: 'center',
    },

    title: {
        textAlign: 'center',
        color: '#fff',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }
})
 