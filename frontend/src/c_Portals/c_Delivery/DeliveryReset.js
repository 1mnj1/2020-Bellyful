import React from "react"
import Button from '@material-ui/core/Button';
import $ from 'jquery'

 export default function DeliveryReset(props){
   
    const resetTimeAndStatus = (event) => {

        console.log('inside resetTimeAndStatus')
        var sendData = [
            {"name": "delivery_id", "value": props.delivery_id},
            {"name": "start", "value": "0000-00-00 00:00:00"},
            {"name": "end", "value": "0000-00-00 00:00:00"},
            {"name": "status", "value": 2},
        ]
        
        $.post("http://"+window.location.hostname+":3000/volunteer/updateStartStopAndStatus",sendData,(_)=>{
            console.log("Updated the status!")
        })
        props.reloadPage(props.delivery_id)
        event.preventDefault();
        event.stopPropagation();
    }

return (
<div>
    <Button 
        variant="contained"  
        onClick = {resetTimeAndStatus} 
        style = {{ width: '100%', backgroundColor : '#F5F5F5', float : 'right', color : '#494648', margin : 'auto', borderRadius: 14, fontWeight : 'bold', textTransform: 'none', fontSize: '18px', border: '1px solid #959594', height: '45px'}}
    >
        Mark as incomplete
    </Button>
    
</div> )
  

}