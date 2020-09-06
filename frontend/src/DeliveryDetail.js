import React, { useState } from "react"
import Button from '@material-ui/core/Button';
import $ from 'jquery'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

var fullWidth = 100
const classes = makeStyles((theme) => ({
    root: {
      width: "100vw",
      
      // textAlign: "center",
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
        textAlign : "left"
    },
    textField: {
        marginBottom :theme.spacing(1),
      marginRight: theme.spacing(1),
      width: String(fullWidth/2)+'ch',
    },
    fullText: {
        marginBottom :theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '80vw',
    },
    threeQuarter:{
        marginBottom :theme.spacing(1),
        marginRight: theme.spacing(1),
        width: String(fullWidth/4*3)+'ch',
    }, 
    oneQuarter:{
        marginBottom :theme.spacing(1),
        marginRight: theme.spacing(1),
        width: String(fullWidth/4)+'ch',
    }, 
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        
      },
  }));



export default function DeliveryDetail (props) {

    const [state,setState] = React.useState({
        data : [{}],
        columns: [],
        notes : null,
        delTime: "2020-08-12T17:38"
    })
    
    //get the meals for this delivery
    React.useEffect(()=>{
        $.post("http://"+window.location.hostname+":3000/volunteer/getMealsForDelivery",[{"name":"delivery_id", "value":props.delivery_id}],(returnable)=>{
            // console.log("Meal Detials: ",returnable)
            if(returnable === null) return 
            if (returnable === undefined) return 
            if(returnable.length === 0) return  
            var fields = Object.keys(returnable[0])
            $(setState(state => ({ ...state,columns:fields, data : returnable})))
        })

    }, [props.delivery_id])
    React.useEffect(()=>{
        $.post("http://"+window.location.hostname+":3000/volunteer/getRefNotes",[{"name":"delivery_id", "value":props.delivery_id}],(returnable)=>{
            // console.log("Meal Detials: ",returnable)
            if(returnable === null) return 
            if (returnable === undefined) return 
            $(setState(state => ({ ...state,notes: returnable})))
        })

    }, [props.delivery_id])
    React.useEffect(()=>{
        $.post("http://"+window.location.hostname+":3000/volunteer/getDelTime",[{"name":"delivery_id", "value":props.delivery_id}],(returnable)=>{
            // console.log("Meal Detials: ",returnable)
            if(returnable === null) return 
            if (returnable === undefined) return 
            console.log("Time: ", returnable)
            var StrDate = String(returnable)
            
            console.log("New time: "+StrDate.slice(0,StrDate.length-8))
            $(setState(state => ({ ...state,delTime: StrDate.slice(0,StrDate.length-8)})))
        })

    }, [props.delivery_id])
    
    //render the meals, this returns a series of items
    const renderMeals = ()=>{
        return state.data.map((row)=>{
            return (

                <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                        >
                        <b> {row[state.columns[0]]}:   x {row[state.columns[1]]}</b><br/>
                        </Typography>     
                </React.Fragment> 
            ) 
        })               
    }
    const updateDelState = (data)=>{
        var formData = [
            {"name":"status", "value":data},
            {"name":"delivery_id", "value":props.delivery_id}
        ]
        var reload = (item)=>{props.reloadPage(props.delivery_id)}
        $.post("http://"+window.location.hostname+":3000/volunteer/updateDelState",formData,reload)
        
    }
    const updateNotes = () => {
        var formData = $("form.Delivery_Detail").serializeArray()
        formData.push({"name":"delivery_id", "value":props.delivery_id})
        $.post("http://"+window.location.hostname+":3000/volunteer/updateDelDeets",formData,(returnable)=>{
            console.log("Updated delivery details")
        })

    }
    const mobileCheck = function() {
        
        return window.screen.width < 620
      };

    const updateText = () =>{};


    
    
    return (
      <div style = {{overflowX: "hidden", textAlign : "left", paddingLeft: "1vw", paddingRight: "1vw", paddingBottom: "1vh" }}>
        <Grid container spacing = {3}>
            <Grid item xs = {mobileCheck()? 10 : 6} >
                <Paper className={classes.paper} >{renderMeals()}</Paper>
                {mobileCheck()?<Button variant="contained" style = {{marginTop: "4%",width: "80%" }} onClick = {() => props.setdeliveryID(props.delivery_id)}>Update Meals</Button>:null}
            </Grid>
           { mobileCheck()? null :<Grid item xs = {6}>
                <Button variant="contained" onClick = {() => props.setdeliveryID(props.delivery_id)}>Update Meals</Button>
            </Grid>}
        </Grid>
        <br/><br/>
        <form className = "Delivery_Detail">
            
            <TextField
              style = {{width: mobileCheck()?"80%":"92%"}}
              autoFocus = {true}
              id="Delivery Notes"
              label="Delivery Notes"
              name = "refNotes"
              defaultValue = {state.notes}
              multiline
              rows = "3"
              variant = "outlined"

              />
               <br/> <br/>
               <Button variant="contained"  onClick = {updateNotes} style = {{position: "relative" ,     width: mobileCheck()?"80%":"92%"}}>
                Update Notes
            </Button>
            <br/><br/>
            <Button variant="contained"  onClick = {()=>{window.open("tel:+"+String(props.phone))}} style = {{ width: mobileCheck()?"40%":"46%"}}>
                Call
            </Button> 
            <Button variant="contained"  onClick = {()=>{window.open("sms:+"+String(props.phone))}} style = {{width: mobileCheck()?"40%":"46%"}}>
                Text
            </Button> <br/> <br/>
            <TextField
                id="datetime-local"
                label="Est Delivery Time"
                type="datetime-local"
                
                className={classes.textField}
                InputLabelProps={{
                shrink: true,
                }}
                name = "DelTime"
                style = {{width: mobileCheck()?"80%":"92%"}}
                // 
                onChange = { (event)=>{
                    var target = event.target
                    if(target == null){return};
                    console.log(target.value);
                    setState(state => ({ ...state,delTime: target.value}))
                }}
                value={state.delTime}
            /><br/> <br/>
            {props.outstanding ? 
            (<div><Button variant="contained"  onClick = {()=>updateDelState("Assigned")} style = {{width: mobileCheck()?"80%":"92%"}}>
                Add to Confirmed Deliveries
            </Button> <br/> <br/> </div>): null}
            <Button variant="contained"  onClick = {()=>updateDelState("Rejected by Recipient")} style = {{width: mobileCheck()?"80%":"92%"}}>
                Cancelled by recipient
            </Button> <br/> <br/>
            <Button variant="contained"  onClick = {()=>updateDelState("Rejected by Branch")} style = {{width: mobileCheck()?"80%":"92%"}}>
                Cancelled by me
            </Button> <br/>

        </form>
      </div>
    );
}

