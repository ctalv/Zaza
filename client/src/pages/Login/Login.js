import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import './login.css'
import { Link } from 'react-router-dom'
import { LOGIN } from '../../utils/mutations'
import Auth from '../../utils/auth'

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    console.log(event)
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log("Login Error:", e.message); // Log the error message
      console.log("GraphQL Error Details:", e.graphQLErrors); // Log any additional GraphQL errors
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };


  return (
    <div className='login-signup login-section'>
      <div className='card login-card'>
        <h3>Sign In</h3>
        <form className='zaza-form login-form' onSubmit={handleFormSubmit}>
          <div className='zaza-input'>
            <label htmlFor='login-email-address'>
              Email Address *
              <input type='email' name='email' id='login-email-address' onChange={handleChange}/>
            </label>
            <label htmlFor='login-password'>
              Password *
              <input type='password' name='password' id='login-password' onChange={handleChange}/>
            </label>
          </div>
          {error && (
          <div>
            <p className="error-text">Invalid email or password!</p>
          </div>
        )}
          <div className='zaza-form-button'>
            <button type="submit">LOG IN</button>
          </div>
        </form>
      </div>
      <div className='outside-content'>
        <div className='registered-question login-question'>
          <p>Not yet registered with us? Here are the benefits of being a Zaza user:</p>
        </div>
        <div className='benefits'>
          <div className='benefit-div free-shipping'>
            <i class='bx bxs-truck'></i>
            <p>Free shipping on first order</p>
          </div>
          <div className='line'></div>
          <div className='benefit-div thirty-off'>
            <i class='bx bxs-discount'></i>
            <p>30% off your first order</p>
          </div>
          <div className='line'></div>
          <div className='benefit-div order-status'>
            <i class='bx bx-receipt'></i>
            <p>Access to online order status</p>
          </div>
        </div>
        <div className='signup-switch'>
          <Link to='/signup'><h4>Create a Zaza Account</h4></Link>
        </div>
      </div>
    </div>
  )
}

export default Login