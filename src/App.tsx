import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthRoute from "./AuthRoute";
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
// Components
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import MLB from './pages/main/MLB';
import NFL from './pages/main/NFL';
import NHL from './pages/main/NHL';
import NBA from './pages/main/NBA';

function App() {
  return (    
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<AuthRoute />}>
          <Route path="/MLB" element={<MLB />} />
          <Route path="/nfl" element={<NFL />} />
          <Route path="/nhl" element={<NHL />} />
          <Route path="/nba" element={<NBA />} />
        </Route>
      </Routes>
    </BrowserRouter>  
  );
}

export default App;