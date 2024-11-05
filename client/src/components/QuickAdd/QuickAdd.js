import React, { useState } from 'react'
import './quick-add.css'
import SizeSelect from '../SizesSelect/SizeSelect'
import imageSize from '../../assets/images/hao.jpg'
import image from '../../assets/images/ableton4.jpg'

import { idbPromise } from '../../utils/helpers';
import { UPDATE_CART_QUANTITY, ADD_TO_CART } from '../../utils/action';
import { Link } from 'react-router-dom'
import { useStoreContext } from "../../utils/GlobalState";

function QuickAdd({ setQuickAdd, quickAdd, product }) {
    const [imageSrc, setImageSrc] = useState(imageSize)
    const [state, dispatch] = useStoreContext();

    const { cart } = state

    const [backgroundHover, setBackgroundHover] = useState({})


    const { __typename, ...filteredItem } = product;

    const keysToCheck = ['topSizes', 'bottomSizes', 'cupSizes', 'bandSizes', 'sizes'];


    // keysToCheck.map(sizeGuide => {
    //     if (product.hasOwnProperty(sizeGuide)) {
    //         console.log(sizeGuide)
    //         console.log(product[sizeGuide])
    //         // return (
    //         //     <SizeSelect
    //         //         key={sizeGuide}
    //         //         sizeGuide={sizeGuide}
    //         //         sizeData={product[sizeGuide]}
    //         //     />
    //         // );
    //     }
    //     // return null
    // })
    console.log(filteredItem)


    const addToCart = () => {
        const itemInCart = cart.find((cartItem) => cartItem._id === filteredItem?._id)
        if (itemInCart) {
          dispatch({
            type: UPDATE_CART_QUANTITY,
            _id: filteredItem._id,
            purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
          });
          idbPromise('cart', 'put', {
            ...itemInCart,
            purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
          });
        } else {
          dispatch({
            type: ADD_TO_CART,
            product: { 
                ...filteredItem,
                purchaseQuantity: 1,
            }
            
          });
          idbPromise('cart', 'put', {  
            ...filteredItem,
            purchaseQuantity: 1,
        });
        }
      }

    const defaultImage = filteredItem.image[0];


    return (
        <div className='quick-add' style={{ visibility: quickAdd ? 'visible' : 'hidden' }}>
            <div className={quickAdd ? 'quick-add-modal open' : 'quick-add-modal close'}>
                <div className='modal-images'>
                    <div className='all-images'>
                    {filteredItem.image.map(image => (
                            <div className='image' key={image}>
                                <img src={image} alt='' onMouseEnter={(e) => setBackgroundHover(e.target.src)} onLoad={(e) => setBackgroundHover(defaultImage) } />
                            </div>
                        ))}
                    </div>
                    {/* <div className='detail-main-image' style={{backgroundImage: backgroundHover ? `url(${backgroundHover})` : `url${item.image[0]}` }}> */}
                    <div className='displayed-image'   style={{ backgroundImage: `url(${backgroundHover})` }}>
                    </div>

                        {/* {filteredItem?.image?.map(image => (
                            <div className='image'>
                                <img src={image} alt='image description' onMouseEnter={(e) => setImageSrc(e.target.src)} />
                            </div>
                        ))}
                    </div>
                    <div className='displayed-image' style={{ backgroundImage: `url(${imageSrc})` }}>
                    </div> */}
                </div>
                <div className='modal-content'>
                    <div className='name-favorite'>
                        <div className='name'>
                            <p>{filteredItem?.subcategory?.name}</p>
                            <p>{filteredItem?.name}</p>
                        </div>
                        <div className='favorite'>
                            <i className='bx bx-heart bx-md' ></i>
                        </div>
                    </div>
                    <div className='price'>
                        <p>${filteredItem?.price.toFixed(2)}</p>
                    </div>
                    <div className='size-guide'>
                        <p>Size Guide</p>
                    </div>
                    <div>
                        {keysToCheck.map(sizeGuide => {
                            if (filteredItem?.hasOwnProperty(sizeGuide) && filteredItem[sizeGuide]?.length) {
                                return (
                                    <SizeSelect
                                        key={sizeGuide}
                                        sizeGuide={sizeGuide}
                                        sizeData={filteredItem[sizeGuide]}
                                    />
                                );
                            }
                        })}
                    </div>
                    <div className='add-to-bag'>
                        <h4 onClick={addToCart}>+ Add to Bag</h4>
                    </div>
                    <div className='full-details'>
                        <Link to={`/product/${filteredItem?._id}`} >
                            <p>View full details</p>
                        </Link>
                    </div>
                    <div className='close-btn'>
                        <button onClick={() => setQuickAdd(false)}>CLOSE</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuickAdd