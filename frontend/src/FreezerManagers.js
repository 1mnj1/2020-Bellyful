import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';



import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';



import $ from 'jquery'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

export default function FreezerManagers(props) {

    const [state, setState] = React.useState({
        columns: [ {}, ],
        data: [ {}, ],
    });
  
  
    console.log("before the get data request for freezer managers")
    console.log(props.url)
  
    //use effect copied from https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects
  
    // To get the data
    React.useEffect(() => {
        
        $.post( props.url, function(returnable) {
        if(returnable === null) return 
        if (returnable === undefined) return 
        if(returnable.length === 0) return 
  
        var fields = Object.keys(returnable[0])
        var values = Object.values(returnable[0])
        console.log('fields from object.keys', fields)
        console.log('values from object.values', values)
  
        console.log("before logging the columns for props", props.title)
        console.log("columns = ",fields)
        console.log("before logging the objects for props", props.title)
        console.log("deliveries = ",returnable)
        
        $(setState(state => ({ ...state,columns:fields, data : returnable})))
    });
    }, [props.url,props.title]);
  
  
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

//   return (
//     <div className={classes.root}>
//       <FormGroup row>
//         <FormControlLabel
//           control={
//             <Checkbox checked={dense} onChange={(event) => setDense(event.target.checked)} />
//           }
//           label="Enable dense"
//         />
//         <FormControlLabel
//           control={
//             <Checkbox
//               checked={secondary}
//               onChange={(event) => setSecondary(event.target.checked)}
//             />
//           }
//           label="Enable secondary text"
//         />
//       </FormGroup>
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={6}>
//           <Typography variant="h6" className={classes.title}>
//             Text only
//           </Typography>
//           <div className={classes.demo}>
//             <List dense={dense}>
//               {generate(
//                 <ListItem>
//                   <ListItemText
//                     primary="Single-line item"
//                     secondary={secondary ? 'Secondary text' : null}
//                   />
//                 </ListItem>,
//               )}
//             </List>
//           </div>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <Typography variant="h6" className={classes.title}>
//             Icon with text
//           </Typography>
//           <div className={classes.demo}>
//             <List dense={dense}>
//               {generate(
//                 <ListItem>
//                   <ListItemIcon>
//                     <FolderIcon />
//                   </ListItemIcon>
//                   <ListItemText
//                     primary="Single-line item"
//                     secondary={secondary ? 'Secondary text' : null}
//                   />
//                 </ListItem>,
//               )}
//             </List>
//           </div>
//         </Grid>
//       </Grid>
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={6}>
//           <Typography variant="h6" className={classes.title}>
//             Avatar with text
//           </Typography>
//           <div className={classes.demo}>
//             <List dense={dense}>
//               {generate(
//                 <ListItem>
//                   <ListItemAvatar>
//                     <Avatar>
//                       <FolderIcon />
//                     </Avatar>
//                   </ListItemAvatar>
//                   <ListItemText
//                     primary="Single-line item"
//                     secondary={secondary ? 'Secondary text' : null}
//                   />
//                 </ListItem>,
//               )}
//             </List>
//           </div>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <Typography variant="h6" className={classes.title}>
//             Avatar with text and icon
//           </Typography>
//           <div className={classes.demo}>
//             <List dense={dense}>
//               {generate(
//                 <ListItem>
//                   <ListItemAvatar>
//                     <Avatar>
//                       <FolderIcon />
//                     </Avatar>
//                   </ListItemAvatar>
//                   <ListItemText
//                     primary="Single-line item"
//                     secondary={secondary ? 'Secondary text' : null}
//                   />
//                   <ListItemSecondaryAction>
//                     <IconButton edge="end" aria-label="delete">
//                       <DeleteIcon />
//                     </IconButton>
//                   </ListItemSecondaryAction>
//                 </ListItem>,
//               )}
//             </List>
//           </div>
//         </Grid>
//       </Grid>
//     </div>
//   );

  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };



function setAlert() {
    return (<Alert severity="success">Thank you Joan</Alert>)
  }
  const createList = state.data.map((row) => {
    const value = row[state.columns[0]]
    console.log("Row: ",row, "Value: ", value)
    const labelId = `checkbox-list-label-${value}`;

    console.log("row 1: ", row[state.columns[0]])
    console.log("row 2: ", row[state.columns[1]])
    console.log("row 3: ", row[state.columns[2]])
    console.log("row 4: ", row[state.columns[3]])

    return (
      <div>
        <div>
          <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            
            <ListItemText
              primary={row[state.columns[0]]}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {row[state.columns[1]]}
                  </Typography>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                    style={{whiteSpace: 'pre-line'}}
                  >
                    <br/>{row[state.columns[2]]}
                  </Typography>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    style={{whiteSpace: 'pre-line'}} 
                  >
                  {/* the style whitespace property allows the use of the newline character */}
                  <br/> {row[state.columns[3]]} {row[state.columns[3]]>1? "Meals": "Meal"}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        </div>
        
      </div>
    );
  })
  return (
    <div style = {{overflowX: "hidden"}}>
      <h2>{props.title}</h2> 
    <List className={classes.root}>
      {createList}
    </List>

    <Button 
      variant="contained" 
      color="secondary" 
      onClick={setAlert}
    >
      I can do this!
    </Button>

    </div>
  );

}




