import React, { useState, useEffect } from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'
import zazaLight from '../../assets/images/zaza-light.png'
import zazaDark from '../../assets/images/zaza-dark.png'

import Auth from "../../utils/auth";

import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { QUERY_SUBCATEGORIES } from '../../utils/queries';

import { useStoreContext } from '../../utils/GlobalState';

import Search from '../Search/Search'
import CartSummary from '../CartSummary/CartSummary'

import Loader from '../Loader/Loader'

const Navbar = ({ setNavClick, navClick }) => {
  const [isHome, setIsHome] = useState(true)
  const [backgroundScroll, setBackgroundScroll] = useState('transparent')

  const [profileVisibility, setProfileVisibility] = useState('hidden')

  const [searchOpen, setSearchOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)

  const [state, dispatch] = useStoreContext();


  useEffect(function () {
    setInterval(function () {
      if (window.location.pathname === '/') {
        setIsHome(true)
      } else {
        setIsHome(false)
      }
    }, 400)

    if (document.body.scrollTop >= 200) {
      setBackgroundScroll('white')
    } else if (document.body.scrollTop < 200) {
      setBackgroundScroll('transparent')
    }

  }, [isHome])


  // Deals with hover functionalities for the nav links
  function profileMouseEnter() {
    setProfileVisibility('visible')
  }

  function profileMouseLeave() {
    setProfileVisibility('hidden')
  }


  const [categoryHoverState, setCategoryHoverState] = useState({});

  const handleCategoryMouseEnter = (categoryName) => {
    setCategoryHoverState((prevState) => ({
      ...prevState,
      [categoryName]: true,
    }));
  };
  const handleCategoryMouseLeave = (categoryName) => {
    setCategoryHoverState((prevState) => ({
      ...prevState,
      [categoryName]: false,
    }));
  };

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <Link to='/' onClick={() => Auth.logout()}><p>Logout</p></Link>
      );
    } else {
      return (
        <Link to='/login'><p>Sign In/Register</p></Link>
      );
    }
  }

  function showProfile() {
    if (Auth.loggedIn()) {
      return (
        <Link to='/profile'><p>Profile</p></Link>
      );
    } else {
      return (
        <Link to='/login'><p>Profile</p></Link>
      );
    }
  }

  function showFavorite() {
    if (Auth.loggedIn()) {
      return (
        <Link to='/profile/favorites' style={{ color: isHome ? '#FFF9EF' : '#282F2B' }}><i className='bx bxs-heart bx-sm' ></i></Link>
      );
    } else {
      return (
        <Link to='/login' style={{  color: isHome ? '#FFF9EF' : '#282F2B'}}><i className='bx bxs-heart bx-sm' ></i></Link>
      );
    }
  }

  


  const { loading: lodingCategories, data: categoryData } = useQuery(QUERY_CATEGORIES);
  const { loading: loadingSubcategories, data: subcategoryData } = useQuery(QUERY_SUBCATEGORIES);

  if (lodingCategories || loadingSubcategories) {
    return <Loader/>;
  }

  console.log(categoryData)
  
  function calculateTotalItems() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.purchaseQuantity;
    });
    return sum;
  }

  return (
    <>
      <header style={{ color: isHome ? '#FFF9EF' : '#282F2B', background: backgroundScroll }}>
        <nav>
          <div className='navbar'>
            <div className='profile-search'>
              <i className='bx bxs-user-circle bx-md' style={{ color: isHome ? '#FFF9EF' : '#282F2B' }} onMouseOver={profileMouseEnter} onMouseLeave={profileMouseLeave}></i>
              <i className='bx bx-search-alt-2 bx-sm' onClick={() => setSearchOpen(true)}></i>
            </div>
            <div className='zaza-logo'>
              <Link to='/'><img src={isHome ? zazaLight : zazaDark} alt='zaza cream text logo' /></Link>
            </div>
            <div className='nav-and-checkout'>
              <div className='nav'>
                <ul>
                  {categoryData.categories.map(category => (
                    <li key={category.name.toLowerCase()}><Link to={`/${category.name.toLowerCase()}`} style={{ color: isHome ? '#FFF9EF' : '#282F2B' }}
                      onMouseOver={() => handleCategoryMouseEnter(category.name.toLowerCase())}
                      onMouseLeave={() => handleCategoryMouseLeave(category.name.toLowerCase())}
                    >{category.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className='checkout-favorite'>
                {showFavorite()}
                <div className='checkout' onMouseEnter={() => setCartOpen(true)} onMouseLeave={() => setCartOpen(false)}>
                  <i className='bx bx-shopping-bag bx-sm'></i>
                  <div className='cart-count'>
                    <p>{state.cart.length ? calculateTotalItems() : 0 }</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>


        {/* USER PROFILE DROPDOWN MENU */}
        <div className='user-profile' style={{ visibility: profileVisibility, backgroundColor: 'white' }} onMouseOver={profileMouseEnter} onMouseLeave={profileMouseLeave}>
          <div>
            {showProfile()}
          </div>
          <div>
            {showNavigation()}
            {/* <Link to='/login'><p>Sign In/Register</p></Link> */}
          </div>
        </div>
      </header>

      {/* HOVER DROPDOWN MENU */}
      {categoryData.categories.map(category => {
        const filteredSubcategories = subcategoryData.subcategories.filter(
          subcategory => subcategory.category.name === category.name
        );

        const uniqueTitles = Array.from(
          new Set(filteredSubcategories.map(subcategory => subcategory.title))
        );

        return (<div className={`nav-hover ${category.name.toLowerCase()}-hover`}
          style={{ visibility: categoryHoverState[category.name.toLowerCase()] ? 'visible' : 'hidden' }}
          onMouseOver={() => handleCategoryMouseEnter(category.name.toLowerCase())}
          onMouseLeave={() => handleCategoryMouseLeave(category.name.toLowerCase())}>
          <div>
            <div className={`nav-image ${category.name.toLowerCase()}-nav-image`}>
            </div>
          </div>
          <div>
            <div className='nav-subcategories'>
          <div className='line'></div>
              <div className='subcategories'>
                {uniqueTitles.map(title => (
                  <div  key={title}>
                    <h4>{title}</h4>
                    {filteredSubcategories
                      .filter(subcategory => subcategory.title === title)
                      .map(subcategory => (
                        (<Link key={`${category.name}.${subcategory.name}`} to={`/${category.name}/${subcategory.name}`}><p onClick={(e) => { setNavClick(e.target.innerText); console.log(e.target.innerText) }}>{subcategory.name}</p></Link>)
                      ))}
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
        )
      })}


      <Search setSearchOpen={setSearchOpen} searchOpen={searchOpen} />
      <CartSummary setCartOpen={setCartOpen} cartOpen={cartOpen} />
    </>
  )
}

export default Navbar
