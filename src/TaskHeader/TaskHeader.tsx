import {TaskHeaderProps} from "./TaskHeader.type";
import {Typography} from "@mui/material";


export function TaskHeader({content,type}: TaskHeaderProps){


    return(
        <Typography variant={type === 'taskHeader' ? 'h3' : 'h6'}>
            {content}
        </Typography>
    )
}