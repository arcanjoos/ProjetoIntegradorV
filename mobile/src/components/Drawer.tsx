import React from 'react'
import { TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import { ListItem } from 'react-native-elements'

function CustomDrawer(props: any) {

    const { state, navigation } = props

    const { routeNames } = state

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ paddingLeft: 15, backgroundColor: "#fff" }}>

                {routeNames.map((item: any) =>
                    <TouchableOpacity onPress={() => navigation.navigate(item)}>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title>{item}</ListItem.Title>
                                <ListItem.Chevron color="white" />
                            </ListItem.Content>
                        </ListItem>
                    </TouchableOpacity>
                )}

            </ScrollView>
        </SafeAreaView>
    )
}

export default CustomDrawer;