import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../services/api';
import { FaLock, FaCheckCircle, FaArrowLeft, FaCreditCard, FaMobileAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Checkout = () => {
    const { cart, getCartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        address: '',
        city: '',
        zipCode: '',
        phone: ''
    });
    const [paymentMethod, setPaymentMethod] = useState('VisaCard');

    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!user) {
            navigate('/login?redirect=checkout');
        } else if (user.isAdmin) {
            toast.error("Admins cannot place orders.");
            navigate('/admin');
        }
        if (cart.length === 0 && !isSuccess) {
            navigate('/cart');
        }
    }, [user, cart, navigate, isSuccess]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const orderData = {
                orderItems: cart,
                totalPrice: getCartTotal() * 1.1, // Including tax as per cart page calculation
                shippingAddress: formData,
                paymentMethod
            };

            await createOrder(orderData);
            toast.success("Payment Successful! Order Confirmed.");
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
            <div className="min-h-screen pt-32 pb-16 bg-gray-50 flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center border border-gray-100">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FaCheckCircle className="text-green-500 text-4xl" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Order Confirmed!</h1>
                    <p className="text-gray-600 mb-8 text-lg">
                        Thank you for your purchase. Your order has been placed successfully and is being processed.
                    </p>
                    <Link
                        to="/products"
                        className="block w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-black transition-all transform hover:-translate-y-1"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-16 bg-gray-50 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center mb-8">
                    <Link to="/cart" className="text-gray-500 hover:text-gray-900 transition-colors mr-4">
                        <FaArrowLeft />
                    </Link>
                    <h1 className="text-3xl font-extrabold text-gray-900">Checkout</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Shipping Form */}
                    <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                            Shipping Information
                        </h2>

                        {error && (
                            <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-lg text-sm font-medium border border-red-100">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                                    placeholder="123 Street Name"
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                                        placeholder="New York"
                                        value={formData.city}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Zip Code</label>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                                        placeholder="10001"
                                        value={formData.zipCode}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                                    placeholder="+1 (555) 000-0000"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Payment Method Selection */}
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                    <FaCreditCard className="mr-2 text-pink-600" /> Payment Method
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {['VisaCard', 'M-Pesa', 'Mix by Yas', 'Airtel Money', 'T-Pesa', 'HaloPesa'].map((method) => (
                                        <label
                                            key={method}
                                            className={`relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === method
                                                ? 'border-pink-500 bg-pink-50'
                                                : 'border-gray-100 hover:border-gray-200 bg-gray-50'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value={method}
                                                checked={paymentMethod === method}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                className="hidden"
                                            />
                                            <div className="flex items-center">
                                                <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${paymentMethod === method ? 'border-pink-500' : 'border-gray-300'
                                                    }`}>
                                                    {paymentMethod === method && (
                                                        <div className="w-2.5 h-2.5 rounded-full bg-pink-500" />
                                                    )}
                                                </div>
                                                <span className={`font-bold ${paymentMethod === method ? 'text-gray-900' : 'text-gray-600'}`}>
                                                    {method}
                                                </span>
                                            </div>
                                            {(method === 'M-Pesa' || method === 'Airtel Money' || method === 'T-Pesa' || method === 'HaloPesa') && (
                                                <FaMobileAlt className="absolute right-4 text-gray-400" />
                                            )}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-pink-500/30 transition-all transform hover:-translate-y-1 flex items-center justify-center disabled:opacity-50 disabled:transform-none"
                                >
                                    {loading ? (
                                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            <FaLock className="mr-2 text-sm" />
                                            Confirm Order & Pay
                                        </>
                                    )}
                                </button>
                                <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center">
                                    <FaLock className="mr-1" /> Secure 128-bit SSL Encrypted Payment
                                </p>
                            </div>
                        </form>
                    </div>

                    {/* Order Review */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 sticky top-32">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Review</h2>

                            <div className="space-y-4 max-h-80 overflow-y-auto mb-6 pr-2">
                                {cart.map((item) => (
                                    <div key={item._id} className="flex items-center space-x-4">
                                        <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-bold text-gray-900 truncate">{item.name}</h4>
                                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                        <div className="text-sm font-bold text-gray-900">
                                            Tsh {(item.price * item.quantity).toLocaleString()}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="h-px bg-gray-100 mb-6"></div>

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between text-gray-500">
                                    <span>Subtotal</span>
                                    <span>Tsh {getCartTotal().toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-500">
                                    <span>Shipping</span>
                                    <span className="text-green-500 font-bold">FREE</span>
                                </div>
                                <div className="flex justify-between text-gray-500">
                                    <span>Estimated Tax (10%)</span>
                                    <span>Tsh {(getCartTotal() * 0.1).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-lg font-extrabold text-gray-900 pt-3">
                                    <span>Total</span>
                                    <span>Tsh {(getCartTotal() * 1.1).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
