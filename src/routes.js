import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import NavBar from './components/NavBar/NavBar';
import Settings from './components/Settings/Settings';
import ResourceDetail from './components/ResourceDetail/ResourceDetail';
import ContactDetail from './components/Contacts/ContactDetail';
import Networks from './components/Networks/Networks';
import NetworkDetail from './components/Networks/NetworkDetail';

export default (
    <Switch>
        <Route path = "/" component = { NavBar } exact />
        <Route path = "/dashboard" component = { Dashboard } />
        <Route path = "/settings" component = { Settings } />
        <Route path = "/resourcedetail" component = { ResourceDetail } />
        <Route path = "/contactdetail" component = { ContactDetail } />
        <Route path = "/networks" component = { Networks } />
        <Route path = "/networkdetail/:networkid" component = { NetworkDetail } />
    </Switch>
)