import * as React from "react";
import {FC, useEffect, useState} from "react";
import {TextField} from "@mui/material";
import styles from './filter.module.scss'
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import {EntireModelsApi, EntireType} from "../../api/entire-models.api";
import {useQuery} from "react-query";
import {FilterType, setFilter, setLoading, setModels, setPage, setPageCount} from "../../bll/models-slice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../bll/store";

type PropsType = {
    handleSearchCallback?: () => void
    initialFilterValues?: FilterType
}

export const Filter: FC<PropsType> = ({handleSearchCallback, initialFilterValues}) => {
    const dispatch = useDispatch()
    const [creator, setCreator] = useState(initialFilterValues?.creator || '')
    const [promoter, setPromoter] = useState(initialFilterValues?.promoter || '')
    const [moderator, setModerator] = useState(initialFilterValues?.moderator || '')
    const filter = useSelector((state: RootState) => state.modelsReducer.filter)
    const {
        isLoading,
        isFetching,
        data,
    } = useQuery(['models', filter], async () => await EntireModelsApi.getModels(EntireType.SKIN, 1, 50, filter.creator, filter.moderator, filter.promoter))

    useEffect(() => {
        dispatch(setLoading({isLoading}))
    }, [isLoading])

    useEffect(() => {
        dispatch(setLoading({isLoading: isFetching}))
    }, [isFetching])

    useEffect(() => {
        if (data) {
            dispatch(setPageCount({pageCount: data.totalPages}))
            dispatch(setModels({models: data.items}))
        }
    }, [data])

    const handleSearch = async () => {
        dispatch(setFilter({
            filter: {
                promoter,
                moderator,
                creator,
            }
        }))
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
