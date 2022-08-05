import { Text, View, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import PageComponent from '../../components/Utilities/PageComponent'
import { setCardList } from '../../redux/actions'
import { useSelector, useDispatch } from 'react-redux'
import { Post, DataTableRequest } from '../../components/Utilities/ServiceComponent'
import Icon from 'react-native-vector-icons/Fontisto'
import { List } from 'react-native-paper'

const CardListPage = (props) => {
    const dispatch = useDispatch()
    const { cardList, profile } = useSelector(state => state.appReducer)
    const [card, setCard] = useState('')
    const [loading, setLoading] = useState(false)

    GetCardList = async () => {
        setLoading(true)
        if (cardList !== null) {
            setCard(cardList);
        }
        else {
            const requestData = DataTableRequest(null, null, 0, 0);
            const result = await Post('/Card/CustomerCrediCardList', requestData, props.navigation);
            var list = ''
            if (result !== null && result !== undefined && result.resultStatus === true) {
                list = result.resultObje.data.map((item) => {
                    return {
                        ...item,
                        'IsCrediCard': true
                    }
                })
            }

            const resultAtm = await Post('/Card/CustomerAtmCardList', requestData, props.navigation);
            if (resultAtm !== null && resultAtm !== undefined && resultAtm.resultStatus === true) {
                list = [...list, ...resultAtm.resultObje.data]
            }
            setCard(list)
            dispatch(setCardList(list))
        }
        setLoading(false)
    }

    const RenderItem = ({ item, index }) => {
        return (
            <View style={{backgroundColor:'white'}}>
                <List.Item
                    title={(item.IsCrediCard === true) ? (item.creditCardName) : 'PARACARD'}
                    description={
                        <View>
                            <Text>{item.cardNumber}</Text>
                            <Text>{(profile !== null) && (`${profile.name} ${profile.surname}`)}</Text>
                            <Text>{(item.IsCrediCard === true) && (<Text>{item.creditCardLimit}</Text>)}</Text>
                        </View>}
                    left={() => <Icon name="credit-card" size={60} color='#049142' />}
                />
            </View>
        )
    }

    useEffect(() => {
        GetCardList()
    }, [])

    return (
        <PageComponent>
            <FlatList
                data={card}
                renderItem={RenderItem}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={() => loading ? (<View><ActivityIndicator /></View>) : (null)}
                ItemSeparatorComponent={
                    () => (
                      <View
                        style={{height:3}}
                      />
                    )
                  }
            />
        </PageComponent>
    )
}

export default CardListPage;