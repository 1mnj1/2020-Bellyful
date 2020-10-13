import React from "react"
import Button from '@material-ui/core/Button';
import $ from 'jquery'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

var fullWidth = 100
const classes = makeStyles((theme) => ({
    root: {
      width: "100vw",
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
    console.log('Inside delivery detail function');
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

    
    return (
      <div style = {{overflowX: "hidden", paddingLeft: "1vw", paddingRight: "1vw", paddingBottom: "1vh" }}>
        <br/><br/>
        <form className = "Delivery_Detail">
            <div style = {{width : '100%'}}>
            
            
            <Button 
                className = {classes.button} 
                variant="contained"  
                onClick = {()=>{window.open("tel:+"+String(props.phone))}} 
                style = {{ width: mobileCheck() ? '30%'  : '36%', backgroundColor : '#2EB767', color : 'white', float : 'left', marginLeft : '10%', borderRadius: 8, fontWeight : 'bold', fontSize: '16px', height: '45px'}}
            >
                Call
            </Button> 
            <Button 
                className = {classes.button} 
                variant="contained"  
                onClick = {()=>{window.open("sms:+"+String(props.phone))}} 
                style = {{ width: mobileCheck() ? '30%'  : '36%', backgroundColor : '#3D90FA', color : 'white', float : 'right', marginRight : '10%', borderRadius: 8, fontWeight : 'bold', fontSize: '16px', height: '45px'}}
            >
                Text
            </Button> <br/> <br/>
            
            {props.outstanding ? 
            (<div>
                <br/>
                <Button 
                    variant="contained"  
                    onClick = {()=>updateDelState("Assigned")} 
                    style = {{ width: mobileCheck()?"80%":"90%", backgroundColor : '#CE92B9', color : 'white', margin : 'auto', borderRadius: 14, fontWeight : 'bold', textTransform: 'none', fontSize: '18px', height: '45px'}}
                >
                    Add to My Confirmed Deliveries
                </Button> <br/> <br/> </div>): null}
                <Button 
                    className = {classes.button} 
                    variant="contained"  
                    onClick = {()=>updateDelState("Rejected by Recipient")} 
                    style = {{ width: mobileCheck()?"80%":"90%", backgroundColor : '#CE92B9', color : 'white', margin : 'auto', borderRadius: 14, fontWeight : 'bold', textTransform: 'none', fontSize: '20px', height: '45px'}}
                >
                    Cancelled by recipient
                </Button>
                <br/> <br/>
                <Button 
                    className = {classes.button} 
                    variant="contained"  
                    onClick = {()=>updateDelState("Unassigned")} 
                    style = {{ width: mobileCheck() ? '80%'  : '90%', backgroundColor : '#F5F5F5', color : '#494648', margin : 'auto', borderRadius: 14, fontWeight : 'bold', textTransform: 'none', fontSize: '18px', border: '1px solid #959594', height: '45px'}}
                >
                    Can't do afterall
                </Button> <br/>
                <br/> <br/>
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
                <Button 
                    className = {classes.button} 
                    variant="contained"  
                    onClick = {updateNotes} 
                    style = {{ width: mobileCheck() ? '30%'  : '36%', backgroundColor : '#549DFC', color : 'white',  margin : 'auto', borderRadius: 6, fontWeight : 'bold', textTransform: 'none', fontSize: '16px', height: '45px'}}
                >
                    Save
                </Button>
            </div>
        </form>
      </div>
    );
}

