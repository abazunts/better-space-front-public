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
    server_timestamp: number,
    preview_base64: string,
    owner_name: string,
    promo_code?: string,
    moderator?: string
    modelId: string,
    _id: string,
    likeCount: number,
    approvedCount: number,
    rejectedCount: number,
    approvedEntities: ActionsModelEntity[],
    rejectedEntities: ActionsModelEntity[],
    likeEntities: ActionsModelEntity[],
    entireType: EntireType,
    parts: string[]

}

export type PaginateType<I> = {
    items: I;
    totalCount: number;
    pageSize: number;
    totalPages: number;
    page: number;
}

export const EntireModelsApi = {
    getModels(type: EntireType, page: number, pageSize: number, owner_name?: string, moderator?: string, promo_code?: string, sorting = 0, from?: string,  to?: string): Promise<PaginateType<EntireModelType[]>> {
        return AxiosInstance.get(`/models`, {
            params: {
                type: type.toUpperCase(),
                page,
                pageSize,
                owner_name,
                moderator,
                promo_code,
                sorting,
                from,
                to
            }
        }).then((r) => r.data)
    },

    getModelById(id: string | undefined, type: EntireType | null): Promise<EntireModelType | null> {
        if (!id || !type) return Promise.resolve(null)
        return AxiosInstance.get(`/models/${id}`).then((r) => r.data)
    },

    approveModel(id: string): Promise<EntireModelType> {
        return AxiosInstance.put(`/approve/${id}`).then((r) => r.data)
    },

    rejectModel(id: string): Promise<EntireModelType> {
        return AxiosInstance.put(`/reject/${id}`).then((r) => r.data)
    },

    likeModel(id: string): Promise<EntireModelType> {
        return AxiosInstance.put(`/like/${id}`).then((r) => r.data)
    },

    getUsers(userIds: string[]): Promise<UserEntity[]> {
        return AxiosInstance.get(`/users/actions?usersId=${userIds.join(',')}`).then((r) => r.data)
    },

    deleteApproveModel(id: string): Promise<EntireModelType> {
        return AxiosInstance.delete(`/approve/${id}`).then((r) => r.data)
    },

    deleteRejectModel(id: string): Promise<EntireModelType> {
        return AxiosInstance.delete(`/reject/${id}`).then((r) => r.data)
    },


}

