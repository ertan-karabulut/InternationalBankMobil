import { Text, View, SafeAreaView } from 'react-native'
import React, { Component } from 'react'

const SafeAreaViewComponent = (props) => {
    return (
        <SafeAreaView style={{flex:1,backgroundColor:'#f2f2f2'}}>
            {props.children}
        </SafeAreaView>
    )
}

export default SafeAreaViewComponent;