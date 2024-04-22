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
        myState.map((e, idx)=><MicroCard title={e.title} author={e.author} cover_image={e.cover_image} id={e._id}/>)
    }
    </>
  )
}

export default Body