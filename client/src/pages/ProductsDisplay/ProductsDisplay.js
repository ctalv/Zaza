import React, { useState, useEffect } from 'react'
import './productsDisplay.css'
import QuickAdd from '../../components/QuickAdd/QuickAdd'
import Loader from '../../components/Loader/Loader'
import Error from '../Error/Error'

import Auth from "../../utils/auth";

import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'


import { useQuery } from '@apollo/client';
import { QUERY_ALL_PRODUCTS, QUERY_SUBCATEGORIES, QUERY_USER } from '../../utils/queries';
import { UPDATE_FAVORITES } from '../../utils/action'
import { setStorage, getStorage, removeItem } from '../../utils/localStorage'



const ProductsDisplay = ({ name, title, productFavorite, setProductFavorite, setCount, count }) => {
  const [quickAdd, setQuickAdd] = useState(false)
  const [checkProductArray, setCheckProductArray] = useState([{}])
  

  const { loading: loadingAll, data: allData } = useQuery(QUERY_ALL_PRODUCTS)
  const { loading: loadingSubcategories, data: allSubcategories } = useQuery(QUERY_SUBCATEGORIES)


  const { data: userData } = useQuery(QUERY_USER)

  const { subcategory } = useParams();


  function showFavorite(favorite) {
    if (Auth.loggedIn()) {
      return (
        favorite ? <i className='bx bxs-heart bx-sm' ></i> : <i className='bx bx-heart bx-sm'></i>
      );
    } else {
      return (
        <Link to='/login' style={{ color: '#282F2B' }}><i className='bx bx-heart bx-sm' ></i></Link>
      );
    }
  }

  if (loadingAll || loadingSubcategories) {
    return <Loader/>;
  }

  return (
    <>
      {allSubcategories?.subcategories.find(category => category.name === subcategory) || title === 'All Lingerie' || title === 'All Fragrance'  ?
      <div className='products-display-section'>

        <div className='products-display-top'>
          <h2>{subcategory ? subcategory : title}</h2>
          <div className='filter'>
            <div className='filter-title'>
              <i className='bx bx-filter bx-sm'></i>
              <p>Filter By:</p>
            </div>
            <p>Size</p>
            <p>Color</p>
            <p>Style</p>
          </div>
          <div className='filter-categories'></div>
        </div>

        <div className='products-display-grid'>
          {allData?.products?.some(product => product.subcategory.name === subcategory) ? (

             allData?.products?.map(product => {

              if (product.subcategory.name === subcategory ) {
                return (

                  <div className='product' key={product._id}>
                    <div className='product-image'>
                    <Link to={`/product/${product._id}`} >
                      <img src={product.image[0]} />
                      </Link>
                    </div>
                    <div className='product-info'>
                      <div className='title-rating'>
                      <Link to={`/product/${product._id}`} >
                        <p>{product.name}</p>
                          </Link>
                        <div onClick={() => {
                          if (count === 0) {
                            setProductFavorite((prev) => [...prev, product._id]);
                            setStorage('isFavoriteCondition', productFavorite);
                            setCount(prev => prev + 1)
                          } else if (count === 1) {
                            removeItem('isFavoriteCondition', productFavorite, product._id)
                            console.log(productFavorite)
                            setCount(prev => prev - 1)
                          }
                        }}>
                          {showFavorite(productFavorite.find(item => item === product._id))}
                        </div>
                      </div>
                      <div className='price-favorite'>
                        <p>${product.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className='product-add' onClick={() => setQuickAdd(prevState => ({ ...prevState, [product._id]: true }))}  >
                      <p>+ Quick Add</p>
                    </div>
                    {quickAdd[product._id] && (
                      <QuickAdd
                      setQuickAdd={value => setQuickAdd(prevState => ({ ...prevState, [product._id]: value }))}
                      quickAdd={quickAdd[product._id]}
                      product={product}
                      />
                    )}
                  </div>
                );
              }
            }) 
          ) : <div className='no-products'>No products currently available.</div>}

        </div>
      </div>
     : <Error/>} 
    </>
  )
}

export default ProductsDisplay