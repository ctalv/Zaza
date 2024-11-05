import React, { useEffect } from 'react'
import './cart.css'
import '../Search/search.css'

import { loadStripe } from '@stripe/stripe-js';

import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import {
  ADD_MULTIPLE_TO_CART,
  CLEAR_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY
} from '../../utils/action';

import Counter from '../Counter/Counter';
import image from '../../assets/images/ableton4.jpg'
import { Link } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const CartCopy = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      console.log('Fetching cart data...');
      try {
        const cart = await idbPromise('cart', 'get');
        console.log('Fetched cart data:', cart);
        dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    }

      if (!state.cart.length) {
        getCart();
      }
    }, [state.cart.length, dispatch]);

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function calculateTotalItems() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item
    })
  }

  function submitCheckout() {
    getCheckout({
      variables: {
        products: [...state.cart],
      },
    });
  }

  const removeFromCart = item => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id
    });
    idbPromise('cart', 'delete', { ...item });

  };

  const onChange = (counter, _id) => {
    const value = counter;
    if (value === '0') {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: _id
      });
      idbPromise('cart', 'delete', _id);
    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(value)
      });
      idbPromise('cart', 'put', { _id, purchaseQuantity: parseInt(value) });
    }
  }
 console.log(state.carts)

  // const addToCart = () => {
  //   const itemInCart = state.cart.find((cartItem) => cartItem._id === item._id)
  //   if (itemInCart) {
  //     dispatch({
  //       type: UPDATE_CART_QUANTITY,
  //       _id: item._id,
  //       purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
  //     });
  //     idbPromise('cart', 'put', {
  //       ...itemInCart,
  //       purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
  //     });
  //   } else {
  //     dispatch({
  //       type: ADD_TO_CART,
  //       product: { ...item,
  //            purchaseQuantity: 1,
  //           //  sizeSelected: { 
  //           //     topSizes: selectedSizes.topSizes,
  //           //     bottomSizes: selectedSizes.bottomSizes,
  //           //     cupSizes: selectedSizes.cupSizes,
  //           //     bandSizes: selectedSizes.cupSizes,
  //           //     sizes: selectedSizes.sizes
  //           // }, 
  //         }

  //     });
  //     idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
  //   }
  // }

  function calculateTotalItems() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.purchaseQuantity;
    });
    return sum;
  }


  return (
    <div className='main-cart-container'>
      <div className=' main-cart-content'>
        {/* <h2>Your Cart ({state.cart.length ? state.cart.length : 0})</h2> */}
       
        <h2>Your Cart ({calculateTotalItems()})</h2>

        <div className='main-cart-border main-cart-wrapper'>

          {state.cart.length ?
            (
              <>
      {/* Repeated Div */}
                {state.cart.map(cartItem => (
                  <div className='main-cart' key={cartItem._id}>
                    <div className='main-cart-image'>
      {/* Links to detail page by id */}
                      <Link to={`/product/${cartItem._id}`}>
                        <img src={cartItem.image[0]} alt={cartItem.description} />
                      </Link>
                    </div>
                    <div className='main-cart-info'>
                      <div className='main-cart-title-price'>
                        <p>{cartItem.name}</p>
                        <h4>${cartItem.price}</h4>
                      </div>
                      <Counter
                        counter={cartItem.purchaseQuantity}
                        setCounter={(e) => onChange(e, cartItem._id)}
                      />

                      <div className='main-cart-size-trash'>
        {/* size */}
                        <p>M,L</p>

                        <i onClick={() => removeFromCart(cartItem)} className='bx bx-trash' ></i>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )
            :
            (<div className='no-products'>
              <p>Your bag is empty. Want to add to it?</p>
              <Link to='/lingerie'><button>Shop Now</button></Link>
            </div>)}



        </div>
      </div>
      <div className='main-cart-border main-cart-checkout'>
        <p>Subtotal</p>
        <p className='main-cart-total'>${calculateTotal()}</p>
        <button>CHECKOUT</button>
      </div>
    </div>
  )
}

export default CartCopy