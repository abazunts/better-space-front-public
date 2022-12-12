import {AxiosInstance} from "./axios.instance";

export enum ModelEnum {
    HEAD = 'HEAD',
    LEGS = 'LEGS',
    ARMS = 'ARMS',
    BODY = 'BODY',
    P_HEAD = 'P_HEAD',
    P_BODY = 'P_BODY',
    P_FLEG = 'P_FLEG',
    P_BLEG = 'P_BLEG',
    P_TAIL = 'P_TAIL',
    S_MICRO = 'S_MICRO',
    '16x' = '16x',
    S_BIG = 'S_BIG',
}

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
    promo_code?: string,
    modelId: string,
    isPrepared: boolean,
    _id: string,
    likeCount: number,
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

export const ModelsApi = {
    getModels(type: ModelEnum, page: number, pageSize: number): Promise<PaginateType<ModelType[]>> {
        return AxiosInstance.get(`/public/models/${type}`, {
            params: {
                page,
                pageSize,
            }
        }).then((r) => r.data)
    },
}
