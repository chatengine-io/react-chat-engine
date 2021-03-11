import { combineReducers } from 'redux'

import accountsReducer from './AccountsReducer.js'

import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  accounts: accountsReducer,
  form: formReducer,
})
