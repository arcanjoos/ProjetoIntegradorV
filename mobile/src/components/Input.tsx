import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

function CustomInput(props: any) {
    const {
        icon,
        field: { name, onBlur, onChange, value },
        form: { errors, touched, setFieldTouched },
        ...inputProps
    } = props

    const hasError = errors[name] && touched[name]
    return (

        <View>
            <View style={{ flexDirection: 'row', marginHorizontal: 20 }}>
                <Ionicons
                    style={{
                        // backgroundColor: 'green',
                        paddingVertical: 10,
                        marginTop: 20,
                        marginBottom: 30,
                    }}
                    name={icon} size={20} color='#0B2031' />
                <TextInput  mode='outlined'
                    error={hasError}
                    selectionColor='#0B203166'
                    underlineColor='#0B203166'
                    style={ [{backgroundColor: 'green'},
                        styles.textInput, 
                        hasError && styles.errorInput, { flex: 1 ,backgroundColor: '#fff', borderRadius: 20}
                    ]}

                    value={value}

                    onChangeText={(text) => {
                        onChange(name)(text)

                    }}
                    onBlur={() => {
                        setFieldTouched(name)
                        onBlur(name)
                    }}
                    {...inputProps}
                />
            </View>
            { hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
        </View>



    )
}

const styles = StyleSheet.create({
    // container: { backgroundColor: 'red', margin: 10},
    textInput: {
        margin: 10
    },
    errorText: {
        marginLeft: 10,
        fontSize: 15,
        color: 'red',
    },
    errorInput: {
        textAlign: 'center',
    },
    legend: {
        marginLeft: 10,
        margin: 20,
        marginBottom: -5,
        color: '#0b2031',
        fontSize: 20,
        fontWeight: 'bold'
    }
})

export default CustomInput