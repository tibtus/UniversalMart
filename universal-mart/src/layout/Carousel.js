import React, {useState} from 'react';

const images = [
    'https://via.placeholder.com/1920x600?text=Image+1',
    'https://via.placeholder.com/1920x600?text=Image+2',
    'https://via.placeholder.com/1920x600?text=Image+3'
];

function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <div className="carousel">
            <button className="carousel__button carousel__button--left" onClick={goToPrevious}>
                &lt;
            </button>
            <div className="carousel__image-container">
                <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="carousel__image"/>
            </div>
            <button className="carousel__button carousel__button--right" onClick={goToNext}>
                &gt;
            </button>
        </div>
    );
}

export default Carousel;
