import React from 'react';

import honda from "../../assets/honda.png";
import suzuki from "../../assets/suzuki.png";
import superPower from "../../assets/superpower.png";
import superStar from "../../assets/superstar.png";
import unique from "../../assets/unique.png";
import crown from "../../assets/crown.png";
import eagle from "../../assets/eagle.png";
import united from "../../assets/united.png";
import zxmco from "../../assets/zxmco.png";
import roadPrince from "../../assets/roadprince.png";
import yamaha from "../../assets/yamaha.png";

const Brands = () => {
    return (
        <div className="flex flex-wrap justify-center p-16 gap-6 bg-gradient-to-bl from-gray-200 via-gray-400 to-gray-600">
            {[
                { image: honda, name: "Honda" },
                { image: united, name: "United" },
                { image: suzuki, name: "Suzuki" },
                { image: yamaha, name: "Yamaha" },
                { image: roadPrince, name: "Road Prince" },
                { image: superPower, name: "Super Power" },
                { image: superStar, name: "Super Star" },
                { image: unique, name: "Unique" },
                { image: crown, name: "crown" },
                { image: eagle, name: "eagle" },
                { image: zxmco, name: "zxmco" },
                // Add more brand objects here
            ].map((brand, index) => (
                <div className="max-w-sm overflow-hidden s m-4 hover:shadow-lg hover:shadow-yellow-400  hover:scale-105 duration-200" key={index}>
                    <img src={brand.image} alt={`${brand.name} Logo`} className="w-full h-40 object-cover" />
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">{brand.name}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Brands;
