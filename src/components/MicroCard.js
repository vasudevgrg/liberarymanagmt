import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from "react-router-dom";
import { addUsers, updateID } from '../actions';
import FiberManualRecordSharpIcon from '@mui/icons-material/FiberManualRecordSharp';
import Button from '@mui/material/Button';


const MicroCard = ({title, author, cover_image, id}) => {
    const [value, setValue]= useState("");
    const [dropdown, setDropdown]= useState([]);
    const [issued, setIssued]= useState(false);
    const [processing, setProcessing]= useState(false);
    const [notIssued , setNotIssued]= useState(true);
    const [userwithbook, setUserwithbook]= useState({username:"", password:"", token: "", books:[], _id:""});
    const [date, setDate]= useState(new Date());
   
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
            const date1= new Date();
            console.log(date1);

            setProcessing(false);
            setUserwithbook({...userwithbook, username:e.user.username, _id:e.user._id});
            setNotIssued(false);
            setDate(date1);
            console.log(userwithbook);
            console.log(date);

            fetch(`http://localhost:5002/admin/updateuser/${id}`, {
                method:"PUT",
                body: JSON.stringify({
                    "current_reader":userwithbook._id,
                    "date_time": "date"
                }),
                headers:{
                    'Content-Type':'application/json',
                    'token':localStorage.getItem("token")   
                }
            }).then(e=>e.json()).then(e=>console.log(e)).catch(e=>console.log(e));
        });

       
  };

  const handleMigrationToMainPage=(e)=>{
    const event= e.target;
    if(event.tagName!= "BUTTON" && event.tagName!= "INPUT" && event.tagName!="SPAN"){
    dispatch(updateID(id)); 
    navigate("/bookmainpage");
    }
  }
  
  return (
<>
<div style={{display:"flex", flexDirection:"row", alignItems:"start", justifyContent:"space-between", padding:"15px", margin:"15px"}} 
onClick={handleMigrationToMainPage}
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
        
        <><FiberManualRecordSharpIcon style={{color:"yellow"}} />
        <div style={{display:"flex", flexDirection:"column"}}>
        <input onChange={e=>{setDropdown(users.filter(x=>x.username.includes(e.target.value)))}}/>
        <div className="dropdown">{dropdown.map((e)=><span onClick={()=>handleUpdateBookStatus(id, e._id)}>{e.username} {e._id}</span>)}{ console.log(dropdown)}</div></div>
        </>
    }
    {
        !notIssued && <><FiberManualRecordSharpIcon style={{color:"red"}} /> {userwithbook.username} {} </>
    }

</div>
</>
  )
}

export default MicroCard