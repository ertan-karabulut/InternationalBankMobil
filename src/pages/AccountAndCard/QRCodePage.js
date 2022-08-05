import { Text, View, Dimensions, Image } from 'react-native'
import React, { Component, useState, useEffect } from 'react'
import PageComponent from '../../components/Utilities/PageComponent'
import ButtonComponent from '../../components/Utilities/ButtonComponent'
import RNQRGenerator from 'rn-qr-generator'
import Share from 'react-native-share'

const QRCodePage = ({ navigation, route }) => {
    const [qrValue, setQrValue] = useState(route.params !== undefined ? route.params.value : '');
    const [height, setHeight] = useState(Dimensions.get('screen').height * 0.35);
    const [qrUri, setQrUri] = useState('')
    const title = route.params !== undefined && route.params.title !== undefined ? route.params.title : ''

    const sharedSosial = async () => {
        const shareOptions = {
            title: 'IBAN paylaş',
            url:qrUri
        }
        try {
            const sharedResponse = await Share.open(shareOptions)
        }
        catch (ex) {
            console.log(ex)
        }
    }

    useEffect(() => {
        RNQRGenerator.generate({
            value: qrValue,
            height: height,
            width: height,
            base64: true
        })
            .then(response => {
                setQrUri(response.uri)
            })
    }, [qrValue])
    return (
        <PageComponent>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 3 }}>
                    <View style={{ paddingVertical: 30, alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'black' }}>{title}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Image source={{uri:qrUri}} style={{width:height,height:height}}/>
                    </View>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', paddingVertical: 20 }}>
                    <ButtonComponent title='QR Paylaş' onPress={sharedSosial}/>
                </View>
            </View>
        </PageComponent>
    )
}
export default QRCodePage;