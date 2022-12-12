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
    getModels(type: EntireType, page: number, pageSize: number): Promise<PaginateType<ModelType[]>> {
        return AxiosInstance.get(`/public/models/entire/${type.toUpperCase()}`, {
            params: {
                page,
                pageSize,
            }
        }).then((r) => r.data)
    },

}

