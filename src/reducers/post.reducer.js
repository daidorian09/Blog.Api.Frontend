import { POST_TYPES } from '../types/post.types'
import { isEmpty } from '../helpers/isEmpty.helper'
const initialState = {
    posts : null,
    post : null,
    isUpserted : false
}

export default function(state = initialState, action){
    switch (action.type) {
        case POST_TYPES.GET_MY_POSTS:
        return{
            ...state,
            posts : action.payload
        }
        case POST_TYPES.CREATE_OR_UPDATE_POST:
        return{
            ...state,
            post : action.payload,
            isUpserted : !isEmpty(action.payload)
        }
        case POST_TYPES.GET_POST:
        return{
            ...state,
            post : action.payload,
            isUpserted : false
        }
        default:
            return state
    }
}