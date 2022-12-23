import styles from "../global.module.scss";
import Button from "@mui/material/Button";
import {DrawerWrapper} from "../components/drawer/DrawerWrapper";
import {App} from "../App";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../bll/store";
import {setFilter, setPage} from "../bll/models-slice";

export const MainPage = () => {
    const totalCount = useSelector((state: RootState) => state.modelsReducer.totalCount)
    const dispatch = useDispatch()

    const handleClearFilter = () => {
        dispatch(setFilter({
            filter: {
                promoter: '',
                moderator: '',
                creator: '',
                from: null,
                to: null
            }
        }))
        dispatch(setPage({page: 1}))
    }
    return  <div className={styles.wrapper}>
        <div className={styles.wrapperTopBlock}>
            <div className={styles.totalCount}>
                <span>TOTAL MODELS: {totalCount}</span>
            </div>
            <div className={styles.wrapperFilter}>
                <Button variant={'contained'} color={'inherit'} onClick={handleClearFilter}>CLEAR
                    FILTER</Button>
                <DrawerWrapper/>
            </div>
        </div>
        <App/>
    </div>
}
