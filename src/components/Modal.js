import React from 'react';
import './Modal.css';
import { useDispatch, useSelector } from 'react-redux';


const Modal = ({setShowModal}) => {
const [title, setTitle]= React.useState("");
const [description, setDescription]= React.useState("");
const [author, setAuthor]= React.useState("");
const [publication_year, setPublication_year]= React.useState();

const id= useSelector(e=>e.manageID);
const dispatch= useDispatch();

const handleUpdate=()=>{
    fetch(`http://localhost:5002/admin/editbook/${id}`, {
        method: "put",
        headers:{
            'Content-Type':'application/json',
            'token':localStorage.getItem("token")   
        },
        body:JSON.stringify({
            "title":title,
            "description": description,
            "author":author,
            "publication_year":publication_year
        })
    }).then(e=>e.json()).then(e=>{dispatch(); setShowModal(false);});
}

  return (
    <>
    <div className="wrapper" onClick={()=>setShowModal(false)}></div>

    <div className="container" style={{display:"flex", flexDirection:"column", margin:"10px"}}>
        <label>Update title:</label>
        <input  onChange={(e)=>setTitle(e.target.value)}/>
        <label>description</label>
        <input onChange={(e)=>setDescription(e.target.value)}/>
        <label>update Author:</label>
        <input onChange={(e)=>setAuthor(e.target.value)}/>
        <label>update Image:</label>
        <input onChange={(e)=>setPublication_year(e.target.value)}/>
        <button onClick={handleUpdate}>Update</button>
    </div>
    </>
  )
}

export default Modal