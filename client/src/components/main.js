import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Integration from "./integrations"
import Contacts from "./contacts"
import Home from './home';

export default function Main () {
    return(<div>
        <Router>
            <Route exact path="/" component={Home} />
            <Route path="/integrations" component={Integration} />
            <Route path="/contacts" component={Contacts} />
        </Router>
    </div>)

}

