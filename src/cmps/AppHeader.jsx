import React from 'react'
import { connect, useSelector } from "react-redux";
import { Link, NavLink, withRouter,useNavigate } from "react-router-dom";


 export function AppHeader(props) {
    const navigate = useNavigate()
    const loggedInUser = useSelector((storeState) => {
        // console.log(storeState);
        return storeState.userModule.loggedInUser
    })

    function onBack() {
        navigate(-1)
    }

    const { name, coins } = loggedInUser
    return (
        <header className="app-header">
            <section className="container">
            <NavLink to="/signup" > 

            <h1 className="logo">MisterBit</h1>
            </NavLink>
                {/* <h1 className="logo">Contacts</h1> */}
                <section className="back">
                    <p>Name: {name}</p>
                    <p>balance: {coins}</p>
                    <button onClick={onBack} >Back</button>
                </section>
                <nav>
                    <NavLink to="/signup" >Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/statistic">Statistic</NavLink>
                    <NavLink to="/contact">Contacts</NavLink>
                </nav>
            </section>
        </header>
    )
}