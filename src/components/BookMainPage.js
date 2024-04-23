import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './Navbar';
import { Button, Modal } from '@mui/material';

const BookMainPage = () => {
    const [book, setBook]= useState({});
    const [showModal, setShowModal]= useState(false);
    const id= useSelector(e=>e.manageID);
    
   useEffect(()=>{fetch(`http://localhost:5002/admin/getbook/${id}`).then(e=>e.json()).then(e=>setBook(e))});

   const handleEdit=()=>{

   }
  return (
    <>
    <Navbar/>
    <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
        <img src={book.cover_image} style={{height:"50vh", width:"50vw"}} />
        <h2>{book.title}</h2>
        <h3>{book.author}</h3>
        <h4>{book.description}</h4>

<Button onClick={handleEdit}> Edit </Button>
<Button>delete</Button>

    </div>
    {
      showModal && <Modal setShowModal={setShowModal}/>
    }
    </>
  )
}

export default BookMainPage


