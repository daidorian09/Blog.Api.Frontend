import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers/root.reducer'
import { loadState, saveState } from './localStorage'
const persistedState = loadState()

const initialState = {}

const middleware = [thunk]

const store = createStore(
    rootReducer, 
    persistedState, 
    compose(
        applyMiddleware(...middleware), 
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

store.subscribe(() => {
    // saves states to localStorage everytime state changes
    saveState(store.getState());
  });

export default store