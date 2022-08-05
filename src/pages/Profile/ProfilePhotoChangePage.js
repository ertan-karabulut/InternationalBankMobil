import { Text, View, I18nManager, Image, Dimensions, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PageComponent from '../../components/Utilities/PageComponent'
import ErrorModalComponent from '../../components/Utilities/ErrorModalComponent'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import ConfirmComponent from '../../components/Utilities/ConfirmComponent'
import { PERMISSIONS, openSettings } from 'react-native-permissions'
import { setPermissions, setLoading, setPhoto } from '../../redux/actions'
import { PermissionCheckCustom } from '../../components/Utilities/HeplMethod'
import ButtonComponent from '../../components/Utilities/ButtonComponent'
import { Post } from '../../components/Utilities/ServiceComponent'

const ProfilePhotoChangePage = ({ navigation }) => {
  const { photo, permissions } = useSelector(state => state.appReducer)
  const dispatch = useDispatch()
  const [image, setImage] = useState('')
  const [imageSize, setImageSize] = useState(Dimensions.get('window').height * 0.3)
  const [modal, setModal] = useState(false)
  const [errorModal, setErrorModal] = useState(false)
  const [change, setChange] = useState(false)
  const [message, setMessage] = useState('')
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  useEffect(() => {
    var permission = false
    if (Platform.OS === 'android') {
      if (!permissions.CAMERA.USE || !permissions.WRITE_EXTERNAL_STORAGE.USE || !permissions.READ_EXTERNAL_STORAGE.USE) {
        permission = true
      }
    }
    else if (Platform.OS === 'ios') {
      if (permissions.MICROPHONE.UNAVAILABLE) {
        setMessage('Kamera')
        setErrorModal(true)
      }

      if (permissions.PHOTO_LIBRARY.UNAVAILABLE) {
        setMessage('Resim galerisi')
        setErrorModal(true)
      }

      if (permissions.PHOTO_LIBRARY_ADD_ONLY.UNAVAILABLE) {
        setMessage('Resim galerisi')
        setErrorModal(true)
      }

      if (permissions.MEDIA_LIBRARY.UNAVAILABLE) {
        setMessage('Video galerisi')
        setErrorModal(true)
      }

      if (!permissions.MICROPHONE.USE || !permissions.PHOTO_LIBRARY.USE || !permissions.PHOTO_LIBRARY_ADD_ONLY.USE || !permissions.MEDIA_LIBRARY.USE) {
        permission = true
      }
    }

    if (permission) {
      setModal(true)
    }
    if (photo !== null) {
      setImage(photo)
    }

  }, [photo])

  OpenStettings = async () => {
    setModal(false)
    await openSettings()
    if (Platform.OS === 'android') {
      setTimeout(async () => {
        var resultCamera = await PermissionCheckCustom(PERMISSIONS.ANDROID.CAMERA)
        if (resultCamera) {
          dispatch(setPermissions({ ...permissions, "CAMERA": true }))
        }

        var resultWrite = await PermissionCheckCustom(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
        if (resultWrite) {
          dispatch(setPermissions({ ...permissions, "WRITE_EXTERNAL_STORAGE": true }))
        }

        var resulteRead = await PermissionCheckCustom(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
        if (resulteRead) {
          dispatch(setPermissions({ ...permissions, "READ_EXTERNAL_STORAGE": true }))
        }
      }, 10000);
    }
    else if (Platform.OS === 'ios') {
      setTimeout(async () => {
        var resultMicrophone = await PermissionCheckCustom(PERMISSIONS.IOS.MICROPHONE)
        if (resultMicrophone) {
          dispatch(setPermissions({ ...permissions, "MICROPHONE": true }))
        }

        var resultPhotoLibrary = await PermissionCheckCustom(PERMISSIONS.IOS.PHOTO_LIBRARY)
        if (resultPhotoLibrary) {
          dispatch(setPermissions({ ...permissions, "PHOTO_LIBRARY": true }))
        }

        var resultPhotoLibraryAdd = await PermissionCheckCustom(PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY)
        if (resultPhotoLibraryAdd) {
          dispatch(setPermissions({ ...permissions, "PHOTO_LIBRARY_ADD_ONLY": true }))
        }

        var resultMediaLibrary = await PermissionCheckCustom(PERMISSIONS.IOS.MEDIA_LIBRARY)
        if (resultMediaLibrary) {
          dispatch(setPermissions({ ...permissions, "MEDIA_LIBRARY": true }))
        }
      }, 10000);
    }
  }

  Cancel = () => {
    navigation.goBack()
    setModal(false)
  }

  SavePhoto = async () => {
    dispatch(setLoading(true))
    const extension = selectedPhoto.fileName.split('.').pop()
    const data = {
      "Data": selectedPhoto.base64,
      "FileName": selectedPhoto.fileName,
      "Type": extension
    }
    const result = await Post('/Customer/UpdateProfilePhoto', data, navigation)
    if (result !== null && result !== undefined && result.resultStatus === true) {
      const image = 'data:image/' + extension + ';base64,' + selectedPhoto.base64
      dispatch(setPhoto(image))
    }
    dispatch(setLoading(false))
  }



  OpenGaleri = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: true
    }
    const result = await launchImageLibrary(options);
    if (result?.assets) {
      setChange(true)
      setSelectedPhoto(result.assets[0])
    }
  }

  OpenCamera = async () => {
    const options: CameraOptions = {
      mediaType: 'photo',
      saveToPhotos: false,
      cameraType: 'front',
      quality: 1,
      includeBase64: true
    }
    const result = await launchCamera(options);
    if (result?.assets) {
      setChange(true)
      setSelectedPhoto(result.assets[0])
    }
  }

  return (
    <PageComponent>
      <ErrorModalComponent
        message={'Cihazınız ' + message + ' özelliğini desteklememektedir.'}
        modal={errorModal}
        OkPressEvent={() => {
          setErrorModal(false);
          navigation.goBack();
        }} />
      <ConfirmComponent
        modal={modal}
        title='Bilgilendirme'
        message="Fotoğraf Çek veya Galeriden Seç özelliklerini kullanabilmek için, cihazınızın Ayarlar adımından Garanti BBVA/ Mobil'in fotoğraf, mikrofon erişimine ve kamera kullanımına izin vermeniz gerekmektedir."
        approval='Ayarları Aç'
        approvalOnPress={OpenStettings}
        denial='İptal'
        denialOnPress={Cancel} />
      <ConfirmComponent
        modal={change}
        title='Bilgilendirme'
        message="Profil resminiz kaydedilecektir."
        approval='Evet'
        approvalOnPress={()=>{
          SavePhoto()
          setChange(false)
        }}
        denial='Hayır'
        denialOnPress={()=>setChange(false)} />
      <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
        <Image resizeMode='stretch' source={{ uri: image }} style={{ width: imageSize, height: imageSize, borderRadius:100 }} />
      </View>
      <View style={{ flex: 6, alignItems: 'center' }}>
        <Text>Profil fotoğrafınızı değiştirebilirsiniz.</Text>
        <ButtonComponent title='Fotoğraf Çek' style={{ backgroundColor: '#01a4a4' }} onPress={OpenCamera} />
        <ButtonComponent title='Galeriden Seç' style={{ backgroundColor: '#01a4a4' }} onPress={OpenGaleri} />
      </View>
    </PageComponent>
  )
}

export default ProfilePhotoChangePage;