import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers/root.reducer'
import { loadState, saveState } from './localStorage'
import { composeWithDevTools } from 'redux-devtools-extension'
const persistedState = loadState()

const middleware = [thunk]

const store = createStore(rootReducer, persistedState, composeWithDevTools(
    applyMiddleware(...middleware)
))

store.subscribe(() => {
    // saves states to localStorage everytime state changes
    saveState(store.getState());
  })

export default store