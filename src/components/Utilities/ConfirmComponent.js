import { Text, View } from 'react-native';
import React, { Component } from 'react';
import ModalComponent from './ModalComponent';

const ConfirmComponent = (props) => {
    return (
      <ModalComponent {...props} ok = {false}/>
    )
}
export default ConfirmComponent;