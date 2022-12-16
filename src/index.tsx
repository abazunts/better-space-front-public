import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {QueryClient, QueryClientProvider} from "react-query";
import {GoogleOAuthProvider} from '@react-oauth/google';
import {BrowserRouter} from "react-router-dom";
import {store} from "./bll/store";
import {Provider} from "react-redux";
import {SimpleBackdrop} from "./components/loaders/backdrop";
import {MainPage} from "./pages/MainPage";
import {Route, Routes} from 'react-router-dom'
import {CurrentModel} from "./pages/CurrentModel";
import {Routers} from "./routing/linking";

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
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <GoogleOAuthProvider
                    clientId="64877129835-30ri2i7o12migbogk8amue6igb66r51e.apps.googleusercontent.com">
                    <Routes>
                        <Route path={Routers.models.model.path} element={ <CurrentModel/>}/>
                        <Route path={Routers.models.list.path} element={ <MainPage/>}/>
                        <Route path="/" element={<MainPage/>}/>
                    </Routes>

                </GoogleOAuthProvider>
            </QueryClientProvider>
        </BrowserRouter>
    </React.StrictMode>
}
root.render(
    <Provider store={store}>
        <SimpleBackdrop/>
        <Main/>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
