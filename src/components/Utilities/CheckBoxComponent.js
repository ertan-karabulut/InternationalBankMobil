import { Text, View, TouchableWithoutFeedback } from 'react-native'
import React, { useState, useEffect } from 'react'
import CheckBox from '@react-native-community/checkbox'

export default function CheckBoxComponent(props) {
    const { disabled, value, onValueChange, style } = props
    return (
        <View style={{ flexDirection: 'row' }}>
            <CheckBox
                {...props}
            />
            <View style={{ paddingVertical: 6 }}>
                <TouchableWithoutFeedback onPress={onValueChange}>
                    <Text>
                        {props.label}
                    </Text>
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}
