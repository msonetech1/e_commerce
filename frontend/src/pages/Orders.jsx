import React, { useState, useEffect } from 'react';
import { getMyOrders } from '../services/api';
import {
    FaBox,
    FaClock,
    FaShippingFast,
    FaTimesCircle,
    FaCheckCircle,
    FaArrowRight,
    FaShieldAlt
} from 'react-icons/fa';
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

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Pending':
                return {
                    icon: <FaClock className="w-3 h-3 text-amber-500" />,
                    classes: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200/80 dark:border-amber-900/60'
                };
            case 'Shipping':
                return {
                    icon: <FaShippingFast className="w-3 h-3 text-blue-500" />,
                    classes: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border-blue-200/80 dark:border-blue-900/60'
                };
            case 'Delivered':
                return {
                    icon: <FaCheckCircle className="w-3 h-3 text-emerald-500" />,
                    classes: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-900/60'
                };
            case 'Cancelled':
                return {
                    icon: <FaTimesCircle className="w-3 h-3 text-rose-500" />,
                    classes: 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border-rose-200/80 dark:border-rose-900/60'
                };
            default:
                return {
                    icon: <FaBox className="w-3 h-3 text-slate-500" />,
                    classes: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                };
        }
    };

    if (loading) {
        return (
            <div className="pt-32 pb-20 min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-slate-300 border-t-rose-600 rounded-full animate-spin" />
                    <p className="text-xs text-slate-500 dark:text-slate-400">Loading purchase history...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-28 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="max-w-3xl mb-8">
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-1 block">
                        Account Activity
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Order Tracking &amp; History
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Track your shipments, check warranty registration, and download receipts.
                    </p>
                </div>

                {orders.length === 0 ? (
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-12 text-center max-w-lg mx-auto shadow-xs">
                        <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center mx-auto mb-4 text-slate-400">
                            <FaBox className="w-6 h-6" />
                        </div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                            No orders placed yet
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
                            When you place an order for certified mobile devices, your tracking updates and warranty certificates will appear here.
                        </p>
                        <Link
                            to="/products"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-xs sm:text-sm font-semibold hover:bg-rose-600 dark:hover:bg-rose-600 dark:hover:text-white transition-colors"
                        >
                            Explore Collection <FaArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => {
                            const badge = getStatusBadge(order.status);

                            return (
                                <article
                                    key={order._id}
                                    className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-xs"
                                >
                                    {/* Order Card Header */}
                                    <div className="p-5 sm:p-6 bg-slate-50/50 dark:bg-slate-850 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                                        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                                            <div>
                                                <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider block">
                                                    Order Reference
                                                </span>
                                                <span className="text-sm font-mono font-bold text-slate-900 dark:text-white">
                                                    #{order._id?.toString().slice(-8).toUpperCase()}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider block">
                                                    Placed On
                                                </span>
                                                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                                                    {new Date(order.createdAt).toLocaleDateString(undefined, {
                                                        dateStyle: 'medium'
                                                    })}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider block">
                                                    Payment Method
                                                </span>
                                                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                                                    {order.paymentMethod}
                                                </span>
                                            </div>
                                        </div>

                                        <div
                                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${badge.classes}`}
                                        >
                                            {badge.icon}
                                            <span>{order.status}</span>
                                        </div>
                                    </div>

                                    {/* Items & Shipping Details */}
                                    <div className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                                        {/* Items List */}
                                        <div className="lg:col-span-8 space-y-3">
                                            {order.orderItems?.map((item, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-150 dark:border-slate-750"
                                                >
                                                    <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden flex-shrink-0 border border-slate-200/50 dark:border-slate-700">
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => {
                                                                e.target.src = 'https://placehold.co/100x100?text=Phone';
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                                                            {item.name}
                                                        </h4>
                                                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                                                            Qty: {item.quantity} × Tsh {item.price?.toLocaleString()}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                                                            Tsh {(item.price * item.quantity).toLocaleString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Delivery Summary Box */}
                                        <div className="lg:col-span-4 p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-750 space-y-3 text-xs">
                                            <div className="flex justify-between items-baseline pb-2 border-b border-slate-200 dark:border-slate-700">
                                                <span className="text-slate-500">Order Total</span>
                                                <span className="text-base font-extrabold text-slate-900 dark:text-white">
                                                    Tsh {order.totalPrice?.toLocaleString()}
                                                </span>
                                            </div>

                                            <div className="space-y-1 text-slate-600 dark:text-slate-300">
                                                <span className="font-semibold block text-slate-900 dark:text-white">
                                                    Destination Address:
                                                </span>
                                                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                                                    {order.shippingAddress?.address}, {order.shippingAddress?.city}
                                                </p>
                                                {order.shippingAddress?.phone && (
                                                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                                                        Contact: {order.shippingAddress.phone}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                                                <FaShieldAlt className="w-3 h-3" />
                                                <span>1-Year Official Warranty Active</span>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
