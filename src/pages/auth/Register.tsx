import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../services/authServices';
import AuthContext from '../../context/authContext';
import { ToastContainer, toast } from 'react-toastify';
import './Form.css';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/[0-9]/.test(password)) {
      return 'Password must contain at least one number';
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('handleSubmit');
    e.preventDefault();
    if (password !== passwordConfirm) {
      toast.warning('Passwords do not match.');
      return;
    }

    if (validatePassword(password)) {
      toast.warning(validatePassword(password));
      return;
    }

    try {
      const data = await register(name, email, password);
      console.log('data => ', data);
      toast.success(`${data?.name} registered successfully.`);
      setTimeout(() => {
        navigate('/')
      }, 3000);
    } catch (error: any) {
      if(error.response.status === 400) {
        toast.warning(error.response.data.message);
      } else {
        toast.error('Oop! Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className='body'>
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input type="password" id="passwordConfirm" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} required />
          </div>
          <div className="form-buttons">
            <Link to="/" className="form-link-btn">Go to Login</Link>
            <button type="submit" className="form-submit-btn">Register</button>
          </div>
        </form>
        <ToastContainer autoClose={3000} />
      </div>
    </div>
  );
};

export default Register;
