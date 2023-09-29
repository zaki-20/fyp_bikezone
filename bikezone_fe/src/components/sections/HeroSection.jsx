import React from 'react';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';



const HeroSection = () => {
    return (
        <section className="relative">
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
            <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
                <div className="max-w-xl text-center sm:text-left">
                    <h1 className="text-3xl text-white font-extrabold sm:text-5xl">
                        Let us find your
                        <strong className="block font-extrabold text-[#122222] ">
                            desired products
                        </strong>

                    </h1>
                    <TypeAnimation
                        sequence={[
                            // Same substring at the start will only be typed out once, initially
                            'We provide best bike parts',
                            1000, // wait 1s before replacing "Mice" with "Hamsters"
                            'We provide best bike accessories',
                            1000,
                            'We provide best bike gears',
                            1000,
                            'We provide best bike safety',
                            1000
                        ]}
                        wrapper="p"
                        speed={50}
                        className='text-3xl text-white font-bold sm:text-5xl md:w-[800px] '
                        repeat={Infinity}
                    />
                    <p className="mt-4 max-w-lg sm:text-xl/relaxed text-white font-semibold">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
                        illo tenetur fuga ducimus numquam ea!
                    </p>
                    <div className="mt-8 flex flex-wrap gap-4 text-center">
                        <Link
                            to="#"
                            className="block w-full rounded border bg-[#122222] px-12 py-3 text-sm font-medium text-white shadow hover:bg-[#122222] hover:bg-[#122222]/60 order sm:w-auto duration-300"
                        >
                            Get Started
                        </Link>
                        <Link
                            to="#"
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
