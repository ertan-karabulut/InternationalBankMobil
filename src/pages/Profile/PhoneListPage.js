import { Text, View, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import PageComponent from '../../components/Utilities/PageComponent'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useSelector, useDispatch } from 'react-redux'
import { setPhone } from '../../redux/actions'
import { Post, DataTableRequest } from '../../components/Utilities/ServiceComponent'


const PhoneListPage = ({ navigation }) => {
    const [phoneList, setPhoneList] = useState('')
    const [loading, setLoading] = useState(false);
    const { pageSetting, phone } = useSelector(state => state.appReducer);
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
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

    GetPhone = async (pageSize) => {
        setLoading(true)
        const skip = (pageSize - 1) * pageSetting.take;
        if (phone !== null && phone.pageSize >= pageSize) {
            setPhoneList(phone.data);
            setTotalPage(Math.ceil(phone.totalCount / pageSetting.take));
        }
        else {
            const requestData = DataTableRequest(null, null, pageSetting.take, skip);
            const result = await Post('/PhoneNumber/CustomerPhoneList', requestData, navigation);
            if (result !== null && result !== undefined && result.resultStatus === true) {
                setPhoneList([...phoneList, ...result.resultObje.data]);
                setTotalPage(Math.ceil(result.resultObje.totalCount / pageSetting.take));
                dispatch(setPhone({
                    data: phone !== null && phone.data !== null?[...phone.data, ...result.resultObje.data]:[...result.resultObje.data],
                    pageSize: pageSize,
                    totalCount: result.resultObje.totalCount
                }));
            }
        }
        setLoading(false)
    }

    useEffect(() => {
        GetPhone(page);
    }, [page,phone])

    const RenderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={styles.styleRow} 
                onPress={() => 
                    navigation.navigate(
                        'PhoneChangePage', 
                        { Id: item.id, IsFavorite: item.isFavorite, PhoneNumber:item.phoneNumber, CustomerId:item.customerId, NumberName:item.numberName  }
                        )}>
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    {item.isFavorite ? (<Icon name='check-circle' size={17} color="green" />) : null}
                </View>
                <View style={{ flex: 12 }}>
                    <Text style={[{ fontSize: 16 }, styles.styleText]}>
                        {item.numberName} {item.phoneNumber}
                    </Text>
                </View>
                <View style={{ alignItems: 'flex-end', justifyContent: 'center', flex: 1 }}>
                    <Icon name='navigate-next' size={25} />
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <PageComponent>
            <FlatList
                data={phoneList}
                renderItem={RenderItem}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={() => loading ? (<View><ActivityIndicator /></View>) : (null)}
                onEndReachedThreshold={.1}
                onEndReached={Reached}
                onMomentumScrollBegin={() => {
                    setMomentum(true)
                    setIsMomentum(true)
                }}
            />
        </PageComponent>
    )
}
export default PhoneListPage;

const styles = StyleSheet.create({
    styleRow: {
        paddingEnd: 10,
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