import React, {useEffect, useState} from 'react';
import {FaShoppingBasket, FaShoppingCart, FaTrash} from 'react-icons/fa';

import axios from "axios";

function Header({cart, setCart}) {
    const [showModal, setShowModal] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [orderBuy, setOrderBuy] = useState(false);
    const [counter, setCounter] = useState(0);

    const loadStoredProducts = () => {
        const storedProducts = JSON.parse(localStorage.getItem('selectedProducts'));
        if (storedProducts) {
            setSelectedProducts(storedProducts);
            setCounter(storedProducts.length);
        }
    };

    useEffect(() => {
        loadStoredProducts();
        const handleStorageChange = (event) => {
            if (event.key === 'selectedProducts') {
                loadStoredProducts();
            }
        };
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [cart]);


    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleDeleteProduct = (id) => {
        const updatedProducts = selectedProducts.filter(product => product.id !== id);
        setSelectedProducts(updatedProducts);
        setCounter(updatedProducts.length)
        localStorage.setItem('selectedProducts', JSON.stringify(updatedProducts));
        setCart([]);
    };

    const handleCartClick = () => {
        const storedProducts = JSON.parse(localStorage.getItem('selectedProducts'));
        if (storedProducts) {
            setSelectedProducts(storedProducts);
            setCounter(storedProducts.length);
        }
        setOrderBuy(false);
        setShowModal(true);
    };


    function formatOrder(order) {
        let formattedText = `Замовлення:\n\nfullName - ${order.fullName}\nphone - ${order.phone}\n\nДеталі замовлення:\n\n`;

        order.products.forEach((product, index) => {
            formattedText += `${index + 1} - замовлення\n`;
            formattedText += `id - ${product.id}\n`;
            formattedText += `name - ${product.name}\n`;
            formattedText += `description - ${product.description}\n`;
            formattedText += `price - ${product.price}\n\n`;
        });

        return formattedText.trim();
    }

    const to = 'tibtus@ukr.net';
    const subject = 'tibtus@ukr.net';


    const sendEmail = async (order) => {

        const text = formatOrder(order);

        try {
            await axios.post('http://localhost:5050/send', {
                to,
                subject,
                text
            });
            alert('НАДІСЛАНО');
        } catch (error) {
            alert('ПОМИЛКА НАДСИЛАННЯ');
            console.error(error);
        }
    };


    const handleConfirm = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const fullName = formData.get('fullName');
        const phone = formData.get('phone');

        const order = {
            products: selectedProducts,
            fullName: fullName,
            phone: phone
        };

        sendEmail(order);

        setOrderBuy(true);
        setCounter(0);
        setCart([]);
        setSelectedProducts([]);
        localStorage.removeItem('selectedProducts');

    };

    console.log("selectedProducts", selectedProducts)

    return (
        <div className="Header">
            <div className="wrapper wrapper_flex">
                {/*<div><img src="url/to/logo.png" alt="Logo"/></div>*/}
                <div>ABT</div>
                <div> НАЗВА</div>
                <div onClick={handleCartClick}>
                    {selectedProducts && selectedProducts.length > 0 ? (
                        <FaShoppingBasket style={{color: '#089e50'}}/>
                    ) : (
                        <FaShoppingCart/>
                    )}
                    {counter}
                </div>
            </div>

            {showModal && (
                <div className="Modal">
                    <div className="ModalContent">
                        {!orderBuy && (
                            <>
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
                                {selectedProducts && selectedProducts.length > 0 && (
                                    <>
                                        <h4>Вкажіть дані для замовлення</h4>
                                        <form onSubmit={handleConfirm}>
                                            <div className="inputGroup">
                                                <label htmlFor="fullName">ФІО</label>
                                                <input type="text" id="fullName" name="fullName" required/>
                                            </div>
                                            <div className="inputGroup">
                                                <label htmlFor="phone">Мобільний телефон</label>
                                                <input type="tel" id="phone" name="phone" required/>
                                            </div>
                                            <button className="CloseButtonConfirm" type="submit">
                                                ПІДТВЕРДІТЬ ЗАМОВЛЕННЯ
                                            </button>
                                        </form>
                                    </>
                                )}
                                <div className="CloseButton" onClick={handleCloseModal}>Закрити</div>
                            </>
                        )}
                        {orderBuy && (
                            <>
                                <h2>Дякуємо за замовлення</h2>
                                <div className="CloseButton" onClick={handleCloseModal}>Закрити</div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Header;
