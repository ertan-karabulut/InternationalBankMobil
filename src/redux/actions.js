export const SET_LOADING = 'SET_LOADING';
export const SET_PROFILE = 'SET_PROFILE';
export const SET_PAGESETTING = 'SET_PAGE';
export const SET_MYADDRESSES = 'SET_MYADDRESSES';
export const SET_ACCONTLIST = 'SET_ACCONTLIST';
export const SET_ACCOUNTDETAIL = 'SET_ACCOUNTDETAIL';
export const SET_PERMISSIONS = 'SET_PERMISSIONS';
export const SET_BRANCHLIST = 'SET_BRANCHLIST'
export const SET_PHOTO = 'SET_PHOTO'
export const SET_MAIL = 'SET_MAIL'
export const SET_PHONE = 'SET_PHONE'
export const SET_CARDLIST = 'SET_CARDLIST'

export const setLoading = loading => dispatch =>{
    dispatch({
        type : SET_LOADING,
        payload : loading
    })
}

export const setProfile = profile => dispatch =>{
    dispatch({
        type : SET_PROFILE,
        payload : profile
    })
}

export const setPage = pageSetting => dispatch =>{
    dispatch({
        type : SET_PAGE,
        payload : pageSetting
    })
}

export const setMyAdresses = myAdresses => dispatch =>{
    dispatch({
        type : SET_MYADDRESSES,
        payload : myAdresses
    })
}

export const setAccountList = accountList => dispatch =>{
    dispatch({
        type : SET_ACCONTLIST,
        payload : accountList
    })
}

export const setAccountDetail = accountDetail => dispatch =>{
    dispatch({
        type : SET_ACCOUNTDETAIL,
        payload : accountDetail
    })
}

export const setPermissions = permissions => dispatch =>{
    dispatch({
        type : SET_PERMISSIONS,
        payload : permissions
    })
}

export const setBranchList = branchList => dispatch =>{
    dispatch({
        type : SET_BRANCHLIST,
        payload : branchList
    })
}

export const setPhoto = photo => dispatch =>{
    dispatch({
        type : SET_PHOTO,
        payload : photo
    })
}

export const setMail = mail => dispatch =>{
    dispatch({
        type : SET_MAIL,
        payload : mail
    })
}

export const setPhone = phone => dispatch =>{
    dispatch({
        type : SET_PHONE,
        payload : phone
    })
}
export const setCardList = cardList => dispatch =>{
    dispatch({
        type : SET_CARDLIST,
        payload : cardList
    })
}