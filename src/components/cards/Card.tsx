import * as React from 'react';
import {FC} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {ModelType} from "../../api/models.api";
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
    handleLike: (id: string) => void
    handleMessage: (id: string) => void
    isLogin: boolean
}

export const ModelCard: FC<PropsType> = ({item, type, handleMessage, handleLike, isLogin}) => {
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.authReducer.user)
    const handleCreator = (creator: string) => {
        dispatch(setFilter({
            filter: {
                promoter: '',
                moderator: '',
                creator,
            }
        }))
    }
    const handlePromoter = (promoter?: string) => {
        promoter && dispatch(setFilter({
            filter: {
                promoter: promoter || '',
                moderator: '',
                creator: '',
            }
        }))
    }
    const handleModerator = (moderator?: string) => {
        moderator && dispatch(setFilter({
            filter: {
                promoter: '',
                moderator: moderator || '',
                creator: '',
            }
        }))
    }

    const modelId = type.toUpperCase() + item.modelId
    const isApprovedDisabled = !!item.approvedEntities.find((a) => a.user === user?._id)
    const isRejectedDisabled = !!item.rejectedEntities.find((a) => a.user === user?._id)
    const isLikeDisabled = !!item.likeEntities.find((a) => a.user === user?._id)

    const isActiveModeratorActions = user ? user?.roles.indexOf(RolesEnum.Moderator) > -1 || user?.roles.indexOf(RolesEnum.Admin) > -1 : false
    return (
        <Card sx={{maxWidth: 240}}>
            <NavLink to={Routers.models.model.getUrl(type, item._id)}>
                <div className={styles.wrapperImage}>
                    <CardImage preview_base64={item.preview_base64} likeCount={item.likeCount}/>
                </div>
            </NavLink>
            <CardContent>
                <Typography component="div" className={styles.Typography}>
                    <span>{modelId}</span>
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
                <Button size="small" variant={'contained'} disabled={isLikeDisabled} onClick={() => handleLike(item._id)}
                        className={styles.like}><img alt={''} src={LikeIcon}/>Like</Button>
                <Button size="small" variant={'contained'} onClick={() => handleMessage(item._id)}
                        className={styles.help}><img alt={''} src={MessageIcon}/>Пожаловаться</Button>
            </div>
            {isActiveModeratorActions && <div className={styles.moderatorActions}>
                <Button size="small" variant={'contained'} disabled={isApprovedDisabled} onClick={() => handleLike(item._id)}
                        className={styles.like}><img alt={''} src={ApproveIcon}/>Approve</Button>
                <Button size="small" variant={'contained'} onClick={() => handleMessage(item._id)}
                        className={styles.help} disabled={isRejectedDisabled}><img alt={''} src={RejectIcon}/>Reject</Button>
            </div>}
        </Card>
    );
}
