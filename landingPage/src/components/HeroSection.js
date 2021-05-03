import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';


function HeroSection() {
    return (
        <div className='hero-container'>
            <video src='/videos/video-1.mp4' autoPlay loop muted />
            <h1>PADARIA DELIVERY</h1>
            <p>Um novo jeito de pedir seu cafézinho!</p>
            <div className='hero-btns'>
            {/*}
                <Button className='btns' buttonStyle='btn--outline'
                    buttonStyle='btn--large'>START</Button>

                <Button className='btns' buttonStyle='btn--primary'
                    buttonStyle='btn--large'>Assista o TRAILER<i className='far fa-play-circle'/>
                </Button>
            */}
            </div>
        </div>
    )
}


export default HeroSection