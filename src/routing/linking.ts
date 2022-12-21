import {EntireType, ModelEnum} from "../api/models.api";

export const LinkingHuman = [
    {
        link: '/' + ModelEnum.ARMS,
        title: ModelEnum.ARMS
    },
    {
        link: '/' + ModelEnum.BODY,
        title: ModelEnum.BODY
    },
    {
        link: '/' + ModelEnum.HEAD,
        title: ModelEnum.HEAD
    },
    {
        link: '/' + ModelEnum.LEGS,
        title: ModelEnum.LEGS
    },
    {
        link: '/' + EntireType.HUMAN,
        title: 'Full Man'
    }
]

export const LinkingAnimal = [

    {
        link: '/' + ModelEnum.P_BODY,
        title: ModelEnum.P_BODY
    },
    {
        link: '/' + ModelEnum.P_HEAD,
        title: ModelEnum.P_HEAD
    },
    {
        link: '/' + ModelEnum.P_FLEG,
        title: ModelEnum.P_FLEG
    },
    {
        link: '/' + ModelEnum.P_BLEG,
        title: ModelEnum.P_BLEG
    },

    {
        link: '/' + ModelEnum.P_TAIL,
        title: ModelEnum.P_TAIL
    },
    {
        link: '/' + EntireType.ANIMAL,
        title: 'Full Animal'
    }
]

export const LinkingStruct = [
    {
        link: '/' + ModelEnum.S_BIG,
        title: ModelEnum.S_BIG
    },
    {
        link: '/' + ModelEnum['16x'],
        title: ModelEnum['16x']
    }
]

export const LinkingSkin = [
    {
        link: '/' + EntireType.SKIN,
        title: EntireType.SKIN
    },
]

export const Routers = {
    models: {
        list: {
            path: '/:type',
        },
        model: {
            path: '/:modelId',
            getUrl(type: EntireType, modelId: string) {
                return `/${type}${modelId}`;
            },
        },
    },
}
