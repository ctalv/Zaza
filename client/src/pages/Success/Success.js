import React, {useEffect} from 'react'
import './success.css'
import { useMutation } from '@apollo/client';
import { ADD_ORDER } from '../../utils/mutations';
import { idbPromise } from '../../utils/helpers';

import { Link } from 'react-router-dom'

const Success = () => {
  const [addOrder] = useMutation(ADD_ORDER);

  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise('cart', 'get');
      const products = cart.map((item) => item._id);

      if (products.length) {
        const { data } = await addOrder({ variables: { products } });
        const productData = data.addOrder.products;

        productData.forEach((item) => {
          idbPromise('cart', 'delete', item);
        });
      }

      setTimeout(() => {
        window.location.assign('/');
      }, 3000);
    }

    saveOrder();
  }, [addOrder]);

  return (
    <div className='success-page'>
      <div className='success-card'>
        <div className='top-portion'>
          <div className='check-mark'>
            <i className='bx bxs-check-circle'></i>
          </div>
        </div>
        <div className='bottom-portion'>
          <p>Payment was successful! If this<br/> page doesn't redirect, please click the button below.</p>
          <Link to='/'><button>RETURN HOME</button></Link>
        </div>
      </div>
    </div>
  )
}

export default Success