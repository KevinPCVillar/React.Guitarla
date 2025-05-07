import { useState, useEffect, useMemo } from 'react'
import { db } from '../data/db'

export const useCart = () => {

    const initialCart = () => {
        const localStorageCart = localStorage.getItem("cart")
        return localStorageCart ? JSON.parse(localStorageCart) : []
      }
    
      const [data] = useState(db)
      const[cart, setCart] = useState(initialCart())
    
      const MAX_ITEMS = 5
      const MIN_ITEMS = 1
    
      // useEffect para cargar el carrito desde el localStorage
      useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
      }, [cart])
    
    
      function addToCart(item){
        const itemExist = cart.findIndex((guitar) => guitar.id === item.id)
        console.log(itemExist);
        
        if(itemExist !== -1 ){
          if(cart[itemExist].quantity >= MAX_ITEMS) return
    
          const updatedCart = [...cart]
          updatedCart[itemExist].quantity++
          setCart(updatedCart)
        }
        else{
          item.quantity = 1
          setCart([...cart, item])
        }
      }
    
      function removeFromCart(id){
        console.log("Eliminando guitarra con id: " + id);
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
      }
    
      function increaseQuantity(id){
        console.log("Incrementando guitarra con id: " + id);
        const updatedCart = cart.map(item => {
          if(item.id === id && item.quantity < MAX_ITEMS){
            return {
              ...item,
              quantity: item.quantity + 1
            }
          }
          return item
        })
        setCart(updatedCart)
      }
    
      function decreaseQuantity(id){
        console.log("Decrementando guitarra con id: " + id);
        const updatedCart = cart.map(item => {
          if(item.id === id && item.quantity > MIN_ITEMS ){
            return {
              ...item,
              quantity: item.quantity - 1
            }
          }
          return item
        })
        setCart(updatedCart)
      }
    
      function cleanCart(){
        console.log("Limpiando carrito");
        setCart([])
      }

    // State derivado
    // useMemo es un hook que memoriza el resultado de una función y lo recalcula solo si las dependencias cambian
    const isEmpty = useMemo( () => cart.length === 0, [cart])
    const cartTotal = useMemo(() => cart.reduce((total, guitar) => total + (guitar.price * guitar.quantity), 0), [cart])

    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        cleanCart,
        isEmpty,
        cartTotal
    }
}
