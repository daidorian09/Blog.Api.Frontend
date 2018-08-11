import { USER2SUSER_TYPES} from '../types/user2user.types'

const initialState = {
    isFollowed: false,
    isUnfollowed: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case USER2SUSER_TYPES.FOLLOW:
            return {
                ...state,
                isFollowed : action.payload
            }
        case USER2SUSER_TYPES.UNFOLLOW:
            return {
                ...state,
                isUnfollowed: action.payload
            }
        default:
            return state
    }
}