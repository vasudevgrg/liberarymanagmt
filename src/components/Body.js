import React from 'react'
import { useSelector } from 'react-redux';
import MicroCard from './MicroCard';

const Body = () => {
    const myState= useSelector(e=>e.manageBooks);
console.log("hello");
console.log(myState);
  return (
    <>
    {
        myState.map(e=><MicroCard title={e.title} author={e.author} cover_image={e.cover_image} />)
    }
    </>
  )
}

export default Body