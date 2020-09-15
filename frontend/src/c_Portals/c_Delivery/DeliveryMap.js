
import { withStyles, makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import $ from "jquery"
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"
import "mapbox-gl/dist/mapbox-gl.css";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function getData (requestData ,oldList, index, success ){
    // Create a request for each address. The address sends a get request and populates a list of the GPS coordinates. 
    var country = "nz"
    var url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+
    requestData[index]+"%20MA.json?country="+country+
    //token is defined at bottom
    "&access_token="+mapboxgl.accessToken
    $.get(url, (returnable)=>{
        var oldAddress = [...oldList]
        oldAddress.push(returnable.features[0].center)
        if(oldAddress.length < requestData.length){
            getData(requestData, oldAddress, index+1, success)
        } else {
            console.log("Success: ",oldAddress)
            // Success callback will jsut set an address table state.
            success(oldAddress)
        }
    })
}
// copied from https://material-ui.com/components/tables/
const useStyles = makeStyles({
    table: {
      
    },
  });
const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: "#6d6b6b",
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  const mobileCheck = function() {
        
    return window.screen.width < 620
  };
    const styles = {
      width:  mobileCheck()?"90%":"96vw",
      height: "60vh",
    };
    // end copy
    //Function to create a map and populate a table.
    function DeliveryMap (props) {
      
        const classes = useStyles();    
        const [mapObj, setMapObj] = useState({map:null});
        const [state,setState] = useState({
            //dummy data
            lng: 5,
            lat: 34,
            zoom: 2
            })
    //react use ref has an item called {ref}.current The map renders by setting the current to the map
      const mapContainer = useRef(null);
      useEffect(() => {
          //this is the access token for the map.
        //   Gotten by going to your account and clicking ADD TOKEN
        // https://account.mapbox.com/ - I (mathew) am using my own token, but if you make an acc u can use your own
        mapboxgl.accessToken = 'pk.eyJ1Ijoib2Rpbm1hdGhldyIsImEiOiJja2U0c3J6NTEwdzM2MnptcW8wODZhZmk1In0.QNb0iFCWQkDRwiK05h0DMw';  

        // Replace spaces with %20... dont ask me its just what I saw in the documentation
        var requestData = props.addressDetails.map(row=>{return row.address.replace(" ", "%20")})
        getData (requestData, [],0, (coOrdinates)=>{

            var coOrdinateString = ""
            for (var i = 0; i < coOrdinates.length; ++i){
                // When making the coordiante strings, commas become %2C and new coordinates begin with %3b (AS PER THEIR DOCUMENTATION)
                coOrdinateString = coOrdinateString + coOrdinates[i][0]+"%2C"+String(coOrdinates[i][1])+(i==coOrdinates.length-1?"":"%3B" )
            }
            // Example string:
            // 174.708175%2C-36.759713%3B174.709012%2C-36.758536
            console.log(coOrdinateString)
            // API call for driving polygon (layer on the map which shows the persons route)
            var url = "https://api.mapbox.com/directions/v5/mapbox/driving/"+coOrdinateString+
            "?alternatives=true&geometries=geojson&steps=true&access_token="+mapboxgl.accessToken
            $.get(url, (json)=>{
                console.log(json)
                // Documentation on: https://docs.mapbox.com/help/how-mapbox-works/directions/
                var data = json.routes[0];
                // This is a series of points. Every time there is a curve in the road another point is created (can be quite big?)
                var route = data.geometry.coordinates;
                // Create GEO json object
                // https://docs.mapbox.com/mapbox-gl-js/example/geojson-markers/

                var geojson = {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                      type: 'LineString',
                      coordinates: route
                    }
                  }
                //   Function to create and render the map
                const initializeMap = ({ setMapObj, mapContainer }) => {
                    // Create the map, point it to the start coordinates and set the tilt/zoom level 
                    // Bigger zoom = longer initial loading time - tiles are loaded at 2^(zoomlevel)-1
                    var map = null
                try {
                   map = new mapboxgl.Map({
                      container: mapContainer.current,
                      style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
                      center: [coOrdinates[0][0], coOrdinates[0][1]],
                      zoom: 16,
                      pitch : 45
                  });
                } catch (e){
                  console.log(e)
                  return
                }
            
                // When the user clicks and moves, set state to the new move
                map.on('move', (e) => {
                        
                        setState({
                        lng: map.getCenter().lng.toFixed(4),
                        lat: map.getCenter().lat.toFixed(4),
                        zoom: map.getZoom().toFixed(2)
                        });
                    });
                    map.on("touchstart", (event)=>{
                      event.originalEvent.cancelBubble = true;
                    })
                    map.on("mousedown", (event)=>{
                      event.originalEvent.cancelBubble = true;
                    })
                    map.on("mousemove", (event)=>{
                      event.originalEvent.cancelBubble = true;
                    })
                    map.on("touchmove", (event)=>{
                      event.originalEvent.cancelBubble = true;
                    })
                    // When the map has rendered
                    map.on("load", () => {
                        // Put the route layer on top of it
                        if (map.getSource('route')) {
                            map.getSource('route').setData(geojson);
                          } else { // otherwise, make a new request
                            console.log("Creating layer: "+route)
                            map.addLayer({
                              id: 'route',
                              type: 'line',
                              source: {
                                type: 'geojson',
                                data: {
                                  type: 'Feature',
                                  properties: {},
                                  geometry: {
                                    type: 'LineString',
                                    coordinates: route
                                  }
                                }
                              },
                              layout: {
                                'line-join': 'round',
                                'line-cap': 'round'
                              },
                              paint: {
                                'line-color': '#3887be',
                                'line-width': 5,
                                'line-opacity': 1
                              }
                            });
                          }
                        //   ... and create the route
                        setMapObj(mapObj=>({...mapObj, map: map}));
                    });
                    };  
                    if (!mapObj.map) initializeMap({ setMapObj, mapContainer });
                } )
            } )
        
    
        
      }, [mapObj]);

      useEffect(()=>{
          
      },[props.addressDetails] )
      return (<div style = {{width: "100vw",
        paddingTop: "1vh",
        paddingLeft: "3vw"}}>
                <div ref={el => (mapContainer.current = el)} style={styles} />
                <div style = {{ width: mobileCheck()?"90%": null, marginTop:"1%"}}>
                   <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell>Address</StyledTableCell>
                            <StyledTableCell>Type</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {props.addressDetails.map((row,index) => (
                            <StyledTableRow key={index}>
                            <StyledTableCell component="th" scope="row">
                                {row.address}
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                {row.type}
                            </StyledTableCell>
                            </StyledTableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                </div>
            </div>);
    };
    
    export default DeliveryMap;