import React, { Component } from 'react';
import axios from 'axios';
import Settings from '../Settings/Settings';
import { connect } from 'react-redux';
import { updateUserSettings } from '../../ducks/reducer';


class Dashboard extends Component {

    constructor() {
        super()
            this.state = {
                avatar: '',
                username: ''
            }
    }

    componentDidMount() {
        this.getUserData();
    }

    getUserData() {
        axios.get('/api/user/').then( results => {
            let { avatar, username, email, resources, contacts, meetings } = results.data[0];

            this.setState({ 
                avatar: avatar,
                username: username
            });
            
            this.props.updateUserSettings({
                avatar,
                username,
                email,
                resources,
                contacts,
                meetings
            });
        });

    }

    render() {
        return (
            <div className='Dashboard'>
                <img src={this.state.avatar} alt=""/>
                <p>{this.state.username}</p>  
                {this.state.email ? null : <Settings /> } 
            </div> 
        )
    }
}

function MapStateToProps(state){
    return({
        username: state.username,
        avatar: state.avatar
    });
}
export default connect(MapStateToProps, { updateUserSettings })(Dashboard);