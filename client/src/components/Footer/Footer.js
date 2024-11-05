import React from 'react';
import './footer.css';
import facebookIcon from '../../assets/images/facebook.png';
import twitterIcon from '../../assets/images/instagram.png';
import youtubeIcon from '../../assets/images/twitter.png';
import instagramIcon from '../../assets/images/youtube.png';

const Footer = () => {
  return (
    <div className='footer-container'>
      <div className='footer-left'>
        <button className='footer-signupbutton'>SIGN UP FOR EMAILS & TEXTS</button>

       {/* Social media icons */}
        <div className='social-media-icons'>
          <img src={twitterIcon} alt='Twitter' className='social-icon' />
          <img src={instagramIcon} alt='Instagram' className='social-icon' />
          <img src={facebookIcon} alt='Facebook' className='social-icon' />
          <img src={youtubeIcon} alt='YouTube' className='social-icon' />
        </div>
      </div>
      
      <div className='links-container'>
        <div className='helplinks-right'>
          <h1>Help</h1>
          <p>Customer Service</p>
          <p>Live Chat</p>
          <p>About ZAZA Credit Card</p>
          <p>Find a Store</p>
          <p>Careers</p>
        </div>
        <div className='orderslinks-right'>
          <h1>Orders and Returns</h1>
          <p>Order Status</p>
          <p>Shipping Information</p>
          <p>Return Policy</p>
        </div>
        <div className='serviceslinks-right'>
          <h1>Services</h1>
          <p>Store Offer & Events</p>
          <p>Pay My Bill</p>
          <p>Get the iOS App</p>
          <p>Get the Android App</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;