import React from "react";
import Carousel from "./Carousel";
import Presentation from "./Presentation";

function Main({addToCart}) {
    return (
        <div className="Main">
            <div className="wrapper__wit">
                <Carousel/>
                <Presentation addToCart={addToCart}/>
            </div>
        </div>
    );
}

export default Main;
