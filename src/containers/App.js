import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Accommodation from "../components/Accommodation";
import MapComponent from "../components/MapComponent";

export default class App extends Component {
    render() {
        return (
            <Router>
                <div className="row">
                    <div className="col-4">
                        <Route path='/' component={Accommodation}>
                        </Route>
                    </div>
                    <div className="col-8" style={{padding: "5px,0px,0px,0px"}}>
                        <Route path="/accommodation/lat/:lat/long/:long"
                               component={MapComponent}/>
                    </div>
                </div>
            </Router>
        )
    }
}