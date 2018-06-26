import React, { Component } from 'react';
import axios from 'axios';
import Settings from '../Settings/Settings';
import { connect } from 'react-redux';
import { updateUserSettings, prepResources, setResourceCount, setContactCount, setMeetingCount } from '../../ducks/reducer';

import NavBar from './../NavBar/NavBar';
import Resources from './../Resources/Resources';
import Progress from './Progress';


class Dashboard extends Component {

    constructor() {
        super()
            this.state = {
                userid: 0,
                avatar: '',
                username: '',
                email: '',
                resourceData: [],
                from: '2018-06-18',
                to: '2018-06-24'
            }
    }

    componentDidMount() {
        if (this.state.userid === 0){
            this.getUserData();
        }
        
    }

    getUserData() {
 
    axios.get('/api/resources/count', {params: {from: this.state.from, to: this.state.to}})
            .then( results => {
                this.props.setResourceCount(parseInt(results.data.count,10))
        }).then(
            axios.get('/api/contacts/', {params: {from: this.state.from, to: this.state.to}})
                .then( results => {
                    this.props.setContactCount(parseInt(results.data.count,10))
            })).then(
                axios.get('/api/meetings/', {params: {from: this.state.from, to: this.state.to}})
                    .then( results => {
                        this.props.setMeetingCount(parseInt(results.data.count,10))
                })).then(
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
                }).then(axios.get('/api/resources').then( results => {
                    this.props.prepResources(results.data)
                        }))
            
            );
    }

    render() {
        let { resources, resourceCount, contacts, contactCount, meetings, meetingCount } = this.props;

        let resourcesTogo = resources - resourceCount;
        if (resourcesTogo<0) { resourcesTogo = 0 }

        let contactsTogo = contacts - contactCount;
        if (contactsTogo<0) { contactsTogo = 0 }

        let meetingsTogo = meetings - meetingCount;
        if (meetingsTogo<0) { meetingsTogo = 0 }

        return (
            <div className='Dashboard'>
                <NavBar />
                <img src={this.props.avatar} alt=""/>
                <p>{this.props.username}</p>  
                {/* { (!this.props.email || this.props.settingsEditing) ? <Settings /> : null }  */}
                
                <Progress 
                    header='Resources'
                    progress={this.props.resourceCount}
                    togo={resourcesTogo}
                />

                <Progress 
                    header='Contacts'
                    progress={this.props.contactCount}
                    togo={contactsTogo}
                />

                <Progress 
                    header='Meetings'
                    progress={this.props.meetingCount}
                    togo={meetingsTogo}
                />

                

                <Resources resourceData={this.state.resourceData}/>
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
        settingsEditing: state.settingsEditing,
        resources: state.resources,
        resourceCount: state.resourceCount,
        contacts: state.contacts,
        contactCount: state.contactCount,
        meetings: state.meetings,
        meetingCount: state.meetingCount
    });
}
export default connect(MapStateToProps, { updateUserSettings, prepResources, setResourceCount, setContactCount, setMeetingCount })(Dashboard);