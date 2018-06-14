import React, { Component } from 'react';
import axios from 'axios';
import Settings from '../Settings/Settings';
import { connect } from 'react-redux';
import { updateUserSettings } from '../../ducks/reducer';
import NavBar from './../NavBar/NavBar';


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
                userid: id,
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
                <NavBar userid = {this.props.userid}/>
                <img src={this.props.avatar} alt=""/>
                <p>{this.props.username}</p>  
                { (!this.props.email || this.props.settingsEditing) ? <Settings /> : null } 
            </div> 
        )
    }
}

function MapStateToProps(state){
    return({
        userid: state.userid,
        username: state.username,
        avatar: state.avatar,
        email: state.email,
        settingsEditing: state.settingsEditing
    });
}
export default connect(MapStateToProps, { updateUserSettings })(Dashboard);