import React from 'react';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';

const HeroSection = () => {
    return (
        <section className="relative overflow-hidden">
            <video
                autoPlay
                loop
                muted
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source
                    src="bike.mp4"
                    type="video/mp4"
                />
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-transparent"></div>
            <div className="relative max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
                <div
                    className="w-full z-20 text-center sm:text-left ">
                    <h1 className="text-3xl py-4 text-white font-bold sm:text-5xl">
                        Let us find your
                        <strong className="block font-bold text-[#122222] ">
                            desired products
                        </strong>

                    </h1>
                    <TypeAnimation
                        sequence={[
                            'We provide best bike parts',
                            1000,
                            'We provide best bike accessories',
                            1000,
                            'We provide best bike gears',
                            1000,
                            'We provide best bike safety',
                            1000
                        ]}
                        wrapper="p"
                        speed={50}
                        className='text-3xl text-white  font-bold sm:text-3xl md:text-4xl lg:text-5xl '
                        repeat={Infinity}
                    />
                    <p className="mt-4 max-w-lg sm:text-xl/relaxed text-white font-semibold">
                        Your biking hub for bikes, accessories, rentals, and workshops.
                        Join the community and explore the ride!
                    </p>
                    <div className="mt-8 flex flex-wrap gap-4 text-center">
                        <Link
                            to="/login"
                            className="block custom-cursor w-full rounded border bg-[#122222] px-12 py-3 text-sm font-medium text-white shadow hover:bg-[#122222] hover:bg-[#122222]/60 order sm:w-auto duration-300"
                        >
                            Get Started
                        </Link>
                        <Link
                            to="/about"
                            className="block w-full rounded border bg-white px-12 py-3 text-sm font-medium hover:bg-white/40 sm:w-auto duration-300 "
                        >
                            Learn More
                        </Link>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
