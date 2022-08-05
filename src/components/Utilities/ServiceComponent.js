import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

//const baseUrl = 'http://192.168.1.35:5001';
const baseUrl = 'http://10.22.186.21:5001';
export const DataTableRequest = (Order = null, Filter = null, Take = 10, Skip = 0) =>{
  if(Order === null){
    Order = {
      "Column":"",
      "Short":""
    }
  }
  if(Filter === null){
    Filter = [
      {
          "Name":"",
          "Value":""
      }
  ]
  }
  var dataTableRequest = {
    Take:Take,
    Skip:Skip,
    Order:Order,
    Filter:Filter
  }
  return dataTableRequest;
}

export async function Get(url, navigation){
  try{
    var token = await AsyncStorage.getItem('Token');
    var _accessToken =''
    if(token !== undefined && token !== null){
      const {accessToken} = JSON.parse(token);
      _accessToken = accessToken;
    }
    var response = await axios.get(baseUrl + url,{headers:{'Content-Type':'application/json','Authorization': `Bearer ${_accessToken}`}});
    var responseData = response.data;
    if(responseData !== null && responseData.resultStatus === false){
      if(responseData.resultCode === 400){
        alert(responseData.resultObje.join(' '));
        return null;
      }
    }
    return responseData;
  }
  catch(ex)
  {
    if(ex.response.status === 401){
      await RefreshToken(navigation);
    }else{
      navigation.replace('Error');
    }
  }
}

export async function Post(url, data, navigation) {
  try{
    var token = await AsyncStorage.getItem('Token');
    var _accessToken =''
    if(token !== undefined && token !== null){
      const {accessToken} = JSON.parse(token);
      _accessToken = accessToken;
    }
    var response = await axios.post(baseUrl + url,data,{headers:{
      'Content-Type' : 'application/json','Authorization': `Bearer ${_accessToken}`
    }});
    var responseData = response.data;
    if(responseData !== null && responseData.resultStatus === false){
      if(responseData.resultCode === 400){
        alert(responseData.resultObje.join(' '));
        return null;
      }
    }
    return responseData;
  }
  catch(ex){
    if(ex.response.status === 401){
      await RefreshToken(navigation);
    }else{
      navigation.replace('Error');
    }
  }
}


export async function RefreshToken(navigation){
  try{
    var token = await AsyncStorage.getItem('Token');
    var _data = {}
    if(token !== undefined && token !== null){
      const data = JSON.parse(token);
      _data = data;
    }
    var response = await axios.post(`${baseUrl}/Token/RefreshToken`,_data,{headers:{'Content-Type' : 'application/json'}});
    var responseData = response.data;
    if(responseData !== null && responseData.resultStatus === true){
      await AsyncStorage.setItem('Token',responseData.resultObje);
    }
    else{
      await AsyncStorage.removeItem('Token');
      navigation.replace('Login');
    }
  }
  catch(ex){
    navigation.replace('Login');
  }
}
