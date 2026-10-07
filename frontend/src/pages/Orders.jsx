import React, { useState, useEffect } from 'react';
import { getMyOrders } from '../services/api';
import { FaBox, FaClock, FaShippingFast, FaTimesCircle, FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await getMyOrders();
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Pending': return <FaClock className="text-amber-500" />;
            case 'Shipping': return <FaShippingFast className="text-blue-500" />;
            case 'Delivered': return <FaCheckCircle className="text-green-500" />;
            case 'Cancelled': return <FaTimesCircle className="text-red-500" />;
            default: return <FaBox className="text-gray-500" />;
        }
    };

    const getStatusBG = (status) => {
        switch (status) {
            case 'Pending': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
            case 'Shipping': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
            case 'Delivered': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'Cancelled': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
        }
    };

    if (loading) {
        return (
            <div className="pt-32 pb-16 min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-16 min-h-screen transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter uppercase">
                        My <span className="text-pink-600">Orders</span>
                    </h1>
                    <p className="text-gray-500 dark:text-gray-300 max-w-2xl mx-auto text-lg font-medium">
                        Track your shipments and view your purchase history.
                    </p>
                </div>

                {orders.length === 0 ? (
                    <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-16 text-center border border-gray-100 dark:border-gray-800 shadow-xl mt-10">
                        <div className="bg-gray-50 dark:bg-gray-950/50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 border border-gray-100 dark:border-gray-800">
                            <FaBox className="h-10 w-10 text-gray-300" />
                        </div>
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight">No Orders Yet</h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-10 max-w-md mx-auto">Looks like you haven't placed any orders yet. Start shopping to fill this space!</p>
                        <Link to="/products" className="inline-block px-12 py-5 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-black text-lg rounded-[2rem] hover:shadow-2xl transition-all transform hover:-translate-y-1 uppercase tracking-widest">
                            Shop Products
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-8">
                        {orders.map((order) => (
                            <div key={order._id} className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group">
                                <div className="p-8 md:p-12">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 border-b border-gray-100 dark:border-gray-800 pb-8">
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-2">Order ID</p>
                                            <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tighter">#{order._id.toString().slice(-8).toUpperCase()}</h3>
                                        </div>
                                        <div>
                                            <div className={`px-6 py-3 rounded-full flex items-center gap-3 font-bold uppercase tracking-widest text-xs shadow-sm ${getStatusBG(order.status)}`}>
                                                {getStatusIcon(order.status)}
                                                <span>{order.status}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                        <div className="space-y-6">
                                            {order.orderItems.map((item, idx) => (
                                                <div key={idx} className="flex items-center gap-6 bg-gray-50 dark:bg-gray-950/50 p-4 rounded-3xl border border-gray-100 dark:border-gray-800 hover:border-pink-500/30 transition-colors group/item">
                                                    <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-sm flex-shrink-0">
                                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight mb-1">{item.name}</h4>
                                                        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Qty: {item.quantity} × Tsh {item.price.toLocaleString()}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="bg-gray-50 dark:bg-gray-950/50 p-10 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 h-fit">
                                            <div className="space-y-4 mb-8">
                                                <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-800">
                                                    <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Placed On</span>
                                                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{new Date(order.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
                                                </div>
                                                <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-800">
                                                    <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Payment Method</span>
                                                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">{order.paymentMethod}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-[10px] font-black text-pink-500 uppercase tracking-[.2em]">Total Amount</span>
                                                    <span className="text-2xl font-black text-gray-900 dark:text-white tracking-widest">Tsh {order.totalPrice.toLocaleString()}</span>
                                                </div>
                                            </div>
                                            <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
                                                <div className="flex items-center gap-4 text-xs font-medium text-gray-500 dark:text-gray-400 leading-relaxed">
                                                    <FaBox className="flex-shrink-0 h-4 w-4 text-pink-500/50" />
                                                    <p>Shipping to {order.shippingAddress.address}, {order.shippingAddress.city}.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
