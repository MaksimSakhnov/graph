import styles from './TaskOne.module.scss'
import {TaskOneProps} from "./TaskOne.type";
import {Button, MenuItem, Select, TextField, Typography} from "@mui/material";
import {TaskHeader} from "../TaskHeader/TaskHeader";
import React, {useState} from "react";
import {VertexType} from "../graph/graph";


export function TaskOne({graph, vertex, setVertex, shouldRerender, setShouldRerender}: TaskOneProps) {

    const [ex1SelectedVertex, ex1SetSelectedVertex] = useState<null | number>(null)
    const [ex1Result, setEx1Result] = useState<null | Array<number>>(null)

    function on1ExClick() {
        if (ex1SelectedVertex) {
            const res = graph.current.getExitingVertexes(ex1SelectedVertex)
            if (res)
                setEx1Result(res)
            ex1SetSelectedVertex(null)
        } else
            alert('Выберите вершину')
    }


    function getEx1ResultString() {
        if (ex1Result && ex1Result.length > 0) {
            let res = ''
            ex1Result.forEach(el => res += el + ', ')
            return res
        } else {
            return 'Нет данных'
        }
    }

    const [ex2SelectedVertex, ex2SetSelectedVertex] = useState<null | number>(null)
    const [ex2Result, setEx2Result] = useState<null | number>(null)


    function onEx2Click() {
        if (ex2SelectedVertex) {
            setEx2Result(graph.current.getHalfExodus(ex2SelectedVertex))
            ex2SetSelectedVertex(null)
        } else
            alert('Выберите вершину')

    }

    const [ex3Result, setEx3Result] = useState<null | Array<{ name: string, id: number, count: number }>>(null)

    function onEx3Click() {
        setEx3Result(graph.current.getDegreesForAllVertexes())
    }

    function getEx3ResultString() {
        let result = ''
        if (ex3Result) {
            ex3Result.forEach(el => {
                result += el.name + ': ' + el.count + ', '
            })
        }
        return result
    }


    const [ex4SelectedVertex, setEx4SelectedVertex] = useState<null | number>(null)
    const [ex4Result, setEx4Result] = useState<null | number>(null)


    function onEx4Click() {
        if (ex4SelectedVertex) {
            const result = graph.current.getHalfApproach(ex4SelectedVertex)
            if (result)
                setEx4Result(result)
            ex2SetSelectedVertex(null)
        } else
            alert('Выберите вершину')

    }

    const [ex14SelectedVertex, setEx14SelectedVertex] = useState<null | number>(null)
    const [ex14Result, setEx14Result] = useState<null | Array<VertexType>>(null)

    function onEx14Click() {
        if (ex14SelectedVertex) {
            const result = graph.current.getSmeznVertexes(ex14SelectedVertex)
            if (result) {
                setEx14Result(result)
            }
            setEx14SelectedVertex(null)
        } else
            alert('Выберите вершину')
    }

    function getEx14ResultString() {
        let result = 'Смежные вершины: '
        if (ex14Result) {
            ex14Result.forEach(el => {
                result += el.name + ', '
            })
            return result
        }
        return ''
    }


    const [file1Json, setFile1Json] = useState<any>(null)
    const [file2Json, setFile2Json] = useState<any>(null)

    function onFileInputChange(input: any, type: 1 | 2) {
        let file = input.files[0];
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            // @ts-ignore
            fileReader.onload = event => resolve(JSON.parse(event.target.result))
            fileReader.onerror = error => reject(error)
            fileReader.readAsText(file)
            fileReader.onload = function () {
                if (type === 1) {
                    // @ts-ignore
                    setFile1Json(JSON.parse(fileReader.result))
                } else {
                    // @ts-ignore
                    setFile2Json(JSON.parse(fileReader.result))

                }

            };
        })
    }

    function onUnionGraphClick(){
        if(file1Json &&  file2Json){
            const newGraph =  graph.current.createFromUnion(file1Json, file2Json)
            if(newGraph){
                graph.current = newGraph
                setShouldRerender(true)
                setFile1Json(null)
                setFile2Json(null)
            }
        }
        else {
            alert('Загрузите файл')
        }
    }


    return (
        <div className={styles.task_group}>
            <TaskHeader content={'2. Список смежности Ia'} type={'taskHeader'}/>
            {/*<div className={styles.item}>
                <TaskHeader content={'1) Для данной вершины орграфа вывести все «выходящие» соседние вершины.'}
                            type={'exHeader'}/>

                <div className={styles.item_input}>
                    <Select value={ex1SelectedVertex} sx={{width: '100%'}} className={styles.input}
                            onChange={e => ex1SetSelectedVertex(Number(e.target.value))}>
                        {vertex.map(el => <MenuItem value={el.id}>{el.name}</MenuItem>)}
                    </Select>
                    <Button className={styles.button} variant={'contained'} onClick={on1ExClick}>Выполнить</Button>
                </div>
                <div className={styles.item_output}>
                    <TextField className={styles.input} value={getEx1ResultString()} disabled={true}/>

                </div>

            </div>


            <div className={styles.item}>
                <TaskHeader content={'2) Вывести  полустепень исхода данной вершины орграфа.'}
                            type={'exHeader'}/>

                <div className={styles.item_input}>
                    <Select value={ex2SelectedVertex} sx={{width: '100%'}} className={styles.input}
                            onChange={e => ex2SetSelectedVertex(Number(e.target.value))}>
                        {vertex.map(el => <MenuItem value={el.id}>{el.name}</MenuItem>)}
                    </Select>
                    <Button className={styles.button} variant={'contained'} onClick={onEx2Click}>Выполнить</Button>
                </div>
                <div className={styles.item_output}>
                    <TextField className={styles.input} value={ex2Result !== -1 ? ex2Result : 'NONE'} disabled={true}/>

                </div>

            </div>*/}


            {/*<div className={styles.item}>
                <TaskHeader content={'3) Для каждой вершины графа вывести её степень.'}
                            type={'exHeader'}/>

                <div className={styles.item_input}>
                    <Select sx={{width: '100%'}} className={styles.input} disabled={true}
                    >
                        {vertex.map(el => <MenuItem value={el.id}>{el.name}</MenuItem>)}
                    </Select>
                    <Button className={styles.button} variant={'contained'} onClick={onEx3Click}>Выполнить</Button>
                </div>
                <div className={styles.item_output}>
                    <TextField className={styles.input} value={getEx3ResultString()} disabled={true}/>

                </div>

            </div>*/}


            <div className={styles.item}>
                <TaskHeader content={'4) Вывести полустепень захода данной вершины орграфа.'}
                            type={'exHeader'}/>

                <div className={styles.item_input}>
                    <Select sx={{width: '100%'}} className={styles.input} disabled={true}
                            onChange={e => setEx4SelectedVertex(Number(e.target.value))}
                    >
                        {vertex.map(el => <MenuItem value={el.id}>{el.name}</MenuItem>)}
                    </Select>
                    <Button className={styles.button} variant={'contained'} onClick={onEx4Click}>Выполнить</Button>
                </div>
                <div className={styles.item_output}>
                    <TextField className={styles.input} value={ex4Result} disabled={true}/>

                </div>

            </div>


            {/*<div className={styles.item}>
                <TaskHeader content={'5) Для каждой вершины орграфа вывести её степень.'}
                            type={'exHeader'}/>

                <div className={styles.item_input}>
                    <Select sx={{width: '100%'}} className={styles.input}
                            onChange={e => setEx4SelectedVertex(Number(e.target.value))}
                    >
                        {vertex.map(el => <MenuItem value={el.id}>{el.name}</MenuItem>)}
                    </Select>
                    <Button className={styles.button} variant={'contained'} onClick={onEx3Click}>Выполнить</Button>
                </div>
                <div className={styles.item_output}>
                    <TextField className={styles.input} value={getEx3ResultString()} disabled={true}/>
                </div>
            </div>*/}


            <TaskHeader content={'3. Список смежности Ia'} type={'taskHeader'}/>

            <div className={styles.item}>
                <TaskHeader content={'14) Вывести все вершины орграфа, смежные с данной.'}
                            type={'exHeader'}/>

                <div className={styles.item_input}>
                    <Select sx={{width: '100%'}} className={styles.input}
                            onChange={e => setEx14SelectedVertex(Number(e.target.value))}
                    >
                        {vertex.map(el => <MenuItem value={el.id}>{el.name}</MenuItem>)}
                    </Select>
                    <Button className={styles.button} variant={'contained'} onClick={onEx14Click}>Выполнить</Button>
                </div>
                <div className={styles.item_output}>
                    <TextField className={styles.input} value={getEx14ResultString()} disabled={true}/>

                </div>

            </div>

            <TaskHeader content={'4. Список смежности Iб: несколько графов'} type={'taskHeader'}/>

            <div className={styles.item}>
                <TaskHeader content={'5) Построить граф, являющийся объединением двух заданных.'}
                            type={'exHeader'}/>

                <div className={styles.item_input}>
                    <div className={styles.input}>
                        <TextField className={styles.fileInput} type={'file'}
                                   onChange={(e) => onFileInputChange(e.target, 1)}>Загрузить из
                            файла</TextField>
                        <TextField className={styles.fileInput} type={'file'}
                                   onChange={(e) => onFileInputChange(e.target, 2)}>Загрузить из
                            файла</TextField>


                    </div>

                    <Button className={styles.button} variant={'contained'} onClick={onUnionGraphClick}>Выполнить</Button>
                </div>
                <div className={styles.item_output}>
                    <TextField className={styles.input} disabled={true}/>
                </div>

            </div>


        </div>
    )
}