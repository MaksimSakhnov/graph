import {MutableRefObject} from "react";
import {Graph} from "../graph/graph";

export type TaskHeaderProps = {
    content: string;
    type: 'taskHeader' | 'exHeader'
}