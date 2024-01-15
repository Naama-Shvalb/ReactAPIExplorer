import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Login from './components/Login'
import Register from "./components/Register";
import FinishRegister from "./components/FinishRegister";
import Home from "./components/Home";
import Info from "./components/Info";
import Todos from "./components/Todos";

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
          <Route path="home" element={<Home />}>
            <Route path="info" element={<Info />}/>
            <Route path="todos" element={<Todos />}/>

          </Route>       
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="finishRegister" element={<FinishRegister />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
