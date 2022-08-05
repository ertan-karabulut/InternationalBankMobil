import { Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import PageComponent from '../Utilities/PageComponent'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import Icon from 'react-native-vector-icons/Ionicons'
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setLoading } from '../../redux/actions'


const DrawerContent = (props) => {
    const dispatch = useDispatch();
    const { profile, photo } = useSelector(state => state.appReducer);
    const [profileState, setprofileState] = useState('');

    useEffect(() => {
        if (profile !== null) {
            setprofileState(profile);
        }
    }, [profile]);

    logOut = async () => {
        dispatch(setLoading(true))
        await setTimeout(async () => {
            await AsyncStorage.removeItem('Token');
            dispatch(setLoading(false))
            props.navigation.replace('Login')
        }, 1000);
    }

    return (
        <PageComponent>
            <View style={{ flex: 1 }}>
                <View style={{ paddingVertical: 10, paddingHorizontal: 20, backgroundColor: '#049142', flexDirection: 'row' }}>
                    <TouchableOpacity style={{ flex: 2 }} onPress={() => props.navigation.goBack()}>
                        <Icon name="arrow-back" size={25} color="white" />
                    </TouchableOpacity>
                    <View style={{ flex: 8, justifyContent: 'center' }}>
                        <Text style={{ color: 'white' }}>
                            Profil ve Ayarlar
                        </Text>
                    </View>
                </View>
                <View style={{ paddingVertical: 10, paddingHorizontal: 20, flexDirection: 'row' }}>
                    <TouchableOpacity style={{ flex: 2, paddingVertical: 5 }}>
                        <Image source={{ uri: photo }} style={{ width: 30, height: 30, borderRadius: 25 }} />
                    </TouchableOpacity>
                    <View style={{ flex: 6, paddingVertical: 10 }}>
                        <Text style={{ textTransform: 'uppercase' }}>{profileState.name} {profileState.surname}</Text>
                    </View>
                    <View style={{ flex: 2, paddingVertical: 5 }}>
                        <TouchableOpacity onPress={logOut}
                            style={{ borderWidth: 1, borderRadius: 3, borderColor: '#049142', flex:1, justifyContent:'center',alignItems:'center' }}>
                            <Text>
                                Çıkış
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <DrawerContentScrollView {...props}>
                    <DrawerItem
                        label="Kişisel Bilgiler"
                        onPress={() => props.navigation.navigate('InformationNavigation')}
                    />
                    <DrawerItem
                        label="Şubelerimiz"
                        onPress={() => props.navigation.navigate('BranchMapsPage')}
                    />
                </DrawerContentScrollView>
            </View>
        </PageComponent>
    )
}
export default DrawerContent;