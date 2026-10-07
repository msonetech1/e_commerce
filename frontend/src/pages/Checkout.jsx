import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../services/api';
import {
    FaLock,
    FaCheckCircle,
    FaArrowLeft,
    FaCreditCard,
    FaMobileAlt,
    FaShieldAlt
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const Checkout = () => {
    const { cart, getCartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        address: '',
        city: 'Dar es Salaam',
        zipCode: '',
        phone: ''
    });
    const [paymentMethod, setPaymentMethod] = useState('M-Pesa');
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!user) {
            navigate('/login?redirect=checkout');
        } else if (user.isAdmin) {
            toast.error('Admins cannot place orders.');
            navigate('/admin');
        }
        if (cart.length === 0 && !isSuccess) {
            navigate('/cart');
        }
    }, [user, cart, navigate, isSuccess]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const subtotal = getCartTotal();
    const tax = subtotal * 0.1;
    const total = subtotal * 1.1;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const orderData = {
                orderItems: cart,
                totalPrice: total,
                shippingAddress: formData,
                paymentMethod
            };

            await createOrder(orderData);
            toast.success('Order placed successfully!');
            setIsSuccess(true);
            clearCart();
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to place order. Please try again.';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center">
                <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-md p-8 text-center space-y-6">
                    <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                        <FaCheckCircle className="w-8 h-8" />
                    </div>
                    <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 block mb-1">
                            Payment Confirmed
                        </span>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Thank You for Your Order!
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                            Your order has been recorded. Our logistics department will dispatch your sealed package with the official warranty certificate.
                        </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-150 dark:border-slate-750 text-left text-xs space-y-1.5 text-slate-600 dark:text-slate-300">
                        <div className="flex justify-between">
                            <span className="text-slate-400">Payment Gateway:</span>
                            <span className="font-semibold text-slate-900 dark:text-white">{paymentMethod}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-400">Delivery Location:</span>
                            <span className="font-semibold text-slate-900 dark:text-white">{formData.address}, {formData.city}</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Link
                            to="/orders"
                            className="block w-full py-3 px-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-xs font-semibold shadow-xs hover:bg-rose-600 dark:hover:bg-rose-600 dark:hover:text-white transition-colors"
                        >
                            View Order Tracking
                        </Link>
                        <Link
                            to="/products"
                            className="block w-full py-2.5 px-4 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        >
                            Return to Catalog
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const paymentMethods = [
        { id: 'M-Pesa', name: 'Vodacom M-Pesa', type: 'mobile' },
        { id: 'Airtel Money', name: 'Airtel Money', type: 'mobile' },
        { id: 'Mix by Yas', name: 'Mix by Yas (Tigo)', type: 'mobile' },
        { id: 'HaloPesa', name: 'Halotel HaloPesa', type: 'mobile' },
        { id: 'T-Pesa', name: 'TTCL T-Pesa', type: 'mobile' },
        { id: 'VisaCard', name: 'Visa / Mastercard', type: 'card' }
    ];

    return (
        <div className="min-h-screen pt-28 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header with Back Link */}
                <div className="flex items-center gap-3 mb-8">
                    <Link
                        to="/cart"
                        className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        aria-label="Back to Cart"
                    >
                        <FaArrowLeft className="w-4 h-4" />
                    </Link>
                    <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 block">
                            Secure Checkout
                        </span>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            Shipping &amp; Payment Verification
                        </h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Form Section */}
                    <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-4 sm:p-6 lg:p-8 shadow-xs">
                        {error && (
                            <div className="mb-6 p-4 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-xs font-medium">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Step 1: Shipping Address */}
                            <div>
                                <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs flex items-center justify-center font-bold">
                                        1
                                    </span>
                                    <span>Shipping Address in Tanzania</span>
                                </h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="sm:col-span-2 space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                            Street Address / Physical Landmark <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            required
                                            value={formData.address}
                                            onChange={handleChange}
                                            placeholder="e.g. Samora Avenue, Plot 14, Kariakoo"
                                            className="w-full px-3.5 py-2.5 text-base sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-rose-500"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                            City / Region <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            required
                                            value={formData.city}
                                            onChange={handleChange}
                                            placeholder="e.g. Dar es Salaam, Arusha, Dodoma"
                                            className="w-full px-3.5 py-2.5 text-base sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-rose-500"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                            Postal Code / Area Code
                                        </label>
                                        <input
                                            type="text"
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleChange}
                                            placeholder="e.g. 11101"
                                            className="w-full px-3.5 py-2.5 text-base sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-rose-500"
                                        />
                                    </div>

                                    <div className="sm:col-span-2 space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                            Delivery Contact Phone Number <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="e.g. +255 777 000 000"
                                            className="w-full px-3.5 py-2.5 text-base sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-rose-500"
                                        />
                                        <p className="text-[11px] text-slate-400">
                                            Our courier calls this number to coordinate doorstep delivery.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Step 2: Payment Selection */}
                            <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
                                <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs flex items-center justify-center font-bold">
                                        2
                                    </span>
                                    <span>Payment Method</span>
                                </h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {paymentMethods.map((method) => (
                                        <label
                                            key={method.id}
                                            className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                                                paymentMethod === method.id
                                                    ? 'border-rose-600 bg-rose-50/40 dark:bg-rose-950/20 text-slate-900 dark:text-white ring-1 ring-rose-600'
                                                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value={method.id}
                                                    checked={paymentMethod === method.id}
                                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                                    className="w-4 h-4 text-rose-600 focus:ring-rose-500"
                                                />
                                                <span className="text-xs sm:text-sm font-semibold">
                                                    {method.name}
                                                </span>
                                            </div>
                                            {method.type === 'mobile' ? (
                                                <FaMobileAlt className="w-4 h-4 text-slate-400" />
                                            ) : (
                                                <FaCreditCard className="w-4 h-4 text-slate-400" />
                                            )}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="border-t border-slate-100 dark:border-slate-800 pt-6 space-y-3">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3.5 px-6 rounded-lg text-sm font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-rose-600 dark:hover:bg-rose-600 dark:hover:text-white shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {loading ? (
                                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <FaLock className="w-3.5 h-3.5" />
                                            Confirm Order &amp; Pay (Tsh {total.toLocaleString()})
                                        </>
                                    )}
                                </button>
                                <p className="text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
                                    <FaShieldAlt className="w-3 h-3 text-emerald-500" />
                                    <span>Official warranty certificate generated upon order confirmation</span>
                                </p>
                            </div>
                        </form>
                    </div>

                    {/* Order Review Sticky Sidebar */}
                    <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-xs sticky top-28 space-y-5">
                        <h2 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
                            Items in Order ({cart.length})
                        </h2>

                        <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                            {cart.map((item) => (
                                <div key={item._id} className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden flex-shrink-0 border border-slate-200/60 dark:border-slate-750">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                                            {item.name}
                                        </h4>
                                        <p className="text-[11px] text-slate-400">Qty: {item.quantity}</p>
                                    </div>
                                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                                        Tsh {(item.price * item.quantity).toLocaleString()}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-2 text-xs">
                            <div className="flex justify-between text-slate-500">
                                <span>Subtotal</span>
                                <span>Tsh {subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-slate-500">
                                <span>Insured Shipping</span>
                                <span className="font-semibold text-emerald-600 dark:text-emerald-400">Free</span>
                            </div>
                            <div className="flex justify-between text-slate-500">
                                <span>Estimated Tax (10%)</span>
                                <span>Tsh {tax.toLocaleString()}</span>
                            </div>
                            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between font-bold text-sm text-slate-900 dark:text-white">
                                <span>Total Due</span>
                                <span>Tsh {total.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
