
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import BookMainPage from './components/BookMainPage';
import UserLandingPage from './UserSideComponents/UserLandingPage';
import Login from './components/Login';


function App() {

  
  

  return (
   <>
   <BrowserRouter>
   <Routes>
    <Route  index element={<Login/>} />
    <Route element={<LandingPage/>} path='/landingpage'/>
    <Route element={<BookMainPage/>} path="/bookmainpage"/>
    <Route element={<UserLandingPage/>} path="/userlandingpage" />
   </Routes>
   </BrowserRouter>
  
   </>
  );
}

export default App;
