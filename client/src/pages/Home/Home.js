import React from 'react'
import HomeSlide from '../../components/HomeSlide/HomeSlide'
import HomePage from '../../components/HomePage/HomePage' 
import SleepWear from '../../components/ShopSleepwear/SleepWear'
import Fragrances from '../../components/FragrancesPage/Fragrances'

const Home = () => {
  return (
    <div>
      <HomeSlide/>
      <HomePage />
      <SleepWear/>
      <Fragrances/>
    </div>
  )
}

export default Home