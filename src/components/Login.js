
import React, { useState  , useEffect} from 'react';
import axios from 'axios';
import { resolvePath, useNavigate } from 'react-router-dom';
import '../styles/main.css';

const Login = () => {


   // send request function  
   function sendRequest(data){
    
    axios.post('http://localhost/myapp/solarsystem/src/backend/scripts/login.php', data)
    .then(response => {
      // store the token in the local storage 
            if(response.data.success == true){
              setErrorMessage('');
              navigate('/');
            }
            else if(response.data.success ==  false){
            console.log(response);
              setErrorMessage('Email or password incorrect');
            }

    })
    .catch(error => {
      alert(error.message);
    });
   }
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const {username, password } = formData;
    const data= {username, password };
    // console.log(data);
    // submit form data to the server 
    JSON.stringify(data);
    // console.log( data);
    sendRequest(data);
 
  };
  return (
    <div className='loginFormParent'>
      <div className='sign-in'>
        <div className='sign-in-content'>
          <h1>welcome back</h1>
          <p className='welcome-text'>Welcome back! Please enter your details</p>

          <form onSubmit={handleSubmit}>
            <div className='email'>
              <label>username</label>
              <input type="text" placeholder="your username" name="username" value={formData.email} onChange={(event) => setFormData({ ...formData, username: event.target.value })} />
            </div>
            <div className='pass'>
              <label>password</label>
              <input type="password" placeholder="Password" name="password" value={formData.password} onChange={(event) => setFormData({ ...formData, password: event.target.value })} />
              {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </div>
            <div className='remember-me'>
              <div className='check'>
                <input type='checkbox' />
                <span>remember me</span>
              </div>
              <a href='#'>forgot password ?</a>
            </div>
            <input type="submit" value="sign in" />
          </form>

        </div>
      </div>

    </div>
  );
};

export default Login;
