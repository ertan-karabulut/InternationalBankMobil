import { Text, View, StyleSheet, ScrollView, TextInput } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLoading } from '../redux/actions';
import ImageBackgroundComponent from '../components/Login/ImageBackgroundComponent';
import TextInputComponent from '../components/Utilities/TextInputComponent';
import ButtonComponent from '../components/Utilities/ButtonComponent';
import KeyboardAvoidingComponent from '../components/Utilities/KeyboardAvoidingComponent';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Post } from '../components/Utilities/ServiceComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ErrorModalComponent from '../components/Utilities/ErrorModalComponent';
import ScrollViewComponent from '../components/Utilities/ScrollViewComponent';

const LoginPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false)
  const passwordRef = useRef();

  useEffect(() => {
    async function getToken() {
      dispatch(setLoading(true));
      const Token = await AsyncStorage.getItem('Token');
      if (Token !== undefined && Token !== null) {
        const { accessToken } = JSON.parse(Token);
        if (accessToken !== null && accessToken !== undefined) {
          dispatch(setLoading(false));
          navigation.replace('MyDrawer');
        }
      }
      dispatch(setLoading(false));
    }
    getToken();
  }, []);

  const formSubmit = async (values) => {
    dispatch(setLoading(true));
    var result = await Post('/Token/GetToken', values, navigation);
    if (result !== null) {
      if (result.resultStatus) {
        await AsyncStorage.setItem('Token', JSON.stringify(result.resultObje));
        dispatch(setLoading(false));
        navigation.replace('MyDrawer');
      }
      else {
        dispatch(setLoading(false));
        setModal(true)
      }
    }
    else {
      dispatch(setLoading(false));
    }
  }

  return (
    <ImageBackgroundComponent>
      <ErrorModalComponent message='Hatalı kullanıcı adı veya şifre.' title='Giriş yapılamadı.' modal={modal} OkPressEvent={() => setModal(false)} />
      <KeyboardAvoidingComponent>
        <Formik
          initialValues={{ User: '', Password: '' }}
          onSubmit={formSubmit}
          validationSchema={
            Yup.object().shape({
              User: Yup.string()
                .required('Müşteri / T.C. Kimlik Numarası boş bırakılamaz.')
                .max(11, 'Müşteri / T.C. Kimlik Numarası 11 karakterden fazla olamaz.')
                .min(8, 'Müşteri / T.C. Kimlik Numarası 8 karakterden az olamaz.'),
              Password: Yup.string()
                .required('Parola boş bırakılamaz.')
                .max(6, 'Parola 6 karakterden fazla olamaz.')
                .min(6, 'Parola 6 karakterden az olamaz.'),
            })
          }>
          {({ values, handleChange, handleSubmit, errors, touched, setFieldTouched }) => (
            <ScrollViewComponent>
              <View style={styles.containerStyle}>
                <TextInputComponent
                  placeholder='Müşteri / T.C. Kimlik Numarası'
                  keyboardType='number-pad'
                  onChangeText={handleChange('User')}
                  onBlur={() => setFieldTouched('User')}
                  value={values.User}
                  touched={touched.User}
                  returnKeyType={'next'}
                  errors={errors.User}
                  onSubmitEditing={()=> passwordRef.current.focus()} />
                <TextInputComponent
                  keyboardType='number-pad'
                  secureTextEntry={true}
                  onChangeText={handleChange('Password')}
                  onBlur={() => setFieldTouched('Password')}
                  value={values.Password}
                  touched={touched.Password}
                  errors={errors.Password}
                  placeholder='Parola'
                  inputRef={passwordRef} />
                <ButtonComponent title='Giriş' style={{ backgroundColor: 'blue' }} onPress={(handleSubmit)} />
              </View>
            </ScrollViewComponent>
          )}
        </Formik>
      </KeyboardAvoidingComponent>
    </ImageBackgroundComponent>
  )
}
const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default LoginPage;