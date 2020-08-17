import React from "react"
import $ from 'jquery'

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 800,
    // textAlign: "center",
    backgroundColor: theme.palette.background.paper,
  },
}));


export default function UnassignedDeliveries (props) {

    const [state, setState] = React.useState({
        columns: [ {}, ],
        data: [ {}, ],
    });

    const setColumns = (colNames)=>{
        var columns = []; 
        colNames.forEach(element => columns.push({title: element, field: element}));
        return columns
    }
    
    console.log("before the get data request for deliveries")
    console.log(props.url)

    //use effect copied from https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects

    // To get the data
    React.useEffect(() => {
        
        $.post( props.url ,props.form,  function( returnable ) {
        if(returnable === null) return 
        if (returnable === undefined) return 
        if(returnable.length === 0) return 
        var fields = Object.keys(returnable[0])
        const cols = $(setColumns(fields))
        console.log("before logging the columns")
        console.log("VolunteersCols = ",cols)
        console.log("before logging the objects")
        console.log("VolunteersObj = ",returnable)
        
        // To use an encapsulated function, put a dollar in front of it (it just works ?!)
        $(setState(state => ({ ...state,columns:cols.toArray(), data : returnable})))
        // this.props.setLogged(true)
    });
    }, [props.url,props.form ]);






    // material list with checkboxes

    const classes = useStyles();
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
  
    return (
      <List className={classes.root}>
        {[0, 1, 2, 3].map((value) => {
          const labelId = `checkbox-list-label-${value}`;
  
          return (
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
              <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
              {/* the following line breaks the page */}
              <ListItemText id={labelId} primary={state.data.Volunteer} />

              {/* title= {null}
        columns={state.columns}
        data={state.data}
        icons={tableIcons} */}

              {/* <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="comments">
                  <CommentIcon />
                </IconButton>
              </ListItemSecondaryAction> */}
            </ListItem>
          );
        })}
      </List>
    );





    // return(

    //     <>
    //     <Collapsible trigger = {props.title}
    //     transitionTime={100} 
    //     triggerClassName = 'CustomTriggerCSS--open'
    //     triggerOpenedClassName = 'CustomTriggerCSS'>
    //         <MaterialTable
    //         title= {null}
    //         columns={state.columns}
    //         data={state.data}
    //         icons={tableIcons}
    //         // detailPanel = {rowData => {
    //         //   return(
    //         //     <Paper>
    //         //       Hello World
    //         //     </Paper>
    //         //   )
    //         // }}
    //         actions = {props.showAdder?[  //Add actions to rows and to toolbar
    //           {
    //             icon: () => <AddBox/>,
    //             tooltip: 'Add Volunteer',
    //             isFreeAction: true,   //This means it will be row independent and hover in the toolbar
    //             //When clicked, Open a drawer to display a form to add a volunteer
    //             onClick : openModal
    //           }
    //         ] : null}
    //       />
    //       </Collapsible>
    //       {props.showAdder?(
    //       <NormalDrawer anchor = 'right' closeOnDocumentClick onClose = {closeModal} open = {modalState.open}>
    //         {props.children}
    //       </NormalDrawer>) :null }
    //     </>
    //     )

}

// export default UnassignedDeliveries


// class UnassignedDeliveries extends React.Component {
    
//     constructor() {
//         super();
//         this.state = {
//             loading: false,
//             deliveryData: {},
//         }
//     }

//     componentDidMount() {
//         this.setState({loading: true})

//         var url = "http://"+window.location.hostname+":3000/manager/getDeliveries";
//         console.log(url)
//         fetch(url)
//         .then((response)=>response.json())
//         .then((data)=> {
//             this.setState({
//                 loading: false,
//                 deliveryData: data
//             });
//         });
//     }

   

    
    
    // render() {
    //     const text = this.state.loading ? "loading..." : this.state.deliveryData.email
    //     return (
    //         <div>
    //             <p>{text}</p>
    //         </div>
    //     );
    // }

// }

// export default UnassignedDeliveries




// export default function CheckboxList() {
//   const classes = useStyles();
//   const [checked, setChecked] = React.useState([0]);

//   const handleToggle = (value) => () => {
//     const currentIndex = checked.indexOf(value);
//     const newChecked = [...checked];

//     if (currentIndex === -1) {
//       newChecked.push(value);
//     } else {
//       newChecked.splice(currentIndex, 1);
//     }

//     setChecked(newChecked);
//   };

//   return (
//     <List className={classes.root}>
//       {[0, 1, 2, 3].map((value) => {
//         const labelId = `checkbox-list-label-${value}`;

//         return (
//           <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
//             <ListItemIcon>
//               <Checkbox
//                 edge="start"
//                 checked={checked.indexOf(value) !== -1}
//                 tabIndex={-1}
//                 disableRipple
//                 inputProps={{ 'aria-labelledby': labelId }}
//               />
//             </ListItemIcon>
//             <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
//             <ListItemSecondaryAction>
//               <IconButton edge="end" aria-label="comments">
//                 <CommentIcon />
//               </IconButton>
//             </ListItemSecondaryAction>
//           </ListItem>
//         );
//       })}
//     </List>
//   );
// }