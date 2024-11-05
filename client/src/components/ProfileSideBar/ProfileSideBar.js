import React, { useState } from 'react'
import '../../pages/Profile/profile.css'

import { QUERY_USER } from '../../utils/queries'
import { useQuery } from '@apollo/client'

import { Link } from 'react-router-dom'

function ProfileSideBar() {
    const [profileNav, setProfileNav] = useState(window.location.href.split('/').slice(-1)[0].split('%20').join(' '))

    const { data } = useQuery(QUERY_USER)

    console.log(data)

  return (
    <div className='profile-side-bar'>
        <Link to='/profile' style={{ backgroundColor: profileNav === 'profile' ? '#D1DCDA' : 'transparent'}}><div className='side-piece'>
            <i className='bx bxs-user-pin' ></i>
            <p>My Profile</p>
        </div>
        </Link>
        <Link to='/profile/favorites' style={{ backgroundColor: profileNav === 'favorites' ? '#D1DCDA' : 'transparent'}}><div className='side-piece'>
            <i className='bx bxs-heart'></i>
            <p>Favorites</p>
        </div>
        </Link>
        <Link to='/profile/orders' style={{ backgroundColor: profileNav === 'orders' ? '#D1DCDA' : 'transparent'}}><div className='side-piece'>
            <i className='bx bxs-receipt' ></i>
            <p>Order History</p>
        </div>
        </Link>
        <div className='user-greetings'>
            <p>Greetings,<br/> {data?.user?.username}</p>
        </div>
    </div>
  )
}

export default ProfileSideBar