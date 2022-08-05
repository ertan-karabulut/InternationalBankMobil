import { Text, View, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import PageComponent from '../../components/Utilities/PageComponent'
import Icon from 'react-native-vector-icons/MaterialIcons'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Post, DataTableRequest } from '../../components/Utilities/ServiceComponent'
import { setAccountList } from '../../redux/actions';

const AccountPage = ({ navigation }) => {
    const { pageSetting, accountList } = useSelector(state => state.appReducer);
    const dispatch = useDispatch();
    const [account, setAccount] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [totalPage, setTotalPage] = useState(1)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [momentum, setMomentum] = useState(false)
    const [IsMomentum, setIsMomentum] = useState(false)

    GetAccountList = async (pageSize) => {
        setLoading(!refreshing)
        const skip = (pageSize - 1) * pageSetting.take;
        if (accountList !== null && accountList.pageSize >= pageSize && !refreshing) {
            setAccount(accountList.data)
            setTotalCount(accountList.totalCount)
            setTotalPage(Math.ceil(accountList.totalCount / pageSetting.take))
        }
        else {
            const requestData = DataTableRequest(null, null, pageSetting.take, skip);
            const result = await Post('/Account/MyAccount', requestData, navigation);
            if (result !== null && result !== undefined && result.resultStatus === true) {
                setAccount(refreshing ? [...result.resultObje.data] : [...account, ...result.resultObje.data])
                setTotalCount(result.resultObje.totalCount)
                setTotalPage(Math.ceil(result.resultObje.totalCount / pageSetting.take))
                dispatch(setAccountList({
                    data: accountList !== null && !refreshing ? [...accountList, ...result.resultObje.data] : [...result.resultObje.data],
                    pageSize: pageSize,
                    totalCount: result.resultObje.totalCount
                }))
            }
        }
        setRefreshing(false)
        setLoading(false)
    };

    useEffect(() => {
        if (page <= totalPage && page > 1) {
            GetAccountList(page);
        }
    }, [page]);

    useEffect(() => {
        if (accountList !== null) {
            GetAccountList(page);
        }
    }, [])

    useEffect(() => {
        async function GetNewAccountList(pageSize) {
            setLoading(!refreshing);
            const skip = (pageSize - 1) * pageSetting.take;
            const requestData = DataTableRequest(null, null, pageSetting.take, skip);
            const result = await Post('/Account/MyAccount', requestData, navigation);
            if (result !== null && result !== undefined && result.resultStatus === true) {
                setAccount([...result.resultObje.data]);
                setTotalPage(Math.ceil(result.resultObje.totalCount / pageSetting.take));
                dispatch(setAccountList({
                    data: [...result.resultObje.data],
                    pageSize: pageSize,
                    totalCount: result.resultObje.totalCount
                }));
            }
            setLoading(false);
            setRefreshing(false);
        }

        if (accountList === null) {
            GetNewAccountList(1);
            setPage(1);
        }

    }, [accountList])

    const RenderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={styles.touchabStyle} onPress={()=>navigation.navigate('AccountDetailPage',{Id:item.id})}>
                <View style={{ flex: 9 }}>
                    <View style={styles.columnStyle}>
                        <Text style={styles.textStyle}>
                            {item.account}
                        </Text>
                    </View>
                    <View style={styles.columnStyle}>
                        <Text>
                            Bakiye
                        </Text>
                        <Text>
                            {item.balanceStr}
                        </Text>
                    </View>
                    <View style={styles.columnStyle}>
                        <Text>
                            Kullanılabilir bakiye
                        </Text>
                        <Text>
                            {item.availableBalanceStr}
                        </Text>
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name='navigate-next' size={20} />
                </View>
            </TouchableOpacity>
        )
    }

    const AllAccount = () => {
        var formatter = new Intl.NumberFormat('de-DE');
        var total = 0;
        if (account !== []) {
            account.forEach(element => total += element.availableBalance);
        }

        return (
            <View style={[styles.touchabStyle, { flex: 1 }]}>
                <View style={{ flex: 9 }}>
                    <View style={styles.columnStyle}>
                        <Text style={styles.textStyle}>
                            Tüm Hesaplar ({totalCount})
                        </Text>
                    </View>
                    <View style={styles.columnStyle}>
                        <Text>
                            Kullanılabilir Bakiye
                        </Text>
                        <Text>
                            {formatter.format(total)} TL
                        </Text>
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name='navigate-next' size={20} />
                </View>
            </View>
        )
    }

    const HeaderComponent = () => {
        return (
            <View>
                <View style={{ paddingVertical: 5 }}>
                    <Text>
                        TÜM HESAPLAR
                    </Text>
                </View>
                <AllAccount />
                <View style={{ paddingVertical: 5 }}>
                    <Text>
                        VADESİZ TL
                    </Text>
                </View>
            </View>
        )
    }

    const Reached = () => {
        if (!loading && (momentum || !IsMomentum)) {
            var newPage = page + 1
            if (newPage <= totalPage) {
                setPage(newPage);
            }
            setMomentum(false)
        }
    }

    useEffect(() => {
        if (refreshing) {
            setIsMomentum(false)
            setPage(1)
            GetAccountList(1)
        }
    }, [refreshing])

    return (
        <PageComponent>
            <FlatList
                data={account}
                renderItem={RenderItem}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={loading ? (null) : (<HeaderComponent />)}
                onEndReachedThreshold={.1}
                onEndReached={Reached}
                refreshing={refreshing}
                onRefresh={() => setRefreshing(true)}
                onMomentumScrollBegin={() => {
                    setMomentum(true)
                    setIsMomentum(true)
                }}
                ListFooterComponent={() => loading ? (<View style={{ paddingVertical: 20 }}><ActivityIndicator /></View>) : (null)}
            />
        </PageComponent>
    )
}
export default AccountPage;

const styles = StyleSheet.create({
    touchabStyle: {
        flex: 10,
        justifyContent: 'center',
        paddingLeft: 10,
        paddingVertical: 5,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        backgroundColor: 'white'
    },
    columnStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textStyle: {
        fontWeight: 'bold'
    }
});