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
import {Provider} from "react-redux";

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
    return <React.StrictMode>
        <Provider store={store}>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <GoogleOAuthProvider
                    clientId="64877129835-30ri2i7o12migbogk8amue6igb66r51e.apps.googleusercontent.com">
                    <div className={styles.wrapper}>
                        <DrawerWrapper/>
                        <App/>
                    </div>
                </GoogleOAuthProvider>
            </QueryClientProvider>
        </BrowserRouter>
        </Provider>
    </React.StrictMode>
}
root.render(
    <Main/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
