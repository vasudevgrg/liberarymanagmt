import React, { useEffect, useState } from 'react';
import FiberManualRecordSharpIcon from '@mui/icons-material/FiberManualRecordSharp';
import { Button } from '@mui/material';

const UserMicroCard = ({title,cover_image, author, date_time, id, description}) => {
  const [issued, setIssued]= useState(false);
  const [color , setColor]= useState("");
  const [userwithbook, setUserwithbook]= useState({username:"", password:"", token: "", books:[], _id:""});
  const [date, setDate]= useState(new Date());

  useEffect(()=>{
    if(date_time!= null){
      setColor("red");
    }else{
      setColor("green");
    }
  },[]);

  const handleIssueBook=()=>{
    const user_id= localStorage.getItem("id");
    fetch(`http://localhost:5002/user/addbook/${user_id}`, {
      method:"PUT",
      body:JSON.stringify({
          "id":id
      }),
      headers:{
          'Content-Type':'application/json',
          'token':localStorage.getItem("token")   
      }
  }).then(e=>e.json()).then(e=>{
      const date1= new Date();
      setColor("red");
      setUserwithbook({...userwithbook, username:e.user.username, _id:e.user._id});
     setIssued(true);
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

 
  }

  return (
    <>
    <div style={{display:"flex", flexDirection:"row", alignItems:"start", justifyContent:"space-between", padding:"15px", margin:"15px"}}>
      <img src={cover_image} style={{height:"3em",  width:"2em"}}/>
        <div>{title}</div>
        <div>{author}</div>
        
         <FiberManualRecordSharpIcon style={{color:color}} />
         {
          issued && <div>This book is issued on {date_time}</div>
         }
         {
          !issued && <Button onClick={handleIssueBook}>Issue Book</Button>
         }
        
    </div>
    </>
  )
}

export default UserMicroCard