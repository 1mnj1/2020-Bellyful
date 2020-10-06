import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import $ from "jquery"
import { Grid } from '@material-ui/core';


function ListFreezerStock(props){

    const [state,setState] = React.useState([])
    var update = 0
    React.useEffect(()=>{
        $.post( "http://"+window.location.hostname+":3000/dashboard/getManagerStockLevels", 
        function(returnable) {
            $(setState(returnable))
        })

    }, update)
    const createMapping = ()=>{
        var currentID = -1
        var writeHeader = true
        var originID = -1
        var newState = {}
        var headers = []
        var totals = {}
        for (var i = 0; i < state.length; ++i){
            if(!(state[i].id in newState )){
                newState[state[i].id] = []
                
            }
            if(!(state[i].mealType in totals)){
                totals[state[i].mealType] = 0
            }
            if(i==0){
                originID = state[i].id
            }
            if(originID == state[i].id){
                headers.push(state[i].mealType)
            }
            newState[state[i].id].push([state[i].name, state[i].mealType, state[i].cnt])
            totals[state[i].mealType] += state[i].cnt
            
        }
        console.log("New Object: ", newState)
        // New object: "Freezer ID", ["name", "stock name", "count"]
        
        const printTypes = ()=>{
            return (
                <Grid 
                container 
                spacing = {3}
                direction="row"
                justify="center"
                alignItems="center">
                <Grid item xs = {40} sm = {20} style = {{"width": "20%", backgroundColor: "#f1f1f1"}}>Manager</Grid>
                {   headers.map((row)=>{
                        return <Grid item style = {{"width": "20%", backgroundColor: "#f1f1f1"}} >{row}</Grid>
                    }) 
                }
                </Grid>


            )
        }
        const printTotals = ()=>{
            return (
                <Grid 
                container 
                spacing = {3}
                direction="row"
                justify="center"
                alignItems="center">
                <Grid item xs = {40} sm = {20} style = {{"width": "20%",backgroundColor : 'white'}}><b>Totals</b></Grid>
                {   
                Object.keys(totals).map((key)=>{
                    return <Grid item style = {{"width": "20%",backgroundColor : 'white'}} ><b>{totals[key]}</b></Grid>
                })
                
                }
                </Grid>


            )
        }
        
        var data = Object.keys(newState).map((key,indx)=>{
            console.log("Name: ",newState[key][0][0])
            const printRow = (row)=>{
                return (
                <Grid item style = {(indx%2==0)?{"width": "20%", backgroundColor: "#f1f1f1"  }:{"width": "20%",backgroundColor : 'white'  }}>
                    {row[2]}
                </Grid>)
            }
            var rowData = newState[key].map(printRow)
            var name = newState[key][0][0]
            return (
                <Grid 
                container 
                spacing = {3}
                direction="row"
                justify="center"
                alignItems="center">
                    <Grid item xs = {40} sm = {20} style = {(indx%2==0)?{"width": "20%", backgroundColor: "#f1f1f1"  }:{"width": "20%",backgroundColor : 'white'  }}>{name}</Grid>
                    {rowData}
                </Grid>
            )
        })
        console.log("Keys: " ,Object.keys(newState))
        return (
            <Grid style = {{backgroundColor : 'white'}}>
                {   printTypes()   }
                {printTotals()}
                {data}
            </Grid>
        )


    }
    
    

    return(
        <div style = {{width: "100%"}}>
            {createMapping()}
        </div>
    )
}

export default ListFreezerStock;