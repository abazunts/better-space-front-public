import {AxiosInstance} from "./axios.instance";


export enum EntireType {
    HUMAN = 'HUMAN',
    ANIMAL = 'ANIMAL',
    SKIN = 'SKIN',
}

export type ModelType = {
    address: string,
    preview_base64: string,
    server_timestamp: number,
    contact_info: string,
    owner_name: string,
    modelId: string,
    isPrepared: boolean,
    _id: string,
    likeCount: number,
    entireType?: EntireType,
    parts?: string[]
    vox_model_data?: any
}

export type PaginateType<I> = {
    items: I;
    totalCount: number;
    pageSize: number;
    totalPages: number;
    page: number;
}

export const EntireModelsApi = {
    getModels(type: EntireType, page: number, pageSize: number, owner_name?: string, moderator?: string,  promo_code?: string, sorting = 0): Promise<PaginateType<ModelType[]>> {
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

    likeModel(id: string, type: EntireType): Promise<ModelType> {
        return AxiosInstance.patch(`/public/models/entire/${type.toUpperCase()}/${id}`).then((r) => r.data)
    },

}

