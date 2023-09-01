import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import logger, { createLogger } from 'redux-logger'
import auth from './auth/reducer'
import thunk from 'redux-thunk'


const store = createStore(
    combineReducers({auth}) ,
    applyMiddleware(thunk,logger)
)
  
export default store

export type RootState = ReturnType<typeof store.getState>