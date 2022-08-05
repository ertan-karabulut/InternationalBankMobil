import {
    SET_LOADING,
    SET_PROFILE,
    SET_MYADDRESSES,
    SET_PAGE,
    SET_ACCONTLIST,
    SET_ACCOUNTDETAIL,
    SET_PERMISSIONS,
    SET_BRANCHLIST,
    SET_PHOTO,
    SET_MAIL,
    SET_PHONE,
    SET_CARDLIST
} from './actions';

const initialState = {
    loading: false,
    profile: null,
    accountList: null,
    pageSetting: {
        take: 5
    },
    myAdresses: null,
    accountDetail: null,
    permissions: {},
    branchList: null,
    photo: null,
    mail: null,
    phone: null,
    cardList: null
}

function appReducer(state = initialState, action) {
    switch (action.type) {
        case SET_LOADING:
            return { ...state, loading: action.payload }
        case SET_PROFILE:
            return { ...state, profile: action.payload }
        case SET_PAGE:
            return { ...state, pageSetting: action.payload }
        case SET_MYADDRESSES:
            return { ...state, myAdresses: action.payload }
        case SET_ACCONTLIST:
            return { ...state, accountList: action.payload }
        case SET_ACCOUNTDETAIL:
            return { ...state, accountDetail: action.payload }
        case SET_PERMISSIONS:
            return { ...state, permissions: action.payload }
        case SET_BRANCHLIST:
            return { ...state, branchList: action.payload }
        case SET_PHOTO:
            return { ...state, photo: action.payload }
        case SET_MAIL:
            return { ...state, mail: action.payload }
        case SET_PHONE:
            return { ...state, phone: action.payload }
        case SET_CARDLIST:
            return { ...state, cardList: action.payload }
        default:
            return state;
    }
}

export default appReducer;