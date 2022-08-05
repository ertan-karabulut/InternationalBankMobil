import { Text, View, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import PageComponent from '../../components/Utilities/PageComponent'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useSelector, useDispatch } from 'react-redux'
import { setMyAdresses } from '../../redux/actions'
import { Post, DataTableRequest } from '../../components/Utilities/ServiceComponent'
import { Searchbar } from 'react-native-paper'


const AdressInformationPage = ({ navigation }) => {
    const [adressList, setAdressList] = useState('')
    const [allList, setAllList] = useState('')
    const [loading, setLoading] = useState(false);
    const { pageSetting, myAdresses } = useSelector(state => state.appReducer);
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [refreshing, setRefreshing] = useState(false);
    const [totalPage, setTotalPage] = useState(1);
    const [search, setSearch] = useState('')
    const [momentum, setMomentum] = useState(false)
    const [IsMomentum, setIsMomentum] = useState(false)

    Reached = () => {
        if (!loading && (momentum || !IsMomentum)) {
            var newPage = page + 1
            if (newPage <= totalPage) {
                setPage(newPage);
            }
            setMomentum(false)
        }
    }

    GetAdress = async (pageSize) => {
        setLoading(!refreshing);
        const skip = (pageSize - 1) * pageSetting.take;
        if (myAdresses !== null && myAdresses.pageSize >= pageSize && !refreshing) {
            setAdressList(myAdresses.data);
            setAllList(myAdresses.data);
            setTotalPage(Math.ceil(myAdresses.totalCount / pageSetting.take));
        }
        else {
            const requestData = DataTableRequest(null, null, pageSetting.take, skip);
            const result = await Post('/Adress/CustomerAdressList', requestData, navigation);
            if (result !== null && result !== undefined && result.resultStatus === true) {
                setAdressList(refreshing ? [...result.resultObje.data] : [...adressList, ...result.resultObje.data]);
                setAllList(refreshing ? [...result.resultObje.data] : [...allList, ...result.resultObje.data]);
                setTotalPage(Math.ceil(result.resultObje.totalCount / pageSetting.take));
                dispatch(setMyAdresses({
                    data: myAdresses !== null && !refreshing ? [...myAdresses.data, ...result.resultObje.data] : [...result.resultObje.data],
                    pageSize: pageSize,
                    totalCount: result.resultObje.totalCount
                }));
            }
        }
        setLoading(false);
        setRefreshing(false);
    }

    useEffect(() => {
        if (page <= totalPage && page !== 1) {
            GetAdress(page);
        }
    }, [page])

    useEffect(() => {
        async function GetNewAdressList(pageSize) {
            setLoading(!refreshing);
            const skip = (pageSize - 1) * pageSetting.take;
            const requestData = DataTableRequest(null, null, pageSetting.take, skip);
            const result = await Post('/Adress/CustomerAdressList', requestData, navigation);
            if (result !== null && result !== undefined && result.resultStatus === true) {
                setAdressList([...result.resultObje.data]);
                setAllList([...result.resultObje.data]);
                setTotalPage(Math.ceil(result.resultObje.totalCount / pageSetting.take));
                dispatch(setMyAdresses({
                    data: [...result.resultObje.data],
                    pageSize: pageSize,
                    totalCount: result.resultObje.totalCount
                }));
            }
            setLoading(false);
            setRefreshing(false);
        }

        if (myAdresses === null) {
            GetNewAdressList(1);
            setPage(1);
        }

    }, [myAdresses])

    useEffect(() => {
        if (myAdresses !== null) {
            GetAdress(page);
        }

    }, [])

    useEffect(() => {
        if (refreshing) {
            setIsMomentum(false)
            setSearch('')
            setPage(1)
            GetAdress(1)
        }
    }, [refreshing])

    const RenderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={styles.styleRow} onPress={() => navigation.navigate('AdressChangePage', { Id: item.id })}>
                <View style={{ alignItems: 'flex-end', flex: 1 }}>
                    {item.isFavorite ? (<Icon name='check-circle' size={20} color="green" />) : null}
                </View>
                <View style={{ flex: 12 }}>
                    <Text style={[{ color: 'black', fontSize: 15 }, styles.styleText]}>
                        {item.adressName}
                    </Text>
                    <Text style={[{ fontSize: 13 }, styles.styleText]}>
                        {item.adressDetail} {item.districtName} {item.cityName}
                    </Text>
                </View>
                <View style={{ alignItems: 'flex-end', justifyContent: 'center', flex: 1 }}>
                    <Icon name='navigate-next' size={25} />
                </View>
            </TouchableOpacity>
        )
    }

    const Searching = (text) => {
        setMomentum(false);
        setIsMomentum(true);
        const filterData = allList.filter(item => {
            var adressName = item.adressName !== null ? item.adressName : ''
            const searchData = `${adressName.toLocaleLowerCase()} 
                                ${item.adressDetail.toLocaleLowerCase()} 
                                ${item.districtName.toLocaleLowerCase()} 
                                ${item.cityName.toLocaleLowerCase()}`
            return searchData.indexOf(text.toLocaleLowerCase()) > -1;
        })

        setAdressList(filterData)
    }

    RenderHeader = () => {
        return (
            <Searchbar
                placeholder="Ara.."
                onChangeText={(text) => {
                    setSearch(text)
                    Searching(text)
                }}
                value={search}
            />
        )
    };

    return (
        <PageComponent>
            <FlatList
                data={adressList}
                renderItem={RenderItem}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={() => loading ? (<View><ActivityIndicator /></View>) : (null)}
                onEndReachedThreshold={.1}
                onEndReached={Reached}
                refreshing={refreshing}
                onRefresh={() => setRefreshing(true)}
                ListHeaderComponent={RenderHeader()}
                onMomentumScrollBegin={() => {
                    setMomentum(true)
                    setIsMomentum(true)
                }}
            />
        </PageComponent>
    )
}
export default AdressInformationPage;

const styles = StyleSheet.create({
    styleRow: {
        paddingHorizontal: 10,
        paddingVertical: 15, width: '100%',
        borderBottomWidth: 0.7,
        borderBottomColor: 'black',
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    styleText: {
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    searchContainer: {
        padding: 10
    },
    searchInput: {
        fontSize: 16,
        backgroundColor: '#ffffff',
        padding: 10
    }
})  