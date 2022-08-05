import { Text, View, StyleSheet, ScrollView, TouchableWithoutFeedback, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import CheckBoxComponent from '../../components/Utilities/CheckBoxComponent'
import { Post, DataTableRequest, Get } from '../../components/Utilities/ServiceComponent'
import PageComponent from '../../components/Utilities/PageComponent'
import TextInputComponent from '../../components/Utilities/TextInputComponent'
import KeyboardAvoidingComponent from '../../components/Utilities/KeyboardAvoidingComponent'
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { DateFormat } from '../../components/Utilities/HeplMethod'
import ButtonComponent from '../../components/Utilities/ButtonComponent'
import { Formik } from "formik"
import * as Yup from 'yup'
import PickerComponent from '../../components/Utilities/PickerComponent'
import { useDispatch } from 'react-redux'
import { setLoading, setMyAdresses } from '../../redux/actions'
import SuccessModalComponent from '../../components/Utilities/SuccessModalComponent'
import ConfirmComponent from '../../components/Utilities/ConfirmComponent'
import ScrollViewComponent from '../../components/Utilities/ScrollViewComponent'

const AdressChangePage = ({ navigation, route }) => {
  const dispatch = useDispatch();

  //Property start
  const [adressName, setAdressName] = useState('')
  const [customerId, setCustomerId] = useState(0)
  const [adressDetailChange, setAdressDetailChange] = useState('')
  const [countryId, setCountryId] = useState(0)
  const [cityId, setCityId] = useState(0)
  const [districtId, setDistrictId] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [id, setId] = useState(0)
  //Property end

  const [adress, setAdress] = useState(null)
  const [domicileStartDateSelected, setDomicileStartDateSelected] = useState(new Date())
  const [domicileStartDate, setDomicileStartDate] = useState(null)
  const [domicileStartDateStr, setDomicileStartDateStr] = useState('')
  const [datePickerVisibility, setDatePickerVisibility] = useState(false);
  const [countrySelectList, setCountrySelectList] = useState(null)
  const [citySelectList, setCitySelectList] = useState(null)
  const [districtSelectList, setDistrictSelectList] = useState(null)
  const [cityDropDownBlur, setCityDropDownBlur] = useState(false)
  const [countryDropDownBlur, setCountryDropDownBlur] = useState(false)
  const [confirmModal, setConfirmModal] = useState(false)
  const [successModal, setSuccessModal] = useState(false)
  const { Id } = route.params

  GetAdressDetail = async () => {
    dispatch(setLoading(true));
    var Filter = [
      {
        "Name": "Id",
        "Value": Id.toString()
      }
    ]
    const requestData = DataTableRequest(null, Filter);
    const result = await Post('/Adress/GetAdressDetail', requestData, navigation);
    if (result !== null && result !== undefined && result.resultStatus === true) {
      setAdress(result.resultObje.data.adress)
      setAdressName(result.resultObje.data.adress.adressName);
      setCustomerId(result.resultObje.data.adress.customerId);
      setAdressDetailChange(result.resultObje.data.adress.adressDetail);
      setCountryId(result.resultObje.data.adress.countryId);
      setCityId(result.resultObje.data.adress.cityId);
      setDistrictId(result.resultObje.data.adress.districtId);
      setIsFavorite(result.resultObje.data.adress.isFavorite);
      setId(result.resultObje.data.adress.id);

      setDomicileStartDate(result.resultObje.data.adress.domicileStartDate)
      const domicileDateStart = result.resultObje.data.adress.domicileStartDate !== null ? new Date(result.resultObje.data.adress.domicileStartDate) : new Date()
      setDomicileStartDateSelected(domicileDateStart)
      setCountrySelectList(result.resultObje.data.countrySelectList)
      setCitySelectList(result.resultObje.data.citySelectList)
      setDistrictSelectList(result.resultObje.data.districtSelectList)
    }
    dispatch(setLoading(false));
  }
  useEffect(() => {
    GetAdressDetail()
  }, [])

  deleteAdress = async ()=>{
    setConfirmModal(false)
    dispatch(setLoading(true))
    const result = await Post('/Adress/DeleteAdress',adress,navigation)
    if (result !== null && result !== undefined && result.resultStatus === true) {
      dispatch(setMyAdresses(null))
      navigation.goBack()
    }
    dispatch(setLoading(false))
  }

  formSubmit = async (values) => {
    dispatch(setLoading(true))
    if(domicileStartDate !== null && domicileStartDate !== undefined){
      values.DomicileStartDate = values.DomicileStartDateSelected;
    }
    const result = await Post('/Adress/UpdateAdress',values,navigation)
    if (result !== null && result !== undefined && result.resultStatus === true) {
      setSuccessModal(true)
      dispatch(setMyAdresses(null))
    } 
    dispatch(setLoading(false))
  }

  useEffect(() => {
    if (domicileStartDate !== null) {
      const result = DateFormat(new Date(domicileStartDate.toString()));
      setDomicileStartDateStr(result)
    }
  }, [domicileStartDate])

  SelectedDropDown = async (url, factions, fieldFunction) => {
    dispatch(setLoading(true))
    const result = await Get(url, null, navigation);
    if (result !== null && result !== undefined && result.resultStatus === true) {
      factions(result.resultObje)
      fieldFunction(result.resultObje[0].value)
    }
    dispatch(setLoading(false))
  }

  return (
    <PageComponent>
      <SuccessModalComponent message='Adres güncelleme başarılı.' modal={successModal} OkPressEvent={()=>{
        setSuccessModal(false)
        navigation.goBack()
      }}/>
      <ConfirmComponent title='Silme onayı' message='İşlem  sonrasında adresin silinecek. Onaylıyor musun?'
      approval='Evet' approvalOnPress={deleteAdress} denial='Hayır' denialOnPress={()=>setConfirmModal(false)} modal={confirmModal}/>
      <KeyboardAvoidingComponent>
        <Formik
          enableReinitialize={true}
          initialValues={{
            Id: id,
            AdressName: adressName,
            CustomerId : customerId,
            AdressDetail: adressDetailChange,
            CountryId: countryId,
            CityId: cityId,
            DistrictId: districtId,
            DomicileStartDateSelected: domicileStartDateSelected,
            IsFavorite: isFavorite
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
              <View style={styles.styleInput}>
                <Text style={styles.syleText}>Adres Tipi</Text>
                <Text style={[styles.syleText, { textTransform: 'uppercase' }]}>{adressName}</Text>
              </View>
              <View style={[styles.styleInput, { flexDirection: 'column' }]}>
                <Text>Ülke</Text>
                <PickerComponent
                  onBlur = {()=>setCountryDropDownBlur(true)}
                  selectedValue={values.CountryId}
                  onValueChange={(value) => {
                    setFieldValue('CountryId', value)
                    setCountryId(value)
                    if(countryDropDownBlur){
                      SelectedDropDown('/Adress/GetCityDropDownList?CountryId=' + value, setCitySelectList, setCityId)
                    }
                  }}
                  touched={touched.CountryId}
                  errors={errors.CountryId}
                  Items={countrySelectList}
                />
              </View>
              <View style={[styles.styleInput, { flexDirection: 'column' }]}>
                <Text>İl</Text>
                <PickerComponent
                  onBlur={()=> setCityDropDownBlur(true)}
                  selectedValue={values.CityId}
                  onValueChange={(value) => {
                    setFieldValue('CityId', value)
                    setCityId(value)
                    if(cityDropDownBlur){
                      SelectedDropDown('/Adress/GetDistrictDropDownList?CityId=' + value,setDistrictSelectList, setDistrictId)
                    }
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
                  onValueChange={(value) => {
                    setFieldValue('DistrictId', value)
                    setDistrictId(value)
                  }}
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
                  onChangeText={(value)=>{
                    setFieldValue('AdressDetail',value)
                    setAdressDetailChange(value)
                  }}
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
                      setFieldValue('DomicileStartDateSelected',date)
                      setDomicileStartDate(date)
                    }}
                    onCancel={() => setDatePickerVisibility(false)}
                    maximumDate={new Date()}
                    minimumDate={new Date(1900, 1, 1)}
                    date={(values.DomicileStartDateSelected === null) ? (new Date()) : (values.DomicileStartDateSelected)}
                  />
                </View>
              </TouchableWithoutFeedback>
              <View style={[styles.styleInput, { flexDirection: 'row' }]}>
                <CheckBoxComponent
                  value={values.IsFavorite}
                  onValueChange={() => {
                    setFieldValue('IsFavorite', !values.IsFavorite)
                    setIsFavorite(!values.IsFavorite)
                  }}
                  label='İletişim adresi olarak tanımlamak istiyorum.'
                />
              </View>
              <ButtonComponent title='Devam' onPress={(handleSubmit)} />
              <ButtonComponent title='Sil' onPress={()=>setConfirmModal(true)}/>
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
export default AdressChangePage;