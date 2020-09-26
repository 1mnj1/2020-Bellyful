import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import $ from "jquery"
import { Grid } from '@material-ui/core';
useStyles = makeStyles((theme)=> ({
    padding : {
        padding : '2vh',
    },
    rows : {
        padding : '10px',
        backgroundColor : 'SlateGrey',

    }
}));


function ListFreezerStock(props){

    const [state,useState] = React.useState([])
    const update = 1
    React.useEffect(()=>{
        $.post( "http://"+window.location.hostname+":3000/dashboard/getManagerStockLevels", 
        function(returnable) {
            $(setState(returnable))
        })

    }, [update])
    const createMapping = ()=>{
        var currentID = -1
        var writeHeader = true
        
        var newState = {}
        for (var i = 0; i < state.length; ++i){
            if(!(state[i].name in newState )){
                newState[state[i].name] = []
            }
            newState[state[i].name].push([state[i].mealType, state[i].cnt])

            
        }
        console.log("New Object: ", newState)
        


    }
    createMapping()
    

    return(
        <div>

        </div>
    )
}

export default ListFreezerStock;