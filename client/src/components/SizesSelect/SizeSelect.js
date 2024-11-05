import React, { useState, useEffect } from 'react';
import './sizes-select.css'

function SizeSelect(props) {
    const [selectedSizes, setSelected] = useState({});

    function handleSizeSelection(guide, selected) {
        setSelected(prevSelected => ({
            ...prevSelected,
            [guide]: selected
        }));
    }
    // function handleSizeSelection(sizeGuide, sizeSelected) {
    //     setSelectedSizes(prevSelectedSizes => ({
    //         ...prevSelectedSizes,
    //         [sizeGuide]: sizeSelected
    //     }));
    // }

    useEffect(() => {
        setSelected({
            topSizes: '',
            bottomSizes: '',
            cupSizes: '',
            bandSizes: '',
            sizes: '',
            colors: '',
            scents: ''
        });
    }, []);

    function fancyString(string) {

        if (string === 'topSizes') {
            return 'Top Sizes'
        }
        if (string === 'bottomSizes') {
            return 'Bottom Sizes'
        }
        if (string === 'cupSizes') {
            return 'Cup Sizes'
        }
        if (string === 'bandSizes') {
            return 'Band Sizes'
        }
        if (string === 'sizes') {
            return 'Sizes'
        }
        if (string === 'colors') {
            return 'Colors'
        }
        if (string === 'scents') {
            return 'Scents'
        }
    }


    return (
        <div className='sizes'>
            <div className='each-size'>
                <p>{fancyString(props.sizeGuide)}:</p>
                <div className='size-list'>
                    {props.sizeData && props.sizeData.map(size => (
                        <div
                            key={size}
                            className={`size-option ${props.selectedSize === size ? 'selected' : ''}`}
                            onClick={() => handleSizeSelection(props.sizeGuide, size)}
                        >
                            <p>{size}</p>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    )
}

export default SizeSelect