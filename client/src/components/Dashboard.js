import React from "react";
import 'bulma/css/bulma.min.css';
import '../App.css';

function Dashboard(props){

    function placeClick(){
        // props.getBooking(); ini dipindah ke useeffect app.js, nanti baliki ke sini jika ada error buat trigger
        props.setPage(2);
        window.localStorage.setItem('hour', "1");
    }

    return(
        <div>
            <h2 class="title is-2 has-text-centered pt-4">Find Your Parking Space</h2>
            <div class="columns is-centered">
                <button class="button is-primary" onClick={()=>props.popBooking()}>Pop Booking Log</button>
            </div>
            <div>
                <h3 class="title is-3 py-5 pl-4">Nearby Space</h3>
            </div>
            <div className="card" class="card mx-4" onClick={()=>placeClick()}>
                <div class="card-content">
                    <div class="media">
                        <div class="media-left">
                            <figure class="image is-128x128 is-square" >
                                <img src="https://www.wisataidn.com/wp-content/uploads/2020/07/Cihampelas-Walk-750x450.jpg" alt="Placeholder image"/>
                            </figure>
                        </div>
                        <div class="media-content">
                            <p class="title is-3">Ciwalk Mall</p>
                            <p class="subtitle is-5">Jl. Cihampelas Walk No.1, Cipaganti, Kecamatan Coblong, Kota Bandung, Jawa Barat 40131</p>
                            <p class="subtitle is-5">Price: $5/hour</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default Dashboard;