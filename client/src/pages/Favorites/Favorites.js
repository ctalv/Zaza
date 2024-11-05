import React, {useEffect, useState} from 'react'
import ProfileSideBar from '../../components/ProfileSideBar/ProfileSideBar'

import image from '../../assets/images/hao.jpg'
import '../Profile/profile.css'
import './favorites.css'
import Loader from '../../components/Loader/Loader'
import { Link } from 'react-router-dom'

import { QUERY_ALL_PRODUCTS } from '../../utils/queries'
import { useQuery } from '@apollo/client'
import { setStorage, getStorage, removeItem } from '../../utils/localStorage'

function Favorites({ setCount, count, setProductFavorite, productFavorite}) {
  const { loading, data } = useQuery(QUERY_ALL_PRODUCTS)

  const [favoritesList, setFavoritesList] = useState()
  const [storage, setStorage] = useState(localStorage.getItem('isFavoriteCondition'))

  
  
  console.log(data)
  useEffect(function() {
    setFavoritesList(data?.products?.filter(product => { return storage.includes(product._id)}))

    console.log(favoritesList)
  }, [productFavorite])

  if (loading) {
    return <Loader/>
  }

  return (
    <div className='profile-page'>
      <ProfileSideBar/>
      <div className='profile-content main-profile-content'>
          <h2>My Favorites ({favoritesList?.length ? favoritesList?.length : 0})</h2>
          <div className='recent'>
            <div className='favorites-display'>
              {favoritesList?.map(faves => {
                return (
                  <div className='favorites-list' key={faves._id}>
                <div className='favorites-image'>
                  <Link to={`/product/${faves._id}`}><img src={faves.image[0]} alt=''/></Link>
                </div>
                <div className='favorites-info'>
                  <div className='favorites-title-fave'>
                    <p>{faves.name}</p>
                    <div onClick={() => {
                          if (count === 0) {
                            setProductFavorite((prev) => [...prev, faves._id]);
                            setStorage('isFavoriteCondition', productFavorite);
                            setCount(prev => prev + 1)
                          } else if (count === 1) {
                            removeItem('isFavoriteCondition', productFavorite, faves._id)
                            console.log(productFavorite)
                            setCount(prev => prev - 1)
                          }
                        }}>
                    {productFavorite.find(item => item === faves._id) ? <i className='bx bxs-heart' ></i> : <i className='bx bx-heart'></i>}
                    </div>
                  </div>
                  <div className='favorites-price'>
                    <p>${faves.price.toFixed(2)}</p>
                  </div>
                </div> 
              </div>
                )
              })
              }
            </div>
          </div>
      </div>
    </div>
  )
}

export default Favorites