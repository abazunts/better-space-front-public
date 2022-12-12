import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {GoogleAuth} from "./google.auth";
import {FC} from "react";
import Typography from "@mui/material/Typography";
import {useSearchParams} from "react-router-dom";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    textAlign: 'center',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
type PropsType = {
    handleSuccessCallback: (isLogin: boolean) => void
}
export const AuthGoogleModal:FC<PropsType>= ({handleSuccessCallback}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    return (
        <div>
            <Modal
                open={true}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                onClose={()=> setSearchParams('')}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                       Требуется авториация
                    </Typography>
                    <GoogleAuth handleSuccessCallback={handleSuccessCallback}/>
                </Box>
            </Modal>
        </div>
    );
}
