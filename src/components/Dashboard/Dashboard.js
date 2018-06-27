import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateUserSettings, prepResources, setResourceCount, setContactCount, setMeetingCount } from '../../ducks/reducer';

import NavBar from './../NavBar/NavBar';
import Resources from './../Resources/Resources';
import Progress from './Progress';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
  });

class Dashboard extends Component {

    constructor() {
        super()
            this.state = {
                userid: 0,
                avatar: '',
                username: '',
                email: '',
                resourceData: [],
                from: '0000-00-00',
                to: '0000-00-00',
                days: '7'
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

    updateDateRange(days){
        var d = new Date();
        var to = `${d.getFullYear()}-${('00'+(d.getMonth()+1)).slice(-2)}-${d.getDate()}`

        d.setDate(d.getDate()-days);
        var from = `${d.getFullYear()}-${('00'+(d.getMonth()+1)).slice(-2)}-${d.getDate()}`

        this.setState({
            from: from,
            to: to
        })
    }

    handleChange(days){
        this.setState({days: days})
        this.updateDateRange(days)
        this.getUserData()
    }

    render() {
        const { classes } = this.props;

        let { resources, resourceCount, contacts, contactCount, meetings, meetingCount } = this.props;

        let resourcesTogo = (resources * this.state.days) - resourceCount;
        if (resourcesTogo<0) { resourcesTogo = 0 }

        let contactsTogo = (contacts * this.state.days) - contactCount;
        if (contactsTogo<0) { contactsTogo = 0 }

        let meetingsTogo = (meetings * this.state.days) - meetingCount;
        if (meetingsTogo<0) { meetingsTogo = 0 }

        return (
            <div className='Dashboard'>
                <NavBar />

                <FormControl className={classes.formControl}>
                
                <NativeSelect
                    value={this.state.days}
                    onChange={e => this.handleChange(e.target.value)}
                    input={<Input name="days" id="days-native-helper" />}
                >
                    <option value={7}>Last 7 days</option>
                    <option value={14}>Last 14 days</option>
                    <option value={30}>Last 30 days</option>
                    <option value={45}>Last 45 days</option>
                    <option value={60}>Last 60 days</option>
                    <option value={120}>Last 120 days</option>
                </NativeSelect>
                <FormHelperText>Select the number of days to show your progress towards your goals</FormHelperText>
                </FormControl>
                
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

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
  };

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
export default withStyles(styles)(connect(MapStateToProps, { updateUserSettings, prepResources, setResourceCount, setContactCount, setMeetingCount })(Dashboard));