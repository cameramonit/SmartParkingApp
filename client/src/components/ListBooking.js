import React from "react";
import { Link } from 'react-router-dom';
import 'bulma/css/bulma.min.css';

function ListBooking(props) {
    
    const arrayTest = JSON.parse(window.localStorage.getItem('array'));

    return (
        <div>
            <table class="table is-fullwidth">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Area</th>
                        <th>Date In</th>
                        <th>Hour</th>
                    </tr>
                </thead>
                <tbody>
                {arrayTest.map((item, index) => {
                    return (
                    <tr>
                        <td>{index+1}.</td>
                        <td>{item[2]}</td>
                        <td>{item[0]}</td>
                        <td>{item[1]}</td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}

export default ListBooking;