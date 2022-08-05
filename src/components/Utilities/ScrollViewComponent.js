import { ScrollView } from 'react-native'
import React from 'react'

const ScrollViewComponent =(props)=> {
    return (
      <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
        {props.children}
      </ScrollView>
    )
}

export default ScrollViewComponent;