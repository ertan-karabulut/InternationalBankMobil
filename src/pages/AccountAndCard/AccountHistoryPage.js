import { Text, View, StyleSheet, Platform, FlatList, TouchableNativeFeedback } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PageComponent from '../../components/Utilities/PageComponent'
import ButtonComponent from '../../components/Utilities/ButtonComponent'
import { TurkishShortMonth, HourMinute } from '../../components/Utilities/HeplMethod'
import RowItemComponent from '../../components/Utilities/RowItemComponent'
import PickerComponent from '../../components/Utilities/PickerComponent'
import Icon from 'react-native-vector-icons/Ionicons'
import { Post, DataTableRequest } from '../../components/Utilities/ServiceComponent'
import { setLoading } from '../../redux/actions'

const AccountHistoryPage = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const { accountDetail, pageSetting, loading } = useSelector(state => state.appReducer);
    const [account, setAccount] = useState(accountDetail)
    const [selectExplanation, setSelectExplanation] = useState(null)
    const [dateValue, setDateValue] = useState(3)
    const [data, setData] = useState('')
    const [totalPage, setTotalPage] = useState(1)
    const [page, setPage] = useState(1)
    const [momentum, setMomentum] = useState(false)
    const [IsMomentum, setIsMomentum] = useState(false)

    AccountHistory = async (selectdate, pageSize) => {
        dispatch(setLoading(true))
        var Today = false;
        var Yesterday = false
        if(selectdate === 1){
            Today = true;
        }else if(selectdate === 2){
            Yesterday = true;
        }
        const time = selectDateChange(selectdate);
        var Filter = [
            {
                "Name": "AccountId",
                "Value": account.id.toString()
            },
            {
                "Name": "CreateDate",
                "Value": time
            },
            {
                "Name": "Explanation",
                "Value": selectExplanation
            },
            {
                "Name": "Today",
                "Value": Today.toString()
            },
            {
                "Name": "Yesterday",
                "Value": Yesterday.toString()
            }
        ]
        const skip = (pageSize - 1) * pageSetting.take;
        const requestData = DataTableRequest(null, Filter, pageSetting.take, skip);
        const result = await Post('/Account/AccountHistory', requestData, navigation);
        if (result !== null && result !== undefined && result.resultStatus === true) {
            setData(pageSize > 1 ? [...data,...result.resultObje.data] : [...result.resultObje.data])
            setTotalPage(Math.ceil(result.resultObje.totalCount / pageSetting.take))
        }
        else{
            setData('')
        }
        dispatch(setLoading(false))
    }

    useEffect(() => {
        setPage(1)
        setMomentum(false)
        setIsMomentum(false)
        AccountHistory(dateValue, 1)
    }, [selectExplanation, dateValue])

    useEffect(()=>{
        if(page > 1){
            AccountHistory(dateValue, page)
        }
    },[page])

    const selectedExplanation = [
        {
            text: 'Hepsi',
            value: null
        },
        {
            text: 'Maaş',
            value: 'Maaş'
        },
        {
            text: 'Para Çekme',
            value: 'Para Çekme'
        },
        {
            text: 'Eğitim',
            value: 'Eğitim'
        },
        {
            text: 'Vergi',
            value: 'Vergi'
        },
        {
            text: 'Para Yatırma',
            value: 'Para Yatırma'
        }
    ]

    const selectedDateList = [
        {
            text: 'Bugün',
            value: 1
        },
        {
            text: 'Dün',
            value: 2
        },
        {
            text: 'Son 7 gün',
            value: 3
        },
        {
            text: 'Son 15 gün',
            value: 4
        },
        {
            text: 'Bu Ay',
            value: 5
        },
        {
            text: 'Son 1 ay',
            value: 6
        },
        {
            text: 'Son 3 ay',
            value: 7
        },
        {
            text: 'Son 6 ay',
            value: 8
        },
        {
            text: 'Bu Yıl',
            value: 9
        },
        {
            text: 'Son 1 yıl',
            value: 10
        },
        {
            text: 'Son 2 yıl',
            value: 11
        }
    ];

    selectDateChange = (value) => {
        var date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
        switch (value) {
            case 1:
                date = null
                break;
            case 2:
                date = null
                break;
            case 3:
                date.setDate(date.getDate() - 7)
                break;
            case 4:
                date.setDate(date.getDate() - 15)
                break;
            case 5:
                date = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
                break;
            case 6:
                date.setMonth(date.getMonth() - 1)
                break;
            case 7:
                date.setMonth(date.getMonth() - 3)
                break;
            case 8:
                date.setMonth(date.getMonth() - 6)
                break;
            case 9:
                date = new Date(new Date().getFullYear(), 0, 1);
                break;
            case 10:
                date.setFullYear(date.getFullYear() - 1)
                break;
            case 11:
                date.setFullYear(date.getFullYear() - 2)
                break;
        }
        return date;
    }

    RowItem = ({ item, index }) => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 40 }}>
                        {(String(new Date(item.createDate).getDate()).padStart(2, '0'))}
                    </Text>
                    <Text>
                        {(TurkishShortMonth(item.createDate))} {(new Date(item.createDate).getFullYear())}
                    </Text>
                    <Text>
                        {(HourMinute(item.createDate))}
                    </Text>
                </View>
                <View style={{ flex: 3, justifyContent: 'center' }}>
                    <Text>
                        {item.explanation}
                    </Text>
                </View>
                <View style={{ justifyContent: 'space-between', alignItems: 'flex-end', paddingVertical: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                        {item.amount}
                    </Text>
                    <TouchableNativeFeedback onPress={() => createPDF()}>
                        <Icon name='document-text-outline' size={24} color='#049142' />
                    </TouchableNativeFeedback>
                </View>
            </View>
        )
    }

    createPDF = async () => {
        let options = {
            html: '<h1>PDF TEST</h1>',
            fileName: 'test',
            directory: 'Download',
        };

        /* let file = await RNHTMLtoPDF.convert(options)
        alert(file.filePath); */
    }

    Reached = () => {
        if (!loading && (momentum || !IsMomentum)) {
            var newPage = page + 1
            if (newPage <= totalPage) {
                setPage(newPage);
            }
            setMomentum(false)
        }
        
    }

    return (
        <PageComponent>
            <RowItemComponent
                textStyle={{ color: '#ffffff' }}
                style={{ backgroundColor: '#049142' }}
                leftStatement={[account.account, "Kullanılabilir Bakiye"]}
                rigthStatement={[`${account.balance} ${account.currencyCode}`, `${account.availableBalance} ${account.currencyCode}`]} />
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <PickerComponent
                        selectedValue={selectExplanation}
                        onValueChange={(value) => setSelectExplanation(value)}
                        Items={selectedExplanation}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <PickerComponent
                        selectedValue={dateValue}
                        onValueChange={(value) => setDateValue(value)}
                        Items={selectedDateList}
                    />
                </View>
            </View>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <FlatList 
                    data={data} 
                    renderItem={RowItem} 
                    keyExtractor={(item, index) => index.toString()} 
                    onEndReachedThreshold={.1}
                    onEndReached={Reached}
                    onMomentumScrollBegin={() => {
                        setMomentum(true)
                        setIsMomentum(true)
                    }}
                />
            </View>
        </PageComponent>
    )
}

export default AccountHistoryPage;