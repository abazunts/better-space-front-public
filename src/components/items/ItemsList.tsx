import {FC, useEffect, useState} from "react";
import {EntireModelsApi, EntireType} from "../../api/entire-models.api";
import {useQuery} from "react-query";
import {ModelCard} from "../cards/Card";
import {FormControlLabel, Pagination, Radio, RadioGroup} from "@mui/material";
import styles from './list.module.scss'
import {LinearIndeterminate} from "../loaders/LinearProgress";
import {useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setLoading, setModels, setPage, setPageCount, setTotalCount} from "../../bll/models-slice";
import {RootState} from "../../bll/store";

type PropsType = {
    isLogin: boolean
    sorting: number
}
export const ModelList: FC<PropsType> = ({isLogin, sorting}) => {
    const dispatch = useDispatch()
    const [type, setType] = useState(EntireType.SKIN)
    const [searchParams, setSearchParams] = useSearchParams();
    const models = useSelector((state: RootState) => state.modelsReducer.models)
    const isLoadingModels = useSelector((state: RootState) => state.modelsReducer.isLoading)
    const page = useSelector((state: RootState) => state.modelsReducer.page)
    const pageCount = useSelector((state: RootState) => state.modelsReducer.pageCount)
    const pageSize = useSelector((state: RootState) => state.modelsReducer.pageSize)
    const filter = useSelector((state: RootState) => state.modelsReducer.filter)

    const changeCurrentPage = (page: number) => {
        dispatch(setPage({page}))
    }
    const saveLocalStorage = (id: string) => {
        localStorage.setItem(id, '1')
    }
    const handleLike = (id: string) => {
        if (!isLogin) {
            setSearchParams('login=true')
            return
        }

        EntireModelsApi.likeModel(id, type).then(() => {
            saveLocalStorage(id)
            refetch().then()
        })

    }

    const handleMessage = (id: string) => {
        alert('В разработке')
    }

    const {
        isLoading,
        data,
        isFetching,
        refetch
    } = useQuery(['models', filter, type, page, pageSize, sorting], async () => await EntireModelsApi.getModels(type, page, pageSize, filter.creator, filter.moderator, filter.promoter, sorting), {keepPreviousData: true})

    useEffect(() => {
        dispatch(setLoading({isLoading}))
    }, [isLoading])
    useEffect(() => {
        dispatch(setLoading({isLoading: isFetching}))
    }, [isFetching])

    useEffect(() => {
        if (data) {
            dispatch(setPageCount({pageCount: data.totalPages}))
            dispatch(setTotalCount({totalCount: data.totalCount}))
            dispatch(setModels({models: data.items}))
        }

    }, [data])
    return <div className={styles.listWrapper}>
        <div className={styles.List}>
            {models.map((model) => <div className={styles.listItem}><ModelCard key={model.modelId} item={model}
                                                                               type={type} handleLike={handleLike}
                                                                               handleMessage={handleMessage}
                                                                               isLogin={isLogin}/>
            </div>)}

        </div>
        {!isLoading && !isFetching &&
            <Pagination count={pageCount} page={page} onChange={(event, page) => changeCurrentPage(page)}/>}
    </div>
}
