import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import {useSelector} from "react-redux";
import {RootState} from "../../bll/store";

export const SimpleBackdrop = () => {
    const isLoadingModels = useSelector((state: RootState) => state.modelsReducer.isLoading)

    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoadingModels}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}
