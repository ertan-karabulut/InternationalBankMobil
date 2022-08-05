import { Text, View, Modal, StyleSheet, ActivityIndicator, StatusBar } from 'react-native'
import React, { Component } from 'react'
import SafeAreaViewComponent from './SafeAreaViewComponent'
import { useSelector, useDispatch } from 'react-redux'

const PageComponent = (props) => {
    const { loading } = useSelector(state => state.appReducer);
    return (
        <SafeAreaViewComponent>
            <Modal visible={loading} transparent animationType='fade'>
                <View style={styles.loading}>
                    <ActivityIndicator size='large' />
                </View>
            </Modal>
            {props.children}
        </SafeAreaViewComponent>
    )
}
export default PageComponent;
const styles = StyleSheet.create({
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }
})