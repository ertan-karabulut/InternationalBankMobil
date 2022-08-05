import { Text, View, StyleSheet, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import PageComponent from '../../components/Utilities/PageComponent'
import ErrorModalComponent from '../../components/Utilities/ErrorModalComponent'
import { useSelector, useDispatch } from 'react-redux'
import { PERMISSIONS, openSettings } from 'react-native-permissions'
import ConfirmComponent from '../../components/Utilities/ConfirmComponent'
import { PermissionCheckCustom } from '../../components/Utilities/HeplMethod'
import { setPermissions, setBranchList, setLoading } from '../../redux/actions'
import Geolocation from '@react-native-community/geolocation'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Get } from '../../components/Utilities/ServiceComponent'

const BranchMapsPage = ({ navigation }) => {
    const { permissions, branchList } = useSelector(state => state.appReducer)
    const dispatch = useDispatch()
    const [modal, setModal] = useState(false)
    const [region, setRegion] = useState(null)
    const [errorModal, setErrorModal] = useState(false)

    GetBranchList = async () => {
        var result = await Get('/Branch/GetBranchList', navigation);
        if (result !== null && result !== undefined && result.resultStatus === true) {
            dispatch(setBranchList(result.resultObje))
        }
    }

    useEffect(() => {
        var locationPermission = false
        if(Platform.OS === 'android'){
            if(!permissions.FINE_LOCATION.USE){
                locationPermission = true;
            }
        }
        else if(Platform.OS === 'ios'){
            if(permissions.LOCATION_WHEN_IN_USE.UNAVAILABLE === true){
                setErrorModal(true);
            }
            else if(!permissions.LOCATION_WHEN_IN_USE.USE){
                locationPermission = true;
            }
        }

        if (branchList === null) {
            GetBranchList()
        }
        if (locationPermission) {
            setModal(true)
        }
        else {
            Geolocation.getCurrentPosition(
                position => {
                    const { coords } = position
                    setRegion({
                        latitude: coords.latitude,
                        longitude: coords.longitude,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121
                    })
                },
                error => {
                    console.log(error)
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 1000
                }
            )
        }
    }, [permissions])

    OpenStettings = async () => {
        setModal(false)
        await openSettings()
        if(Platform.OS === 'android'){
            setTimeout(async () => {
                var result = await PermissionCheckCustom(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
                if (result) {
                    dispatch(setPermissions({ ...permissions, "FINE_LOCATION": {"USE": true} }))
                }
            }, 10000);
        }
        else if(Platform.OS === 'ios'){
            setTimeout(async () => {
                var result = await PermissionCheckCustom(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
                if (result) {
                    dispatch(setPermissions({ ...permissions, "LOCATION_WHEN_IN_USE": {"USE": true} }))
                }
            }, 10000);
        }
    }

    Cancel = () => {
        navigation.goBack()
        setModal(false)
    }

    return (
        <PageComponent>
            <ErrorModalComponent 
                message = 'Cihazınız konum özelliğini desteklememektedir.'
                modal = {errorModal}
                OkPressEvent = {()=> {
                    setErrorModal(false);
                    navigation.goBack();
                }}/>
            <ConfirmComponent
                modal={modal}
                title='Bilgilendirme'
                message="Garanti BBVA ATM/Şube bulma özelliğini kullanabilmek için, cihazınızın ayarlar adımından Granti BBVA mobil'e konum servisi erişim izni vermeniz gerekiyor."
                approval='Ayarları Aç'
                approvalOnPress={OpenStettings}
                denial='İptal'
                denialOnPress={Cancel} />
            <MapView
                style={{ flex: 1 }}
                loadingEnabled={true}
                showsUserLocation={true}
                region={region}
            >
                {(branchList !== null) ? (
                    branchList.map((item) => {
                        return (
                            <Marker
                                key={item.id}
                                title={item.branchName}
                                description={item.branchAdress}
                                coordinate={{ latitude: parseFloat(item.latitude), longitude: parseFloat(item.longitude) }}>
                                <Icon name='bank' size={28} color='#049142' />
                            </Marker>
                        )
                    })
                ) : (null)}
            </MapView>
        </PageComponent>
    )
}
export default BranchMapsPage;
