import { useState, useEffect } from "react";
import { db } from "../data/db";

const useCart = () => {
    const initialCart = () => {
        const localStorageCart = localStorage.getItem("cart");
        return localStorageCart ? JSON.parse(localStorageCart) : [];
    };

    const [cart, setCart] = useState(initialCart);
    const MIN_ITEMS = 1;
    const MAX_ITEMS = 10;

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item) => {
        const itemExist = cart.findIndex((automovil) => automovil.id === item.id);

        if (itemExist >= 0) {
            const updatedCart = [...cart];
            updatedCart[itemExist].quantity++;
            setCart(updatedCart);
        } else {
            item.quantity = 1;
            setCart([...cart, item]);
        }
    };

    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((automovil) => automovil.id !== id));
    };

    const decreaseQuantity = (id) => {
        const updatedCart = cart.map((item) => {
            if (item.id === id && item.quantity > MIN_ITEMS) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        setCart(updatedCart);
    };

    const increaseQuantity = (id) => {
        const updatedCart = cart.map((item) => {
            if (item.id === id && item.quantity < MAX_ITEMS) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setCart(updatedCart);
    };

    const clear = () => {
        setCart([]);
    };

    const cartTotal = cart.reduce((total, { quantity, price }) => total + quantity * price, 0);

    return {
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clear,
        cartTotal,
    }
}

export { useCart };
