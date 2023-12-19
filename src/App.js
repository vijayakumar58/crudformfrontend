import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Loginpage from './Loginpage';
import Loginaccount from './Loginaccount';
import Mainpage from './Mainpage';
import Createuser from './Createuser';
import Viewuser from './Viewuser';
import Edituser from './Edituser';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Loginpage></Loginpage>}></Route>
      <Route path='/createLoginAccount' element={<Loginaccount></Loginaccount>}></Route>
      <Route path='/mainPage' element={<Mainpage></Mainpage>}></Route>
      <Route path='/createUser' element={<Createuser></Createuser>}></Route>
      <Route path='/viewUser/:id' element={<Viewuser></Viewuser>}></Route>
      <Route path='/editUser/:id' element={<Edituser></Edituser>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
