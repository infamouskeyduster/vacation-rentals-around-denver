import React from 'react';
import {Link} from 'react-router-dom';

const Nav = (props) => {
  if(props.isLoggedIn === true) {
  return(
    <nav className="nav-bar">
      <div className="nav-greeting">
        <h1>Welcome Back {props.user.user}!</h1>
        <p>Check out our listings for your {props.user.usePurpose} stay!</p>
      </div>
      <div className="nav-buttons">
        <Link to="/">
          <button onClick={props.changeLoginStatus}>Sign Out</button>
        </Link>
        <Link to="/favorites">
          <button>View My {props.favoriteCount} Favorites!</button>
        </Link>
      </div>
    </nav>
    )
  } else {
    return null
  }
}



export default Nav;
