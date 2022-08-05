import { Text, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'

const RowItemComponent = (props) => {
    return (
        <View style={[Styles.rowItemStyle, props.style]}>
            <View>
                {
                    (props.leftStatement !== undefined && props.leftStatement !== null) ? (
                        props.leftStatement.map((item) => <Text style={props.textStyle}>{item}</Text>)
                    ) : (null)
                }
            </View>
            <View>
                {
                    (props.rigthStatement !== undefined && props.rigthStatement !== null) ? (
                        props.rigthStatement.map((item) => <Text style={props.textStyle}>{item}</Text>)
                    ) : (null)
                }
            </View>
        </View>
    )
}
const Styles = StyleSheet.create({
    rowItemStyle: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 0.6,
        borderColor: 'black'
    }
})
export default RowItemComponent;