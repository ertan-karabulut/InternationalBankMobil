import { Text, View } from 'react-native'
import React, { Component } from 'react'
import PageComponent from '../components/Utilities/PageComponent'

const ErrorPage =()=> {
    return (
      <PageComponent>
        <Text>Üzgünüm bir hata oluştu.</Text>
      </PageComponent>
    )
}

export default ErrorPage;