import _ from "lodash";
import React from "react";
import {compose, withProps} from "recompose";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from "react-google-maps";


const MyMapComponent = compose(
    withProps({
        googleMapURL:
            "https://maps.googleapis.com/maps/api/js?key=AIzaSyBbvm646H4Wm6ACz6ENl-y_a0TtCSssDxA&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{height: `100%`}}/>,
        containerElement: <div style={{height: `850px`}}/>,
        mapElement: <div style={{height: `100%`}}/>
    }),
    withScriptjs,
    withGoogleMap
)(props => (
    <GoogleMap defaultZoom={8} center={props.center}>
        <Marker position={props.center}/>
    </GoogleMap>
));

const enhance = _.identity;

class MapComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            center: 0
        };
    }

    componentWillReceiveProps(newProps) {
        this.setState({center: {lat: Number(newProps.match.params.lat), lng: Number(newProps.match.params.long)}});
    }

    componentDidMount() {
        const lat = Number(this.props.match.params.lat)
        const long = Number(this.props.match.params.long)
        this.setState({center: {lat: lat, lng: long}});

    }

    render() {
        return (
            <MyMapComponent
                center={this.state.center}
            />
        )
    }
}

export default MapComponent;