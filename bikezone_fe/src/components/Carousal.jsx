
import { Carousel } from 'flowbite-react';

const Carousal = ({ images }) => {
    return (
        <Carousel>
            {images.map((url, index) => (
                <img key={index} alt={`Carousel Image ${index}`} src={url} />
            ))}

        </Carousel>
    )
}

export default Carousal


