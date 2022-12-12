import {FC, useEffect, useState} from "react";
import {EntireModelsApi, EntireType} from "../../api/entire-models.api";
import {useQuery} from "react-query";
import {ModelCard} from "../cards/Card";
import {Pagination} from "@mui/material";
import styles from './list.module.scss'
import {LinearIndeterminate} from "../loaders/LinearProgress";
import {useSearchParams} from "react-router-dom";

type PropsType = {
    isLogin: boolean
}
export const ModelList: FC<PropsType> = ({isLogin}) => {
    const [type, setType] = useState(EntireType.SKIN)
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(50)
    const [pageCount, setPageCount] = useState(0)
    const [searchParams, setSearchParams] = useSearchParams();

    const changeCurrentPage = (page: number) => {
        setPage(page)
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
    } = useQuery(['models', type, page, pageSize], async () => await EntireModelsApi.getModels(type, page, pageSize), {keepPreviousData: true})

    useEffect(() => {
        if (data) {
            setPageCount(data.totalPages)
        }

    }, [data])
    return <div className={styles.listWrapper}>
        {(isLoading || isFetching) && <LinearIndeterminate/>}
        <div className={styles.List}>
            {data?.items.map((model) => <div className={styles.listItem}><ModelCard key={model.modelId} item={model}
                                                                                    type={type} handleLike={handleLike}
                                                                                    handleMessage={handleMessage} isLogin={isLogin}/>
            </div>)}

        </div>
        {!isLoading && !isFetching &&
            <Pagination count={pageCount} page={page} onChange={(event, page) => changeCurrentPage(page)}/>}
    </div>
}
