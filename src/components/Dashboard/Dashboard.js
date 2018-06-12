import React, { Component } from 'react';
import axios from 'axios';
import Settings from '../Settings/Settings';


class Dashboard extends Component {

    constructor() {
        super()
            
            this.state = {
                username: '',
                email: '',
                resources: 0,
                contacts: 0,
                meetings: 0
            }
    }

    componentDidMount() {
        this.getUserData();
    }

    getUserData() {
        axios.get('/api/user/').then( results => {
            let { username, email, resources, contacts, meetings} = results.data[0];
            this.setState({ 
                username: username,
                email: email,
                resouces: resources,
                contacts: contacts,
                meetings: meetings
            });
        });
    }

    render() {
        return (
            <div className='Dashboard'>
                Dashboard
                <p>{this.state.username}</p>  
                {this.state.email ? null : <Settings /> } 
            </div> 
        )
    }
}


export default Dashboard;