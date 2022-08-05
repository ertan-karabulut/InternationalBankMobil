import { Text, View, ImageBackground, StyleSheet, ActivityIndicator, Modal, SafeAreaView } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SafeAreaViewComponent from '../Utilities/SafeAreaViewComponent'

const ImageBackgroundComponent = (props) => {
  const { loading } = useSelector(state => state.appReducer);

  return (
    <SafeAreaViewComponent>
      <ImageBackground source={require('../../images/MainImage.jpg')} style={styles.backgraoundStyle}>
        <Modal visible={loading} transparent animationType='fade'>
          <View style={styles.loading}>
            <ActivityIndicator size='large' />
          </View>
        </Modal>
        {props.children}
      </ImageBackground>
    </SafeAreaViewComponent>
  )
}

const styles = StyleSheet.create({
  backgraoundStyle: {
    flex: 1,
    resizeMode: "cover"
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default ImageBackgroundComponent;