import * as React from 'react';
import {FC} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {ModelType} from "../../api/models.api";
import styles from "./card.module.scss"
import {EntireType} from "../../api/entire-models.api";
import {CardImage} from "../image/CardImage";
import LikeIcon from "../../assets/icons/like.png";
import MessageIcon from "../../assets/icons/messenger.png";

type PropsType = {
    item: ModelType
    type: EntireType
}

export const ModelCard: FC<PropsType> = ({item, type}) => {
    const modelId = type.toUpperCase() + item.modelId

    const handleLike = () => {
        alert('В разработке')
    }

    const handleMessage = () => {
        alert('В разработке')
    }
    return (
        <Card sx={{maxWidth: 240}}>
            <CardImage preview_base64={item.preview_base64} likeCount={item.likeCount}/>
            <CardContent>
                <Typography component="div" className={styles.Typography}>
                    <span>{modelId}</span>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <div>
                        <span className={styles.Creator}>Creator: {item.owner_name}</span>
                    </div>
                    <div>
                        Promoter: {item.promo_code}
                    </div>
                    <div>
                        Moderator: {item.moderator}
                    </div>
                </Typography>
            </CardContent>
            <div className={styles.actions}>
                <Button size="small" variant={'contained'} onClick={handleLike} className={styles.like}><img alt={''} src={LikeIcon}/>Like</Button>
                <Button size="small" variant={'contained'} onClick={handleMessage} className={styles.help}><img alt={''} src={MessageIcon}/>Пожаловаться</Button>
            </div>
        </Card>
    );
}
