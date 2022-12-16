import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RolesEnum, UserEntity, UserStatusEnum} from "../api/google-auth-api";


export interface AuthState {
    isLogin: boolean,
    user: UserEntity | null
}

const initialState: AuthState = {
    isLogin: false,
    user: {
        _id: '635d1b2f681666b639deb95e',
        approved: [],
        rejected: [],
        like: [],
        email: '',
        roles: [RolesEnum.Admin],
        status: UserStatusEnum.Active
    }

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
