import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import PageComponent from '../../components/Utilities/PageComponent'
import Icon from 'react-native-vector-icons/MaterialIcons'

const PersonalInformationPage = ({ navigation }) => {
    return (
        <PageComponent>
            <View style={styles.styleContainer}>
                <View style={styles.styleRow}>
                    <Text>
                        BİLGİ GÜNCELLEME
                    </Text>
                </View>

                <TouchableOpacity style={[styles.styleRow, { backgroundColor: 'white' }]}
                    onPress={() => navigation.navigate('AdressInformationPage')}>
                    <Text style={styles.styleText}>
                        Adres Bilgileri
                    </Text>
                    <View style={{ alignItems: 'flex-end', flex: 1, justifyContent: 'center' }}>
                        <Icon name='navigate-next' size={25} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.styleRow, { backgroundColor: 'white' }]}
                    onPress={() => navigation.navigate('EmailListPage')}>
                    <Text style={styles.styleText}>
                        E-posta Bilgileri
                    </Text>
                    <View style={{ alignItems: 'flex-end', flex: 1, justifyContent: 'center' }}>
                        <Icon name='navigate-next' size={25} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.styleRow, { backgroundColor: 'white' }]}
                    onPress={() => navigation.navigate('PhoneListPage')}>
                    <Text style={styles.styleText}>
                        Telefon Numarası Bilgileri
                    </Text>
                    <View style={{ alignItems: 'flex-end', flex: 1, justifyContent: 'center' }}>
                        <Icon name='navigate-next' size={25} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.styleRow, { backgroundColor: 'white' }]}
                    onPress={() => navigation.navigate('ProfilePhotoChangePage')}>
                    <Text style={styles.styleText}>
                        Profil Resmini Değiştir
                    </Text>
                    <View style={{ alignItems: 'flex-end', justifyContent: 'center', flex: 1 }}>
                        <Icon name='navigate-next' size={25} />
                    </View>
                </TouchableOpacity>
            </View>
        </PageComponent>
    )
}
export default PersonalInformationPage;

const styles = StyleSheet.create({
    styleContainer: {
        flex: 1,
        alignItems: 'center'
    },
    styleRow: {
        paddingHorizontal: 10,
        paddingVertical: 15, width: '100%',
        borderBottomWidth: 0.7,
        borderBottomColor: 'black',
        flexDirection: 'row'
    },
    styleText: {
        color: 'black', fontSize: 15, flex: 2
    }
})