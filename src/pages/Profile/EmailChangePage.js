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
import { setLoading, setMail } from '../../redux/actions'
import SuccessModalComponent from '../../components/Utilities/SuccessModalComponent'
import ConfirmComponent from '../../components/Utilities/ConfirmComponent'
import { Post } from '../../components/Utilities/ServiceComponent'

const EmailChangePage = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const { Id, IsFavorite, Email, CustomerId } = route.params
  const [isFavorite, setIsFavorite] = useState(false)
  const [email, setEmail] = useState('')
  const [confirmModal, setConfirmModal] = useState(false)
  const [successModal, setSuccessModal] = useState(false)

  formSubmit = async (values) => {
    dispatch(setLoading(true))
    const result = await Post('/Mail/UpdateMail',values,navigation)
    if (result !== null && result !== undefined && result.resultStatus === true) {
      setSuccessModal(true)
      dispatch(setMail(null))
    } 
    dispatch(setLoading(false))
  }

  deleteMail = async ()=>{
    setConfirmModal(false)
    dispatch(setLoading(true))
    const data = {
      Id:Id,
      CustomerId
    }
    const result = await Post('/Mail/DeleteMail',data,navigation)
    if (result !== null && result !== undefined && result.resultStatus === true) {
      dispatch(setMail(null))
      navigation.goBack()
    }
    dispatch(setLoading(false))
  }

  useEffect(() => {
    setIsFavorite(IsFavorite)
    setEmail(Email)
  }, [])
  return (
    <PageComponent>
      <SuccessModalComponent
        message='E-Posta adresiniz başarıyla güncellenmiştir.'
        modal={successModal}
        OkPressEvent={() => {
          setSuccessModal(false)
          navigation.goBack()
        }}
      />
      <ConfirmComponent
        title='Silme onayı'
        message='İşlem  sonrasında e-posta adresiniz silinecek. Onaylıyor musun?'
        approval='Evet'
        approvalOnPress={deleteMail} 
        denial='Hayır'
        denialOnPress={() => setConfirmModal(false)}
        modal={confirmModal}
      />
      <KeyboardAvoidingComponent>
        <Formik
          enableReinitialize={true}
          initialValues={{
            Id: Id,
            CustomerId:CustomerId,
            Email: email,
            IsFavorite: isFavorite,
          }}
          onSubmit={formSubmit}
          validationSchema={
            Yup.object().shape({
              Email: Yup.string()
                .required('E-Posta alanı boş bırakılamaz.')
                .max(40, 'E-Posta alanı 40 karakterden fazla olamaz.')
                .email('Lütfen geçerli bir mail adresi giriniz.')
            })
          }
        >
          {({ values, handleChange, handleSubmit, errors, touched, setFieldTouched, setFieldValue }) => (
            <ScrollView>
              <View style={[styles.styleInput, { flexDirection: 'column' }]}>
                <Text>E-Posta Adresi</Text>
                <TextInputComponent
                  value={values.Email}
                  onChangeText={handleChange('Email')}
                  onBlur={() => setFieldTouched('Email')}
                  errors={errors.Email}
                  touched={touched.Email}
                  keyboardType='email-address' />
              </View>
              <View style={[styles.styleInput, { flexDirection: 'row' }]}>
                <CheckBoxComponent
                  value={values.IsFavorite}
                  onValueChange={() => {
                    setFieldValue('IsFavorite', !values.IsFavorite)
                  }}
                  label='İletişim e-posta adresi olarak tanımlamak istiyorum.'
                />
              </View>
              <ButtonComponent title='Devam' onPress={(handleSubmit)} />
              <ButtonComponent title='Sil' onPress={() => setConfirmModal(true)} />
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

export default EmailChangePage;