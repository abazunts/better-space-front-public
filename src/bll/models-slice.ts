import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ModelType} from "../api/entire-models.api";

export type FilterType = {
    creator: string
    promoter: string
    moderator: string
}

export interface CounterState {
    models: ModelType[]
    isLoading: boolean
    page: number
    pageSize: number
    pageCount: number
    filter: FilterType
}

const initialState: CounterState = {
    models: [],
    isLoading: false,
    page: 1,
    pageSize: 50,
    pageCount: 1,
    filter: {
        creator: '',
        promoter: '',
        moderator: ''
    }

}

export const modelsSlice = createSlice({
    name: 'models',
    initialState,
    reducers: {
        setModels: (state, action: PayloadAction<{ models: ModelType[] }>) => {
            state.models = action.payload.models
        },
        setLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
            state.isLoading = action.payload.isLoading
        },
        setPage: (state, action: PayloadAction<{ page: number }>) => {
            state.page = action.payload.page
        },
        setPageCount: (state, action: PayloadAction<{ pageCount: number }>) => {
            state.pageCount = action.payload.pageCount
        },
        setFilter: (state, action: PayloadAction<{ filter: FilterType }>) => {
            state.filter = action.payload.filter
        },
    },

})

export const {setModels, setLoading, setPage, setPageCount, setFilter} = modelsSlice.actions

export const modelsReducer = modelsSlice.reducer
