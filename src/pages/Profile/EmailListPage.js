import { Text, View, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import PageComponent from '../../components/Utilities/PageComponent'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useSelector, useDispatch } from 'react-redux'
import { setMail } from '../../redux/actions'
import { Post, DataTableRequest } from '../../components/Utilities/ServiceComponent'


const EmailListPage = ({ navigation }) => {
    const [mailList, setMailList] = useState('')
    const [loading, setLoading] = useState(false);
    const { pageSetting, mail } = useSelector(state => state.appReducer);
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

    GetMail = async (pageSize) => {
        setLoading(true)
        const skip = (pageSize - 1) * pageSetting.take;
        if (mail !== null && mail.pageSize >= pageSize) {
            setMailList(mail.data);
            setTotalPage(Math.ceil(mail.totalCount / pageSetting.take));
        }
        else {
            const requestData = DataTableRequest(null, null, pageSetting.take, skip);
            const result = await Post('/Mail/CustomerMailList', requestData, navigation);
            if (result !== null && result !== undefined && result.resultStatus === true) {
                setMailList([...mailList, ...result.resultObje.data]);
                setTotalPage(Math.ceil(result.resultObje.totalCount / pageSetting.take));
                dispatch(setMail({
                    data: mail !== null && mail.data !== null?[...mail.data, ...result.resultObje.data]:[...result.resultObje.data],
                    pageSize: pageSize,
                    totalCount: result.resultObje.totalCount
                }));
            }
        }
        setLoading(false)
    }

    useEffect(() => {
        GetMail(page);
    }, [page,mail])

    const RenderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={styles.styleRow} 
                onPress={() => 
                    navigation.navigate(
                        'EmailChangePage', 
                        { Id: item.id, IsFavorite: item.isFavorite, Email:item.eMail, CustomerId:item.customerId  }
                        )}>
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    {item.isFavorite ? (<Icon name='check-circle' size={17} color="green" />) : null}
                </View>
                <View style={{ flex: 12 }}>
                    <Text style={[{ fontSize: 16 }, styles.styleText]}>
                        {item.eMail}
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
                data={mailList}
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
export default EmailListPage;

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