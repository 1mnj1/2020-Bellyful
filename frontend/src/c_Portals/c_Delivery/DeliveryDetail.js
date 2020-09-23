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
    button : {
        margin : 'auto',
        width : '100%',
    }
  }));



export default function DeliveryDetail (props) {

    const [state,setState] = React.useState({
        data : [{}],
        columns: [],
        notes : null
    })
    
    
    React.useEffect(()=>{
        $.post("http://"+window.location.hostname+":3000/volunteer/getRefNotes",[{"name":"delivery_id", "value":props.delivery_id}],(returnable)=>{
            // console.log("Meal Detials: ",returnable)
            if(returnable === null) return 
            if (returnable === undefined) return 
            $(setState(state => ({ ...state,notes: returnable})))
        })

    }, [props.delivery_id])
    
    
    
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
      <div style = {{overflowX: "hidden", paddingLeft: "1vw", paddingRight: "1vw", paddingBottom: "1vh" }}>
        {/* <Grid container spacing = {3}>
            <Grid item xs = {mobileCheck()? 10 : 6} >
                <Paper className={classes.paper} >{renderMeals()}</Paper>
                 {mobileCheck()?<Button variant="contained" style = {{marginTop: "4%",width: "80%" }} onClick = {() => props.setdeliveryID(props.delivery_id)}>Update Meals</Button>:null}
            </Grid>
           { mobileCheck()? null :<Grid item xs = {6}>
                <Button variant="contained" onClick = {() => props.setdeliveryID(props.delivery_id)}>Update Meals</Button>
                
            </Grid>
        </Grid> */}
        <br/><br/>
        <form className = "Delivery_Detail">
            <div style = {{width : '100%'}}>
            <TextField
            InputLabelProps={{
                shrink: true,
              }}
              style = {{width : '90%', margin : 'auto', textAlign : 'left'}}
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
            <Button className = {classes.button} variant="contained"  onClick = {updateNotes} style = {{width: mobileCheck()?"80%":"92%", margin : 'auto'}}>
            Update Notes
            </Button>
            <br/><br/>
            <Button className = {classes.button} variant="contained"  onClick = {()=>{window.open("tel:+"+String(props.phone))}} style = {{ width: mobileCheck()?"30%":"36%", backgroundColor : '#6cff6c', color : 'white', float : 'left', marginLeft : '10%' }}>
                Call
            </Button> 
            <Button className = {classes.button} variant="contained"  onClick = {()=>{window.open("sms:+"+String(props.phone))}} style = {{width: mobileCheck()?"30%":"36%", backgroundColor : '#6c7bff', color : 'white', float : 'right', marginRight : '10%'}}>
                Text
            </Button> <br/> <br/>
            
            {props.outstanding ? 
            (<div><Button className = {classes.button} variant="contained"  onClick = {()=>updateDelState("Assigned")} style = {{width: mobileCheck()?"80%":"92%", backgroundColor : '#c6589f', color : 'white'}}>
                Add to Confirmed Deliveries
            </Button> <br/> <br/> </div>): null}
            <Button className = {classes.button} variant="contained"  onClick = {()=>updateDelState("Rejected by Recipient")} style = {{width : mobileCheck() ? '80%':'90%'}}>
                Cancelled by recipient
            </Button> <br/> <br/>
            <Button className = {classes.button} variant="contained"  onClick = {()=>updateDelState("Unassigned")} style = {{width : mobileCheck() ? '80%':'90%'}}>
                I cant do this anymore
            </Button> <br/>
            </div>
        </form>
      </div>
    );
}

