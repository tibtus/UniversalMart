import React, {useState} from 'react';
import image1 from './../img/digital-pixel-camouflage.webp';
import image2 from './../img/Product/image1.webp';
import image3 from './../img/Product/image1.webp';
import image4 from './../img/Product/image1.webp';
import image5 from './../img/Product/image1.webp';
import image6 from './../img/Product/image1.webp';
import image7 from './../img/Product/image1.webp';
import image8 from './../img/Product/image1.webp';
import image9 from './../img/Product/image1.webp';

function Presentation({addToCart}) {
    const [showMore, setShowMore] = useState(false);

    const products = [
        {
            image: image1,
            name: 'Product 1',
            description: 'Description of Product 1',
            price: '$10.00',
            id: '0001',
        },
        {
            image: image2,
            name: 'Product 2',
            description: 'Description of Product 2',
            price: '$20.00',
            id: '0002',
        },
        {
            image: image3,
            name: 'Product 3',
            description: 'Description of Product 3',
            price: '$30.00',
            id: '0003',
        },
        {
            image: image4,
            name: 'Product 4',
            description: 'Description of Product 4',
            price: '$40.00',
            id: '0004',
        },
        {
            image: image5,
            name: 'Product 5',
            description: 'Description of Product 5',
            price: '$50.00',
            id: '0005',
        },
        {
            image: image6,
            name: 'Product 6',
            description: 'Description of Product 6',
            price: '$60.00',
            id: '0006',
        },
        {
            image: image7,
            name: 'Product 7',
            description: 'Description of Product 7',
            price: '$70.00',
            id: '0007',
        },
        {
            image: image8,
            name: 'Product 8',
            description: 'Description of Product 8',
            price: '$80.00',
            id: '0008',
        },
        {
            image: image9,
            name: 'Product 9',
            description: 'Description of Product 9',
            price: '$90.00',
            id: '0009',
        },
    ];

    const renderProductsLeft = () => {
        return products.slice(0, 1).map((product, index) => (
            <div className="Presentation__left" key={index}>
                {/*<div className="Presentation__left__block__top">*/}
                <img src={product.image} alt={product.name}/>
                {/*</div>*/}
                <div className="Presentation__left__block__bt">
                    <span>{product.name}</span>
                    <p>{product.description}</p>
                    <span>{product.price}</span>
                    <button onClick={() => addToCart(product)}>Купити</button>
                </div>

            </div>
        ));
    };

    const renderProductsRight = () => {
        return products.slice(1, 3).map((product, index) => (
            <div className="Presentation__right" key={index}>
                <img src={product.image} alt={product.name}/>
                <span>{product.name}</span>
                <p>{product.description}</p>
                <span>{product.price}</span>
                <button onClick={() => addToCart(product)}>Купити</button>
            </div>
        ));
    };

    const renderProductsAll = () => {
        return products.slice(4).map((product, index) => (
            <div className="Presentation__right" key={index}>
                <img src={product.image} alt={product.name}/>
                <span>{product.name}</span>
                <p>{product.description}</p>
                <span>{product.price}</span>
                <button onClick={() => addToCart(product)}>Купити</button>
            </div>
        ));
    };

    const handleShowMore = () => {
        setShowMore(true);
    };

    return (
        <div className="Presentation">
            <div>
                <h1>Гарячі новинки</h1>
            </div>
            <div className="wrapper">
                <div className="Presentation__wrapper">
                    {renderProductsLeft()}
                    {renderProductsRight()}
                    {showMore && renderProductsAll()}
                </div>
            </div>
            {!showMore && (
                <div className="wrapper All_price">
                    <button onClick={handleShowMore}>Показати ще</button>
                </div>
            )}
        </div>
    );
}

export default Presentation;
