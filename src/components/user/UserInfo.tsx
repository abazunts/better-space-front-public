import styles from './user-info.module.scss'
import {FC} from "react";
import {UserEntity} from "../../api/google-auth-api";

type PropsType = {
    user: UserEntity | null
}

export const UserInfo: FC<PropsType> = ({user}) => {
    return <div className={styles.wrapper}>
        <div><span>{user?.email}</span></div>
    </div>
}
