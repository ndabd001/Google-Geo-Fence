import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';

//need to make a button to save and delete overlays
//   find a way to make line 52 work. turn on the map; need to reference drawingManager and set it to map

//need to make listeners for overlay changes 
//    1 for circles 
//    1  for polygons

let geoFence = []; //json object
let vertices = [];
let fence = [];
let isDrawing = false;
let isComplete = false;


function clearOverlays() {
  for (var i = 0; i < fence.length; i++ ) {
    fence[i].setMap(null);
  }
  fence.length = 0;
}


class ExampleMap extends Component {
  static defaultProps = {
    center: {
      lat: 25.76,
      lng: -80.19
    },
    zoom: 10,
    geoFence: null,
    vertices: null,
    fence: null,
    // isDrawing: false,
    // isComplete: false
  }
  state = {
     map: null,
     maps: null,
     drawingManager: null,
     overlay: {
      type: null,
      info: null
      }
  }  

   saveGeoFence = () => {
      let overlay = this.state.overlay;
      this.setState({overlay});
    if (this.state.overlay.type === 'circle') {
        overlay.type = event.type;
        // console.log(event.overlay.type)
        // console.log('overlaycomplete circle', this.circle)
        var radius = event.overlay.getRadius();
        // console.log('radius = ', radius)
        var center = event.overlay.getCenter().toString();
        // console.log(radius)
        // console.log(center)
        overlay.info = {
          radius: radius,
          coord: {center}
        }
        // geoFence.push(circle)
        // console.log('overlay is', that.state);
        // console.log('geoFence is', geoFence)
      }
      else{
        overlay.type = event.type;
        var poly = event.overlay.getPath()
        // console.log(poly)
        // console.log(event.overlay);
        for (var i =0; i < poly.getLength(); i++) {
          var xy = poly.getAt(i);
          // console.log(i)
          // console.log({lat:xy.lat(),lng:xy.lng()})
          var vertex = {lat:xy.lat(),lng:xy.lng()}
          vertices.push(vertex)
        }
        overlay.info = {
            Info: {vertices}
        }
      }
    console.log(this.state.overlay)

   }

  newGeoFence = () => {
    let map = this.state.map
    this.setState({map});
    let drawingManager = this.state.drawingManager;   

    if(this.state.overlay.info != null){
      drawingManager.setMap(map);
      clearOverlays()
      // that.setState({overlay: null})
      this.setState({ drawingManager });
    }

    // drawingManager.setMap(map);
    // this.setState({drawingManager});
    // console.log(this.overlay)
    console.log('hello')
  }

handleGoogleMapApi = (map, maps) => {
    let that = this;
    that.setState({map,maps});
    let drawingManager = new maps.drawing.DrawingManager({
      drawingMode: maps.drawing.OverlayType.CIRCLE,
      drawingControl: true,
      drawingControlOptions: {
        position: maps.ControlPosition.TOP_CENTER,
        drawingModes: ['circle', 'polygon']
      },
      circleOptions: {
        fillColor: '#FF0000',
        fillOpacity: 0.2,
        strokeWeight: 2,
        clickable: true,
        editable: true,
        zIndex: 1,
        draggable: true,
        geodesic: true
      },
      polygonOptions: {
        fillColor: '#FF0000',
        fillOpacity: 0.2,
        strokeWeight: 2,
        clickable: true,
        editable: true,
        zIndex: 1,
        draggable: true,
        geodesic: true
      },
    });
    drawingManager.setMap(map);
    that.setState({ drawingManager })
    
    maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
      let overlay = that.state.overlay;
      that.setState({overlay})

      drawingManager.setOptions({drawingMode: null});
      drawingManager.setOptions({map: null});

      fence.push(event.overlay);
      // console.log(fence) 
      if (event.type === 'circle') {
        overlay.type = event.type;
        // console.log(event.overlay.type)
        // console.log('overlaycomplete circle', this.circle)
        var radius = event.overlay.getRadius();
        // console.log('radius = ', radius)
        var center = event.overlay.getCenter().toString();
        // console.log(radius)
        // console.log(center)
        overlay.info = {
          radius: radius,
          coord: {center}
        }
        // geoFence.push(circle)
        // console.log('overlay is', that.state);
        // console.log('geoFence is', geoFence)
      }
      else{
        overlay.type = event.type;
        var poly = event.overlay.getPath()
        // console.log(poly)
        // console.log(event.overlay);
        for (var i =0; i < poly.getLength(); i++) {
          var xy = poly.getAt(i);
          // console.log(i)
          // console.log({lat:xy.lat(),lng:xy.lng()})
          var vertex = {lat:xy.lat(),lng:xy.lng()}
          vertices.push(vertex)
        }
        overlay.info = {
            Info: {vertices}
        }
      }

      // console.log(shapes)
    console.log(that.state)
    });

  }



  render() {

    const bootstrapURLKeys={
      key: 'AIzaSyBtdO5k6CRntAMJCF-H5uZjTCoSGX95cdk',
      libraries: ['drawing','places'].join(','),
    }

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}       
          bootstrapURLKeys={ bootstrapURLKeys }
          // center={  this.center }
          // zoom={ 10 }
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({map,maps})=>this.handleGoogleMapApi(map,maps) }
        >     
        <button onClick={this.saveGeoFence}> Save GF </button>
        <button onClick={this.newGeoFence}
        // map={this.state.map}
        // overlay={this.state.overlay}
        // drawingManager={this.state.drawingManager}
        > New GF</button>
        </GoogleMapReact>
      </div>
    );
  }
}

export default ExampleMap;