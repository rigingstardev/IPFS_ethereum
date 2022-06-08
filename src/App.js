import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import {useContext} from 'react'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {UserContext} from './context/UserContext';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Menu from "./pages/Menu";
import Backend from './components/Backend'

import payment from './pages/payment'
import Newhome from "./pages/Newhome";
import Process from "./pages/Process";
import Contact from "./pages/Contact";

import Downloadfiles from "./pages/Downloadfiles";
import Uploadfiles from "./pages/Uploadfiles";
import Feepayment from "./pages/Feepayment";

function App() {

  const {user} = useContext(UserContext); 
 
  return (
    <div className="App">
        <BrowserRouter>
        <Navbar />
          <Routes>  
            { user && (
              <>
              <Route path="/home" element={<Home/>} /> 
              <Route path="/backend" element={<Backend/>} />
              <Route path="/process" element={<Process/>} />
              <Route path="/uploadfiles" element={<Uploadfiles/>} />
              <Route path="/downloadfiles" element={<Downloadfiles/>} />
              <Route path="/feepayment" element={<Feepayment/>} />
              <Route path="/contact" element={<Contact/>} />
              <Route path='/payment' element={<payment/>} />
              {/* <Route path="/reactjs/" element={<Newhome/>} /> */}
              </>
            )}
            {!user && (
              <>
              <Route path="/login" element={<Login/>} />
              <Route path="/signup" element={<Register/>} />
              <Route exact component={Menu} />
              </>
            )}
            <Route path="*" element={<Navigate to={user ? '/home':'/login'} />} />
          </Routes>
          <Footer />
        </BrowserRouter>
    </div>
  );
}

export default App;