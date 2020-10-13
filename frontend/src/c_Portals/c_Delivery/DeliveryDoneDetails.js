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



export default function DeliveryDoneDetails (props) {
    console.log('Inside delivery detail function');
    const [state,setState] = React.useState({
        data : [{}],
        columns: [],
        notes : null,
        start : "00-00-00:000000",
        end : "00-00-00:000000",
    })
    const mobileCheck = function() {
        
        return window.screen.width < 620
      };
      const updateNotes = ()=>{
        //   '2020-09-15 14:07:43'
        //    2020-09-09 17:12:00
        var sendData = [
            {"name": "delivery_id", "value": props.delivery_id},
            {"name": "start", "value": state.start.replace('T', ' ')+":00"},
            {"name": "end", "value": state.end.replace('T', ' ')+":00"}
        ]
        $.post("http://"+window.location.hostname+":3000/volunteer/updateStartStop",sendData,(_)=>{
            console.log("Updated the start and stop times!")
          })
      }
      React.useEffect(()=>{
        $.post("http://"+window.location.hostname+":3000/volunteer/getDelTime",[{"name":"delivery_id", "value":props.delivery_id}],(returnable)=>{
            // console.log("Meal Detials: ",returnable)
            if(returnable === null) return 
            if (returnable === undefined) return 
            console.log("Times: ", returnable)
            var start = String(returnable[0])
            var end = String(returnable[1])
            console.log("Dates: ", new Date(start.slice(0,start.length-8)+"+12:00"))
            
            console.log("New time: "+start.slice(0,start.length-8))
            $(setState(state => ({ ...state,start: start.slice(0,start.length-8), end: end.slice(0,end.length-8)})))
        })

    }, [props.delivery_id])
    
    
    
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
                id="datetime-local"
                label="Start"
                type="datetime-local"
                
                className={classes.textField}
                InputLabelProps={{
                shrink: true,
                }}
                name = "start"
                style = {{width: mobileCheck()?"80%":"92%"}}
                // 
                onChange = { (event)=>{
                    var target = event.target
                    if(target == null){return};
                    console.log(target.value);
                    setState(state => ({ ...state,start: target.value}))
                }}
                value={state.start}
            />
            <TextField
                id="datetime-local"
                label="Stop"
                type="datetime-local"
                
                className={classes.textField}
                InputLabelProps={{
                shrink: true,
                }}
                name = "stop"
                style = {{width: mobileCheck()?"80%":"92%"}}
                // 
                onChange = { (event)=>{
                    var target = event.target
                    if(target == null){return};
                    console.log(target.value);
                    setState(state => ({ ...state,end: target.value}))
                }}
                value={state.end}
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

