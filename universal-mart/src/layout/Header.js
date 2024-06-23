import React, {useEffect, useState} from 'react';
import {FaShoppingCart, FaTrash} from 'react-icons/fa'; // Передбачаючи, що ви встановили бібліотеку react-icons

function Header() {
    const [showModal, setShowModal] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem('selectedProducts'));
        if (storedProducts) {
            setSelectedProducts(storedProducts);
        }
    }, []);


    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleDeleteProduct = (id) => {
        const updatedProducts = selectedProducts.filter(product => product.id !== id);
        setSelectedProducts(updatedProducts);
        localStorage.setItem('selectedProducts', JSON.stringify(updatedProducts));
    };

    const handleCartClick = () => {
        const storedProducts = JSON.parse(localStorage.getItem('selectedProducts'));
        if (storedProducts) {
            setSelectedProducts(storedProducts);
        }
        setShowModal(true);
    };


    return (
        <div className="Header">
            <div className="wrapper wrapper_flex">
                <div><img src="url/to/logo.png" alt="Logo"/></div>
                <div> НАЗВА</div>
                <div onClick={handleCartClick}><FaShoppingCart/></div>
            </div>

            {showModal && (
                <div className="Modal">
                    <div className="ModalContent">

                        <h2>Обрані товари</h2>
                        <ol>
                            {selectedProducts.map((product, index) => (
                                <li key={index}>
                                    <div>
                                        <span>{product.name}</span>
                                        <span> - </span>
                                        <span>{product.price}</span>
                                        <span> - </span>
                                        <button onClick={() => handleDeleteProduct(product.id)}>
                                            <FaTrash/>
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ol>
                        <div className="CloseButton" onClick={handleCloseModal}>Закрити</div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Header;
