import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { updateUserSettings } from '../../ducks/reducer';


class Settings extends Component {
    constructor() {
    super()
        
        this.state = {
            avatar: '',
            username: '',
            email: '',
            resources: 0,
            contacts: 0,
            meetings: 0,
            edit: false
        }

        this.increment = this.increment.bind(this);
    }

 
    updateUserSettings(){
        let { avatar, username, email, resources, contacts, meetings } = this.state;

        axios.post('/api/user',
        {email: email,
        resources: resources,
        contacts: contacts,
        meetings: meetings
        })

        this.props.updateUserSettings({
            avatar,
            username,
            email,
            resources,
            contacts,
            meetings
        });
    }

    updateEmail(val){
        this.setState({ email: val })
    }

    increment(type){
        switch (type){
            case 'resource':
                this.setState({ resources: this.state.resources + 1 })
                break;
            case 'contact':
                this.setState({ contacts: this.state.contacts + 1 })
                break;
            case 'meeting':
                this.setState({ meetings: this.state.meetings + 1 })
                break;
            default:
                break;
        }
    }

    decrement(type){
        switch (type){
            case 'resource':
                this.setState({ resources: this.state.resources - 1 })
                break;
            case 'contact':
                this.setState({ contacts: this.state.contacts - 1 })
                break;
            case 'meeting':
                this.setState({ meetings: this.state.meetings - 1 })
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <div>
                Email<input type='' className='' onChange={ ( e ) => this.updateEmail( e.target.value ) }/>
                <hr />
                Goals
                <div className='settings-resources'>
                    {this.state.resources}
                    <button name='incResources' type='' className='' onClick={() => this.increment('resource')}>+</button>
                    <button type='decResources' className='' onClick={() => this.decrement('resource')}>-</button>
                    Resources
                </div>
                <div className='settings-contacts'>
                    {this.state.contacts}
                    <button type='' className='' onClick={() => this.increment('contact')}>+</button>
                    <button type='' className='' onClick={() => this.decrement('contact')}>-</button>
                    Contacts
                </div>
                <div className='setting-meetings'>
                    {this.state.meetings}
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
        avatar: state.avatar,
        username: state.username,
        email: state.email,
        resources: state.resources,
        contacts: state.contacts,
        meetings: state.meetings
    }
}

export default connect(MapStateToProps, { updateUserSettings })(Settings)