import React from "react"
import Button from '@material-ui/core/Button';
import $ from 'jquery'

 export default function DeliveryUndo(props){
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


    const updateDelState = (data) => {
        var formData = [
            {"name":"status", "value":data},
            {"name":"delivery_id", "value":props.delivery_id}
        ]
        var reload = (item)=>{props.reloadPage(props.delivery_id)}
        $.post(props.url,formData,reload)
        
    }

return (
<div>
    <Button 
        variant="contained"  
        onClick = {()=>updateDelState(props.status)} 
        style = {{ width: '100%', backgroundColor : '#F5F5F5', float : 'right', color : '#494648', margin : 'auto', borderRadius: 14, fontWeight : 'bold', textTransform: 'none', fontSize: '18px', border: '1px solid #959594', height: '45px'}}
    >
        Mark as undone
    </Button>
    
</div> )
  

}