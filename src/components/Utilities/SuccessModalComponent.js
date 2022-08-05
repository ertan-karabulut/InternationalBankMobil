import React, { Component } from 'react';
import ModalComponent from './ModalComponent';

const SuccessModalComponent = (props) => {
    return (
      <ModalComponent 
            {...props}
            title = {props.title === null || props.title === undefined ? 'Başarılı' : props.title} 
            headerColor = 'green'
            ok = {true}/>
    )
}
export default SuccessModalComponent;