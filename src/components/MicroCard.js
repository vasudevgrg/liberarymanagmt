import React from 'react';
import { useDispatch } from 'react-redux';
import {useNavigate} from "react-router-dom";
import { updateID } from '../actions';

const MicroCard = ({title, author, cover_image, id}) => {
  const navigate= useNavigate();
  const dispatch= useDispatch();
  
  return (
<>
<div style={{display:"flex", flexDirection:"row", alignItems:"start", justifyContent:"space-between", padding:"15px", margin:"15px"}} onClick={()=>{dispatch(updateID(id)); navigate("/bookmainpage")}}>
<img src={cover_image} style={{height:"3em",  width:"2em"}} />
<div>{title}</div>
<div>{author}</div>
    
</div>
</>
  )
}

export default MicroCard