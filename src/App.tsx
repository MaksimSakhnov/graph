import React, {useEffect, useState} from 'react';
import {Graph, VertexType} from "./graph/graph";
import {useRef} from "react";
import styles from './App.module.scss'
import {
    Button,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableHead, TableRow,
    TextField
} from '@mui/material';
import TaskOne from "./task1";

function App() {

    const [shouldRerender, setShouldRerender] = useState(true)
    const [vertex, setVertex] = useState<VertexType[]>([]);
    const graph = useRef(new Graph())

    useEffect(() => {
        if (shouldRerender) {
            const vertex = Array.from(graph.current.getVertex().values())
            setVertex(vertex)
        }
        setShouldRerender(false)

    }, [shouldRerender])


    const [createVertexId, setCreateVertexId] = useState<number | null>(null)
    const [createVertexName, setCreateVertexName] = useState<string | null>(null)

    function onCreateVertexClick() {
        if (createVertexId && createVertexName) {
            graph.current.addVertex({id: createVertexId, name: createVertexName})
        } else {
            alert('Введите все данные')
        }
        setCreateVertexId(null)
        setCreateVertexName(null)
        setShouldRerender(true)
    }


    const [createEdge1, setCreateEdge1] = useState<number | null>(null)
    const [createEdge2, setCreateEdge2] = useState<number | null>(null)

    function onCreateEdgeClick() {
        if (createEdge1 && createEdge2) {
            graph.current.addEdge({from: createEdge1, to: createEdge2})
        } else {
            alert('Введите все данные')
        }
        setCreateEdge1(null)
        setCreateEdge2(null)
        setShouldRerender(true)

    }


    const [deleteEdge1, setDeleteEdge1] = useState<number | null>(null)
    const [deleteEdge2, setDeleteEdge2] = useState<number | null>(null)

    function onDeleteEdgeClick() {
        if (deleteEdge1 && deleteEdge2) {
            graph.current.deleteEdge({from: deleteEdge1, to: deleteEdge2})
        } else {
            alert('Введите все данные')
        }
        setDeleteEdge1(null)
        setDeleteEdge2(null)
        setShouldRerender(true)

    }

    const [deleteVertexId, setDeleteVertexId] = useState<number | null>(null)

    function onDeleteVertexId() {
        if (deleteVertexId) {
            graph.current.deleteVertex(deleteVertexId)
        } else {
            alert('Введите все данные')
        }
        setDeleteVertexId(null)
        setShouldRerender(true)

    }

    const edges = graph.current.getEdges()
    console.log(edges)


    function onGraphTypeChange(type: string) {
        graph.current.changeType(type as 'direction' | 'nonDirection')
        setShouldRerender(true)
    }

    const [fileJson, setFileJson] = useState<any>(null)

    function onFileInputChange(input: any) {
        let file = input.files[0];
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            // @ts-ignore
            fileReader.onload = event => resolve(JSON.parse(event.target.result))
            fileReader.onerror = error => reject(error)
            fileReader.readAsText(file)
            fileReader.onload = function () {
                // @ts-ignore
                setFileJson(JSON.parse(fileReader.result))
            };
        })
    }

    function onCreateGraphFromJson() {

        if (fileJson) {
            graph.current = graph.current.createFromFile(fileJson)
            setShouldRerender(true)
            setFileJson(null)
        } else {
            alert('Загрузите файл')
        }

    }


    return (
        <div className={styles.container}>

            <div className={styles.controls}>
                <div className={styles.item}>
                    <label>Добавить вершину</label>
                    <div className={styles.item_body}>

                        <div className={styles.input}>
                            <label htmlFor="input">id</label>
                            <TextField id="outlined-basic" variant="outlined" inputProps={{style: {padding: '2%'}}}
                                       type={'number'} value={createVertexId ?? ''}
                                       onChange={e => setCreateVertexId(Number(e.target.value))}/>

                        </div>

                        <div className={styles.input}>
                            <label htmlFor="input">Метка</label>
                            <TextField id="outlined-basic" variant="outlined" inputProps={{style: {padding: '2%'}}}
                                       value={createVertexName ?? ''}
                                       onChange={e => setCreateVertexName(e.target.value)}/>

                        </div>

                        <div className={styles.buttons}>
                            <button onClick={() => onCreateVertexClick()}>Добавить</button>
                        </div>
                    </div>


                </div>

                <div className={styles.item}>
                    <label>Добавить ребро / дугу</label>
                    <div className={styles.item_body}>
                        <div className={styles.input}>
                            <label htmlFor="input">Откуда</label>
                            <TextField id="outlined-basic" variant="outlined" inputProps={{style: {padding: '2%'}}}
                                       value={createEdge1 ?? ''} type={'number'}
                                       onChange={e => setCreateEdge1(Number(e.target.value))}/>

                        </div>

                        <div className={styles.input}>
                            <label htmlFor="input">Куда</label>
                            <TextField id="outlined-basic" variant="outlined" inputProps={{style: {padding: '2%'}}}
                                       value={createEdge2 ?? ''} type={'number'}
                                       onChange={e => setCreateEdge2(Number(e.target.value))}/>

                        </div>

                        <div className={styles.buttons}>
                            <button onClick={() => onCreateEdgeClick()}>Добавить</button>
                        </div>
                    </div>


                </div>

                <div className={styles.item}>
                    <label>Удалить ребро / дугу</label>
                    <div className={styles.item_body}>
                        <div className={styles.input}>
                            <label htmlFor="input">Откуда</label>
                            <TextField id="outlined-basic" variant="outlined" inputProps={{style: {padding: '2%'}}}
                                       value={deleteEdge1 ?? ''} type={'number'}
                                       onChange={e => setDeleteEdge1(Number(e.target.value))}/>

                        </div>

                        <div className={styles.input}>
                            <label htmlFor="input">Куда</label>
                            <TextField id="outlined-basic" variant="outlined" inputProps={{style: {padding: '2%'}}}
                                       value={deleteEdge2 ?? ''} type={'number'}
                                       onChange={e => setDeleteEdge2(Number(e.target.value))}/>
                        </div>

                        <div className={styles.buttons}>
                            <button onClick={() => onDeleteEdgeClick()}>Удалить</button>
                        </div>
                    </div>

                </div>

                <div className={styles.item}>
                    <label>Удалить вершину</label>
                    <div className={styles.item_body}>
                        <div className={styles.input}>
                            <label htmlFor="input">id</label>
                            <TextField id="outlined-basic" variant="outlined" inputProps={{style: {padding: '2%'}}}
                                       value={deleteVertexId ?? ''} type={'number'}
                                       onChange={e => setDeleteVertexId(Number(e.target.value))}/>
                        </div>


                        <div className={styles.buttons}>
                            <button onClick={() => onDeleteVertexId()}>Удалить</button>
                        </div>

                    </div>


                </div>

                <div className={styles.item}>
                    <label>Изменить тип</label>
                    <div className={styles.item_body}>

                        <div className={styles.input}>
                            <label htmlFor="input">Тип</label>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Age"
                                value={graph.current.type}
                                onChange={e => onGraphTypeChange(e.target.value)}
                            >
                                <MenuItem value={'nonDirection'}>Неориентированный</MenuItem>
                                <MenuItem value={'direction'}>Ориентированный</MenuItem>
                            </Select>
                        </div>


                        {/*<div className={styles.buttons}>
                            <button>Применить</button>
                        </div>*/}
                    </div>


                </div>

                <div className={styles.item}>
                    <label></label>
                    <div className={styles.item_body}>
                        <Button onClick={() => graph.current.exportToFile()}>Сохранить в файл</Button>

                    </div>
                </div>


                <div className={styles.item}>
                    <label></label>
                    <div className={styles.item_body}>
                        <TextField type={'file'} onChange={(e) => onFileInputChange(e.target)}>Загрузить из
                            файла</TextField>
                        <Button onClick={() => onCreateGraphFromJson()}>Создать граф из файла</Button>
                    </div>
                </div>


            </div>

            <div className={styles.tables}>
                <div className={styles.item}>
                    <Table sx={{maxWidth: '20%'}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>id</TableCell>
                                <TableCell align="right">Метка</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {vertex.map((row) => (
                                <TableRow
                                    key={row.id}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell><TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className={styles.item}>
                    <Table sx={{maxWidth: '20%'}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>id</TableCell>
                                <TableCell>Метка</TableCell>
                                <TableCell align="right">Смежные вершины</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {vertex.map(el => {
                                const temp = edges.get(el.id)
                                if (temp) {
                                    const values = Array.from(temp)
                                    return (
                                        <TableRow
                                            key={el.id}
                                        >
                                            <TableCell component="th" scope="row">
                                                {el.id}
                                            </TableCell><TableCell component="th" scope="row">
                                            {el.name}
                                        </TableCell>
                                            <TableCell component="th" scope="row">
                                                {values.map(value => `${graph.current.getVertexName(value)}, `)}
                                            </TableCell>

                                        </TableRow>
                                    )
                                }
                                return null
                            })}
                        </TableBody>
                    </Table>
                </div>

            </div>

            <TaskOne graph={graph} vertex={vertex} setVertex={setVertex} setShouldRerender={setShouldRerender}
                     shouldRerender={shouldRerender}/>
        </div>

    );
}

export default App;
