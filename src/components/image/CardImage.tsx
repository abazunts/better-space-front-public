import React, {FC} from "react";
import styles from './card-image.module.scss'
import LikeIcon from '../../assets/icons/like.png'
import ApproveIcon from '../../assets/icons/approve.png'
import RejectIcon from '../../assets/icons/reject.png'

type PropsType = {
    preview_base64: string
    likeCount: number
}
export const CardImage: FC<PropsType> = ({preview_base64, likeCount}) => {
    return <div className={styles.Wrapper}>
        <img  src={'data:image/jpeg;base64,' + preview_base64} alt={''}/>
        <div className={styles.bottomRight}><img alt={''} src={LikeIcon}/><span className={styles.likeCount}>{likeCount}</span></div>
        <div className={styles.bottomLeft}>
            <div><img alt={''} src={ApproveIcon}/><span className={styles.approveCount}>{likeCount}</span></div>
            <div><img alt={''} src={RejectIcon}/><span className={styles.rejectCount}>{likeCount}</span></div>
        </div>

    </div>
}
