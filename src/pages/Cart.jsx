import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaTrash, FaArrowRight, FaMinus, FaPlus } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

    return (
        <div className="min-h-screen pt-32 pb-16 bg-gray-50 dark:bg-gray-950 px-4 transition-colors duration-500">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">Your Shopping Cart</h1>

                {cart.length === 0 ? (
                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-12 text-center">
                        <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400 dark:text-gray-600">
                            <FaShoppingCart className="w-10 h-10" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Your cart is empty</h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-8">Looks like you haven't added anything yet.</p>
                        <Link to="/products" className="inline-block px-8 py-3 bg-pink-600 text-white font-bold rounded-full hover:bg-pink-700 transition-colors">
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items List */}
                        <div className="lg:col-span-2 space-y-4">
                            {cart.map((item) => (
                                <div key={item._id} className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-6 transition-all hover:shadow-md">
                                    <div className="w-24 h-24 flex-shrink-0 bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>

                                    <div className="flex-1 text-center sm:text-left">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{item.name}</h3>
                                        <p className="text-pink-600 font-bold">Tsh {item.price.toLocaleString()}</p>
                                    </div>

                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-1">
                                            <button
                                                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                className="w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-500 transition-colors"
                                                disabled={item.quantity <= 1}
                                            >
                                                <FaMinus size={12} />
                                            </button>
                                            <span className="w-8 text-center font-bold text-gray-900 dark:text-white">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                className="w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-500 transition-colors"
                                            >
                                                <FaPlus size={12} />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item._id)}
                                            className="p-2 text-gray-400 dark:text-gray-600 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                                            title="Remove item"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 sticky top-24">
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Subtotal</span>
                                        <span>Tsh {getCartTotal().toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Shipping</span>
                                        <span className="text-green-600 dark:text-green-500 font-medium">Free</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Tax</span>
                                        <span>Tsh {(getCartTotal() * 0.1).toLocaleString()}</span>
                                    </div>
                                    <div className="h-px bg-gray-100 dark:bg-gray-800 my-4"></div>
                                    <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                                        <span>Total</span>
                                        <span>Tsh {(getCartTotal() * 1.1).toLocaleString()}</span>
                                    </div>
                                </div>

                                <Link to="/checkout" className="block w-full text-center bg-gradient-to-r from-pink-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-pink-500/30 transition-all transform hover:-translate-y-1">
                                    Proceed to Checkout
                                </Link>

                                <div className="mt-6 flex justify-center space-x-2 text-gray-400 dark:text-gray-600">
                                    {/* Payment icons could go here */}
                                    <span className="text-xs">Secure Checkout • Free Shipping • 30-Day Returns</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;

