import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {UserEntity} from "../api/google-auth-api";


export interface AuthState {
    isLogin: boolean,
    user: UserEntity | null
}

const initialState: AuthState = {
    isLogin: false,
    user: null

}

export const authSlice = createSlice({
    name: 'models',
    initialState,
    reducers: {
        setIsLogin: (state, action: PayloadAction<{ isLogin: boolean }>) => {
            state.isLogin = action.payload.isLogin
        },
        setUser: (state, action: PayloadAction<{ user: UserEntity }>) => {
            state.user = action.payload.user
        },
    },

})

export const {
    setIsLogin,
    setUser,
} = authSlice.actions

export const authReducer = authSlice.reducer
