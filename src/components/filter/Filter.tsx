import * as React from "react";
import {FC, useState} from "react";
import {TextField} from "@mui/material";
import styles from './filter.module.scss'
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import {FilterType, setFilter, setPage} from "../../bll/models-slice";
import {useDispatch, useSelector} from "react-redux";
import {BasicDatePicker} from "../DatePicker/DatePicker";
import {Dayjs} from "dayjs";
import {RootState} from "../../bll/store";
import {RolesEnum} from "../../api/google-auth-api";

type PropsType = {
    handleSearchCallback?: () => void
    initialFilterValues: FilterType
}

export const Filter: FC<PropsType> = ({handleSearchCallback, initialFilterValues}) => {
    const dispatch = useDispatch()
    const [creator, setCreator] = useState(initialFilterValues?.creator || '')
    const [promoter, setPromoter] = useState(initialFilterValues?.promoter || '')
    const [moderator, setModerator] = useState(initialFilterValues?.moderator || '')
    const [from, setFrom] = React.useState<Dayjs | null>(initialFilterValues.from);
    const [to, setTo] = React.useState<Dayjs | null>(initialFilterValues.to);
    const user = useSelector((state: RootState) => state.authReducer.user)

    const handleSearch = async () => {
        dispatch(setFilter({
            filter: {
                promoter,
                moderator,
                creator,
                from,
                to,
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
                from: null,
                to: null
            }
        }))
        dispatch(setPage({page: 1}))
    }

    const isFromToShow = user && (user?.roles.indexOf(RolesEnum.Admin) > -1 || user?.roles.indexOf(RolesEnum.Moderator) > -1)
    return <div className={styles.filterWrapper}>
        <span>Filter</span>
        <TextField id="outlined-basic" label="Creator" variant="outlined" value={creator}
                   onChange={({target: {value}}) => setCreator(value)}/>
        <TextField id="outlined-basic" label="Promoter" variant="outlined" value={promoter}
                   onChange={({target: {value}}) => setPromoter(value)}/>
        <TextField id="outlined-basic" label="Moderator" variant="outlined" value={moderator}
                   onChange={({target: {value}}) => setModerator(value)}/>
        {isFromToShow && <BasicDatePicker handleOnChange={setFrom} label={'from'} value={from}/>}
        {isFromToShow && <BasicDatePicker handleOnChange={setTo} label={'to'} value={to}/>}
        <Divider/>
        <Button variant={'contained'} color={'secondary'} onClick={handleSearch}>SEARCH</Button>
        <Button variant={'contained'} color={'inherit'} onClick={handleClearFilter}>CLEAR</Button>
    </div>
}

