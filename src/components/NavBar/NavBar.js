import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { resetUserID } from '../../ducks/reducer'

import { updateEmail, increment, decrement, settingsDoneEditing } from '../../ducks/reducer';


import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import SubtractIcon from '@material-ui/icons/Remove';
import Divider from '@material-ui/core/Divider';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
};


class MenuAppBar extends React.Component {
  state = {
    auth: false,
    anchorEl: null,
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
    this.handleMenuClose()
  };

  handleDialogClose = () => {
    this.setState({ open: false });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleSettings = () => {
    this.props.history.push('/settings')
  };

  handleLogout = () => {
    this.props.resetUserID();
    axios.get('/api/logout').then(this.props.history.push('/'))
  };

  updateEmail(val){
    this.props.updateEmail(val)
  }

  increment(type){
    this.props.increment(type)
  }

  decrement(type){
     this.props.decrement(type)
  }

  updateUserSettings(){
    let {  email, resources, contacts, meetings } = this.props;
    axios.post('/api/user',
    {email: email,
        resources: resources,
        contacts: contacts,
        meetings: meetings
    }).then(this.props.settingsDoneEditing())
    .then(this.handleDialogClose)
}

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
 
            <Typography variant="title" color="inherit" className={classes.flex}>
              {process.env.REACT_APP_NAME}
            </Typography>
            {this.props.userid ?  (
              <div>
              
                <Chip
                  avatar={ <Avatar alt={this.props.username} src={this.props.avatar} className={classes.avatar} />}
                  label={this.props.username}
                  onClick={this.handleMenu}
                  className={classes.chip}
                />


                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleMenuClose}
                >
                  <MenuItem onClick={this.handleClickOpen}>Settings</MenuItem>
                  <MenuItem component={Link} to="/networks" >Network Connections</MenuItem>
                  <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            )
            :
              null
            }
          </Toolbar>
        </AppBar>

        {this.props.match.path==='/' ?
            (<div>
              <Button href={process.env.REACT_APP_LOGIN} variant="contained" color="secondary" className={classes.button}>
                Login
              </Button>
              <p></p>
              <Button color="primary" className={classes.button}>
                New User
              </Button>
            </div> )
          :
            ( null)
        }

        <Dialog
          open={this.state.open}
          onClose={this.handleDialogClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Settings</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter your email address. Next, select your goal for the 
              number of resources, contacts and meetings you would like to 
              accomplish each day during your job search.
            </DialogContentText>

            <TextField
              autoFocus
              value={this.props.email}
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              onChange={ ( e ) => this.updateEmail( e.target.value )}
            />


            <Divider />
            <DialogContentText>
                <Typography variant="display1">
                  {this.props.resources}
                </Typography>
            </DialogContentText>
            <Button variant="fab" mini color="primary" aria-label="add" className={classes.button}
                onClick={() => this.increment('resource')}>
              <AddIcon />
            </Button>
            <Button variant="fab" mini color="secondary" aria-label="add" className={classes.button}
                onClick={() => this.decrement('resource')}>
              <SubtractIcon />
            </Button>

            <Divider />
            <DialogContentText>
                <Typography variant="display1">
                  {this.props.contacts}
                </Typography>
            </DialogContentText>
            <Button variant="fab" mini color="primary" aria-label="add" className={classes.button}
                onClick={() => this.increment('contact')}>
              <AddIcon />
            </Button>
            <Button variant="fab" mini color="secondary" aria-label="add" className={classes.button}
                onClick={() => this.decrement('contact')}>
              <SubtractIcon />
            </Button>

            <Divider />
            <DialogContentText>
                <Typography variant="display1">
                  {this.props.meetings}
                </Typography>
            </DialogContentText>
            <Button variant="fab" mini color="primary" aria-label="add" className={classes.button}
                onClick={() => this.increment('meeting')}>
              <AddIcon />
            </Button>
            <Button variant="fab" mini color="secondary" aria-label="add" className={classes.button}
                onClick={() => this.decrement('meeting')}>
              <SubtractIcon />
            </Button>



          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={()=>this.updateUserSettings()} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>


      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state){
  return({
    userid: state.userid,
    username: state.username,
    avatar: state.avatar,
    email: state.email,
    resources: state.resources,
    contacts: state.contacts,
    meetings: state.meetings
  })
}

export default withStyles(styles)(withRouter((connect(mapStateToProps, { resetUserID,updateEmail, increment, decrement, settingsDoneEditing })(MenuAppBar))));