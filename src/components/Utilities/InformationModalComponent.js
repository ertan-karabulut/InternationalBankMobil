import React, { Component } from 'react';
import ModalComponent from './ModalComponent';

const InformationModalComponent = (props) => {
    return (
      <ModalComponent 
            {...props}
            title = {props.title === null || props.title === undefined ? 'Bilgi' : props.title} 
            headerColor = 'yellow'/>
    )
}
export default InformationModalComponent;