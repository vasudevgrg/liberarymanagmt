import logo from './logo.svg';
import './App.css';
import Navbar from "../src/components/Navbar";
import { UseSelector, useDispatch } from 'react-redux';
import { addBooks, editBooks, deleteBook } from './actions';
import Body from './components/Body';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import BookMainPage from './components/BookMainPage';

function App() {

  
  

  return (
   <>
   <BrowserRouter>
   <Routes>
    <Route  index element={<LandingPage/>} />
    <Route element={<BookMainPage/>} path="/bookmainpage"/>
   </Routes>
   </BrowserRouter>
  
   </>
  );
}

export default App;
