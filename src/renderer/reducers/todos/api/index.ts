import { combineReducers } from 'redux'

import byId from './byId'
import lists from './lists'

const api = combineReducers({ byId, lists })

export default api
