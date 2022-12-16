import React, {FC} from "react";
import styles from './card-image-current.module.scss'
import LikeIcon from '../../assets/icons/like.png'
import ApproveIcon from "../../assets/icons/approve.png";
import RejectIcon from "../../assets/icons/reject.png";

type PropsType = {
    preview_base64: string
    likeCount: number
    approvedCount: number
    rejectedCount: number
}
export const CardImageCurrentModel: FC<PropsType> = ({preview_base64, likeCount, approvedCount, rejectedCount}) => {
    return <div className={styles.Wrapper}>
        <img  src={'data:image/jpeg;base64,' + preview_base64} alt={''}/>
        <div className={styles.bottomRight}><img alt={''} src={LikeIcon}/><span className={styles.likeCount}>{likeCount}</span></div>
        <div className={styles.bottomLeft}>
            <div><img alt={''} src={ApproveIcon}/><span className={styles.approveCount}>{approvedCount}</span></div>
            <div><img alt={''} src={RejectIcon}/><span className={styles.rejectCount}>{rejectedCount}</span></div>
        </div>
    </div>
}
