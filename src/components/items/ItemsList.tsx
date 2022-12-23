import {FC, useEffect, useState} from "react";
import {EntireModelsApi, EntireType} from "../../api/entire-models.api";
import {useQuery} from "react-query";
import {ModelCard} from "../cards/Card";
import {Pagination} from "@mui/material";
import styles from './list.module.scss'
import {useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    setApprovedCount,
    setLikeCount,
    setLoading,
    setModels,
    setPage,
    setPageCount, setRejectedCount,
    setTotalCount
} from "../../bll/models-slice";
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
    const handleLike = (id: string, modelId: string) => {
        if (!isLogin) {
            setSearchParams('login=true')
            return
        }
        dispatch(setLikeCount({modelId}))
        EntireModelsApi.likeModel(id).then(() => {
        })

    }

    const handleMessage = (id: string) => {
        alert('В разработке')
    }

    const handleApprove = (id: string, modelId: string) => {
        if (!isLogin) {
            setSearchParams('login=true')
            return
        }
        dispatch(setApprovedCount({modelId}))
        type && EntireModelsApi.approveModel(id).then(() => {
        })

    }

    const handleReject = (id: string, modelId: string) => {
        if (!isLogin) {
            setSearchParams('login=true')
            return
        }
        dispatch(setRejectedCount({modelId}))
        type && EntireModelsApi.rejectModel(id).then(() => {
        })
    }

    const {
        isLoading,
        data,
        isFetching,
        refetch
    } = useQuery(['models', filter, type, page, pageSize, sorting], async () => await EntireModelsApi.getModels(type, page, pageSize, filter.creator, filter.moderator, filter.promoter, sorting, filter.from?.toISOString(), filter.to?.toISOString()), {keepPreviousData: true})

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
            {models.map((model) => <div key={model.modelId} className={styles.listItem}><ModelCard  item={model}
                                                                               type={type} handleLike={handleLike}
                                                                               handleMessage={handleMessage}
                                                                               isLogin={isLogin} handleApprove={handleApprove} handleReject={handleReject}/>
            </div>)}

        </div>
        {!isLoading && !isFetching &&
            <Pagination count={pageCount} page={page} onChange={(event, page) => changeCurrentPage(page)}/>}
    </div>
}
