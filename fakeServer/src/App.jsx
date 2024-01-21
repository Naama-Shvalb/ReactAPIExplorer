import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
// import UserContext from './UserContext'; // Import your UserContext
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Todos from './components/Todos';
import Posts from './components/Posts';
import Albums from './components/Albums';
import Info from './components/Info';
import FinishRegister from './components/FinishRegister';
import Comments from './components/Comments';
 

function App() {

  // const { userId } = useParams();

  // const [loggedInUserId, setLoggedInUserId] = useState(null);

  // const handleLogin = (username) => {
  //   setLoggedInUserId(username);
  // };


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="users/:userId">
            <Route path="home" element={<Home />}>
              <Route path="info" element={<Info />} />
              <Route path='todos' element={<Todos />} />
              <Route path="posts" element={<Posts />} >
                <Route path="comments" element={<Comments />}/>
              </Route>
              <Route path="albums" element={<Albums />} />
            </Route>
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="finishRegister" element={<FinishRegister />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
