import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import PageComponent from '../../components/Utilities/PageComponent'
import MenuList from '../../Menu/MenuList'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PageListPage = ({ navigation }) => {
  const RenderItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={()=> {navigation.navigate(item.PageName)}}>
        <View style={styles.containerStyle}>
          <View style={styles.rowImage}>
            <Icon name={item.IconName} size={30} color='#01a4a4'/>
          </View>
          <View style={styles.rowText}>
            <Text style={{fontSize:17}}>
              {item.MenuName}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <PageComponent>
      <FlatList data={MenuList} renderItem={RenderItem} keyExtractor={(item, index) => index.toString()} />
    </PageComponent>
  )
}
export default PageListPage;
const styles = StyleSheet.create({
  containerStyle: {
    flex: 10,
    flexDirection: 'row',
    alignContent: 'center'
  },
  rowImage: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowText: {
    flex: 8,
    justifyContent: 'center',
    paddingLeft: 20,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingVertical:20
  }
});