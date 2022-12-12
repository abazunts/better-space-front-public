import {Grid} from "@mui/material";
import {FC, PropsWithChildren} from "react";
import styles from './card-layout.module.scss'

type PropsType = {} & PropsWithChildren

export const GridLayout: FC<PropsType> = ({children}) => {
    return <Grid container className={styles.cardLayout}>
        {children}
    </Grid>
}
