import React, { useState, useEffect } from 'react'
import './cart-summary.css'
import { Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

import { idbPromise } from '../../utils/helpers';

import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { CLEAR_CART, REMOVE_FROM_CART, UPDATE_CART_QUANTITY, ADD_MULTIPLE_TO_CART } from '../../utils/action';

import image from '../../assets/images/jakob-owens-z5iB1iKuXEs-unsplash.jpg'
import Counter from '../Counter/Counter';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const CartSummary = ({ setCartOpen, cartOpen, item }) => {
    const [counter, setCounter] = useState(1);

    const [state, dispatch] = useStoreContext();

    useEffect(function () {
        if (item) {

            dispatch({
                type: UPDATE_CART_QUANTITY,
                ...item,
                purchaseQuantity: parseInt(counter)
            });
            idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(counter) });
        }

    }, [counter])

    useEffect(() => {
        if (!state.cart.length) {
            async function getCart() {
                try {
                    const cart = await idbPromise('cart', 'get');

                    dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
                } catch (error) {
                    console.error('Error fetching cart data:', error);
                }
            }

            getCart();
        }
    }, [state.cart.length, dispatch]);


    function handleClear() {
        idbPromise('cart', 'deleteAll').then((item) => {
            dispatch({
                type: REMOVE_FROM_CART,
                ...item,
                products: [...item]
            });
            idbPromise('cart', 'delete', ...item);
        });
    }


    function calculateTotal() {
        let sum = 0;
        state.cart.forEach((item) => {
            sum += item.price * item.purchaseQuantity;
        });
        return sum.toFixed(2);
    }

    const onChange = (counter, item) => {
        const value = counter;
        if (value === '0') {
            dispatch({
                type: REMOVE_FROM_CART,
                _id: item._id
            });
            idbPromise('cart', 'delete', item._id);
        } else {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                ...item,
                purchaseQuantity: parseInt(value)
            });
            idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });
        }
    }

    const removeFromCart = item => {
        dispatch({
            type: REMOVE_FROM_CART,
            _id: item._id
        });
        idbPromise('cart', 'delete', { ...item });

    };

    function calculateTotalItems() {
        let sum = 0;
        state.cart.forEach((item) => {
            sum += item.purchaseQuantity;
        });
        return sum;
    }


    return (
        <div className='cart-page' style={{ visibility: cartOpen ? 'visible' : 'hidden' }} onMouseEnter={() => setCartOpen(true)} onMouseLeave={() => setCartOpen(false)}>
            <h3>Your Bag ({state.cart.length ? calculateTotalItems() : 0})</h3>

            {state.cart.length ?
                (
                    <>
                    <div className='cart-display'>
                        {state.cart.map((item) => (
                            
                                <div className='cart-summary-item'>
                                    <div className='cart-summary-item-image'>
                                        <img src={item.image[0]} alt='' />
                                    </div>
                                    <div className='cart-summary-content'>
                                        <p className='cart-summary-title'>{item.name}</p>
                                        <div className='price-counter'>
                                            <p>${item.price.toFixed(2)}</p>
                                            <Counter
                                                counter={item.purchaseQuantity}
                                                setCounter={(e) => onChange(e, item)}
                                            />
                                        </div>
                                        <div className='size-delete-item'>
                                            <i onClick={() => removeFromCart(item)} className='bx bxs-trash' ></i>
                                        </div>
                                    </div>
                                </div>
                        ))}
                        </div>

                        <div className='total-clear-all'>
                            <p onClick={handleClear}>Clear All</p>
                            <h4>${calculateTotal()}</h4>
                        </div>
                        <div className='cart-checkout'>
                            <Link to='/cart'><button>VIEW CART</button></Link>
                        </div>
                    </>
            ) : (
                    <>

                        <div className='no-products'>
                            <p>Your bag is empty. Want to add to it?</p>
                            <Link to='/lingerie'><button>Shop Now</button></Link>
                        </div>
                    </>
                )
            }
           
        </div>

    )
}


export default CartSummary