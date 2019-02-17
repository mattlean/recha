import { combineReducers } from 'redux'

import api from './api'
import ui from './ui'

const todos = combineReducers({ api, ui })

export default todos
