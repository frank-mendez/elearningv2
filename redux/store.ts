import { ThunkMiddleware, configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers'
import { fetchLocalStorageData, setLocalStorageData } from '@/helpers/localStorage'

export const store = configureStore({
	reducer: rootReducer,
	preloadedState: fetchLocalStorageData('state'),
})

store.subscribe(() => {
	setLocalStorageData('state', store.getState())
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
