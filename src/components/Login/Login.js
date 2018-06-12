import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

class Login extends Component {
    render() {
        return (
            <div className = 'Login'>
                <a href={process.env.REACT_APP_LOGIN}>
                    <button className={css(styles.button)}>Login</button>
                </a>
            </div> 
        )
    }
}

const overlock = {
    fontFamily: 'Overlock',
    fontStyle: 'normal',
    fontWeight: 'normal',
    src: "url('https://fonts.googleapis.com/css?family=Overlock') format('Overlock')"
  }
  
  const styles = StyleSheet.create({
    button: {
        margintop: 15,
        width: 175,
        height: 40,
        borderradius: 5,
        background: "white",
        fontsize: 20,
        fontfamily: [overlock, "sans-serif"],
      }
  });
  

export default Login;