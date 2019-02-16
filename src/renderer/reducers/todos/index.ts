import { combineReducers } from 'redux'

import byId from './byId'
import lists from './lists'
import names from './names'

const api = combineReducers({ byId, lists })

const form = combineReducers({ names })

const todos = combineReducers({ api, form })

export default todos
