import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const ButtonComponent = (props) => {
    return (
      <View style={styles.containerStyle}>
        <TouchableOpacity 
                  style={[styles.touchableStyle,props.style]}
                  onPress={props.onPress}>
          <Text style={styles.textStyle}>
            {props.title}
          </Text>
        </TouchableOpacity>
      </View>
    )
}
const styles = StyleSheet.create({
  textStyle:{
    fontSize:15,
    color:'white',
    fontWeight:'bold'
  },
  touchableStyle:{
    width:'90%',
    backgroundColor:'#049142',
    alignItems:'center',
    borderRadius:5,
    paddingVertical:10
  },
  containerStyle : {
    alignItems:'center',
    width:'100%',
    paddingVertical:10
  }
});
export default ButtonComponent;