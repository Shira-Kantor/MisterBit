import React, { Component } from 'react'
import { SignupPage } from './SignupPage'
import { Link, NavLink } from 'react-router-dom'

export function HomePage() {
  
    return (
      <div>
        {/* <SignupPage/> */}
        <NavLink to="/signup">
            <button>👬 Sign up</button>
          </NavLink>
      </div>
    )
  }


export default HomePage