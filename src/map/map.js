import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';


class ExampleMap extends Component {
  static defaultProps = {
    center: {
      lat: 25.76,
      lng: -80.19
    },
    zoom: 10,
    
  }
  state = {
    map: null,
    maps: null
  }

componentDidUpdate(prevProps, prevState){
 
}
handleGoogleMapApi(map, maps) {
    // console.log(maps);
    //const map = google.map
    //console.log(this.state.map);return;
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
        strokeWeight: 5,
        clickable: false,
        editable: true,
        zIndex: 1,
        draggable: true
      },
      polygonOptions: {
        fillColor: '#FF0000',
        fillOpacity: 0.2,
        strokeWeight: 5,
        clickable: false,
        editable: true,
        zIndex: 1,
        draggable: true
      }
    });
    drawingManager.setMap(map);
    // console.log(maps);

    maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
      if (event.type === 'circle') {
        var radius = event.overlay.getRadius();
        // maps.event.addListener(event.type, 'radius_changed', function(event) {
        //   console.log(event.overlay.getRadius());
        // });
      }
      else{
        var poly = (event.overlay.getPaths())
      }
    // console.log(event
    console.log(radius)
    console.log(poly)
    });

    // maps.event.addListener(drawingManager, 'radius_changed', function(event) {
    //   console.log(event.overlay.getRadius());
    // });
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
        </GoogleMapReact>
      </div>
    );
  }
}

export default ExampleMap;