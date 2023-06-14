import React from 'react';

// Assets
import Loader from '../../Assets/loading.png';

// styles
import './LoadingSpinner.scss'

function LoadingSpinner() {
    return (
        <div id="app-spinner" >
            <img src={Loader} className='animated-logo' alt='loading' />
        </div>

    )
}

export default LoadingSpinner;