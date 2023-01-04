import {useParams, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../bll/store";
import * as React from "react";
import {useEffect, useState} from "react";
import {useQuery} from "react-query";
import {EntireModelsApi, EntireType} from "../api/entire-models.api";
import {
    deleteApprovedCount, deleteApprovedCountCurrentModel,
    deleteRejectedCount, deleteRejectedCountCurrentModel,
    setApprovedCount,
    setApprovedCountCurrentModel,
    setApprovedUsers,
    setCurrentModel,
    setLikeCountCurrentModel,
    setLoading, setRejectedCountCurrentModel,
    setRejectedUsers
} from "../bll/models-slice";
import Box from "@mui/material/Box";
import {Paper} from "@mui/material";
import styles from './current-model.module.scss'
import {SimpleBackdrop} from "../components/loaders/backdrop";
import {CardImageCurrentModel} from "../components/image/CardImageCurrentModel";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LikeIcon from "../assets/icons/like.png";
import MessageIcon from "../assets/icons/messenger.png";
import {AuthGoogleModal} from "../components/google/auth-modal";
import {setIsLogin, setUser} from "../bll/auth-slice";
import {GoogleAuthApi, RolesEnum} from "../api/google-auth-api";
import ApproveIcon from "../assets/icons/approve.png";
import RejectIcon from "../assets/icons/reject.png";
import {getLocaleDateStringForHours} from "../utils/get-date-format";
import {formatInTimeZone} from 'date-fns-tz'

export const getType = (modelId: string | undefined): EntireType | null => {
    if (!modelId) return null
    const arr = modelId.split('-');
    return arr[0] as EntireType;
};

export const getModelId = (modelId: string | undefined, type: EntireType | null): string | null => {
    if (!modelId || !type) return null
    const pattern = `${type.toUpperCase()}`;
    return modelId.replace(new RegExp(pattern), '');
};

export const CurrentModel = () => {
    let params = useParams<{ modelId: string }>();
    const dispatch = useDispatch()
    const currentModel = useSelector((state: RootState) => state.modelsReducer.currentModel)
    const approvedUsers = useSelector((state: RootState) => state.modelsReducer.approvedUsers)
    const rejectedUsers = useSelector((state: RootState) => state.modelsReducer.rejectedUsers)
    const isLogin = useSelector((state: RootState) => state.authReducer.isLogin)
    const user = useSelector((state: RootState) => state.authReducer.user)
    const isActiveModeratorActions = user ? user?.roles.indexOf(RolesEnum.Moderator) > -1 || user?.roles.indexOf(RolesEnum.Admin) > -1 : false
    const isActiveUserSection = user ? user?.roles.indexOf(RolesEnum.Admin) > -1 : false
    const type = getType(params.modelId)
    const id = getModelId(params.modelId, type)
    const [loadingLike, setLoadingLike] = useState(false)
    const [loadingApprove, setLoadingApprove] = useState(false)
    const [loadingReject, setLoadingReject] = useState(false)


    const approvedUserIds = currentModel?.approvedEntities.map((a) => a.user) || []
    const rejectedUserIds = currentModel?.rejectedEntities.map((a) => a.user) || []

    const queryApprovedUsers = useQuery(['approvedUsers', approvedUserIds], async () => await EntireModelsApi.getUsers(approvedUserIds), {keepPreviousData: true})
    const queryRejectedUsers = useQuery(['rejectedUsers', rejectedUserIds], async () => await EntireModelsApi.getUsers(rejectedUserIds), {keepPreviousData: true})

    useEffect(() => {
        queryApprovedUsers?.data && dispatch(setApprovedUsers({users: queryApprovedUsers.data}))
    }, [queryApprovedUsers])

    useEffect(() => {
        queryRejectedUsers?.data && dispatch(setRejectedUsers({users: queryRejectedUsers.data}))
    }, [queryRejectedUsers])

    const {
        isLoading,
        data,
        isFetching,
        refetch
    } = useQuery(['currentModel', params.modelId], async () => await EntireModelsApi.getModelById(params.modelId, type), {keepPreviousData: true})

    useEffect(() => {
        dispatch(setLoading({isLoading}))
    }, [isLoading])
    useEffect(() => {
        dispatch(setLoading({isLoading: isFetching}))
    }, [isFetching])

    useEffect(() => {
        if (data) {
            dispatch(setCurrentModel({currentModel: data}))
        }
    }, [data])

    const [searchParams, setSearchParams] = useSearchParams();
    const handleLike = (id: string) => {
        if (!isLogin) {
            setSearchParams('login=true')
            return
        }
        setLoadingLike(true)
        dispatch(setLikeCountCurrentModel())
        type && EntireModelsApi.likeModel(id).then(() => {
        })

    }

    const handleMessage = (id: string) => {
        alert('В разработке')
    }

    const handleApprove = (id: string) => {
        if (!isLogin) {
            setSearchParams('login=true')
            return
        }
        setLoadingApprove(true)
        dispatch(setApprovedCountCurrentModel())
        type && EntireModelsApi.approveModel(id).then(() => {
        })
    }

    const handleDeleteApprove = (id: string) => {
        if (!isLogin) {
            setSearchParams('login=true')
            return
        }

        setLoadingApprove(true)
        dispatch(deleteApprovedCountCurrentModel())
        type && EntireModelsApi.deleteApproveModel(id).then(() => {
        })

    }

    const handleReject = (id: string) => {
        if (!isLogin) {
            setSearchParams('login=true')
            return
        }
        setLoadingReject(true)
        dispatch(setRejectedCountCurrentModel())
        type && EntireModelsApi.rejectModel(id).then(() => {
        })
    }

    const handleDeleteReject = (id: string) => {
        if (!isLogin) {
            setSearchParams('login=true')
            return
        }
        setLoadingReject(true)
        dispatch(deleteRejectedCountCurrentModel())
        type && EntireModelsApi.deleteRejectModel(id).then(() => {
        })
    }
    const authMe = async () => {
        const user = await GoogleAuthApi.me()
        dispatch(setUser({user}))
        dispatch(setIsLogin({isLogin: true}))
    }
    const handleLogin = (isLogin: boolean) => {
        if (isLogin) {
            authMe().then(() => {
                dispatch(setIsLogin({isLogin: true}))
                setSearchParams('')
            }).catch(() => {
            })
        }
    }
    if (!currentModel) {
        return <SimpleBackdrop/>
    }

    // const createdDate = formatInTimeZone(new Date(currentModel.server_timestamp), Intl.DateTimeFormat().resolvedOptions().timeZone, 'LLL dd yyyy hh:mm a zzz')
    const createdDate = getLocaleDateStringForHours(new Date(currentModel.server_timestamp))

    console.log()

    const isApprovedDisabled = !user ? false : !!currentModel?.approvedEntities?.find((a) => a.user === user?._id)
    const isRejectedDisabled = !user ? false : !!currentModel?.rejectedEntities?.find((a) => a.user === user?._id)
    const isLikeDisabled = !user ? false : !!currentModel?.likeEntities?.find((a) => a.user === user?._id)
    return <div className={styles.wrapper}>
        {searchParams.get('login') && <AuthGoogleModal handleSuccessCallback={handleLogin}/>}
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 1,
                },
            }}
        >
            <Paper elevation={3}>
                <div className={styles.wrapperImage}>
                    <CardImageCurrentModel preview_base64={currentModel.preview_base64}
                                           approvedCount={currentModel.approvedCount}
                                           likeCount={currentModel.likeCount}
                                           rejectedCount={currentModel.rejectedCount}/>
                </div>
                <div className={styles.date}>
                    <span className={styles.linkFilter}>{createdDate}</span>
                </div>
                <CardContent>
                    <Typography component="div" className={styles.Typography}>
                        {type && <span><a href={process.env.REACT_APP_VIEWER_BASE_URL + type + currentModel.modelId}
                                          target={'_blank'} rel="noreferrer">{type + currentModel.modelId}</a></span>}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <div>
                            <span className={styles.Creator}>Creator: <span
                                className={styles.linkFilter}>{currentModel.owner_name}</span></span>
                        </div>
                        <div>
                            Promoter: <span className={styles.linkFilter}>{currentModel.promo_code}</span>
                        </div>
                        <div>
                            Moderator: <span className={styles.linkFilter}>{currentModel.moderator}</span>
                        </div>
                        <div className={styles.partsWrapper}>
                            <span>PARTS: </span>
                            <div className={styles.linkFilter}>{currentModel.parts?.map((p) => <div
                                className={styles.parts}><a href={process.env.REACT_APP_VIEWER_BASE_URL + p}
                                                            target={'_blank'} rel="noreferrer">{p}</a></div>)}</div>
                        </div>

                    </Typography>
                </CardContent>
                <div className={styles.actions}>
                    <Button size="small" variant={'contained'} disabled={loadingLike || isLikeDisabled}
                            onClick={() => handleLike(currentModel?.entireType + currentModel?.modelId)}
                            className={styles.like}><img alt={''} src={LikeIcon}/>Like</Button>
                    <Button size="small" variant={'contained'}
                            onClick={() => handleMessage(currentModel?.entireType + currentModel?.modelId)}
                            className={styles.help}><img alt={''} src={MessageIcon}/>Comment</Button>
                </div>
                {!isActiveModeratorActions && <div className={styles.moderatorActions}>
                    <Button size="small" style={{background: isApprovedDisabled ? 'grey' : ''}} variant={'contained'} disabled={loadingApprove}
                            onClick={() => isApprovedDisabled ? handleDeleteApprove(currentModel?.entireType + currentModel?.modelId) : handleApprove(currentModel?.entireType + currentModel?.modelId)}
                            className={styles.like}><img alt={''} src={ApproveIcon}/>Approve</Button>
                    <Button size="small" style={{background: isApprovedDisabled ? 'grey' : ''}}  variant={'contained'}
                            onClick={() => isRejectedDisabled ? handleDeleteReject(currentModel?.entireType + currentModel?.modelId) : handleReject(currentModel?.entireType + currentModel?.modelId)}
                            className={styles.help} disabled={loadingReject}><img alt={''}
                                                                                                        src={RejectIcon}/>Reject</Button>
                </div>}
            </Paper>
            {isActiveUserSection && (queryApprovedUsers.data?.length || queryRejectedUsers.data?.length) &&
                <Paper className={styles.Users}>
                    <h3>Users</h3>
                    <div className={styles.wrapperUsers}>
                        {approvedUsers.map((user) => <div className={styles.user}><img alt={''} src={ApproveIcon}
                                                                                       className={styles.approvedIcon}/>Email: {user.email}
                        </div>)}
                        {rejectedUsers.map((user) => <div className={styles.user}><img alt={''} src={RejectIcon}
                                                                                       className={styles.rejectedIcon}/>Email: {user.email}
                        </div>)}
                    </div>
                </Paper>}
        </Box>
    </div>
}
