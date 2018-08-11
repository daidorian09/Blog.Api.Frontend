import { ERROR_TYPES } from '../types/error.types'
const initialState = {}

export default function (state = initialState, action) {
    switch (action.type) {
        case ERROR_TYPES.GET_ERRORS:
            return action.payload
        default:
            return state
    }
}