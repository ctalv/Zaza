import React from 'react'
import './profile.css'
import ProfileSideBar from '../../components/ProfileSideBar/ProfileSideBar'
import image from '../../assets/images/hao.jpg'

import { Link } from 'react-router-dom'

const Profile = () => {
  return (
    <div className='profile-page'>
      <ProfileSideBar/>
      <div className='profile-content main-profile-content'>
          <h2>My Profile</h2>
          <div className='recent recent-favorites'>
            <div className='title-all'>
              <p>Recently Added Favorites</p>
              <Link to='/profile/favorites' style={{ fontSize: '13px'}}><p>View All</p></Link>
            </div>
            <div className='favorite-images'>
              <div>
                <img src={image} alt=''/>
              </div>
              <div>
                <img src={image} alt=''/>
              </div>
              <div>
                <img src={image} alt=''/>
              </div>
            </div>
          </div>
          <div className='recent recent-order'>
            <div className='title-all'>
              <p>Latest Order</p>
              <Link to='/profile/orders'><p>View All</p></Link>
            </div>
            <div className='order-latest'>
              <div className='order-details order-headers'>
                <div className='order-items'>
                  <p>Items</p>
                </div>
                <div className='order-date'>
                  <p>Date Purchased</p>
                </div>
                <div className='order-status'>
                  <p>Status</p>
                </div>
              </div>
              <div className='order-details order-content order-profile'>
                <div className='order-items items'>
                  <div>
                    <img src={image} alt=''/>
                  </div>
                  <p>5 items</p>
                </div>
                <div className='order-date date'>
                  <p>11-23-2023</p>
                </div>
                <div className='order-status status'>
                  <p>Pending</p>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Profile