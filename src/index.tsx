import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {App} from "./App";
import {QueryClient, QueryClientProvider} from "react-query";
import {GoogleOAuthProvider} from '@react-oauth/google';
import {BrowserRouter} from "react-router-dom";
import {DrawerWrapper} from "./components/drawer/DrawerWrapper";
import styles from './global.module.scss'
import {store} from "./bll/store";
import {Provider, useDispatch} from "react-redux";
import Button from "@mui/material/Button";
import {setFilter, setPage} from "./bll/models-slice";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
})
const Main = () => {
    const dispatch = useDispatch()
    const handleClearFilter = () => {
        dispatch(setFilter({
            filter: {
                promoter: '',
                moderator: '',
                creator: '',
            }
        }))
        dispatch(setPage({page: 1}))
    }
    return <React.StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <GoogleOAuthProvider
                    clientId="64877129835-30ri2i7o12migbogk8amue6igb66r51e.apps.googleusercontent.com">
                    <div className={styles.wrapper}>
                        <div className={styles.wrapperFilter}>
                            <Button variant={'contained'} color={'inherit'} onClick={handleClearFilter}>CLEAR
                                FILTER</Button>
                            <DrawerWrapper/>
                        </div>
                        <App/>
                    </div>
                </GoogleOAuthProvider>
            </QueryClientProvider>
        </BrowserRouter>
    </React.StrictMode>
}
root.render(
    <Provider store={store}>
        <Main/>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
