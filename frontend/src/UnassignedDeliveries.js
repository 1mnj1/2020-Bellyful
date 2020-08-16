import React from "react"
import $ from 'jquery'

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

    // getData() {
    //     var url = "http://"+window.location.hostname+":3000/manager/getVolunteers";
    //     console.log(url)
    
    //     //use effect copied from https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects
    //     React.useEffect(() => {
    //         $.POST(url,  function(returnable) {
    //             console.log("VolunteersObj = ", returnable)
    //             // To use an encapsulated function, put a dollar in front of it (it just works ?!)
    //             $(setState(state => ({ ...state, deliveryData : returnable})))
        
    //             console.log("State Data = ", state.deliveryData)
            
    //             // this.props.setLogged(true)
    //         });
    //     }, [props.loggedIn ]);
    // }
    


    // componentDidMount(){
    //     fetch('http://localhost:5000')
    //     .then((Response)=>Response.json())
    //     .then((findresponse)=>
    //     {
    //         this.setState({
    //             data:findresponse,
    //         });
    //     });
    // }
    
    
    render() {
        const text = this.state.loading ? "loading..." : this.state.deliveryData.email
        return (
            <div>
                <p>{text}</p>
            </div>
        );
    }
}

export default UnassignedDeliveries