import React from 'react';
import { NavLink } from 'react-router-dom';

const mainNavigation = (props) => {
    return (
        <header>
            <div className="main-navigation__logo">
                <h1>The navigation bar</h1>

            </div>
            <nav className="main-navigation__item">
                <ul>
                    <li><NavLink to="auth">Auth</NavLink></li>
                    <li><NavLink to="/events">Events</NavLink></li>
                    <li><NavLink to="/bookings">Bookings</NavLink></li>
                </ul>
            </nav>
        </header>
    );
}

export default mainNavigation;