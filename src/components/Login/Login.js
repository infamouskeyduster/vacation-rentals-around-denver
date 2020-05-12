import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: null,
      email: null,
      usePurpose: 'Other…',
    }
  }

  render() {
    return (
      <div>
        <form className='login-form'>
          <input onChange={this.setUserInfo} id='username' placeholder='username'></input>
          <input onChange={this.setUserInfo} id='email' placeholder='email'></input>
          <select value={this.state.usePurpose} onChange={this.setUserInfo} id="usePurpose" placeholder='purpose for travel'>
            <option value="null"></option>
            <option value="business">Business</option>
            <option value="vacation">Vacation</option>
            <option value="other">Other…</option>
          </select>
          <button onClick={this.set}>Submit</button>
        </form>
      </div>
    )
  }

  setUserInfo = (event) => {
    event.preventDefault();
    let targetedProperty = event.target.id;
    this.setState({[targetedProperty] : event.target.value});
    console.log('state', this.state);
  };
}

export default Login;
