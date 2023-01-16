import React from "react";
import { Link } from 'react-router-dom';
import 'bulma/css/bulma.min.css';

function Navbar(props) {
    
    return (
        <nav class="navbar has-background-white" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a class="navbar-item" onClick={()=>window.location.reload()}>
                    <img src="https://cdn-icons-png.flaticon.com/512/235/235809.png" alt="" height="28"/>
                </a>
                <a class="navbar-item" onClick={()=>window.location.reload()}>
                    <p class="title is-4">Smart Parking App</p>
                </a>
                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarSmartParking">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            {props.isConnected &&
            <div id="navbarSmartParking" class="navbar-menu">
                <div class="navbar-end">
                    <a class="navbar-item" onClick={()=>props.setPage(5)}>
                        List Booking
                    </a>
                    <a class="navbar-item">
                        Setting
                    </a>
                    <div class="navbar-item">
                        <button class="button is-primary" onClick={props.onDisconnect}>Disconnect</button>
                    </div>
                </div>
            </div>}
        </nav>
    );
}

export default Navbar;