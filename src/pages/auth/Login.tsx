import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/authServices';
import AuthContext from '../../context/authContext';
import { ToastContainer, toast } from 'react-toastify';
import './Form.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login: loginContext } = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('handleSubmit');
    e.preventDefault();
    try {
      const data = await login(email, password);
      loginContext(data);
      toast.success(`welcome ${data?.name} back.`);
      setTimeout(() => {
        navigate('/mlb');
      }, 3000);
    } catch (error: any) {
      if(error.response.status === 400) {
        toast.warning(error.response.data.message);
      } else {
        toast.error("Oops! Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className='body'>
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="form-buttons">
            <Link to="/register" className="form-link-btn">Go to Register</Link>
            <button type="submit" className="form-submit-btn">Login</button>
          </div>
        </form>
        <ToastContainer autoClose={3000} />
      </div>
    </div>
  );
};

export default Login;
