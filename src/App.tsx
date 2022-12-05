import React, {FC, useEffect, useState} from 'react';
import './App.css';
import {useParams} from 'react-router-dom'
import {Models} from "./components/Models";
import {ModelEnum, ModelsApi, ModelType} from "./api/models.api";
import {Pagination} from "@mui/material";
import {EntireModelsApi, EntireType} from "./api/entire-models.api";


const App: FC = () => {

    const [elements, setElements] = useState<ModelType[]>([])
    const [totalCount, setTotalCount] = useState<number>(0)
    const [pageSize, setPageSize] = useState<number>(100)
    const [pageCount, setPageCount] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const {type} = useParams<{ type: ModelEnum | EntireType }>()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        setElements([])
        if (type && type !== EntireType.ANIMAL && type !== EntireType.HUMAN) {
            ModelsApi.getModels(type, currentPage, pageSize).then((r) => {
                setElements(r.items)
                setTotalCount(r.totalCount)
                setPageCount(r.totalPages)
                setLoading(false)
            })
        }

        if (type && (type === EntireType.ANIMAL || type === EntireType.HUMAN)) {
            EntireModelsApi.getModels(type, currentPage, pageSize).then((r) => {
                setElements(r.items)
                setTotalCount(r.totalCount)
                setPageCount(r.totalPages)
                setLoading(false)
            })
        }

    }, [type, pageSize, currentPage])


    const changeCurrentPage = (currentPage: number) => {
        setCurrentPage(currentPage)
    }


    return (
        <div style={{padding: 20}}>
            <h1 style={{textAlign: "center"}}>{type}</h1>
            {!loading ?
                <Models elements={elements}
                        type={type || ModelEnum.HEAD}/> :
                <div style={{fontSize: 50, textAlign: "center", marginTop: 20}}>Loading...</div>}
            <div style={{display: "flex"}}>
                <Pagination count={pageCount} page={currentPage} onChange={(event, page) => changeCurrentPage(page)}/>
            </div>
        </div>
    );
}

export default App;

