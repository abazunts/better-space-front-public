import {CredentialResponse, GoogleLogin} from '@react-oauth/google';
import {FC} from "react";

type PropsType={
    onSuccess:(credentialResponse:CredentialResponse)=>void
}
export const AuthGoogle:FC<PropsType> = ({onSuccess}) => {
    return <GoogleLogin
        onSuccess={onSuccess}
        onError={() => {
            console.log('Login Failed');
        }}
        auto_select={false}
    />;
}
