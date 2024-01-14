import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Login from './components/Login'
import Register from "./components/Register";
import FinishRegister from "./components/FinishRegister";
import Home from "./components/Home";
function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="finishRegister" element={<FinishRegister />} />
          {/* <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
