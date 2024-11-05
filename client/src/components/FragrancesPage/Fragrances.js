import React from 'react';
import './fragrances.css';
import zazaPerfume from '../../assets/images/zazaperfume.png';
import zazaMini from '../../assets/images/zazaminiperfume.png';
import zazaLotion from '../../assets/images/zazalotion.jpg';
import zazaCandle from '../../assets/images/zazacandle.png';
import { Link } from 'react-router-dom';

function Fragrances() {
  return (
    <div className='scents-container'>
      <Link to='/fragrance'>
      <div className='scent-item'>
        <img src={zazaPerfume} alt='ZazaPerfume' />
        <div className='fragrance-cover'>
          <h4 className='scent-title'>
            Fragrance
          </h4>
        </div>
      </div>
      </Link>
      <Link to='/fragrance/Parfum'>
      <div className='scent-item'>
        <img src={zazaMini} alt='ZazaMiniPerfume' />
        <div className='fragrance-cover'>
          <h4 className='scent-title'>
            Petite Fragrance
          </h4>
        </div>
      </div>
      </Link>
      <Link to='/fragrance/Hand Cream'>
      <div className='scent-item'>
        <img src={zazaLotion} alt='ZazaLotion' />
        <div className='fragrance-cover'>
          <h4 className='scent-title'>
            Emollient
          </h4>
        </div>
      </div>
      </Link>
      <Link to='/fragrance/Candles'>
      <div className='scent-item'>
        <img src={zazaCandle} alt='ZazaCandle' />
        <div className='fragrance-cover'>
          <h4 className='scent-title'>
            Candle
          </h4>
        </div>
      </div>
      </Link>
    </div>
  )
}

export default Fragrances