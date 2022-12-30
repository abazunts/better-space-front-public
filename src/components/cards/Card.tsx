import * as React from 'react';
import {FC, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from "./card.module.scss"
import {EntireModelType, EntireType} from "../../api/entire-models.api";
import {CardImage} from "../image/CardImage";
import LikeIcon from "../../assets/icons/like.png";
import ApproveIcon from '../../assets/icons/approve.png'
import RejectIcon from '../../assets/icons/reject.png'
import MessageIcon from "../../assets/icons/messenger.png";
import {useDispatch, useSelector} from "react-redux";
import {setFilter} from "../../bll/models-slice";
import {NavLink} from "react-router-dom";
import {Routers} from "../../routing/linking";
import {RootState} from "../../bll/store";
import {RolesEnum} from "../../api/google-auth-api";

type PropsType = {
    item: EntireModelType
    type: EntireType
    handleLike: (id: string, modelId: string) => void
    handleMessage: (id: string) => void
    handleApprove: (id: string, modelId: string) => void
    handleReject: (id: string, modelId: string) => void
    isLogin: boolean
}

export const ModelCard: FC<PropsType> = ({
                                             item,
                                             type,
                                             handleMessage,
                                             handleLike,
                                             isLogin,
                                             handleApprove,
                                             handleReject
                                         }) => {
    const dispatch = useDispatch()
    const [loadingLike, setLoadingLike] = useState(false)
    const [loadingApprove, setLoadingApprove] = useState(false)
    const [loadingReject, setLoadingReject] = useState(false)
    const user = useSelector((state: RootState) => state.authReducer.user)

    const like = (id: string) => {
        setLoadingLike(true)
        handleLike(id, item.modelId)
    }

    const approve = (id: string) => {
        setLoadingApprove(true)
        handleApprove(id, item.modelId)
    }

    const reject = (id: string) => {
        setLoadingReject(true)
        handleReject(id, item.modelId)
    }
    const handleCreator = (creator: string) => {
        dispatch(setFilter({
            filter: {
                promoter: '',
                moderator: '',
                creator,
                from: null,
                to: null
            }
        }))
    }
    const handlePromoter = (promoter?: string) => {
        promoter && dispatch(setFilter({
            filter: {
                promoter: promoter || '',
                moderator: '',
                creator: '',
                from: null,
                to: null
            }
        }))
    }
    const handleModerator = (moderator?: string) => {
        moderator && dispatch(setFilter({
            filter: {
                promoter: '',
                moderator: moderator || '',
                creator: '',
                from: null,
                to: null
            }
        }))
    }
    const modelId = type.toUpperCase() + item.modelId
    const isApprovedDisabled = !!item?.approvedEntities?.filter((l) => l.user === user?._id).length
    const isRejectedDisabled = !!item.rejectedEntities?.filter((l) => l.user === user?._id).length
    const isLikeDisabled = !!item?.likeEntities?.filter((l) => l.user === user?._id).length

    const isActiveModeratorActions = user ? user?.roles.indexOf(RolesEnum.Moderator) > -1 || user?.roles.indexOf(RolesEnum.Admin) > -1 : false
    return (
        <Card sx={{maxWidth: 240}}>
            <NavLink to={Routers.models.model.getUrl(type, item.modelId)}>
                <div className={styles.wrapperImage}>
                    <CardImage preview_base64={item.preview_base64} likeCount={item.likeCount}
                               approvedCount={item.approvedCount} rejectedCount={item.rejectedCount}/>
                </div>
            </NavLink>
            <CardContent>
                <Typography component="div" className={styles.Typography}>
                    <span><a href={process.env.REACT_APP_VIEWER_BASE_URL + modelId}
                             target={'_blank'} rel="noreferrer" >{modelId}</a></span>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <div>
                        <span className={styles.Creator}>Creator: <span className={styles.linkFilter}
                                                                        onClick={() => handleCreator(item.owner_name)}>{item.owner_name}</span></span>
                    </div>
                    <div>
                        Promoter: <span className={styles.linkFilter}
                                        onClick={() => handlePromoter(item.promo_code)}>{item.promo_code}</span>
                    </div>
                    <div>
                        Moderator: <span className={styles.linkFilter}
                                         onClick={() => handleModerator(item.moderator)}>{item.moderator}</span>
                    </div>
                </Typography>
            </CardContent>
            <div className={styles.actions}>
                <Button size="small" variant={'contained'} disabled={loadingLike || isLikeDisabled}
                        onClick={() => like(item.entireType + item.modelId)}
                        className={styles.like}><img alt={''} src={LikeIcon}/>Like</Button>
                <Button size="small" variant={'contained'} onClick={() => handleMessage(item.entireType + item.modelId)}
                        className={styles.help}><img alt={''} src={MessageIcon}/>Comment</Button>
            </div>
            {isActiveModeratorActions && <div className={styles.moderatorActions}>
                <Button size="small" variant={'contained'} disabled={loadingApprove || isApprovedDisabled}
                        onClick={() => approve(item.entireType + item.modelId)}
                        className={styles.like}><img alt={''} src={ApproveIcon}/>Approve</Button>
                <Button size="small" variant={'contained'} onClick={() => reject(item.entireType + item.modelId)}
                        className={styles.help} disabled={loadingReject || isRejectedDisabled}><img alt={''}
                                                                                                    src={RejectIcon}/>Reject</Button>
            </div>}
        </Card>
    );
}
