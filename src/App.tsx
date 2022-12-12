import React, {FC} from 'react';
import './App.css';
import {GridLayout} from "./wrappers/GridLayout";
import {ModelList} from "./components/items/ItemsList";


export const App: FC = () => {
    return (
            <GridLayout>
                <ModelList/>
            </GridLayout>
    );
}


