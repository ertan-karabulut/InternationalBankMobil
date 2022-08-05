import * as React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler'
import LoginPage from '../pages/LoginPage'
import HomePage from '../pages/HomePage'
import ErrorPage from '../pages/ErrorPage'
import PageList from '../pages/AccountAndCard/PageListPage'
import AccountPage from '../pages/AccountAndCard/AccountPage'
import AccountDetailPage from '../pages/AccountAndCard/AccountDetailPage'
import PersonalInformationPage from '../pages/Profile/PersonalInformationPage'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer'
import ProfileHeaderComponent from '../components/Home/ProfileHeaderComponent'
import DrawerContent from '../components/Home/DrawerContent'
import AdressInformationPage from '../pages/Profile/AdressInformationPage'
import AdressChangePage from '../pages/Profile/AdressChangePage'
import NewAdressPage from '../pages/Profile/NewAdressPage'
import Icon from 'react-native-vector-icons/Ionicons'
import HeaderAddButton from '../components/Utilities/HeaderAddButton'
import QRCodePage from '../pages/AccountAndCard/QRCodePage'
import AccountHistoryPage from '../pages/AccountAndCard/AccountHistoryPage'
import BranchMapsPage from '../pages/Profile/BranchMapsPage'
import ProfilePhotoChangePage from '../pages/Profile/ProfilePhotoChangePage'
import EmailListPage from '../pages/Profile/EmailListPage'
import EmailChangePage from '../pages/Profile/EmailChangePage'
import NewMailPage from '../pages/Profile/NewMailPage'
import PhoneListPage from '../pages/Profile/PhoneListPage'
import PhoneChangePage from '../pages/Profile/PhoneChangePage'
import NewPhonePage from '../pages/Profile/NewPhonePage'
import CardListPage from '../pages/AccountAndCard/CardListPage'

const Stack = createNativeStackNavigator();
const Tap = createBottomTabNavigator();
const AccountCardStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const InformationStack = createNativeStackNavigator();

const InformationNavigation = ({ navigation }) => {
  return (
    <InformationStack.Navigator initialRouteName='PersonalInformationPage' screenOptions={styles.headerStyle}>
      <InformationStack.Screen name="PersonalInformationPage" component={PersonalInformationPage} options={{ headerShown: false }} />
      <InformationStack.Screen name="AdressInformationPage" component={AdressInformationPage} options={{
        title: 'Adresler',
        headerRight: () => (<HeaderAddButton sendToPage={() => navigation.navigate('NewAdressPage')} />)
      }} />
      <InformationStack.Screen name="AdressChangePage" component={AdressChangePage} options={{ title: 'Adres Değişiklik' }} />
      <InformationStack.Screen name="NewAdressPage" component={NewAdressPage} options={{ title: 'Yeni Adres' }} />
      <InformationStack.Screen name='ProfilePhotoChangePage' component={ProfilePhotoChangePage} options={{
        title: 'Profil Resmini Değiştir'
      }} />
      <InformationStack.Screen name='EmailListPage' component={EmailListPage} options={{
        title: 'E-posta Adresleri',
        headerRight: () => (<HeaderAddButton sendToPage={() => navigation.navigate('NewMailPage')} />)
      }} />
      <InformationStack.Screen name="EmailChangePage" component={EmailChangePage} options={{ title: 'E-posta Değişiklik' }} />
      <InformationStack.Screen name="NewMailPage" component={NewMailPage} options={{ title: 'Yeni E-posta Adresi' }} />
      <InformationStack.Screen name='PhoneListPage' component={PhoneListPage} options={{
        title: 'Telefon Numaraları',
        headerRight: () => (<HeaderAddButton sendToPage={() => navigation.navigate('NewPhonePage')} />)
      }} />
      <InformationStack.Screen name="PhoneChangePage" component={PhoneChangePage} options={{ title: 'Telefon Değişiklik' }} />
      <InformationStack.Screen name="NewPhonePage" component={NewPhonePage} options={{ title: 'Yeni Telefon Numrası' }} />
    </InformationStack.Navigator>
  )
}

const AccountCard = ({ navigation }) => {
  return (
    <AccountCardStack.Navigator initialRouteName='PageList' screenOptions={styles.headerStyle}>
      <AccountCardStack.Screen name="PageList" component={PageList} options={{ title: 'Hesap ve Kart' }} />
      <AccountCardStack.Screen name="AccountPage" component={AccountPage} options={{ title: 'Hesaplar' }} />
      <AccountCardStack.Screen name='AccountDetailPage' component={AccountDetailPage} options={{ title: 'Hesap Detayı' }} />
      <AccountCardStack.Screen name='QRCodePage' component={QRCodePage} options={{ title: 'QR Kod Görüntüleme' }} />
      <AccountCardStack.Screen name='AccountHistoryPage' component={AccountHistoryPage} options={{ title: 'Hesap Hareketleri' }} />
      <AccountCardStack.Screen name='CardListPage' component={CardListPage} options={{ title: 'Kartlar' }} />
    </AccountCardStack.Navigator>
  )
}

const HomeTab = ({ navigation }) => {
  return (
    <Tap.Navigator screenOptions={styles.headerStyle} >
      <Tap.Screen name='Home' component={HomePage} options={{
        title: 'Ana Sayfa', headerLeft: () => (
          <ProfileHeaderComponent navigation={navigation} />
        ),
        tabBarIcon: ({ focused }) => (
          <HomeTabBarIcon name='home' focused={focused} />
        )
      }} />
      <Tap.Screen name='AccountCard' component={AccountCard} options={{
        header: () => null,title:'Hesap ve Kartlar',
        tabBarIcon: ({ focused }) => (
          <HomeTabBarIcon name='card-sharp' focused={focused} />
        )
      }} />
    </Tap.Navigator>
  )
}

const HomeTabBarIcon = ({ name, focused }) => {
  return (
    <Icon name={name} size={23} color={focused ? '#01a4a4' : '#666566'} />
  )
}

const MyDrawer = ({ navigation }) => {
  return (
    <Drawer.Navigator
      initialRouteName='HomeTab'
      screenOptions={{ headerShown: false, swipeEnabled: false, drawerStyle: { height: '100%', width: '100%' } }}
      drawerContent={props => <DrawerContent {...props} />}
    >
      <Drawer.Screen name='HomeTab' component={HomeTab} />
      <Drawer.Screen name="InformationNavigation" component={InformationNavigation} />
      <Drawer.Screen name="BranchMapsPage" component={BranchMapsPage}
        options={{
          title: 'Şubelerimiz', headerShown: true, ...styles.headerStyle, headerLeft: () => null
        }} />
    </Drawer.Navigator>
  );
}

function App({ navigation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Login'>
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name='MyDrawer' component={MyDrawer} />
        <Stack.Screen name='Error' component={ErrorPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  headerStyle: {
    headerTitleAlign: 'center',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#049142'
    }
  }
})
export default App;