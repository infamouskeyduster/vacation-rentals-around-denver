import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      usePurpose: '',
    }
  }

  render() {
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
          <button onClick={this.validateUserInfo}>Submit</button>
        </form>
      </div>
    )
  }

  setUserInfo = (event) => {
    event.preventDefault();
    let targetedProperty = event.target.id;
    // if event.target.value is '' throw error otherwise this.setState

    this.setState({[targetedProperty] : event.target.value});
    console.log('state', this.state);
  };

  validateUserInfo = (event) => {
    event.preventDefault();
    return (
      this.state.username === '' ? alert('Username is invalid!') : null,
      this.state.email === '' ? alert('Email is invalid!') : null,
      this.state.usePurpose === ''? alert('You must choose a purpose for your visit!') : null
    )

  }
}

export default Login;
