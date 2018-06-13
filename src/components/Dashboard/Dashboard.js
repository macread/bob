import React, { Component } from 'react';
import axios from 'axios';
import Settings from '../Settings/Settings';
import { connect } from 'react-redux';
import { updateUserSettings } from '../../ducks/reducer';


class Dashboard extends Component {

    constructor() {
        super()
            this.state = {
                userid: 0,
                avatar: '',
                username: '',
                email: ''
            }
    }

    componentDidMount() {
        if (this.state.userid === 0){
            this.getUserData();
        }
        
    }

    getUserData() {
        axios.get('/api/user/').then( results => {
            let { id, avatar, username, email, resources, contacts, meetings } = results.data[0];

            this.setState({ 
                userid: id,
                avatar: avatar,
                username: username,
                email: email
            });
            
            this.props.updateUserSettings({
                id,
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
        userid: state.userid,
        username: state.username,
        avatar: state.avatar,
        email: state.email
    });
}
export default connect(MapStateToProps, { updateUserSettings })(Dashboard);