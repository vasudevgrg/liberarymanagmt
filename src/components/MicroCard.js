import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from "react-router-dom";
import { addUsers, updateID } from '../actions';
import FiberManualRecordSharpIcon from '@mui/icons-material/FiberManualRecordSharp';
import Button from '@mui/material/Button';
import SelectSearch from 'react-select-search';

const MicroCard = ({title, author, cover_image, id}) => {
    const [issued, setIssued]= useState(false);
    const [processing, setProcessing]= useState(false);
  const navigate= useNavigate();
  const dispatch= useDispatch();
  const users= useSelector(e=>e.manageUsers);

  useEffect(()=>{
    fetch("http://localhost:5002/user/allusers").then(e=>e.json()).then(e=>dispatch(addUsers(e)));
  })

  const handleIssueBook=()=>{
        setIssued(true);
        setProcessing(true);

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
        processing && <SelectSearch value={users.filter((e)=>e.usernam==="username")} name="language" placeholder="Search User" />
    }

</div>
</>
  )
}

export default MicroCard