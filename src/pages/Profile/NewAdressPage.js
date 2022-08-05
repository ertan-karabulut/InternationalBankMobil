import { Text, View, StyleSheet, ScrollView, TouchableWithoutFeedback, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import PageComponent from '../../components/Utilities/PageComponent'
import * as Yup from 'yup'
import KeyboardAvoidingComponent from '../../components/Utilities/KeyboardAvoidingComponent'
import { Formik } from "formik"
import SuccessModalComponent from '../../components/Utilities/SuccessModalComponent'
import PickerComponent from '../../components/Utilities/PickerComponent'
import TextInputComponent from '../../components/Utilities/TextInputComponent'
import DateTimePickerModal from "react-native-modal-datetime-picker"
import CheckBoxComponent from '../../components/Utilities/CheckBoxComponent'
import ButtonComponent from '../../components/Utilities/ButtonComponent'
import { Post, DataTableRequest, Get } from '../../components/Utilities/ServiceComponent'
import { useSelector, useDispatch } from 'react-redux'
import { setLoading, setMyAdresses } from '../../redux/actions'
import { DateFormat } from '../../components/Utilities/HeplMethod'
import ScrollViewComponent from '../../components/Utilities/ScrollViewComponent'

const NewAdressPage = ({ navigation, route }) => {
    const [countrySelectList, setCountrySelectList] = useState(null)
    const [citySelectList, setCitySelectList] = useState(null)
    const [districtSelectList, setDistrictSelectList] = useState(null)
    const [datePickerVisibility, setDatePickerVisibility] = useState(false)
    const [domicileStartDateStr, setDomicileStartDateStr] = useState('')
    const [modal, setModal] = useState(false)

    const dispatch = useDispatch();
    useEffect(() => {
        async function GetCountryList() {
            dispatch(setLoading(true))
            const result = await Get('/Adress/GetCountryDropDownList', navigation);
            if (result !== null && result !== undefined && result.resultStatus === true) {
                setCountrySelectList(result.resultObje)
            }
            dispatch(setLoading(false))
        }
        GetCountryList()
    }, [])

    formSubmit = async (values) => {
        dispatch(setLoading(true))
        values.isActive = true
        const result = await Post('/Adress/AddAdress', values, navigation)
        if (result !== null && result !== undefined && result.resultStatus === true) {
            setModal(true)
            dispatch(setMyAdresses(null))
        }
        dispatch(setLoading(false))
    }

    SelectedDropDown = async (url, factions) => {
        dispatch(setLoading(true))
        const result = await Get(url, null, navigation);
        if (result !== null && result !== undefined && result.resultStatus === true) {
            factions(result.resultObje)
        }
        dispatch(setLoading(false))
    }

    return (
        <PageComponent>
            <SuccessModalComponent message='Adres ekleme başarılı.' modal={modal} OkPressEvent={() => {
                setModal(false)
                navigation.goBack()
            }} />
            <KeyboardAvoidingComponent>
                <Formik
                    initialValues={{
                        AdressName: '',
                        CustomerId: 0,
                        AdressDetail: '',
                        CountryId: 0,
                        CityId: 0,
                        DistrictId: 0,
                        DomicileStartDate: null,
                        IsFavorite: false
                    }}
                    onSubmit={formSubmit}
                    validationSchema={
                        Yup.object().shape({
                            AdressDetail: Yup.string()
                                .required('Adres alanı boş bırakılamaz.')
                                .max(100, 'Adres alanı 100 karakterden fazla olamaz.'),
                            CountryId: Yup.string()
                                .required('Ülke alanı boş bırakılamaz.'),
                            CityId: Yup.string()
                                .required('İl alanı boş bırakılamaz.'),
                            DistrictId: Yup.string()
                                .required('İlçe alanı boş bırakılamaz.'),
                        })
                    }
                >
                    {({ values, handleChange, handleSubmit, errors, touched, setFieldTouched, setFieldValue }) => (
                        <ScrollViewComponent>
                            <View style={[styles.styleInput, { flexDirection: 'column' }]}>
                                <Text style={styles.syleText}>Adres Tipi</Text>
                                <TextInputComponent
                                    value={values.AdressName}
                                    onChangeText={handleChange('AdressName')}
                                    onBlur={() => setFieldTouched('AdressName')}
                                    errors={errors.AdressName}
                                    touched={touched.AdressName} />
                            </View>
                            <View style={[styles.styleInput, { flexDirection: 'column' }]}>
                                <Text>Ülke</Text>
                                <PickerComponent
                                    selectedValue={values.CountryId}
                                    onValueChange={(value) => {
                                        setFieldValue('CountryId', value)
                                        SelectedDropDown('/Adress/GetCityDropDownList?CountryId=' + value, setCitySelectList)
                                    }}
                                    touched={touched.CountryId}
                                    errors={errors.CountryId}
                                    Items={countrySelectList}
                                />
                            </View>
                            <View style={[styles.styleInput, { flexDirection: 'column' }]}>
                                <Text>İl</Text>
                                <PickerComponent
                                    selectedValue={values.CityId}
                                    onValueChange={(value) => {
                                        setFieldValue('CityId', value)
                                        SelectedDropDown('/Adress/GetDistrictDropDownList?CityId=' + value, setDistrictSelectList)
                                    }}
                                    touched={touched.CityId}
                                    errors={errors.CityId}
                                    Items={citySelectList}
                                >
                                </PickerComponent>
                            </View>
                            <View style={[styles.styleInput, { flexDirection: 'column' }]}>
                                <Text>İlçe</Text>
                                <PickerComponent
                                    selectedValue={values.DistrictId}
                                    onValueChange={handleChange('DistrictId')}
                                    errors={errors.DistrictId}
                                    touched={touched.DistrictId}
                                    Items={districtSelectList}
                                >
                                </PickerComponent>
                            </View>
                            <View style={[styles.styleInput, { flexDirection: 'column' }]}>
                                <Text>Adres</Text>
                                <TextInputComponent
                                    value={values.AdressDetail}
                                    onChangeText={handleChange('AdressDetail')}
                                    onBlur={() => setFieldTouched('AdressDetail')}
                                    errors={errors.AdressDetail}
                                    touched={touched.AdressDetail} />
                            </View>
                            <TouchableWithoutFeedback onPress={() => setDatePickerVisibility(true)}>
                                <View style={[styles.styleInput, { flexDirection: 'column' }]}>
                                    <Text>İkametgah başlangıç tarihi</Text>
                                    {(domicileStartDateStr === '') ? (null) : (<Text>{domicileStartDateStr}</Text>)}
                                    <DateTimePickerModal
                                        isVisible={datePickerVisibility}
                                        mode="date"
                                        onConfirm={(date) => {
                                            setDatePickerVisibility(false)
                                            setFieldValue('DomicileStartDate', date)
                                            const result = DateFormat(date);
                                            setDomicileStartDateStr(result)
                                        }}
                                        onCancel={() => setDatePickerVisibility(false)}
                                        maximumDate={new Date()}
                                        minimumDate={new Date(1900, 1, 1)}
                                        date={(values.DomicileStartDate === null) ? (new Date()) : (values.DomicileStartDate)}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                            <View style={[styles.styleInput, { flexDirection: 'row' }]}>
                                <CheckBoxComponent
                                    value={values.IsFavorite}
                                    onValueChange={() => {
                                        setFieldValue('IsFavorite', !values.IsFavorite)
                                    }}
                                    label='İletişim adresi olarak tanımlamak istiyorum.'
                                />
                            </View>
                            <ButtonComponent title='Devam' onPress={(handleSubmit)} />
                        </ScrollViewComponent>
                    )}
                </Formik>
            </KeyboardAvoidingComponent>
        </PageComponent>
    )
}
const styles = StyleSheet.create({
    styleInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginTop: 10,
        paddingVertical: 10,
        backgroundColor: '#ffffff'
    },
    syleText: {
        fontWeight: 'bold',
        fontSize: 15
    }
})
export default NewAdressPage;