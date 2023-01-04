import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {EntireModelType} from "../api/entire-models.api";
import {UserEntity} from "../api/google-auth-api";
import {Dayjs} from "dayjs";

export type FilterType = {
    creator: string
    promoter: string
    moderator: string
    from: Dayjs | null
    to: Dayjs | null
}

export interface CounterState {
    models: EntireModelType[]
    currentModel: EntireModelType | null
    isLoading: boolean
    page: number
    pageSize: number
    pageCount: number
    filter: FilterType
    totalCount: number
    approvedUsers: UserEntity[]
    rejectedUsers: UserEntity[]
}

const initialState: CounterState = {
    models: [],
    currentModel: null,
    isLoading: false,
    page: 1,
    pageSize: 50,
    pageCount: 1,
    filter: {
        creator: '',
        promoter: '',
        moderator: '',
        from: null,
        to: null
    },
    totalCount: 0,
    approvedUsers: [],
    rejectedUsers: []

}

export const modelsSlice = createSlice({
    name: 'models',
    initialState,
    reducers: {
        setModels: (state, action: PayloadAction<{ models: EntireModelType[] }>) => {
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
        setTotalCount: (state, action: PayloadAction<{ totalCount: number }>) => {
            state.totalCount = action.payload.totalCount
        },
        setCurrentModel: (state, action: PayloadAction<{ currentModel: EntireModelType }>) => {
            state.currentModel = action.payload.currentModel
        },
        setApprovedUsers: (state, action: PayloadAction<{ users: UserEntity[] }>) => {
            state.approvedUsers = action.payload.users
        },
        setRejectedUsers: (state, action: PayloadAction<{ users: UserEntity[] }>) => {
            state.rejectedUsers = action.payload.users
        },

        setRejectedCount: (state, action: PayloadAction<{ modelId: string }>) => {
            const model = state.models.find((m) => m.modelId === action.payload.modelId)
            if (model) {
                model.rejectedCount += 1
            }
        },
        deleteRejectedCount: (state, action: PayloadAction<{ modelId: string }>) => {
            const model = state.models.find((m) => m.modelId === action.payload.modelId)
            if (model) {
                model.rejectedCount -= 1
            }
        },
        setLikeCount: (state, action: PayloadAction<{ modelId: string }>) => {
            const model = state.models.find((m) => m.modelId === action.payload.modelId)
            if (model) {
                model.likeCount += 1
            }
        },
        setApprovedCount: (state, action: PayloadAction<{ modelId: string }>) => {
            const model = state.models.find((m) => m.modelId === action.payload.modelId)
            if (model) {
                model.approvedCount += 1
            }
        },
        deleteApprovedCount: (state, action: PayloadAction<{ modelId: string }>) => {
            const model = state.models.find((m) => m.modelId === action.payload.modelId)
            if (model) {
                model.approvedCount -= 1
            }
        },
        setRejectedCountCurrentModel: (state) => {
            if (state.currentModel) {
                state.currentModel.rejectedCount += 1
            }

        },
        setLikeCountCurrentModel: (state) => {
            if (state.currentModel) {
                state.currentModel.likeCount += 1
            }
        },
        setApprovedCountCurrentModel: (state) => {
            if (state.currentModel) {
                state.currentModel.approvedCount += 1
            }
        },
        deleteRejectedCountCurrentModel: (state) => {
            if (state.currentModel) {
                state.currentModel.rejectedCount -= 1
            }
        },
        deleteApprovedCountCurrentModel: (state) => {
            if (state.currentModel) {
                state.currentModel.approvedCount -= 1
            }
        },
    },

})

export const {
    setModels,
    setLoading,
    setPage,
    setPageCount,
    setFilter,
    setTotalCount,
    setCurrentModel,
    setApprovedUsers,
    setRejectedUsers,
    setRejectedCount,
    setApprovedCount,
    setLikeCount,
    setRejectedCountCurrentModel,
    setLikeCountCurrentModel,
    setApprovedCountCurrentModel,
    deleteApprovedCount,
    deleteRejectedCount,
    deleteRejectedCountCurrentModel,
    deleteApprovedCountCurrentModel
} = modelsSlice.actions

export const modelsReducer = modelsSlice.reducer
