import React, {FC} from "react";

type PropsType = {
    preview_base64: string
    height: number
    width: number

}
export const Image: FC<PropsType> = ({preview_base64, height, width}) => {
    return <div style={{
        width, height, border: '1px solid grey', position: 'relative',
        overflow: 'hidden',
    }}>
        <img style={{width: 150}} src={'data:image/jpeg;base64,' + preview_base64} alt={''}/>
    </div>
}
