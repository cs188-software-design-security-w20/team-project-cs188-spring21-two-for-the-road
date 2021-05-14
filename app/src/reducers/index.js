import {combineReducers} from 'redux'
import errorReducer from './errorReducer'
import authReducer from './authReducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
	key: 'root',
	storage: storage,
	whitelist: ['error', 'auth'] 
  };

  const rootReducer = combineReducers ({  
    error: errorReducer,
    auth: authReducer
})

export default persistReducer(persistConfig, rootReducer)