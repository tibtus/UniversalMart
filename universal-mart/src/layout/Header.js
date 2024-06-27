import React, {useEffect, useState} from 'react';
import {FaShoppingCart, FaTrash} from 'react-icons/fa';
import axios from "axios";

function Header() {
    const [showModal, setShowModal] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [orderBuy, setOrderBuy] = useState(false);

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
        setOrderBuy(false);
        setShowModal(true);
    };

    const to = 'tibtus@ukr.net';
    const subject = 'tibtus@ukr.net';


    const sendEmail = async (order) => {

        try {
            await axios.post('http://localhost:5000/send', {
                to,
                subject,
                order
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
        localStorage.removeItem('selectedProducts');

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
