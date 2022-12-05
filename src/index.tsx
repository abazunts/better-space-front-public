import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, NavLink} from "react-router-dom";
import {LinkingAnimal, LinkingHuman, LinkingStruct} from "./routing/linking";
import {Routers} from "./routers/Routers";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const Main = () => {
    return <React.StrictMode>
        <BrowserRouter>
            <div style={{display: "flex", justifyContent: 'space-between'}}>
                <div>
                    <div style={{marginBottom: 10}}>
                        {LinkingHuman.map((l) => <NavLink key={l.title} style={{margin: 10}}
                                                          to={l.link}>{l.title}</NavLink>)}
                    </div>
                    <div style={{marginBottom: 10}}>
                        {LinkingAnimal.map((l) => <NavLink key={l.title} style={{margin: 10}}
                                                           to={l.link}>{l.title}</NavLink>)}
                    </div>
                    <div style={{marginBottom: 10}}>
                        {LinkingStruct.map((l) => <NavLink key={l.title} style={{margin: 10}}
                                                           to={l.link}>{l.title}</NavLink>)}
                    </div>

                    <Routers/>
                </div>

            </div>
        </BrowserRouter>

    </React.StrictMode>
}
root.render(
    <Main/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
