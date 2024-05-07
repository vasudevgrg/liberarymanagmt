import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import UserMicroCard from './UserMicroCard'
import { useDispatch, useSelector } from 'react-redux'
import { addBooks } from '../actions';
import { Button } from '@mui/material';

const UserLandingPage = () => {
    const allBooks= useSelector(e=>e.manageBooks);
    const [file, setFile]= useState();
    const dispatch= useDispatch();
    useEffect(()=>{
      fetch("http://localhost:5002/user/books").then(e=>e.json()).then(e=>{console.log(e);e.books.map(ei=>dispatch(addBooks(ei)));})
    }, []);

    console.log(allBooks);

    const handleForm=()=>{
      fetch("http://localhost:5002/profile", {
        method:"post",
        body:JSON.stringify({
          avatar: file
        }),
        headers: { 'Content-Type':'application/json',
        'token':localStorage.getItem("token")  }
      }).then(e=>e.json()).then(e=>console.log(e));
    }
  return (
    <>
    <Navbar/>
    <input type='file' filename={file} onChange={e=>setFile(e.target.files[0])}/>
    <Button onClick={handleForm}>Upload Image</Button>
    {
      allBooks.map(e=><UserMicroCard cover_image={e.cover_image} title={e.title} author={e.author} description={e.description} date_time= {e.date_time} id={e._id} />)
    }
    </>
  )
}

export default UserLandingPage