import React from "react"
import Button from '@material-ui/core/Button';
import $ from 'jquery'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


 export default function DeliveryStartStop(props){
    const [state,setState] = React.useState({
        estTime: null,
        start : null,
        end: null
    })
    React.useEffect(()=>{
        $.post("http://"+window.location.hostname+":3000/volunteer/getStartStop",[{"name":"delivery_id", "value":props.delivery_id}],(returnable)=>{
            // console.log("Meal Detials: ",returnable)
            if(returnable === null) return 
            if (returnable === undefined) return 
            console.log("Time: ", returnable)
            $(setState(state => ({ ...state,  start: returnable[0].start, end: returnable[0].end    })))
        })

    }, [props.delivery_id])
    const handleClick =  (event)=>{
      if( state.start == null ) {
        $.post("http://"+window.location.hostname+":3000/volunteer/setStart",[{"name":"delivery_id", "value":props.delivery_id}],(returnable)=>{
            // console.log("Meal Detials: ",returnable)
            if(returnable === null) return 
            if (returnable === undefined) return 
            console.log("Time: ", returnable)
            $(setState(state => ({ ...state, start: 1})))
        })
      } else {
        $.post("http://"+window.location.hostname+":3000/volunteer/setStop",[{"name":"delivery_id", "value":props.delivery_id}],(returnable)=>{
            // console.log("Meal Detials: ",returnable)
            if(returnable === null) return 
            if (returnable === undefined) return 
            console.log("Time: ", returnable)
            var StrDate = String(returnable)
            
            console.log("New time: "+StrDate.slice(0,StrDate.length-8))
            $(setState(state => ({ ...state, end: 1})))
        })
      }
      
      event.stopPropagation();
    }

return (
<div>
    <Button variant="contained"  onClick = {handleClick}  style = {props.nostyle ? {width: "40%"} :{width: "96%", marginLeft: "3vw"}} >
        {state.start == null ? "Start" : "Stop"}
    </Button> 
    
</div> )
  





}