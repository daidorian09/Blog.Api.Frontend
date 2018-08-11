import { AUTHENTICATION_TYPES } from '../types/authentication.types'
import { isEmpty } from '../helpers/isEmpty.helper'
const initialState = {
    isAuthenticated : false,
    user : {}
}

export default function(state = initialState, action){
    switch (action.type) {
        case AUTHENTICATION_TYPES.AUTHENTICATE_USER:
        return{
            ...state,
            isAuthenticated : !isEmpty(action.payload),
            user : action.payload
        }
        case AUTHENTICATION_TYPES.CONFIRM_ACCOUNT:
        return{
            ...state,
            payload : action.payload
        }
        case AUTHENTICATION_TYPES.SIGN_OUT:
        return{
            ...state,
            isAuthenticated : false,
            user : action.payload
        }
        default:
            return state
    }
}