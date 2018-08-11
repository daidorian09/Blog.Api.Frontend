import { combineReducers } from 'redux'

import authenticationReducer  from './authentication.reducer'
import errorReducer  from './error.reducer'
import user2userReducer from './user2user.reducer'
import postReducer from './post.reducer'

export default combineReducers({
    authentication : authenticationReducer,
    errors : errorReducer,
    user2user : user2userReducer,
    post : postReducer
})