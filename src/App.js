import logo from './logo.svg';
import './App.css';
import Navbar from "../src/components/Navbar";
import { UseSelector, useDispatch } from 'react-redux';
import { addBooks, editBooks, deleteBook } from './actions';
import Body from './components/Body';
import { useEffect } from 'react';

function App() {
  const dispatch= useDispatch();
  useEffect(()=>{
    fetch("https://freetestapi.com/api/v1/books?limit=5").then(e=>e.json()).then(e=>e.map((x)=>{dispatch(addBooks(x)); console.log(x);}));
  }, []);
  
  

  return (
   <>
   <Navbar/>
   <Body/>
   </>
  );
}

export default App;
