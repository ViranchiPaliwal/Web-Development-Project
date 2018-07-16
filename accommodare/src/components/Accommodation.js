import React from "react";
import {Link} from 'react-router-dom'
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    DirectionsRenderer,
} from "react-google-maps";
import {compose, withProps, lifecycle} from "recompose";

const {StandaloneSearchBox} = require("react-google-maps/lib/components/places/StandaloneSearchBox");

const PlacesWithStandaloneSearchBox = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{height: `100%`}}/>,
        containerElement: <div style={{height: `400px`}}/>,
    }),
    withScriptjs
)(props =>
    <div data-standalone-searchbox="">
        <StandaloneSearchBox
            ref={props.searchBoxMount}
        >
            <div className="input-group">
                <input
                    type="text"
                    placeholder="Insert your location"
                    className="form-control"
                />
                <div className="input-group-append">
                    <button onClick={props.addAccommodation} className="cm-add-button btn btn-primary float-right">
                        <i className="cm-add-icon fa fa-lg fa-plus"></i></button>
                </div>
            </div>
        </StandaloneSearchBox>
        <ul className='list-group'>
            {props.accomList.map((accom) =>
                <Link className="list-group-item list-group-item-action" key={accom[0].place_id}
                      to={`/accommodation/lat/${accom[0].geometry.location.lat()}/long/${accom[0].geometry.location.lng()}`}>
                    {accom[0].formatted_address}
                </Link>
            )}
        </ul>
    </div>
);

class Accommodation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            accomList: [],
            searchBox: {}
        };
        this.addAccommodation = this.addAccommodation.bind(this);
        this.searchBoxMount = this.searchBoxMount.bind(this);
    }

    addAccommodation() {
        const component = this
        const place = this.state.searchBox.getPlaces()
        let accomList = this.state.accomList.slice()
        accomList.push(place)
        this.setState({accomList: accomList})
    }


    searchBoxMount(ref) {
        this.setState({searchBox: ref})
    }

    render() {
        return (
            <PlacesWithStandaloneSearchBox
                accomList={this.state.accomList}
                searchBoxMount={this.searchBoxMount}
                addAccommodation={this.addAccommodation}
            />
        )
    }
}

export default Accommodation