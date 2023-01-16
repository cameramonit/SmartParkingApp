import React, {useState} from "react";
import { Link } from 'react-router-dom';
import '../App.css';
import 'bulma/css/bulma.min.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function SelectTime(props){

    const [startDate, setStartDate] = useState(
        new Date().setHours(new Date().setMinutes(new Date(), 0), 9)
    );
    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);

        return currentDate.getTime() < selectedDate.getTime();
    };

    return (
        <div>
            <h2 class="title is-2 has-text-centered">Select Time</h2>
            <h2 class="title is-5 has-text-centered">Select Date</h2>
            <div class="column has-text-centered">
                <DatePicker className="picker"
                selected={startDate}
                onChange={(date) => {
                    setStartDate(date);
                    window.localStorage.setItem('date', date);
                    props.checkBooking();
                }}
                placeholderText="Click to select a date"
                minDate={new Date()}
                showDisabledMonthNavigation
                showTimeSelect
                timeIntervals={60}
                filterTime={filterPassedTime}
                dateFormat="MMMM d, yyyy h:mm aa"
                />

            <div class="column has-text-centered">
                <div class="select">
                    <select onChange={(e)=>{
                        window.localStorage.setItem('hour', e.target.value); // setHour hook gak bisa karena async
                        console.log("before checkbooking time: ", e.target.value);
                        props.checkBooking();
                        }}>
                        <option value="1">1 Hour</option>
                        <option value="2">2 Hour</option>
                        <option value="3">3 Hour</option>
                        <option value="4">4 Hour</option>
                        <option value="5">5 Hour</option>
                        <option value="6">6 Hour</option>
                    </select>
                </div>
            </div>
                
            </div>
            
            
        </div>
    );
}

export default SelectTime;