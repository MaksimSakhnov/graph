import {MutableRefObject} from "react";
import {Graph, VertexType} from "../graph/graph";

export type TaskOneProps = {
    graph: MutableRefObject<Graph>,
    vertex: VertexType[],
    setVertex: (arg: VertexType[])=>void
    shouldRerender: boolean
    setShouldRerender: (arg: boolean)=>void
}