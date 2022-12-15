import React, {FC, useEffect, useState} from 'react';
import './App.css';
import {GridLayout} from "./wrappers/GridLayout";
import {ModelList} from "./components/items/ItemsList";
import {GoogleAuthApi, UserEntity} from "./api/google-auth-api";
import {useSearchParams} from "react-router-dom";
import {AuthGoogleModal} from "./components/google/auth-modal";
import {BasicTabs} from "./components/tabs/Tabs";


export const App: FC = () => {
    const [isLogin, setIsLogin] = useState(false)
    const [user, setUser] = useState<null | UserEntity>(null)
    let [searchParams, setSearchParams] = useSearchParams();

    const authMe = async () => {
        const user = await GoogleAuthApi.me()
        setUser(user)
        setIsLogin(true)
    }

    useEffect(() => {
        authMe().then(() => {
        }).catch(() => {
        })
    }, [])
    const handleLogin = (isLogin: boolean) => {
        if (isLogin) {
            authMe().then(() => {
                setIsLogin(isLogin)
                setSearchParams('')
            }).catch(() => {
            })
        }
    }
    return (
        <GridLayout>
            {searchParams.get('login') && <AuthGoogleModal handleSuccessCallback={handleLogin}/>}
            <BasicTabs isLogin={isLogin}/>
            {/*<ModelList isLogin={isLogin}/>*/}
        </GridLayout>
    );
}


