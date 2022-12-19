import React, {FC, useEffect, useState} from 'react';
import './App.css';
import {GridLayout} from "./wrappers/GridLayout";
import {ModelList} from "./components/items/ItemsList";
import {GoogleAuthApi, UserEntity} from "./api/google-auth-api";
import {useSearchParams} from "react-router-dom";
import {AuthGoogleModal} from "./components/google/auth-modal";
import {BasicTabs} from "./components/tabs/Tabs";
import styles from "./components/items/list.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {setIsLogin, setUser} from "./bll/auth-slice";
import {RootState} from "./bll/store";


export const App: FC = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch()

    const isLogin = useSelector((state: RootState) => state.authReducer.isLogin)

    const authMe = async () => {
        const user = await GoogleAuthApi.me()
        dispatch(setUser({user}))
        dispatch(setIsLogin({isLogin: true}))
    }
    const handleLogin = (isLogin: boolean) => {
        if (isLogin) {
            authMe().then(() => {
                dispatch(setIsLogin({isLogin: true}))
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


