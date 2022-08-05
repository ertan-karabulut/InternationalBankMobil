import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Clipboard, TouchableNativeFeedback, Modal, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import PageComponent from '../../components/Utilities/PageComponent'
import ButtonComponent from '../../components/Utilities/ButtonComponent'
import { Get, Post } from '../../components/Utilities/ServiceComponent'
import { setLoading, setAccountList, setAccountDetail } from '../../redux/actions'
import { useDispatch } from 'react-redux'
import { DateFormat } from '../../components/Utilities/HeplMethod'
import Share from 'react-native-share'
import ConfirmComponent from '../../components/Utilities/ConfirmComponent'
import SuccessModalComponent from '../../components/Utilities/SuccessModalComponent'
import InformationModalComponent from '../../components/Utilities/InformationModalComponent'
import RowItemComponent from '../../components/Utilities/RowItemComponent'
import ScrollViewComponent from '../../components/Utilities/ScrollViewComponent'

const AccountDetailPage = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const { Id } = route.params
    const [account, setAccount] = useState(null)
    const [modal, setModal] = useState(false)
    const [successModal, setSuccessModal] = useState(false)
    const [informationModal, setInformationModal] = useState(false)
    const [informationMessage, setInformationMessage] = useState('')

    const CloseAccount = async () => {
        dispatch(setLoading(true))
        const data = {
            Id: Id
        }
        const result = await Post('/Account/CloseAccount', data, navigation)
        if (result !== null && result !== undefined) {
            if (result.resultStatus === true) {
                setSuccessModal(true)
                dispatch(setAccountList(null))
            }
            else if (result.resultCode === 401) {
                setInformationMessage(result.resultInnerMessage)
                setInformationModal(true)
            }
        }
        dispatch(setLoading(false))
    }
    const sharedSosial = async () => {
        const shareOptions = {
            message: account.iban,
            title: 'IBAN paylaş'
        }
        try {
            setModal(false)
            const sharedResponse = await Share.open(shareOptions)
        }
        catch (ex) {
            console.log(ex)
        }
    }
    const GetAccountDetail = async () => {
        dispatch(setLoading(true))
        const result = await Get(`/Account/AccountDetail?accountId=${Id}`, navigation);
        if (result !== null && result !== undefined && result.resultStatus === true) {
            setAccount(result.resultObje)
            dispatch(setAccountDetail(result.resultObje))
        }
        dispatch(setLoading(false))
    }
    useEffect(() => {
        GetAccountDetail()
    }, [])

    if (account === null) {
        return (null)
    }
    return (
        <PageComponent>
            <ScrollView>
                <InformationModalComponent
                    title='Bilgilendirme'
                    message={informationMessage}
                    OkPressEvent={() => {
                        setInformationModal(false);
                        navigation.goBack();
                    }}
                    modal={informationModal} />
                <SuccessModalComponent
                    message='Hesap kama işlemi başarılı.'
                    OkPressEvent={() => {
                        setSuccessModal(false);
                        navigation.goBack();
                    }}
                    modal={successModal} />
                <ConfirmComponent
                    modal={modal}
                    title='IBAN Kopyalama ve Paylaşma'
                    message='IBAN paylaşıp kopyalayabilirsiniz.'
                    approval='IBAN Paylaş'
                    approvalOnPress={sharedSosial}
                    denial='IBAN kopyala'
                    denialOnPress={() => { Clipboard.setString(account.iban); setModal(false); }} />
                <RowItemComponent
                    textStyle={{ color: '#ffffff' }}
                    style={{ backgroundColor: '#049142' }}
                    leftStatement={[account.account, "Kullanılabilir Bakiye"]}
                    rigthStatement={[`${account.balance} ${account.currencyCode}`, `${account.availableBalance} ${account.currencyCode}`]} />
                <RowItemComponent
                    style={{ backgroundColor: '#eeeeee' }}
                    leftStatement={["HESAP SAHİBİ"]} />
                <RowItemComponent
                    style={{ backgroundColor: '#ffffff' }}
                    leftStatement={["Ad Soyad"]}
                    rigthStatement={[account.customerFullName]} />
                <RowItemComponent
                    style={{ backgroundColor: '#ffffff' }}
                    leftStatement={["Müşteri No"]}
                    rigthStatement={[account.customerNumber]} />
                <RowItemComponent
                    style={{ backgroundColor: '#eeeeee' }}
                    leftStatement={["HESAP BİLGİLERİ"]} />
                <RowItemComponent
                    style={{ backgroundColor: '#ffffff' }}
                    leftStatement={["Hesap"]}
                    rigthStatement={[account.account, account.branchName]} />
                <View style={[Styles.rowItemStyle, { backgroundColor: '#ffffff' }]}>
                    <View>
                        <Text>IBAN</Text>
                    </View>
                    <TouchableNativeFeedback onPress={() => setModal(true)}>
                        <Text style={{ color: '#049142' }}>{account.iban}</Text>
                    </TouchableNativeFeedback>
                </View>
                <View style={[Styles.rowItemStyle, { backgroundColor: '#ffffff' }]}>
                    <View>
                        <Text>QR Kodu</Text>
                    </View>
                    <TouchableNativeFeedback onPress={() => navigation.navigate('QRCodePage', { value: account.iban, title: account.customerFullName })}>
                        <Text style={{ color: '#049142' }}>Görüntüle</Text>
                    </TouchableNativeFeedback>
                </View>
                <RowItemComponent
                    style={{ backgroundColor: '#ffffff' }}
                    leftStatement={["Hesap Açılış Tarihi"]}
                    rigthStatement={[account.accountOpenDate !== null ? DateFormat(account.accountOpenDate) : null]} />
                <RowItemComponent
                    style={{ backgroundColor: '#ffffff' }}
                    leftStatement={["Hesap Türü"]}
                    rigthStatement={[account.accountType]} />
                <RowItemComponent
                    style={{ backgroundColor: '#ffffff' }}
                    leftStatement={["Döviz Kodu"]}
                    rigthStatement={[account.currencyCode]} />
                <RowItemComponent
                    style={{ backgroundColor: '#eeeeee' }}
                    leftStatement={["HESAP BAKİYE VE HAREKET BİLGİLERİ"]} />
                <RowItemComponent
                    style={{ backgroundColor: '#ffffff' }}
                    leftStatement={["Bakiye"]}
                    rigthStatement={[account.balance]} />
                <RowItemComponent
                    style={{ backgroundColor: '#ffffff' }}
                    leftStatement={["Kullanılabilir Bakiye"]}
                    rigthStatement={[account.availableBalance]} />
                <RowItemComponent
                    style={{ backgroundColor: '#ffffff' }}
                    leftStatement={["Son Hareket Tarihi"]}
                    rigthStatement={[account.balanceDate !== null ? DateFormat(account.balanceDate) : null]} />
                <ButtonComponent title='Hesap Hereketleri' onPress={()=>navigation.navigate('AccountHistoryPage')}/>
                <ButtonComponent title='Hesap Kapama' onPress={CloseAccount} />
            </ScrollView>
        </PageComponent>
    )
}
const Styles = StyleSheet.create({
    rowItemStyle: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 0.6,
        borderColor: 'black'
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    }
})
export default AccountDetailPage;