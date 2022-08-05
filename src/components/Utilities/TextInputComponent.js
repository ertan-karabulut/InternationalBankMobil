import {Button, Text, View, TextInput, StyleSheet } from 'react-native';
import React from 'react';

const TextInputComponent = (props) => {
  return (
    <View style={styles.containerStyle}>
      <TextInput 
             {...props}
             ref={props.inputRef}
             style={[styles.textInputStyle,props.style,(props.touched && props.errors)&& {borderBottomWidth:1,borderBottomColor:'red'}]} 
            />
      {(props.touched && props.errors)&&(<Text style={{color:'red'}}>{props.errors}</Text>)}
    </View>
  )

}
const styles = StyleSheet.create({
  textInputStyle:{
    backgroundColor:'#ffffff',
    fontSize : 17,
    width : '90%',
    borderRadius:5,
    fontWeight:'bold'
  },
  containerStyle : {
    alignItems:'center',
    width:'100%',
    paddingVertical:10
  }
})
export default TextInputComponent;