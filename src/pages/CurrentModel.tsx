import {useParams, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../bll/store";
import {useEffect} from "react";
import {useQuery} from "react-query";
import {EntireModelsApi, EntireType} from "../api/entire-models.api";
import {setCurrentModel, setFilter, setLoading} from "../bll/models-slice";
import Box from "@mui/material/Box";
import {Paper} from "@mui/material";
import styles from './current-model.module.scss'
import * as React from "react";
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

export const CurrentModel = () => {
    let params = useParams<{ type: EntireType, id: string }>();
    const dispatch = useDispatch()
    const currentModel = useSelector((state: RootState) => state.modelsReducer.currentModel)
    const approvedUsers = useSelector((state: RootState) => state.modelsReducer.approvedUsers)
    const rejectedUsers = useSelector((state: RootState) => state.modelsReducer.rejectedUsers)
    const isLogin = useSelector((state: RootState) => state.authReducer.isLogin)
    const user = useSelector((state: RootState) => state.authReducer.user)
    const isActiveModeratorActions = user ? user?.roles.indexOf(RolesEnum.Moderator) > -1 || user?.roles.indexOf(RolesEnum.Admin) > -1 : false
    const isActiveUserSection = user ? user?.roles.indexOf(RolesEnum.Admin) > -1 : false
    const id = params.id || null
    const type = params.type || null

    const approvedUserIds = currentModel?.approvedEntities.map((a) => a.user) || []
    const rejectedUserIds = currentModel?.rejectedEntities.map((a) => a.user) || []

    const queryApprovedUsers = useQuery(['approvedUsers', approvedUserIds], async () => await EntireModelsApi.getUsers(approvedUserIds), {keepPreviousData: true})
    const queryRejectedUsers = useQuery(['rejectedUsers', rejectedUserIds], async () => await EntireModelsApi.getUsers(rejectedUserIds), {keepPreviousData: true})

    useEffect(() => {


    }, [currentModel])

    const {
        isLoading,
        data,
        isFetching,
        refetch
    } = useQuery(['currentModel', id], async () => await EntireModelsApi.getModelById(id, type), {keepPreviousData: true})

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

        type && EntireModelsApi.likeModel(id, type).then(() => {
            refetch().then()
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

        type && EntireModelsApi.approveModel(id, type).then(() => {
            refetch().then()
        })

    }

    const handleReject = (id: string) => {
        if (!isLogin) {
            setSearchParams('login=true')
            return
        }

        type && EntireModelsApi.rejectModel(id, type).then(() => {
            refetch().then()
        })
    }

    if (!currentModel) {
        return <SimpleBackdrop/>
    }

    const createdDate = new Date(currentModel.server_timestamp).toLocaleDateString()
    const createdTime = new Date(currentModel.server_timestamp).toLocaleTimeString()
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

    const isApprovedDisabled = !!currentModel.approvedEntities.find((a) => a.user === user?._id)
    const isRejectedDisabled = !!currentModel.rejectedEntities.find((a) => a.user === user?._id)
    const isLikeDisabled = !!currentModel.likeEntities.find((a) => a.user === user?._id)
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
                    <CardImageCurrentModel preview_base64={currentModel.preview_base64} approvedCount={currentModel.approvedCount}
                                           likeCount={currentModel.likeCount} rejectedCount={currentModel.rejectedCount}/>
                </div>
                <div className={styles.date}>
                    <span className={styles.linkFilter}>{createdDate} {createdTime}</span>
                </div>
                <CardContent>
                    <Typography component="div" className={styles.Typography}>
                        <span>{type + currentModel.modelId}</span>
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
                           <span>PARTS: </span> <div className={styles.linkFilter}>{currentModel.parts?.map((p)=> <div className={styles.parts}>{p}</div>)}</div>
                        </div>

                    </Typography>
                </CardContent>
                <div className={styles.actions}>
                    <Button size="small" variant={'contained'} disabled={isLikeDisabled}
                            onClick={() => handleLike(currentModel._id)}
                            className={styles.like}><img alt={''} src={LikeIcon}/>Like</Button>
                    <Button size="small" variant={'contained'} onClick={() => handleMessage(currentModel._id)}
                            className={styles.help}><img alt={''} src={MessageIcon}/>Пожаловаться</Button>
                </div>
                {isActiveModeratorActions && <div className={styles.moderatorActions}>
                    <Button size="small" variant={'contained'} disabled={isApprovedDisabled} onClick={() => handleApprove(currentModel._id)}
                            className={styles.like}><img alt={''} src={ApproveIcon}/>Approve</Button>
                    <Button size="small" variant={'contained'} onClick={() => handleReject(currentModel._id)}
                            className={styles.help} disabled={isRejectedDisabled}><img alt={''} src={RejectIcon}/>Reject</Button>
                </div>}
            </Paper>
            {isActiveUserSection && (queryApprovedUsers.data?.length ||queryRejectedUsers.data?.length) && <Paper className={styles.Users}>
                <h3>Users</h3>
                <div className={styles.wrapperUsers}>
                    {queryApprovedUsers.data?.map((user)=> <div className={styles.user}><img alt={''} src={ApproveIcon} className={styles.approvedIcon}/>Email: {user.email}</div>)}
                    {queryRejectedUsers.data?.map((user)=> <div className={styles.user}><img alt={''} src={RejectIcon} className={styles.rejectedIcon}/>Email: {user.email}</div>)}
                </div>
            </Paper>}
        </Box>
    </div>
}
