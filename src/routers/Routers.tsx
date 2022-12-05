import {Route, Routes} from "react-router-dom";
import App from "../App";

export const Routers = () => {
    return <Routes>
        <Route path={'/:type'} element={<App/>}/>
    </Routes>
}
