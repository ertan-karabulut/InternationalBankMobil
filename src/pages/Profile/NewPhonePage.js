import { Text, View, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import PageComponent from '../../components/Utilities/PageComponent'
import CheckBoxComponent from '../../components/Utilities/CheckBoxComponent'
import TextInputComponent from '../../components/Utilities/TextInputComponent'
import KeyboardAvoidingComponent from '../../components/Utilities/KeyboardAvoidingComponent'
import ButtonComponent from '../../components/Utilities/ButtonComponent'
import { Formik } from "formik"
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { setLoading, setPhone } from '../../redux/actions'
import SuccessModalComponent from '../../components/Utilities/SuccessModalComponent'
import { Post } from '../../components/Utilities/ServiceComponent'

const NewPhonePage = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const [successModal, setSuccessModal] = useState(false)

  formSubmit = async (values) => {
    dispatch(setLoading(true))
    values.isActive = true
    const result = await Post('/PhoneNumber/AddPhoneNumber',values,navigation)
    if (result !== null && result !== undefined && result.resultStatus === true) {
      setSuccessModal(true)
      dispatch(setPhone(null))
    } 
    dispatch(setLoading(false))
  }

  return (
    <PageComponent>
      <SuccessModalComponent
        message='Telefon numaranız başarıyla kaydedilmiştir.'
        modal={successModal}
        OkPressEvent={() => {
          setSuccessModal(false)
          navigation.goBack()
        }}
      />
      <KeyboardAvoidingComponent>
        <Formik
          enableReinitialize={true}
          initialValues={{
            PhoneNumber: '',
            IsFavorite: false,
            NumberName:''
          }}
          onSubmit={formSubmit}
           validationSchema={
            Yup.object().shape({
              PhoneNumber: Yup.string()
                .required('Telefon numarası alanı boş bırakılamaz.')
                .max(10, 'Telefon numarası alanı 10 karakterden fazla olamaz.')
                .min(10, 'Telefon numarası alanı 10 karakterden az olamaz.'),
                NumberName: Yup.string().max(10, 'Telefon adı alanı 10 karakterden fazla olamaz.')
            })
          } 
        >
          {({ values, handleChange, handleSubmit, errors, touched, setFieldTouched, setFieldValue }) => (
            <ScrollView>
              <View style={[styles.styleInput, { flexDirection: 'column' }]}>
                <Text>Telefon Numarası</Text>
                <TextInputComponent
                  value={values.PhoneNumber}
                  onChangeText={handleChange('PhoneNumber')}
                  onBlur={() => setFieldTouched('PhoneNumber')}
                  errors={errors.PhoneNumber}
                  touched={touched.PhoneNumber}
                  keyboardType='number-pad' />
              </View>
              <View style={[styles.styleInput, { flexDirection: 'column' }]}>
                <Text>Telefon Adı</Text>
                <TextInputComponent
                  value={values.NumberName}
                  onChangeText={handleChange('NumberName')}
                  onBlur={() => setFieldTouched('NumberName')}
                  errors={errors.NumberName}
                  touched={touched.NumberName} />
              </View>
              <View style={[styles.styleInput, { flexDirection: 'row' }]}>
                <CheckBoxComponent
                  value={values.IsFavorite}
                  onValueChange={() => {
                    setFieldValue('IsFavorite', !values.IsFavorite)
                  }}
                  label='İletişim telefon numarası olarak tanımlamak istiyorum.'
                />
              </View>
              <ButtonComponent title='Devam' onPress={(handleSubmit)} />
            </ScrollView>
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
  }
})

export default NewPhonePage;