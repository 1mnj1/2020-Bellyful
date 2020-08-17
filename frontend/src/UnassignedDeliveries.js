import React from "react"
import $ from 'jquery'


export default function UnassignedDeliveries (props) {
    // Auto tabble is passed a series of props: url and children
    //url is the url for the post eg localhost:3001/managers/getVolunteers
    //children is text - MAKE SURE IT IS NOT ANOTHER RENDERED COMPONENT

    const [state, setState] = React.useState({
        columns: [ {}, ],
        data: [ {}, ],
    });

    const setColumns = (colNames)=>{
        var columns = []; 
        colNames.forEach(element => columns.push({title: element, field: element}));
        return columns
    }
    
    console.log(props.url)

    //use effect copied from https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects
    React.useEffect(() => {
        
        $.post( props.url ,props.form,  function( returnable ) {
        if(returnable === null) return 
        if (returnable === undefined) return 
        if(returnable.length === 0) return 
        var fields = Object.keys(returnable[0])
        const cols = $(setColumns(fields))
        // console.log("VolunteersCols = ",cols)
        // console.log("VolunteersObj = ",returnable)
        
        // To use an encapsulated function, put a dollar in front of it (it just works ?!)
        $(setState(state => ({ ...state,columns:cols.toArray(), data : returnable})))
        // this.props.setLogged(true)
    });
    }, [props.url,props.form ]);

}

// export default UnassignedDeliveries


class UnassignedDeliveries extends React.Component {
    
    constructor() {
        super();
        this.state = {
            loading: false,
            deliveryData: {},
        }
    }

    componentDidMount() {
        this.setState({loading: true})

        var url = "http://"+window.location.hostname+":3000/manager/getVolunteers";
        console.log(url)
        fetch(url)
        .then((response)=>response.json())
        .then((data)=> {
            this.setState({
                loading: false,
                deliveryData: data
            });
        });
    }

    return(

        <>
        <Collapsible trigger = {props.title}
        transitionTime={100} 
        triggerClassName = 'CustomTriggerCSS--open'
        triggerOpenedClassName = 'CustomTriggerCSS'>
            <MaterialTable
            title= {null}
            columns={state.columns}
            data={state.data}
            icons={tableIcons}
            // detailPanel = {rowData => {
            //   return(
            //     <Paper>
            //       Hello World
            //     </Paper>
            //   )
            // }}
            actions = {props.showAdder?[  //Add actions to rows and to toolbar
              {
                icon: () => <AddBox/>,
                tooltip: 'Add Volunteer',
                isFreeAction: true,   //This means it will be row independent and hover in the toolbar
                //When clicked, Open a drawer to display a form to add a volunteer
                onClick : openModal
              }
            ] : null}
          />
          </Collapsible>
          {props.showAdder?(
          <NormalDrawer anchor = 'right' closeOnDocumentClick onClose = {closeModal} open = {modalState.open}>
            {props.children}
          </NormalDrawer>) :null }
        </>
        )

    
    
    // render() {
    //     const text = this.state.loading ? "loading..." : this.state.deliveryData.email
    //     return (
    //         <div>
    //             <p>{text}</p>
    //         </div>
    //     );
    // }

}

// export default UnassignedDeliveries
