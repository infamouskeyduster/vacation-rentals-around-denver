import React from 'react'

const Nav = (props) => {
  return(
    <nav className="nav-bar">
      <h1>Welcome Back {props.name}!</h1>
      <button>Sign Out</button>
    </nav>
  )
}



export default Nav;