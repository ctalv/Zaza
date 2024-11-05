import React from 'react';
import './Sleep-wear.css';
import sleepWearImg from '../../assets/images/sleepwearimg.jpg';
import whiteLingerie from '../../assets/images/whitelingerie.jpg';
import { Link } from 'react-router-dom'

function SleepWear() {
    return (
        <div className='sleepwear-wrapper'>
            <div>
                <div className='sleepwear-images'>
                    <div className="sleepwearimg">
                        <img src={sleepWearImg} alt="woman lounging on chair" />
                    </div>
                    <div className="whitelingerieimg">
                        <img src={whiteLingerie} alt="woman in white lingerie in the sun"/>
                    </div>
                </div>
                <div className='sleepwear-text'>
                    <div className="sleepwear-title">
                        <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
                    </div>
                    <div className='sleepwear-button'>
                        <Link to='/lingerie/Bras & Panties'><button>Bras & Panties</button></Link>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default SleepWear