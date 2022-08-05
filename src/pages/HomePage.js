import { Button, Text, View, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PageComponent from '../components/Utilities/PageComponent'
import { PermissionCheck, PermissionRequest } from '../components/Utilities/HeplMethod'
import { setPermissions } from '../redux/actions'
import { Card, Title, Paragraph } from 'react-native-paper'
import { Post, DataTableRequest } from '../components/Utilities/ServiceComponent'

const App = ({ navigation }) => {
    const dispatch = useDispatch()
    const { loading, permissions } = useSelector(state => state.appReducer)
    const [account, setAccount] = useState('')

    const Permissions = async () => {
        var permission = await PermissionCheck()
        if (!permission.Result) {
            permission = await PermissionRequest()
        }
        dispatch(setPermissions(permission))
    }

    const Accont = async () => {
        const requestData = DataTableRequest(null, null, 1, 0)
        const result = await Post('/Account/MyAccount', requestData, navigation)
        if (result !== null && result !== undefined && result.resultStatus === true) {
            setAccount(...result.resultObje.data)
        }
    }

    useEffect(() => {
        Permissions()
        Accont()
    }, [])

    return (
        <PageComponent>
            <Card>
                <Card.Content>
                    <Title>{account.account}</Title>
                    <Paragraph>Kullanılabilir Bakiye</Paragraph>
                    <Paragraph>{account.availableBalanceStr}</Paragraph>
                </Card.Content>
            </Card>
        </PageComponent>
    )
}

export default App;