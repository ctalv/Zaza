import React from 'react'
import './error.css'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div className='error-page'>
      <h1>404</h1>
      <p>There was a problem accessing this page.<br/> Check the url route and refresh.</p>
      <Link to='/'><button>GO TO HOME</button></Link>
    </div>
  )
}

export default Error