import React from 'react';
import { Link } from 'react-router-dom';
import {
    FaShoppingCart,
    FaTrash,
    FaMinus,
    FaPlus,
    FaShieldAlt,
    FaArrowRight,
    FaLock
} from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
    const subtotal = getCartTotal();
    const tax = subtotal * 0.1;
    const total = subtotal * 1.1;

    return (
        <div className="min-h-screen pt-28 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-1 block">
                        Review Your Selection
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Shopping Cart
                    </h1>
                </div>

                {cart.length === 0 ? (
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-12 text-center max-w-lg mx-auto shadow-xs">
                        <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center mx-auto mb-4 text-slate-400">
                            <FaShoppingCart className="w-6 h-6" />
                        </div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                            Your cart is currently empty
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
                            Explore our collection of verified smartphones and accessories with official warranty.
                        </p>
                        <Link
                            to="/products"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-xs sm:text-sm font-semibold hover:bg-rose-600 dark:hover:bg-rose-600 dark:hover:text-white transition-colors"
                        >
                            Browse Collection <FaArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Cart Items List */}
                        <div className="lg:col-span-8 space-y-4">
                            {cart.map((item) => (
                                <div
                                    key={item._id}
                                    className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 shadow-xs"
                                >
                                    <div className="flex items-center gap-3.5 sm:gap-4 w-full sm:w-auto flex-1 min-w-0">
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden flex-shrink-0 border border-slate-200/50 dark:border-slate-750">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = 'https://placehold.co/100x100?text=Device';
                                                }}
                                            />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">
                                                {item.name}
                                            </h3>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                                Tsh {item.price?.toLocaleString()} each
                                            </p>
                                            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5">
                                                <FaShieldAlt className="w-2.5 h-2.5" /> 1-Year Local Warranty
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                                        {/* Quantity Pill */}
                                        <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1 border border-slate-200/60 dark:border-slate-700">
                                            <button
                                                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                className="w-7 h-7 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white rounded hover:bg-white dark:hover:bg-slate-700 transition-colors disabled:opacity-40"
                                                disabled={item.quantity <= 1}
                                                aria-label="Decrease quantity"
                                            >
                                                <FaMinus className="w-2.5 h-2.5" />
                                            </button>
                                            <span className="w-8 text-center text-xs font-bold text-slate-900 dark:text-white">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                className="w-7 h-7 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white rounded hover:bg-white dark:hover:bg-slate-700 transition-colors"
                                                aria-label="Increase quantity"
                                            >
                                                <FaPlus className="w-2.5 h-2.5" />
                                            </button>
                                        </div>

                                        <div className="text-right min-w-[80px] sm:min-w-[90px]">
                                            <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white block">
                                                Tsh {(item.price * item.quantity).toLocaleString()}
                                            </span>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item._id)}
                                            className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                                            title="Remove item"
                                            aria-label={`Remove ${item.name}`}
                                        >
                                            <FaTrash className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary Card */}
                        <div className="lg:col-span-4">
                            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-xs sticky top-28 space-y-6">
                                <h2 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
                                    Order Summary
                                </h2>

                                <div className="space-y-3 text-xs sm:text-sm">
                                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                        <span>Subtotal ({cart.reduce((acc, i) => acc + i.quantity, 0)} items)</span>
                                        <span className="font-semibold text-slate-900 dark:text-white">
                                            Tsh {subtotal.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                        <span>Insured Express Shipping</span>
                                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                                            Free
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                        <span>VAT &amp; Verification (10%)</span>
                                        <span className="font-semibold text-slate-900 dark:text-white">
                                            Tsh {tax.toLocaleString()}
                                        </span>
                                    </div>

                                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-baseline">
                                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                                            Total Amount
                                        </span>
                                        <span className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                                            Tsh {total.toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                <Link
                                    to="/checkout"
                                    className="w-full py-3.5 px-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-rose-600 dark:hover:bg-rose-600 dark:hover:text-white rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
                                >
                                    <FaLock className="w-3 h-3" />
                                    Proceed to Secure Checkout
                                </Link>

                                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-[11px] text-slate-500 dark:text-slate-400">
                                    <div className="flex items-center gap-2">
                                        <FaShieldAlt className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                                        <span>Every device verified with original IMEI warranty</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaLock className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                                        <span>Supported via M-Pesa, T-Pesa, HaloPesa &amp; Cards</span>
                                    </div>
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
