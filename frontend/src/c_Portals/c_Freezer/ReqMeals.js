import React from 'react';
import Typography from '@material-ui/core/Typography';
import $ from 'jquery'

export default function AllReqMeals (props) {
    const [requiredMeals,setrequiredMeals ] = React.useState({
        data: [],
        columns: [],
        req_meals: "0"
    })

    React.useEffect(()=>{
    console.log("delivery_id: ", props.delivery_id)
    $.post("http://"+window.location.hostname+":3000/volunteer/getMealsRequired",[{"name":"delivery_id", "value":props.delivery_id}],(returnable)=>{
        // console.log("Meal Detials: ",returnable)
        if(returnable === null) return 
        if (returnable === undefined) return 
        var fields = Object.keys(returnable[0])
        $(setrequiredMeals(requiredMeals => ({ ...requiredMeals,columns:fields, data : returnable})))
    })
    

    }, [props.user_id])
    const renderMeals = (stateObject)=>{
    return stateObject.data.map((row)=>{
        
        return (
            
            <React.Fragment>
                    <Typography
                        component="span"
                        variant="body2"
                        style = {{"textAlign" : "left"}}
                        color="textPrimary"
                    >
                    <b> {row[stateObject.columns[0]]}:   x {row[stateObject.columns[1]]}</b><br/>
                    </Typography>     
            </React.Fragment> 
        ) 
    })               
    }
    return (
        <div>
            {renderMeals(requiredMeals)}
        </div>
    )
}
