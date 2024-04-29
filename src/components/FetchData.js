import React from "react";
import { UseSelector, useDispatch } from "react-redux";

const FetchData = () => {
    const users= useSelector(e=>e.manageUsers);


    fetch("http://localhost:5002/user/allusers").then(e=>e.json()).then(e=>{e.map(ei=>dispatch(addUsers(e))); console.log(e);});
}

export default FetchData

