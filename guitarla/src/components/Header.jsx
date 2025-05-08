//import { Fragment }  from "react"
//import React from "react"

import Cart from "./Cart"

// Los componentes en React son funciones que retornan JSX
export default function Header({ cart, removeFromCart, increaseQuantity, decreaseQuantity, cleanCart, isEmpty, cartTotal }){

    return(
        // Fragment es un contenedor que no se renderiza en el DOM
        // y permite agrupar varios elementos sin necesidad de crear un div adicional
        // Se puede usar <></> en vez de <Fragment></Fragment> o <React.Fragment></React.Fragment>
        <header className="py-5 header">
        <div className="container-xl">
            <div className="row justify-content-center justify-content-md-between">
                <div className="col-8 col-md-3">
                    <a href="index.html">
                        <img className="img-fluid" src="/img/logo.svg" alt="imagen logo" />
                    </a>
                </div>
                <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                    <div 
                        className="carrito"
                    >
                        <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />

                        <div id="carrito" className="bg-white p-3">
                            {isEmpty ? (
                                <p className="text-center">El carrito esta vacio</p>
                            ) : (
                                <Cart
                                    cart={cart}
                                    increaseQuantity={increaseQuantity}
                                    decreaseQuantity={decreaseQuantity}
                                    removeFromCart={removeFromCart}
                                    cartTotal={cartTotal}
                                    cleanCart={cleanCart}
                                />
                            )}
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </header>
    )
}