import React, {useState} from 'react';

function Presentation({addToCart,}) {

    const [showMore, setShowMore] = useState(false);
    // const [cart, setCart] = useState([]);


    const products = [
        {
            image: 'path/to/image1.jpg',
            name: 'Product 1',
            description: 'Description of Product 1',
            price: '$10.00',
            id: '0001',
        },
        {
            image: 'path/to/image2.jpg',
            name: 'Product 2',
            description: 'Description of Product 2',
            price: '$20.00',
            id: '0002',
        },
        {
            image: 'path/to/image3.jpg',
            name: 'Product 3',
            description: 'Description of Product 3',
            price: '$30.00',
            id: '0003',
        },
        {
            image: 'path/to/image4.jpg',
            name: 'Product 4',
            description: 'Description of Product 14',
            price: '$550.00',
            id: '0004',
        },
        {
            image: 'path/to/image5.jpg',
            name: 'Product 5',
            description: 'Description of Product 5',
            price: '$520.00',
            id: '0005',
        },
        {
            image: 'path/to/image6.jpg',
            name: 'Product 6',
            description: 'Description of Product 6',
            price: '$60.00',
            id: '0006',
        },
        {
            image: 'path/to/image7.jpg',
            name: 'Product 7',
            description: 'Description of Product 7',
            price: '$70.00',
            id: '0007',
        },
        {
            image: 'path/to/image8.jpg',
            name: 'Product 8',
            description: 'Description of Product 8',
            price: '$80.00',
            id: '0008',
        },
        {
            image: 'path/to/image9.jpg',
            name: 'Product 9',
            description: 'Description of Product 9',
            price: '$7880.00',
            id: '0009',
        },
    ];

    // const addToCart = (product) => {
    //     const updatedCart = [...cart, product];
    //     setCart(updatedCart);
    //     localStorage.setItem('selectedProducts', JSON.stringify(updatedCart));
    // };

    const renderProductsLeft = () => {
        return products.slice(0, 1).map((product, index) => (

            <div className="Presentation__left" key={index}>
                <span>{product.name}</span>
                <p>{product.description}</p>
                <span>{product.price}</span>
                <button onClick={() => addToCart(product)}>Купити</button>
            </div>

        ));
    };

    const renderProductsRight = () => {
        return products.slice(1, 3).map((product, index) => (
            <div className="Presentation__right" key={index}>
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

