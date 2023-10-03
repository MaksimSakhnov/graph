import styles from './TaskOne.module.scss'
import {TaskOneProps} from "./TaskOne.type";
import {Button, MenuItem, Select, TextField, Typography} from "@mui/material";
import {TaskHeader} from "../TaskHeader/TaskHeader";
import {useState} from "react";


export function TaskOne({graph, vertex, setVertex}: TaskOneProps) {

    const [shouldRerender, setShouldRerender] = useState(true)
    const [ex1SelectedVertex, ex1SetSelectedVertex] = useState<null | number>(null)
    const [ex1Result, setEx1Result] = useState<null | Array<number>>(null)

    function on1ExClick() {
        if (ex1SelectedVertex) {
            setEx1Result(graph.current.getExitingVertexes(ex1SelectedVertex))
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

    function getEx3ResultString(){
        let result = ''
        if(ex3Result){
            ex3Result.forEach(el=>{
                result+= el.name + ': ' + el.count + ', '
            })
        }
        return result
    }

    return (
        <div className={styles.task_group}>
            <TaskHeader content={'2. Список смежности Ia'} type={'taskHeader'}/>
            <div className={styles.item}>
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

            </div>


            <div className={styles.item}>
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

            </div>

        </div>
    )
}