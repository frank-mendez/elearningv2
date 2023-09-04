import { combineReducers } from '@reduxjs/toolkit'
import { authReducer } from './auth/reducer'
import { subjectReducer } from './subjects'
import { courseReducer } from './courses/reducer'

const reducers = combineReducers({
	auth: authReducer,
	subject: subjectReducer,
	course: courseReducer,
})

const rootReducer = (state: any, action: any) => {
	return reducers(state, action)
}

export default rootReducer
