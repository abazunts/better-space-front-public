import React, {FC} from "react";
import {EntireType, ModelEnum, ModelType} from "../api/models.api";
import {Image} from "./Image";

type PropsType = {
    elements: ModelType[]
    type: ModelEnum | EntireType
}
export const Models: FC<PropsType> = ({elements, type}) => {


    return <div style={{display: 'flex', flexWrap: "wrap"}}>
        {!elements.length && <div>Elements not found</div>}
        {elements.map((el) => {
            return <div key={el._id} style={{border: '1px solid red', margin: 5, padding: 10, width: 320}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                    <Image height={(type !== EntireType.HUMAN && type !== EntireType.ANIMAL) ? 150 : 300} width={150}
                           preview_base64={el.preview_base64}/>
                </div>
                {
                    (Object.keys(el) as Array<keyof ModelType>)
                        //@ts-ignore
                        .map((key, index) => (key === 'preview_base64' || key === 'preview' || key === 'likeCount' || key === '_id' || key === 'isPrepared' || key === 'entireType' || key === 'vox_model_data' || key === 'server_timestamp') ?
                            <span/> :
                            <div key={index}
                                 style={{padding: 5}}>{key}: {key === 'modelId' ? type.toUpperCase() : ''}{key !== 'parts' ? el[key] : ''}

                            </div>)
                }
                <div style={{margin: 5}}>date: {new Date(el.server_timestamp).toUTCString()}</div>
            </div>
        })}
    </div>
}

