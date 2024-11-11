import React from 'react';
import './home-page.css';
import swimwearSet from '../../assets/images/swimwearset.jpeg';
import bansSet from '../../assets/images/braandpanniesset.jpeg';
import lingerieSet from '../../assets/images/lingerieset.jpeg';
import pajamaSet from '../../assets/images/pajamassetjpg.jpg';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
            <div className="homepage-wrapper-home">
                <div className="border-with-icons">
                    <div className="icon-container">
                        <div className="icon-item">
                            <Icon icon="mdi:truck-shipping" width="44" />
                            <p className='icon-p'>Online shipping and discount prices on</p>
                        </div>
                        <div className="icon-item">
                            <Icon icon="majesticons:creditcard-line" width="44" />
                            <p className='icon-p'>We ensure secure payments at checkout</p>
                        </div>
                        <div className="icon-item">
                            <Icon icon="mdi:user" width="44" />
                            <p className='icon-p'>Private information of our users is always protected</p>
                        </div>
                    </div>
                </div>
            </div>
        
    );
}

export default HomePage