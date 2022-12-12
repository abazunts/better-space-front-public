import {AxiosInstance} from "./axios.instance";

export enum RolesEnum {
    Admin = 'Admin',
    Moderator = 'Moderator', //может удалять модельки в дополнении к viewer
    Viewer = 'Viewer', //может только смотреть модельки и лайкать, но не может их удалять.
}

export enum UserStatusEnum {
    Active = 'Active',
    InActive = 'InActive',
    Blocked = 'Blocked',
}

export type UserEntity = {
    email: string;
    roles: RolesEnum[];
    status: UserStatusEnum;
}

export type LoginResponse = {
    access_token: string
}
export const GoogleAuthApi = {
    prefix: 'admin/auth',
    login(accessToken: string):Promise<LoginResponse> {
        return AxiosInstance.post(`${this.prefix}/google`, {accessToken}).then((r) => r.data)
    },

    me(): Promise<UserEntity> {
        return AxiosInstance.get(`${this.prefix}/me`).then((r) => r.data)
    },

    refreshToken(){
        return AxiosInstance.get(`${this.prefix}/refresh`).then((r) => r.data)
    },

    logout(){
        return AxiosInstance.delete(`${this.prefix}/login`).then((r) => r.data)
    }
};
