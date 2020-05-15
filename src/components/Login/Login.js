import React, { Component } from 'react';
import './Login.css';
import {Link} from 'react-router-dom';

class Login extends Component {
  constructor (props) {
    super(props);
      this.state = {
        username: '',
        email: '',
        usePurpose: '',
        formReady: false
    };
  }

  setUserInfo = (event) => {
    event.preventDefault();
    let targetedProperty = event.target.id;
  
    this.setState({ [targetedProperty]: event.target.value }, () => {
    this.validateUserInfo(event);
    });
  
  };


  validateUserInfo = (event) => {
    if (
        !this.state.username ||
        !this.state.email ||
        !this.state.usePurpose
      ) {
        // alert("All fields must be completed!")
        return;
        }
        this.setState({ formReady: true });
        this.props.setUserInfoOnParent({
          user: this.state.username,
          email: this.state.email,
          usePurpose: this.state.usePurpose
        })
  }

  render () {
    return (
      <div className='login-form-container'>
        <form className='login-form'>
          <input onChange={this.setUserInfo} id='username' placeholder='username'></input>
          <input onChange={this.setUserInfo} id='email' placeholder='email'></input>
          <select value={this.state.usePurpose} onChange={this.setUserInfo} id="usePurpose" placeholder='purpose for travel'>
             <option value="" disabled selected>Choose the purpose for your visit</option>
            <option value="business">Business</option>
            <option value="vacation">Vacation</option>
            <option value="other">Other…</option>
          </select>
          <Link to="/Areas" >
          <button type='submit' onClick={this.props.changeLoginStatus} disabled={!this.state.formReady}>Submit
          </button>
          </Link>
        </form>
      </div>
    )
  }
}

export default Login;
