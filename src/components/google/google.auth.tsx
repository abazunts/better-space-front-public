import React, {FC} from 'react';
import {AuthGoogle} from "./auth-google";
import {CredentialResponse} from "@react-oauth/google";
import {GoogleAuthApi} from "../../api/google-auth-api";
import styles from './login.auth.module.scss'

type PropsType = {
    handleSuccessCallback: (isLogin: boolean) => void
}

export const GoogleAuth: FC<PropsType> = ({handleSuccessCallback}) => {

    const handleSuccess = async (response: CredentialResponse) => {
        if (response.credential) {
            const res = await GoogleAuthApi.login(response.credential)
            localStorage.setItem('access-token', res.access_token)
            handleSuccessCallback(true)
        }

    };

    return (
        <div className={styles.authWrapper}>
            <AuthGoogle onSuccess={handleSuccess}/>
        </div>
    );
};
