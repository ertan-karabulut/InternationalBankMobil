import { Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

const HeaderAddButton = (props) => {
    return (
        <TouchableOpacity onPress={props.sendToPage}>
            <Icon name='add-circle-outline' size={24} color='white'/>
        </TouchableOpacity>
    )
}
export default HeaderAddButton;