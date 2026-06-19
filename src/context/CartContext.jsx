import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [items, setItems] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const addItem = (item) => {
        setItems(prev => {
            const key = `${item.productId}-${item.color || 'nocolor'}-${item.height || 'noheight'}`;
            const existing = prev.find(i => `${i.productId}-${i.color || 'nocolor'}-${i.height || 'noheight'}` === key);
            if (existing) {
                return prev.map(i =>
                    `${i.productId}-${i.color || 'nocolor'}-${i.height || 'noheight'}` === key
                        ? { ...i, quantity: i.quantity + item.quantity }
                        : i
                );
            }
            return [...prev, { ...item, id: `${key}-${Date.now()}` }];
        });
        setIsOpen(true);
    };

    const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id));

    const clearCart = () => setItems([]);

    const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, clearCart, isOpen, setIsOpen, totalCount }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
