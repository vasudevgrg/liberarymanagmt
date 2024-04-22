import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './Navbar';

const BookMainPage = () => {
    const [book, setBook]= useState({});
    const id= useSelector(e=>e.manageID);
    
   useEffect(()=>{fetch(`http://localhost:5002/admin/getbook/${id}`).then(e=>e.json()).then(e=>setBook(e))});
  return (
    <>
    <Navbar/>
    <div>
        
    </div>
    </>
  )
}

export default BookMainPage


