import React, { Component } from 'react';
import ModalComponent from './ModalComponent';

const ErrorModalComponent = (props) => {
    return (
      <ModalComponent 
          {...props}
          title = {props.title === null || props.title === undefined ? 'Hata' : props.title}
          headerColor = 'red'
          ok = {true}/>
    )
}
export default ErrorModalComponent;