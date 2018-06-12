import React, { Component } from 'react';

class Settings extends Component {
    constructor() {
    super()
        
        this.state = {
            numberPickerValue: 0
        }
    }

    updateNumberPicker(e){
        this.setState({numberPickerValue: e.value + '' })
    }


    render() {
        return (
            <div>
                <img src='' alt=""/>
                Email<input type='' className=''/>
                <hr />
                Goals
                <div className='settings-resources'>
                    <button type='' className=''>+</button>
                    <button type='' className=''>-</button>
                    Resources
                </div>
                <div className='settings-contacts'>
                    <button type='' className=''>+</button>
                    <button type='' className=''>-</button>
                    Contacts
                </div>
                <div className='setting-meetings'>
                    <button type='' className=''>+</button>
                    <button type='' className=''>-</button>
                    Meetings
                </div>
                
            </div> 
        )
    }
}

export default Settings