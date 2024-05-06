import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import UserMicroCard from './UserMicroCard'
import { useDispatch, useSelector } from 'react-redux'
import { addBooks } from '../actions'

const UserLandingPage = () => {
    const allBooks= useSelector(e=>e.manageBooks);
    const dispatch= useDispatch();
    useEffect(fetch("http://localhost:5002/user/books").then(e=>e.json()).then(e=>e.map(ei=>dispatch(addBooks(ei)))));
  return (
    <>
    <Navbar/>
    {
      allBooks.map(e=><UserMicroCard title={e.title} author={e.author} description={e.description} date_time= {e.date_time} id={e._id} />)
    }
    </>
  )
}

export default UserLandingPage