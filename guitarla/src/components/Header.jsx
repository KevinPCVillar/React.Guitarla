//import { Fragment }  from "react"
//import React from "react"

import Guitar from "./Guitar"
import { useMemo } from "react"

// Los componentes en React son funciones que retornan JSX
export default function Header({cart, removeFromCart, increaseQuantity, decreaseQuantity, cleanCart}){
    // State derivado
    // useMemo es un hook que memoriza el resultado de una función y lo recalcula solo si las dependencias cambian
    const isEmpty = useMemo( () => cart.length === 0, [cart])
    const cartTotal = useMemo(() => cart.reduce((total, guitar) => total + (guitar.price * guitar.quantity), 0), [cart])

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
                                <>
                                    <table className="w-100 table">
                                        <thead>
                                            <tr>
                                                <th>Imagen</th>
                                                <th>Nombre</th>
                                                <th>Precio</th>
                                                <th>Cantidad</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart.map(guitar => (
                                            <tr key={guitar.id}>
                                                <td>
                                                    <img className="img-fluid" src={`/img/${guitar.image}.jpg`} alt="imagen guitarra" />
                                                </td>
                                                <td>{guitar.name}</td>
                                                <td className="fw-bold">
                                                        ${guitar.price}
                                                </td>
                                                <td className="flex align-items-start gap-4">
                                                    <button
                                                        type="button"
                                                        className="btn btn-dark"
                                                        onClick={() => decreaseQuantity(guitar.id)}
                                                    >
                                                        -
                                                    </button>
                                                        {guitar.quantity}
                                                    <button
                                                        type="button"
                                                        className="btn btn-dark"
                                                        onClick={() => increaseQuantity(guitar.id)}
                                                    >
                                                        +
                                                    </button>
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-danger"
                                                        type="button"
                                                        onClick={() => removeFromCart(guitar.id)}
                                                    >
                                                        X
                                                    </button>
                                                </td>
                                            </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <p className="text-end">Total pagar: <span className="fw-bold">${cartTotal}</span></p>
                                    <button 
                                        className="btn btn-dark w-100 mt-3 p-2"
                                        onClick={cleanCart}
                                    >
                                        Vaciar Carrito</button>
                                </>
                            )}
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </header>
    )
}