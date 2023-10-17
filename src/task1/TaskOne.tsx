import styles from './TaskOne.module.scss'
import {TaskOneProps} from "./TaskOne.type";
import {Button, MenuItem, Select, TextField, Typography} from "@mui/material";
import {TaskHeader} from "../TaskHeader/TaskHeader";
import React, {useState} from "react";
import {VertexType} from "../graph/graph";


export function TaskOne({graph, vertex, setVertex, shouldRerender, setShouldRerender}: TaskOneProps) {





    const [ex4SelectedVertex, setEx4SelectedVertex] = useState<null | number>(null)
    const [ex4Result, setEx4Result] = useState<null | number>(null)


    function onEx4Click() {
        if (ex4SelectedVertex) {
            const result = graph.current.getHalfApproach(ex4SelectedVertex)
            if (result)
                setEx4Result(result)
            setEx4SelectedVertex(null)
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

    function onUnionGraphClick() {
        // if(file1Json &&  file2Json){
        //     const newGraph =  graph.current.createFromUnion(file1Json, file2Json)
        //     if(newGraph){
        //         graph.current = newGraph
        //         setShouldRerender(true)
        //         setFile1Json(null)
        //         setFile2Json(null)
        //     }
        // }
        // else {
        //     alert('Загрузите файл')
        // }
        console.log('onUnionClick')
    }


    const [findComposesResult, setFindComposesResult] = useState<Array<Array<number>>>([[]])

    function onFindCompClick() {
        setFindComposesResult(graph.current.findComposes())
    }

    function getFindCompResultString() {
        let result = ''
        findComposesResult.forEach(el => {
            result += `[${el}],`
        })
        return result
    }


    const [ex28SelectedVertex, setEx28SelectedVertex] = useState<null | number>(null)
    const [ex28Result, setEx28Result] = useState<null | Map<number, number>>(null)

    function onGetShortestPathsClick() {
        if (ex28SelectedVertex) {
            setEx28Result(graph.current.getShortestPaths(ex28SelectedVertex))
        } else {
            alert('выберите вершину!')
        }
        setEx28SelectedVertex(null)
    }

    function getEx28ResultString() {
        let result = ''
        if (ex28Result) {
            ex28Result.forEach((el, key) => {
                result += `[${graph.current.getVertexName(key)}: ${el === Number.MAX_SAFE_INTEGER ? '∞' : el}]`
            })
        }
        return result
    }


    const [ex9aSelectedVertex1, setEx9aSelectedVertex1] = useState<number | null>(null)
    const [ex9aSelectedVertex2, setEx9aSelectedVertex2] = useState<number | null>(null)
    const [ex9MaxWeight, setEx9MaxWeight] = useState<number | null>(null)
    const [ex9aResult, setEx9aResult] = useState<null | Map<number, number>>(null)


    function getEx9aResult() {
        if (ex9aSelectedVertex1 && ex9aSelectedVertex2 && ex9MaxWeight) {
            setEx9aResult(graph.current.getShortestPaths(ex9aSelectedVertex1, {
                maxWeight: ex9MaxWeight,
                from: ex9aSelectedVertex1,
                to: ex9aSelectedVertex2
            }))
        } else {
            alert('Введены не все данные!')
        }
    }

    function getEx9aResultString(){
        if(ex9aSelectedVertex2 && ex9aResult && ex9MaxWeight){

            const toWeight = ex9aResult?.get(ex9aSelectedVertex2)
            if(toWeight && toWeight <= ex9MaxWeight){
                return `Да, минимальное расстояние = ${toWeight}`
            }
            else {
                return 'Нет'
            }
        }
        return ''

    }


    return (
        <div className={styles.task_group}>
            <TaskHeader content={'2. Список смежности Ia'} type={'taskHeader'}/>


            <div className={styles.item}>
                <TaskHeader content={'4) Вывести полустепень захода данной вершины орграфа.'}
                            type={'exHeader'}/>

                <div className={styles.item_input}>
                    <Select sx={{width: '100%'}} className={styles.input}
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

                    <Button className={styles.button} variant={'contained'}
                            onClick={onUnionGraphClick}>Выполнить</Button>
                </div>
                <div className={styles.item_output}>
                    <TextField className={styles.input} disabled={true}/>
                </div>

            </div>


            <TaskHeader content={'5. Обходы графа II'} type={'taskHeader'}/>

            <div className={styles.item}>
                <TaskHeader content={'6) Найти связные компоненты графа.'}
                            type={'exHeader'}/>

                <div className={styles.item_input}>
                    <Button className={styles.button} variant={'contained'} onClick={onFindCompClick}>Выполнить</Button>

                </div>


                <div className={styles.item_output}>
                    <TextField className={styles.input} disabled={true} value={getFindCompResultString()}/>
                </div>

            </div>


            <TaskHeader content={'5. Обходы графа II'} type={'taskHeader'}/>

            <div className={styles.item}>
                <TaskHeader content={'28) Вывести кратчайшие (по числу дуг) пути из вершины u во все остальные.'}
                            type={'exHeader'}/>

                <div className={styles.item_input}>
                    <Select sx={{width: '100%'}} className={styles.input}
                            onChange={e => setEx28SelectedVertex(Number(e.target.value))}
                    >
                        {vertex.map(el => <MenuItem value={el.id}>{el.name}</MenuItem>)}
                    </Select>
                    <Button className={styles.button} variant={'contained'}
                            onClick={onGetShortestPathsClick}>Выполнить</Button>

                </div>


                <div className={styles.item_output}>
                    <TextField className={styles.input} disabled={true} value={getEx28ResultString()}/>
                </div>

            </div>


            <TaskHeader content={'8. Веса IV а'} type={'taskHeader'}/>

            <div className={styles.item}>
                <TaskHeader
                    content={'1) Определить, существует ли путь длиной не более L между двумя заданными вершинами графа.(дейкстра)'}
                    type={'exHeader'}/>



                <div className={styles.item_input}>
                    <div className={styles.input}>
                        <Select sx={{width: '100%'}} className={styles.input}
                                onChange={e => setEx9aSelectedVertex1(Number(e.target.value))}
                        >
                            {vertex.map(el => <MenuItem value={el.id}>{el.name}</MenuItem>)}
                        </Select>
                        <Select sx={{width: '100%'}} className={styles.input}
                                onChange={e => setEx9aSelectedVertex2(Number(e.target.value))}
                        >
                            {vertex.map(el => <MenuItem value={el.id}>{el.name}</MenuItem>)}
                        </Select>
                        <TextField  className={styles.input} id="outlined-basic" variant="outlined" inputProps={{style: {padding: '2%'}}}
                                   value={ex9MaxWeight ?? ''} type={'number'}
                                   onChange={e => setEx9MaxWeight(Number(e.target.value))}/>


                    </div>

                    <Button className={styles.button} variant={'contained'}
                            onClick={getEx9aResult}>Выполнить</Button>
                </div>



                <div className={styles.item_output}>
                    <TextField className={styles.input} disabled={true} value={getEx9aResultString()}/>
                </div>

            </div>


        </div>
    )
}