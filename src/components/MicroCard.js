import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from "react-router-dom";
import { addUsers, updateID } from '../actions';
import FiberManualRecordSharpIcon from '@mui/icons-material/FiberManualRecordSharp';
import Button from '@mui/material/Button';
import SelectSearch from 'react-select-search';

const MicroCard = ({title, author, cover_image, id}) => {
    const [value, setValue]= useState("");
    const [dropdown, setDropdown]= useState([]);
    const [issued, setIssued]= useState(false);
    const [processing, setProcessing]= useState(false);
    const [notIssued , setNotIssued]= useState(true);
    const [userwithbook, setUserwithbook]= useState({});
    const [date, setDate]= useState("");
   
  const navigate= useNavigate();
  const dispatch= useDispatch();


  const users= useSelector(e=>e.manageUsers);

useEffect(()=>{
    fetch("http://localhost:5002/user/allusers").then(e=>e.json()).then(e=>{e.map(ei=>dispatch(addUsers(ei))); console.log(e);});
}, []);
 
  const handleIssueBook=()=>{
        setIssued(true);
        setProcessing(true);

  }

  const handleUpdateBookStatus=(book_id, user_id)=>{
        fetch(`http://localhost:5002/user/addbook/${user_id}`, {
            method:"PUT",
            body:JSON.stringify({
                "id":book_id
            }),
            headers:{
                'Content-Type':'application/json',
                'token':localStorage.getItem("token")   
            }
        }).then(e=>e.json()).then(e=>{
            const date= new Date();
            console.log(date);

            setProcessing(false);
            setUserwithbook(e.user);
            setNotIssued(false);
            setDate(date);
            console.log(e.user);
        });

        fetch(`http://localhost:5002/admin/updateuser/${id}`, {
            method:"PUT",
            body: JSON.stringify({
                "current_reader":userwithbook._id,
                "date_time": date
            }),
            headers:{
                'Content-Type':'application/json',
                'token':localStorage.getItem("token")   
            }
        }).then(e=>e.json()).then(e=>console.log(e)).catch(e=>console.log(e));
  }
  
  return (
<>
<div style={{display:"flex", flexDirection:"row", alignItems:"start", justifyContent:"space-between", padding:"15px", margin:"15px"}} 
// onClick={()=>{dispatch(updateID(id)); navigate("/bookmainpage")}}
>
<img src={cover_image} style={{height:"3em",  width:"2em"}} />
<div>{title}</div>
<div>{author}</div>
    {
        !issued && <><FiberManualRecordSharpIcon style={{color:"green"}} />
        <Button onClick={handleIssueBook}>Issue This Book</Button>
        </>

    }
    {
        processing && 
        
        <div style={{display:"flex", flexDirection:"column"}}><input onChange={e=>{setDropdown(users.filter(x=>x.username.includes(e.target.value)))}}/>
        <div className="dropdown">{dropdown.map((e)=><div onClick={()=>handleUpdateBookStatus(id, e._id)} style={{zIndex:"auto"}} >{e.username} {e._id}</div>)}{ console.log(dropdown)}</div>
        </div>
    }
    {
        !notIssued && <><FiberManualRecordSharpIcon style={{color:"red"}} /> {userwithbook.username} {} </>
    }

</div>
</>
  )
}

export default MicroCard