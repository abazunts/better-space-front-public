import {AxiosInstance} from "./axios.instance";
import {UserEntity} from "./google-auth-api";


export enum EntireType {
    HUMAN = 'HUMAN',
    ANIMAL = 'ANIMAL',
    SKIN = 'SKIN',
}

export type ActionsModelEntity = {
    user: string;
    model: string;
    createdAt: Date;
    _id: string
}

export type EntireModelType = {
    address: string,
    preview_base64: string,
    server_timestamp: number,
    contact_info: string,
    owner_name: string,
    promo_code?: string,
    modelId: string,
    isPrepared: boolean,
    _id: string,
    likeCount: number,
    approvedCount: number,
    rejectedCount: number,
    approvedEntities: ActionsModelEntity[],
    rejectedEntities: ActionsModelEntity[],
    likeEntities: ActionsModelEntity[],
    entireType?: EntireType,
    parts?: string[]
    vox_model_data?: any
    moderator?: string
}

export type PaginateType<I> = {
    items: I;
    totalCount: number;
    pageSize: number;
    totalPages: number;
    page: number;
}

export const EntireModelsApi = {
    getModels(type: EntireType, page: number, pageSize: number, owner_name?: string, moderator?: string, promo_code?: string, sorting = 0): Promise<PaginateType<EntireModelType[]>> {
        return AxiosInstance.get(`/public/models/entire/${type.toUpperCase()}`, {
            params: {
                page,
                pageSize,
                owner_name,
                moderator,
                promo_code,
                sorting
            }
        }).then((r) => r.data)
    },

    getModelById(id: string | null, type: EntireType | null): Promise<EntireModelType | null> {
        if (!id || !type) return Promise.resolve(null)
        return AxiosInstance.get(`/public/models/entire/${type.toUpperCase()}/${id}`).then((r) => r.data)
    },

    approveModel(id: string, type: EntireType): Promise<EntireModelType> {
        return AxiosInstance.put(`/public/approve/${type.toUpperCase()}/${id}`).then((r) => r.data)
    },

    rejectModel(id: string, type: EntireType): Promise<EntireModelType> {
        return AxiosInstance.put(`/public/reject/${type.toUpperCase()}/${id}`).then((r) => r.data)
    },

    likeModel(id: string, type: EntireType): Promise<EntireModelType> {
        return AxiosInstance.put(`/public/like/${type.toUpperCase()}/${id}`).then((r) => r.data)
    },

    getUsers(userIds: string[]): Promise<UserEntity[]> {
        return AxiosInstance.get(`/users/actions?usersId=${userIds.join(',')}`).then((r) => r.data)
    },


}

