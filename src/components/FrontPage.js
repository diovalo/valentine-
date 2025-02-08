import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie';
import { Link } from 'react-router-dom';
import bg from './assets/images/page-1_bg.png';
import heartAnimation from './assets/animations/floating_hearts.json';
import './styles/frontpage.css';

export default function FrontPage() {
    const [text, setText] = useState('');
    const sentence = "We have known each other from a long time but today I have something important to tell you...\n";
    const typingSpeed = 200; // Adjust typing speed here

    useEffect(() => {
        const typeSentence = (index) => {
            if (index < sentence.length) {
                setText(sentence.substring(0, index + 1));
                setTimeout(() => {
                    typeSentence(index + 1);
                }, typingSpeed);
            } else {
                document.getElementById('message-button').classList.remove('hidden')
            }
        };

        typeSentence(0);

        setTimeout(() => {
            document.getElementById('front-page').classList.remove('opacity-80');
            document.getElementById('front-page').classList.add('opacity-100');
        }, 100);
    }, []);

    const floatingHeartAnimation = {
        loop: true,
        autoplay: true,
        animationData: heartAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        },
    };

    return (
        <div id='front-page' className='min-h-screen opacity-80 overflow-hidden w-full flex items-center justify-center flex-col gap-16 transition-opacity duration-200 ease-in-out bg-transparent bg-gradient-to-r from-[#c33764] to-[#1d2671]' >
            <img src={bg} alt="" className='absolute min-h-screen object-cover pointer-events-none overflow-hidden' />
            <div className="absolute pointer-events-none">
                <Lottie
                    options={floatingHeartAnimation}
                    height={230}
                    width={230}
                    isClickToPauseDisabled={true}
                />
            </div>
            <div className="heart opacity-75 relative">
                <div className="heart-content absolute w-full h-full flex flex-col justify-center items-center">
                    <div className="poem-text rotate-45 flex flex-col items-center justify-center w-full h-full">
                        <div className="text-wrapper">
                            <p className='text-font custom-color-text'>
                                In the midst of life's
                            </p>
                            <p className='text-font custom-color-text'>
                                tumultuous sea,
                            </p>
                            <p className='text-font custom-color-text'>
                                Amidst chaos and
                            </p>
                            <p className='text-font custom-color-text'>
                                uncertainty,
                            </p>
                            <p className='text-font custom-color-text'>
                                I found my anchor,
                            </p>
                            <p className='text-font custom-color-text'>
                                my guiding light,
                            </p>
                            <p className='text-font custom-color-text'>
                                In your love,
                            </p>
                            <p className='text-font custom-color-text'>
                                serene and bright.
                            </p>
                            <p className='text-author mt-2 text-white'>~ Dhawal</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content-ask text-white z-10 flex flex-col flex-wrap gap-6 justify-center items-center">
                <div className="text px-8">
                    <p className='sm:text-5xl text-3xl typing-text text-transparent bg-clip-text bg-gradient-to-br from-[#ff9966] to-[#36d1dc] shadow-pink-800 select-none'>{text}</p>
                </div>

                <Link to='/envelope'><button id='message-button' className="hidden transition-all duration-200 button button-text shadow-[5px_5px_0px_0px_rgba(109,40,217)] active:translate-x-1 active:translate-y-1 active:shadow-none mt-4 lg:text-xl box-shado w-fit h-fit bg-gradient-to-r from-[#FFECD2] to-[#FCB69F] py-4 px-5 rounded-md hover:scale-110 active:scale-90 duration-200">
                    <div className="w-fit h-fit text-transparent bg-clip-text bg-gradient-to-r from-[#C33764] to-[#1D2671] font-bold">
                        <span className='select-none'>See Message</span>
                    </div>
                </button>
                </Link>
            </div>
        </div>
    );
}