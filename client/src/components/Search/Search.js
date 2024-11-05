import React, { useState } from 'react'
import './search.css'

import { QUERY_ALL_PRODUCTS } from '../../utils/queries'
import { useQuery } from '@apollo/client'
import Loader from '../Loader/Loader'
import { Link } from 'react-router-dom'

function Search({ setSearchOpen, searchOpen }) {
    const {loading, data} = useQuery(QUERY_ALL_PRODUCTS)

    const [searchFilter, setSearchFilter] = useState()


    function handleSearch(e) {
        setSearchFilter(data?.products?.filter(product => {
            return product.name.toLowerCase().includes(e.target.value.toLowerCase())
        }))
    }

    if (loading) return <Loader/>

    console.log(searchFilter)

  return (
    <div className={searchOpen ? 'search-page open': 'search-page'}>
    <div className={searchOpen ? 'search-container open' : 'search-container close'}>
        <div className='search-close'>
            <div className='search'>
                <i className='bx bx-search bx-sm'></i>
                <input type='text' placeholder='Search' onChange={handleSearch}/>
            </div>
            <div className='close'>
                <i className='bx bx-x' onClick={() => setSearchOpen(false)}></i>
            </div>
        </div>
        <div className='search-products'>
            <p className='results'>{searchFilter?.length ? searchFilter?.length : 0} Result{searchFilter?.length === 1 ? '' : 's'}</p>
            <div className='product-wrapper'>
                {searchFilter?.length ? searchFilter?.map(product => {
                    return (
                    <Link to={`/product/${product._id}`}>
                        <div key={product._id} className='products' onClick={() => setSearchOpen(false)}>
                            <div className='products-image'>
                                <img src={product.image[0]} alt={product.name}/>
                            </div>
                            <div className='products-info'>
                                <p>{product.name}</p>
                                <p>${product.price.toFixed(2)}</p>
                            </div>
                        </div>
                    </Link>
                )
                }) : <div className='no-display'><p>No products displayed</p></div>}
                
            </div>
        </div>
    </div>
    </div>
  )
}

export default Search