import React, {useEffect, useState} from "react";
import 'bulma/css/bulma.min.css';
import '../App.css';
import SelectTime from "./SelectTime";

function ChooseSpace(props){

    const [index, setIndex] = useState(0);
    const [floor, setFloor] = useState(0);
    const [arrayBooked, setArray] = useState([]);
    // const [hour, setHour] = useState("1");

    // let hour;

    // function changeHour(number){
    //     hour = number;
    // }

    function addHours(date, hours) {
        const dateCopy = new Date(date);
        dateCopy.setHours(dateCopy.getHours() + hours);
        return dateCopy;
    }

    function dateRangeOverlaps(b_s, b_e, a_s, a_e) {
        const a_start = new Date(a_s);
        const a_end = new Date(a_e);
        const b_start = new Date(b_s);
        const b_end = new Date(b_e);
        if (b_start <= a_start && a_start < b_end){
            console.log("a_starts in b");
            return true;
        }
        if (b_start < a_end && a_end <= b_end){
            console.log("a_ends in b");
            return true; // b ends in a
        }
        if (a_start < b_start && b_end < a_end){
            console.log("b in a");
            return true;
        }
        if (b_start < a_start && a_end < b_end){
            console.log("a in b");
            return true;
        }
        return false;
    }

    function checkBooking(){
        const hour = window.localStorage.getItem('hour')
        const input = window.localStorage.getItem('date');
        console.log("hour: ", hour);
        const lastInput = addHours(input, parseInt(hour));
        const array = JSON.parse(window.localStorage.getItem('array'));
        console.log("List total");
        let tempArray = []
        console.log("input: ", input);
        console.log("last input: ", lastInput);
        Array.from(array).forEach((i) => console.log(i));
        console.log("List yang sudah di booking");
        Array.from(array).forEach((i) => {
            const z = addHours(i[0], parseInt(i[1]))
            if (dateRangeOverlaps(input, lastInput, i[0], z)){
                console.log(i);
                tempArray.push(i[2]);
            }
        });
        setArray(tempArray);
        console.log("bookedArray", arrayBooked);
    }

    function saveIndex(index){
        window.localStorage.setItem('index', index);
        window.localStorage.setItem('floor', floor);
        props.setLoading(true);
        props.booking(index, window.localStorage.getItem('date'), window.localStorage.getItem('hour'));
        props.setPage(3);
    }

    function getFloor(){
        return floor;
    }

    return(
        <div>
            <SelectTime checkBooking={checkBooking}/>
            <h2 class="title is-2 has-text-centered">Choose Space</h2>
            {/* <div class="columns is-centered">
                <button class="button is-primary" onClick={()=>checkBooking()}>Get Booking Console Log</button>
            </div> */}
            <div class="tabs is-toggle is-toggle-rounded is-centered">
                <ul>
                    <li class={(getFloor()==0 || getFloor()==1) && "is-active"} onClick={()=>setFloor(1)}>
                        <a>Lantai 1</a>
                    </li>
                    <li class={(getFloor()==2) && "is-active"} onClick={()=>setFloor(2)}>
                        <a>Lantai 2</a>
                    </li>
                    <li class={(getFloor()==3) && "is-active"} onClick={()=>setFloor(3)}>
                        <a>Lantai 3</a>
                    </li>
                </ul>
            </div>
            
            <div class="columns is-centered py-6">
                <div class="colum">
                    {arrayBooked.includes("A1") ? <div class="space sold">A1</div> : 
                    <div class={index===1 ? "space selected":"space"} onClick={()=>setIndex(1)}>A1</div>
                    }
                    {arrayBooked.includes("A2") ? <div class="space sold">A2</div> : 
                    <div class={index===2 ? "space selected":"space"} onClick={()=>setIndex(2)}>A2</div>
                    }
                    {arrayBooked.includes("A3") ? <div class="space sold">A3</div> : 
                    <div class={index===3 ? "space selected":"space"} onClick={()=>setIndex(3)}>A3</div>
                    }
                </div>
                <div class="colum mr-5">
                    {arrayBooked.includes("A4") ? <div class="space sold">A4</div> : 
                    <div class={index===4 ? "space selected":"space"} onClick={()=>setIndex(4)}>A4</div>
                    }
                    {arrayBooked.includes("A5") ? <div class="space sold">A5</div> : 
                    <div class={index===5 ? "space selected":"space"} onClick={()=>setIndex(5)}>A5</div>
                    }
                    {arrayBooked.includes("A6") ? <div class="space sold">A6</div> : 
                    <div class={index===6 ? "space selected":"space"} onClick={()=>setIndex(6)}>A6</div>
                    }
                </div>
                <div class="colum">
                    <div class="space">B1</div>
                    <div class="space">B2</div>
                    <div class="space">B3</div>
                </div>
                <div class="colum">
                    <div class="space">B4</div>
                    <div class="space">B5</div>
                    <div class="space">B6</div>
                </div>
            </div>
            <div class="showcase columns is-centered">
                <div class="column is-2">
                    <div class="space"></div>
                    <small>Available</small>
                </div>
                <div class="column is-2">
                    <div class="space selected"></div>
                    <small>Selected</small>
                </div>
                <div class="column is-2">
                    <div class="space sold"></div>
                    <small>Sold</small>
                </div>
            </div>
            <div class="columns is-centered">
                <button class="button is-primary" onClick={()=>saveIndex(index)}>Book Space</button>
            </div>
        </div>
    );
}

export default ChooseSpace;