import { Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import {Get} from '../Utilities/ServiceComponent'
import { useSelector, useDispatch } from 'react-redux'
import { setProfile, setPhoto } from '../../redux/actions'

const ProfileHeaderComponent = (props) => {
    const dispatch = useDispatch();
    const { photo } = useSelector(state => state.appReducer);
    const [image,setImage] = useState('');

    useEffect(()=>{
        async function GetNameAndImage(){
            const result = await Get('/Customer/GetNameAndImage',null,props.navigation);
            if(result !== null && result !== undefined && result.resultStatus === true){
                dispatch(setProfile(result.resultObje));
                dispatch(setPhoto(result.resultObje.photo))
                setImage(result.resultObje.photo);
            }
        }
        if(photo === null){
            GetNameAndImage();
        }
        else{
            setImage(photo);
        }
    },[photo]);
    return (
        <View style={{ paddingHorizontal: 10 }}>
             <TouchableOpacity onPress={() => props.navigation.toggleDrawer()} >
                <Image source={{ uri: image }} style={{ width: 30, height: 30, borderRadius:25 }} />
            </TouchableOpacity> 
        </View>
    )
}

export default ProfileHeaderComponent;