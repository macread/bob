import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Settings from './components/Settings/Settings'

export default (
    <Switch>
        <Route path = "/" component = { Login } exact />
        <Route path = "/dashboard" component = { Dashboard } />
        <Route path = "/settings" component = { Settings } />
    </Switch>
)