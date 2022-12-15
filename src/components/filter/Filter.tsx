import * as React from "react";
import {FC, useState} from "react";
import {TextField} from "@mui/material";
import styles from './filter.module.scss'
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import {FilterType, setFilter, setPage} from "../../bll/models-slice";
import {useDispatch} from "react-redux";

type PropsType = {
    handleSearchCallback?: () => void
    initialFilterValues?: FilterType
}

export const Filter: FC<PropsType> = ({handleSearchCallback, initialFilterValues}) => {
    const dispatch = useDispatch()
    const [creator, setCreator] = useState(initialFilterValues?.creator || '')
    const [promoter, setPromoter] = useState(initialFilterValues?.promoter || '')
    const [moderator, setModerator] = useState(initialFilterValues?.moderator || '')

    const handleSearch = async () => {
        dispatch(setFilter({
            filter: {
                promoter,
                moderator,
                creator,
            }
        }))
        handleSearchCallback && handleSearchCallback()
    }

    const handleClearFilter = () => {
        setCreator('')
        setPromoter('')
        setModerator('')
        dispatch(setFilter({
            filter: {
                promoter: '',
                moderator: '',
                creator: '',
            }
        }))
        dispatch(setPage({page: 1}))
    }
    return <div className={styles.filterWrapper}>
        <span>Filter</span>
        <TextField id="outlined-basic" label="Creator" variant="outlined" value={creator}
                   onChange={({target: {value}}) => setCreator(value)}/>
        <TextField id="outlined-basic" label="Promoter" variant="outlined" value={promoter}
                   onChange={({target: {value}}) => setPromoter(value)}/>
        <TextField id="outlined-basic" label="Moderator" variant="outlined" value={moderator}
                   onChange={({target: {value}}) => setModerator(value)}/>
        <Divider/>
        <Button variant={'contained'} color={'secondary'} onClick={handleSearch}>SEARCH</Button>
        <Button variant={'contained'} color={'inherit'} onClick={handleClearFilter}>CLEAR</Button>
    </div>
}
