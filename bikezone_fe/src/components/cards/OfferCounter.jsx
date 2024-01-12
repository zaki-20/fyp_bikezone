import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react'
import timerAnimation from '../../assets/animated/timer.json'

const OfferCounter = ({ targetDate, discount }) => {
    // Set the date we're counting down to
    const countDownDate = new Date(targetDate).getTime();

    // State variables for countdown values
    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        // Update the count down every 1 second
        const intervalId = setInterval(() => {
            // Get today's date and time
            const now = new Date().getTime();

            // Find the distance between now and the count down date
            const distance = (countDownDate - now) ;
           

            // Time calculations for days, hours, minutes, and seconds
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Update state with countdown values
            setCountdown({
                days,
                hours,
                minutes,
                seconds,
            });

            // If the count down is over, clear the interval and update the display
            if (distance < 0) {
                clearInterval(intervalId);
                setCountdown({
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                });
            }
        }, 1000);

        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
    }, [countDownDate]);

    return (

        <>
            <div className={countdown.days === 0 && countdown.hours === 0 && countdown.minutes === 0 && countdown.seconds === 0 ? `hidden` : `flex justify-center py-4 `}>
                <div className=" rounded-lg shadow-lg px-8 py-4 bg-[#122222]">
                    <div className="flex flex-col gap-1 items-center justify-between">
                        <h3 className="text-2xl font-bold text-yellow-400">Special Offer <span className='text-lime-800'>{`${discount}% `}</span>Discount</h3>
                        <span id="countdown" className="text-2xl  text-white flex items-center justify-center">
                            {countdown.days}d {countdown.hours}h {countdown.minutes}m {countdown.seconds}s <span>
                                <Lottie
                                    className=" h-14 w-14 "
                                    animationData={timerAnimation}
                                />
                            </span>

                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OfferCounter;
