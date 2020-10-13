import React from "react"
import Button from '@material-ui/core/Button';
import $ from 'jquery'

 export default function DeliveryStartStop(props){
    const [state,setState] = React.useState({
        estTime: null,
        start : "0000-00-00 00:00:00",
        end: "0000-00-00 00:00:00"
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

    const handleClick = (event)=> {
      if( state.start == "0000-00-00 00:00:00" ) {
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
            $(props.reloadPage(props.delivery_id))
        })
      }
      
      event.stopPropagation();
    }


    function buttonColour () {
        return state.start == "0000-00-00 00:00:00" ? "#24A85B" : "#DD4A4E"
    }

return (
<div>
    <Button 
        variant="contained"  
        onClick = {handleClick}  
        style = {{ width: '100%', backgroundColor: buttonColour(), color : 'white', margin : 'auto', borderRadius: 12, fontWeight : 'bold', textTransform: 'none', fontSize: '16px'}}
    >
        {state.start == "0000-00-00 00:00:00" ? "Start" : "Stop"}
    </Button> 
    
</div> )
  

}