import React from 'react';
import Navbar from './Navbar';
import Body from './Body';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { addBooks } from '../actions';

const LandingPage = () => {
    const dispatch= useDispatch();
    useEffect(()=>{
      fetch("http://localhost:5002/admin/books").then(e=>e.json()).then(e=>e.map((x)=>{dispatch(addBooks(x)); console.log(x);}));
    }, []);
  return (
    <>
    <Navbar/>
    <Body/>
    </>
  )
}

export default LandingPage