import { Text, View, Modal, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'

const ModalComponent = (props) => {

    const approvalOnPress = () => {
        if (props.approvalOnPress !== null && props.approvalOnPress !== undefined) {
            props.approvalOnPress();
        }
    }

    const denialOnPress = () => {
        if (props.denialOnPress !== null && props.denialOnPress !== undefined) {
            props.denialOnPress();
        }

    }

    return (
        <Modal visible={props.modal} transparent animationType='fade' hardwareAccelerated>
            <View style={styles.containerStyle}>
                <View style={styles.childStyle}>
                    <View style={[styles.titleStyle, { backgroundColor: props.headerColor }]}>
                        <Text style={[styles.titleTextStyle,{fontWeight:'bold'}]}>
                            {props.title}
                        </Text>
                    </View>
                    <View style={styles.messageStyle}>
                        <Text style={styles.textStyle}>{props.message}</Text>
                    </View>
                    {(!props.ok) ? (
                        <View style={styles.buttonGroupStyle}>
                            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', paddingVertical: 5 }}>
                                <TouchableOpacity style={[styles.opacityStyle, { backgroundColor: '#30a7ab' }]} onPress={approvalOnPress}>
                                    <Text style={[styles.textStyle,{color:'#ffffff'}]}>
                                        {props.approval}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', paddingVertical: 5 }}>
                                <TouchableOpacity style={[styles.opacityStyle, { backgroundColor: '#ffffff' }]} onPress={denialOnPress}>
                                    <Text style={[styles.textStyle,{color:'#38aaae'}]}>
                                        {props.denial}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : (
                        <View style={styles.buttonGroupStyle}>
                            <TouchableOpacity style={[styles.opacityStyle, { backgroundColor: '#30a7ab' }]} onPress={() => {
                                if (props.OkPressEvent !== undefined && props.OkPressEvent !== null) {
                                    props.OkPressEvent()
                                }
                            }}>
                                <Text style={[styles.textStyle,{color:'#ffffff'}]}>
                                    Tamam
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </Modal>
    )
}
export default ModalComponent;
const styles = StyleSheet.create({
    opacityStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 5,
        width: '95%',
        borderRadius: 5,
        borderWidth:.5,
        borderColor:'black'
    },
    buttonGroupStyle: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexDirection: 'column'
    },
    titleTextStyle: {
        color: '#000000',
        fontSize: 15,
        textAlign: 'center'
    },
    textStyle: {
        color: '#000000',
        fontSize: 15,
        textAlign: 'center'
    },
    messageStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    titleStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 5,
        paddingVertical:10,
        borderTopLeftRadius:5,
        borderTopRightRadius:5
    },
    containerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000099'
    },
    childStyle: {
        width: '80%',
        backgroundColor: '#e7e8e8',
        alignItems: 'center',
        borderRadius: 5,
        paddingBottom:10
    }
});