import React from 'react';
import {Link} from 'react-router-dom';

const Nav = (props) => {
  if(props.isLoggedIn === true) {
  return(
    <nav className="nav-bar">
      <h1>Welcome Back {props.user.name}!</h1>
      <p>Check out our listings for your {props.user.usePurpose} stay!</p>
      <Link to="/">
        <button onClick={props.changeLoginStatus}>Sign Out</button>
      </Link>
    </nav>
  )
  } else {
    return null
  }
}



export default Nav;