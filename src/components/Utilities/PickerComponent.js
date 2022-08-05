import { Text, View } from 'react-native';
import React from 'react';
import { Picker } from '@react-native-picker/picker'

const PickerComponent = (props) => {
    return (
        <View>
            <Picker
                {...props}
                style={[props.style,(props.touched && props.errors)&& {borderBottomWidth:1,borderBottomColor:'red'}]}>
                {props.children}
                { (props.Items !== null && props.Items !== undefined && props.Items !== '')?(props.Items.map((item) => <Picker.Item label={ item.text } value={ item.value } />)):(null) }
            </Picker>
            {(props.touched && props.errors) && (<Text style={{ color: 'red' }}>{props.errors}</Text>)}
        </View>
    )

}
export default PickerComponent;