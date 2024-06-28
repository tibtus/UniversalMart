import './styles.css';
import React, {useState} from "react";
import Header from "./layout/Header";
import Main from "./layout/Main";
import Footer from "./layout/Footer";

function App() {

    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        const updatedCart = [...cart, product];
        setCart(updatedCart);
        localStorage.setItem('selectedProducts', JSON.stringify(updatedCart));
    };


  return (
      <div className="App">
          <Header cart={cart} setCart={setCart}/>
          <Main addToCart={addToCart}/>
          <Footer/>
      </div>
  );
}

export default App;
