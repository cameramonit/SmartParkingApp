import React, {useState} from "react";
import 'bulma/css/bulma.min.css';
import '../App.css';

function BookingDetails(){

    return(
        <div>
            <h2 class="title is-2 has-text-centered">Booking Details</h2>
            <h2 class="title is-5 has-text-centered">A{window.localStorage.getItem('index')}</h2>
        </div>
    );
}

export default BookingDetails;