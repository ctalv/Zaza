import React from 'react'
import ProfileSideBar from '../../components/ProfileSideBar/ProfileSideBar'
import '../Profile/profile.css'
import './order.css'

import image from '../../assets/images/hao.jpg'


const OrderDetails = () => {
  return (
    <div className='profile-page'>
      <ProfileSideBar/>
      <div className='profile-content main-profile-content'>
          <h2>My Orders</h2>
          <div className='recent'>
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
            <div className='order-details order-content'>
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
  )
}

export default OrderDetails