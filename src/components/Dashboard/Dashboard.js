import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateUserSettings, prepResources, setResourceCount, setContactCount, setMeetingCount, setSearchRange } from '../../ducks/reducer';

import NavBar from './../NavBar/NavBar';
import Resources from './../Resources/Resources';
import Progress from './Progress';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Grid from '@material-ui/core/Grid'


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
    center: {
        justify: 'center'
    }
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
                days: 7,
                weeks: 1
            }
    }

    componentDidMount() {

        this.updateDateRange(this.props.weeks)
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
                email: email,
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
                
    }

    updateDateRange(weeks){
        var d = new Date();
        var to = `${d.getFullYear()}-${('00'+(d.getMonth()+1)).slice(-2)}-${d.getDate()}`

        d.setDate(d.getDate()-(weeks*7));
        var from = `${d.getFullYear()}-${('00'+(d.getMonth()+1)).slice(-2)}-${d.getDate()}`

        axios.get('/api/resources/count', {params: {from: from, to: to}})
            .then( results => {
                this.props.setResourceCount(parseInt(results.data.count,10))
            }).then(
                axios.get('/api/contacts/', {params: {from: from, to: to}})
                    .then( results => {
                        this.props.setContactCount(parseInt(results.data.count,10))
                })).then(
                    axios.get('/api/meetings/', {params: {from: from, to: to}})
                      .then( results => {
                           this.props.setMeetingCount(parseInt(results.data.count,10))
                    })).then(this.props.setSearchRange(from, to, weeks))
       
    }

    handleChange(weeks){
        this.updateDateRange(weeks)
        this.getUserData()
    }

    render() {

        const { classes } = this.props;

        let { resources, resourceCount, contacts, contactCount, meetings, meetingCount } = this.props;

        let resourcesTogo = (resources * this.props.weeks) - resourceCount;
        if (resourcesTogo<0) { resourcesTogo = 0 }

        let contactsTogo = (contacts * this.props.weeks) - contactCount;
        if (contactsTogo<0) { contactsTogo = 0 }

        let meetingsTogo = (meetings * this.props.weeks) - meetingCount;
        if (meetingsTogo<0) { meetingsTogo = 0 }

        return (
            <div className={classes.root}>
                <NavBar />

                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <FormControl className={classes.formControl}>
                        
                        <NativeSelect
                            value={this.props.weeks}
                            onChange={e => this.handleChange(e.target.value)}
                            input={<Input name="weeks" id="weeks-native-helper" />}
                        >
                            <option value={1}>Past week</option>
                            <option value={2}>Last 2 weeks</option>
                            <option value={4}>Last 4 weeks</option>
                            <option value={8}>Last 2 months</option>
                            <option value={24}>Last 6 months</option>
                        </NativeSelect>
                        <FormHelperText>Select the number of weeks to show your progress towards your goals</FormHelperText>
                        </FormControl>
                    </Grid>
                    
                    <Grid item xs={8} sm={4}>
                        <Progress 
                            header='Resources'
                            progress={this.props.resourceCount}
                            togo={resourcesTogo}
                        />
                    </Grid>

                    <Grid item xs={8} sm={4}>
                        <Progress 
                            header='Contacts'
                            progress={this.props.contactCount}
                            togo={contactsTogo}
                        />
                    </Grid>

                    <Grid item xs={8} sm={4}>
                        <Progress 
                            header='Meetings'
                            progress={this.props.meetingCount}
                            togo={meetingsTogo}
                        />
                    </Grid>
                    
                    <Resources resourceData={this.state.resourceData}/>

                </Grid>
            </div> 
        )
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
  };

function mapStateToProps(state){
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
        meetingCount: state.meetingCount,
        from: state.from,
        to: state.to,
        weeks: state.weeks
    });
}
export default withStyles(styles)(connect(mapStateToProps, { updateUserSettings, prepResources, setResourceCount, setContactCount, setMeetingCount, setSearchRange })(Dashboard));