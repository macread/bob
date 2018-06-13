import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { updateEmail, increment, decrement, settingsDoneEditing } from '../../ducks/reducer';


class Settings extends Component {
    constructor() {
    super()
        
        this.state = {
            edit: false
        }

    }
 
    updateUserSettings(){
        let {  email, resources, contacts, meetings } = this.props;
        axios.post('/api/user',
        {email: email,
            resources: resources,
            contacts: contacts,
            meetings: meetings
        });
        this.props.settingsDoneEditing();
    }

    updateEmail(val){
        this.props.updateEmail(val)
    }

    increment(type){
       this.props.increment(type)
    }

    decrement(type){
        this.props.decrement(type)
    }

    render() {
        return (
            <div>
                Email<input value={this.props.email} type='' className='' onChange={ ( e ) => this.updateEmail( e.target.value ) }/>
                <hr />
                Goals
                <div className='settings-resources'>
                    {this.props.resources}
                    <button name='incResources' type='' className='' onClick={() => this.increment('resource')}>+</button>
                    <button type='decResources' className='' onClick={() => this.decrement('resource')}>-</button>
                    Resources
                </div>
                <div className='settings-contacts'>
                    {this.props.contacts}
                    <button type='' className='' onClick={() => this.increment('contact')}>+</button>
                    <button type='' className='' onClick={() => this.decrement('contact')}>-</button>
                    Contacts
                </div>
                <div className='setting-meetings'>
                    {this.props.meetings}
                    <button type='' className='' onClick={() => this.increment('meeting')}>+</button>
                    <button type='' className='' onClick={() => this.decrement('meeting')}>-</button>
                    Meetings
                </div>
                <div>
                    <button>Cancel</button>
                    <button onClick={()=>this.updateUserSettings()}>Save</button>
                </div> 
            </div> 
        )
    }
}

function MapStateToProps(state){
    return {
        userid: state.userid,
        avatar: state.avatar,
        username: state.username,
        email: state.email,
        resources: state.resources,
        contacts: state.contacts,
        meetings: state.meetings
    }
}

export default connect(MapStateToProps, { updateEmail, increment, decrement, settingsDoneEditing })(Settings)