import React, { useState, useEffect } from 'react';
import {
    FaBox,
    FaShoppingCart,
    FaUsers,
    FaChartLine,
    FaPlus,
    FaTrash,
    FaEdit,
    FaSignOutAlt,
    FaChevronRight,
    FaBars,
    FaTimes,
    FaShieldAlt,
    FaEye
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
    getStats,
    getProducts,
    getOrders,
    getUsers,
    createProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    deleteUser
} from '../services/api';

const AdminDashboard = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');

    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Data states
    const [stats, setStats] = useState(null);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);

    // UI states
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const [productForm, setProductForm] = useState({
        name: '',
        price: '',
        image: '',
        category: '',
        description: ''
    });

    useEffect(() => {
        if (!user || !user.isAdmin) {
            navigate('/');
            return;
        }
        fetchAllData();
    }, [user, navigate]);

    const fetchAllData = async () => {
        setLoading(true);
        try {
            const [statsRes, prodRes, orderRes, userRes] = await Promise.all([
                getStats(),
                getProducts(),
                getOrders(),
                getUsers()
            ]);
            setStats(statsRes.data);
            setProducts(prodRes.data);
            setOrders(orderRes.data);
            setUsers(userRes.data);
        } catch (error) {
            console.error('Error fetching admin data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleProductSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingProduct) {
                await updateProduct(editingProduct._id, productForm);
                toast.success('Product updated successfully');
            } else {
                await createProduct(productForm);
                toast.success('Product created successfully');
            }
            setIsProductModalOpen(false);
            setEditingProduct(null);
            setProductForm({ name: '', price: '', image: '', category: '', description: '' });
            fetchAllData();
        } catch {
            toast.error('Error saving product');
        }
    };

    const handleDeleteProduct = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id);
                toast.success('Product deleted successfully');
                fetchAllData();
            } catch {
                toast.error('Error deleting product');
            }
        }
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            await updateOrderStatus(id, status);
            toast.success(`Order status updated to ${status}`);
            fetchAllData();
        } catch {
            toast.error('Error updating status');
        }
    };

    const handleDeleteUser = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await deleteUser(id);
                toast.success('User deleted successfully');
                fetchAllData();
            } catch {
                toast.error('Error deleting user');
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen pt-20">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-slate-300 border-t-rose-600 rounded-full animate-spin" />
                    <p className="text-xs text-slate-500 dark:text-slate-400">Loading back-office management console...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/60 z-30 md:hidden backdrop-blur-xs"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-40 h-full w-64 bg-white dark:bg-slate-900 border-r border-slate-200/90 dark:border-slate-800 transition-transform duration-300 ease-in-out pt-20 flex flex-col ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                }`}
            >
                <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
                    <FaShieldAlt className="w-4 h-4 text-rose-600" />
                    <div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                            Administration
                        </span>
                        <span className="text-[10px] text-slate-400">Inventory &amp; Operations</span>
                    </div>
                </div>

                <div className="p-3 flex-1 overflow-y-auto">
                    <nav className="space-y-1">
                        {[
                            { id: 'overview', name: 'Overview & Analytics', icon: FaChartLine },
                            { id: 'products', name: 'Hardware Catalog', icon: FaBox },
                            { id: 'orders', name: 'Customer Orders', icon: FaShoppingCart },
                            { id: 'users', name: 'Registered Users', icon: FaUsers }
                        ].map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;

                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => {
                                        setActiveTab(tab.id);
                                        setIsSidebarOpen(false);
                                    }}
                                    className={`w-full flex items-center px-3.5 py-2.5 text-xs font-semibold rounded-lg transition-colors text-left ${
                                        isActive
                                            ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                                    }`}
                                >
                                    <Icon className={`mr-3 w-4 h-4 ${isActive ? 'text-rose-600' : 'text-slate-400'}`} />
                                    <span>{tab.name}</span>
                                </button>
                            );
                        })}
                    </nav>
                </div>

                <div className="p-4 border-t border-slate-100 dark:border-slate-800">
                    <button
                        onClick={logout}
                        className="w-full flex items-center px-3.5 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors"
                    >
                        <FaSignOutAlt className="mr-3 w-3.5 h-3.5" /> Log Out of Admin
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
                <main className="flex-1 p-4 sm:p-6 lg:p-8 pt-24 md:pt-28">
                    {/* Header Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200/80 dark:border-slate-800/80">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                aria-label="Open sidebar"
                                className="md:hidden p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                                <FaBars className="w-5 h-5" />
                            </button>
                            <div>
                                <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider block">
                                    Portal Module
                                </span>
                                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white capitalize">
                                    {activeTab === 'overview'
                                        ? 'Operations Overview'
                                        : activeTab === 'products'
                                        ? 'Catalog Management'
                                        : activeTab === 'orders'
                                        ? 'Order Management'
                                        : 'User Directory'}
                                </h1>
                            </div>
                        </div>

                        {activeTab === 'products' && (
                            <button
                                onClick={() => {
                                    setEditingProduct(null);
                                    setProductForm({ name: '', price: '', image: '', category: '', description: '' });
                                    setIsProductModalOpen(true);
                                }}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-rose-600 dark:hover:bg-rose-600 dark:hover:text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
                            >
                                <FaPlus className="w-3 h-3" />
                                <span>Add New Device</span>
                            </button>
                        )}
                    </div>

                    {/* OVERVIEW TAB */}
                    {activeTab === 'overview' && (
                        <div className="space-y-8">
                            {/* Stats Metric Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                                <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-2">
                                    <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center">
                                        <FaShoppingCart className="w-4 h-4" />
                                    </div>
                                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
                                        Recorded Orders
                                    </span>
                                    <span className="text-2xl font-extrabold text-slate-900 dark:text-white block">
                                        {stats?.totalOrders || 0}
                                    </span>
                                </div>

                                <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-2">
                                    <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
                                        <FaChartLine className="w-4 h-4" />
                                    </div>
                                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
                                        Gross Volume
                                    </span>
                                    <span className="text-2xl font-extrabold text-slate-900 dark:text-white block">
                                        Tsh {(stats?.revenue || 0).toLocaleString()}
                                    </span>
                                </div>

                                <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-2">
                                    <div className="w-9 h-9 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center">
                                        <FaBox className="w-4 h-4" />
                                    </div>
                                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
                                        Live Devices
                                    </span>
                                    <span className="text-2xl font-extrabold text-slate-900 dark:text-white block">
                                        {stats?.totalProducts || 0}
                                    </span>
                                </div>

                                <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-2">
                                    <div className="w-9 h-9 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center">
                                        <FaUsers className="w-4 h-4" />
                                    </div>
                                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
                                        Registered Accounts
                                    </span>
                                    <span className="text-2xl font-extrabold text-slate-900 dark:text-white block">
                                        {stats?.totalUsers || 0}
                                    </span>
                                </div>
                            </div>

                            {/* Recent Orders Overview Table */}
                            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-xs overflow-hidden">
                                <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                        Recent Orders
                                    </h3>
                                    <button
                                        onClick={() => setActiveTab('orders')}
                                        className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
                                    >
                                        <span>View All Orders</span>
                                        <FaChevronRight className="w-2.5 h-2.5" />
                                    </button>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-xs">
                                        <thead className="bg-slate-50 dark:bg-slate-850 text-slate-500 dark:text-slate-400 uppercase font-semibold">
                                            <tr>
                                                <th className="px-5 py-3">Order Ref</th>
                                                <th className="px-5 py-3 hidden md:table-cell">Customer</th>
                                                <th className="px-5 py-3 hidden sm:table-cell">Date</th>
                                                <th className="px-5 py-3">Total</th>
                                                <th className="px-5 py-3">Status</th>
                                                <th className="px-5 py-3 text-right">Details</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                            {orders.slice(0, 5).map((order) => (
                                                <tr key={order._id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                                                    <td className="px-5 py-3 font-mono font-bold text-slate-900 dark:text-white">
                                                        #{order._id?.slice(-6).toUpperCase()}
                                                    </td>
                                                    <td className="px-5 py-3 hidden md:table-cell text-slate-700 dark:text-slate-300">
                                                        {order.user?.name || 'Guest Buyer'}
                                                    </td>
                                                    <td className="px-5 py-3 hidden sm:table-cell text-slate-500">
                                                        {new Date(order.createdAt).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-5 py-3 font-semibold text-slate-900 dark:text-white">
                                                        Tsh {order.totalPrice?.toLocaleString()}
                                                    </td>
                                                    <td className="px-5 py-3">
                                                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-5 py-3 text-right">
                                                        <button
                                                            onClick={() => {
                                                                setSelectedOrder(order);
                                                                setIsOrderModalOpen(true);
                                                            }}
                                                            className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline"
                                                        >
                                                            Inspect
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* PRODUCTS TAB */}
                    {activeTab === 'products' && (
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-xs overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead className="bg-slate-50 dark:bg-slate-850 text-slate-500 dark:text-slate-400 uppercase font-semibold">
                                        <tr>
                                            <th className="px-5 py-3">Device Name</th>
                                            <th className="px-5 py-3">Category</th>
                                            <th className="px-5 py-3">Price</th>
                                            <th className="px-5 py-3 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        {products.map((product) => (
                                            <tr key={product._id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                                                <td className="px-5 py-3">
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={product.image}
                                                            alt={product.name}
                                                            className="w-10 h-10 rounded-lg object-cover bg-slate-100 border border-slate-200 dark:border-slate-700"
                                                            onError={(e) => {
                                                                e.target.src = 'https://placehold.co/100x100?text=Device';
                                                            }}
                                                        />
                                                        <div>
                                                            <span className="font-bold text-slate-900 dark:text-white block">
                                                                {product.name}
                                                            </span>
                                                            <span className="text-[11px] text-slate-400 line-clamp-1 max-w-xs">
                                                                {product.description}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-3">
                                                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                                                        {product.category || 'Hardware'}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3 font-semibold text-slate-900 dark:text-white">
                                                    Tsh {product.price?.toLocaleString()}
                                                </td>
                                                <td className="px-5 py-3 text-right">
                                                    <div className="flex items-center justify-end gap-1.5">
                                                        <button
                                                            onClick={() => {
                                                                setEditingProduct(product);
                                                                setProductForm(product);
                                                                setIsProductModalOpen(true);
                                                            }}
                                                            className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                                            title="Edit Device"
                                                        >
                                                            <FaEdit className="w-3.5 h-3.5" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteProduct(product._id)}
                                                            className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                                                            title="Delete Device"
                                                        >
                                                            <FaTrash className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* ORDERS TAB */}
                    {activeTab === 'orders' && (
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-xs overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead className="bg-slate-50 dark:bg-slate-850 text-slate-500 dark:text-slate-400 uppercase font-semibold">
                                        <tr>
                                            <th className="px-5 py-3">Order Ref</th>
                                            <th className="px-5 py-3 hidden md:table-cell">Customer</th>
                                            <th className="px-5 py-3 hidden sm:table-cell">Items</th>
                                            <th className="px-5 py-3">Total</th>
                                            <th className="px-5 py-3">Status</th>
                                            <th className="px-5 py-3 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        {orders.map((order) => (
                                            <tr key={order._id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                                                <td className="px-5 py-3">
                                                    <span className="font-mono font-bold text-slate-900 dark:text-white block">
                                                        #{order._id?.slice(-6).toUpperCase()}
                                                    </span>
                                                    <span className="text-[10px] text-slate-400">
                                                        {new Date(order.createdAt).toLocaleDateString()}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3 hidden md:table-cell">
                                                    <span className="font-bold text-slate-900 dark:text-white block">
                                                        {order.user?.name || 'Guest'}
                                                    </span>
                                                    <span className="text-[11px] text-slate-400">
                                                        {order.user?.email}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3 hidden sm:table-cell text-slate-600 dark:text-slate-400">
                                                    {order.orderItems?.length || 0} unit(s)
                                                </td>
                                                <td className="px-5 py-3 font-semibold text-slate-900 dark:text-white">
                                                    Tsh {order.totalPrice?.toLocaleString()}
                                                </td>
                                                <td className="px-5 py-3">
                                                    <select
                                                        value={order.status}
                                                        onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                                        className="px-2 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs font-semibold focus:outline-none cursor-pointer text-slate-900 dark:text-white"
                                                    >
                                                        <option value="Pending">Pending</option>
                                                        <option value="Shipping">Shipping</option>
                                                        <option value="Completed">Completed</option>
                                                        <option value="Cancelled">Cancelled</option>
                                                    </select>
                                                </td>
                                                <td className="px-5 py-3 text-right">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedOrder(order);
                                                            setIsOrderModalOpen(true);
                                                        }}
                                                        className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline"
                                                    >
                                                        <FaEye className="w-3 h-3" />
                                                        <span>Inspect</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* USERS TAB */}
                    {activeTab === 'users' && (
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-xs overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead className="bg-slate-50 dark:bg-slate-850 text-slate-500 dark:text-slate-400 uppercase font-semibold">
                                        <tr>
                                            <th className="px-5 py-3">Account Name</th>
                                            <th className="px-5 py-3 hidden md:table-cell">Email Address</th>
                                            <th className="px-5 py-3">Role</th>
                                            <th className="px-5 py-3 hidden lg:table-cell">Joined</th>
                                            <th className="px-5 py-3 text-right">Manage</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        {users.map((u) => (
                                            <tr key={u._id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                                                <td className="px-5 py-3 font-bold text-slate-900 dark:text-white">
                                                    {u.name}
                                                </td>
                                                <td className="px-5 py-3 hidden md:table-cell text-slate-500">
                                                    {u.email}
                                                </td>
                                                <td className="px-5 py-3">
                                                    <span
                                                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                                            u.isAdmin
                                                                ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300'
                                                                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                                                        }`}
                                                    >
                                                        {u.isAdmin ? 'Admin' : 'Member'}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3 hidden lg:table-cell text-slate-500">
                                                    {new Date(u.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-5 py-3 text-right">
                                                    {!u.isAdmin && (
                                                        <button
                                                            onClick={() => handleDeleteUser(u._id)}
                                                            className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                                                            title="Delete User"
                                                        >
                                                            <FaTrash className="w-3.5 h-3.5" />
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </main>

                {/* Dashboard Footer */}
                <footer className="border-t border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-4 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-4">
                    <p>&copy; {new Date().getFullYear()} Kennson Matelephone. Operational Back-Office Console.</p>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span>Logged in as <strong>{user?.name}</strong></span>
                    </div>
                </footer>
            </div>

            {/* ORDER DETAILS MODAL */}
            {isOrderModalOpen && selectedOrder && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 w-full max-w-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center sticky top-0 bg-white dark:bg-slate-900 z-10">
                            <div>
                                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                                    Order #{selectedOrder._id?.slice(-8).toUpperCase()}
                                </h3>
                                <p className="text-xs text-slate-400">
                                    Placed on {new Date(selectedOrder.createdAt).toLocaleString()}
                                </p>
                            </div>
                            <button
                                onClick={() => setIsOrderModalOpen(false)}
                                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                                <FaTimes className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="p-5 space-y-6 text-xs">
                            {/* Summary Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-150 dark:border-slate-750 space-y-1.5">
                                    <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[10px] block text-slate-400">
                                        Payment Overview
                                    </span>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Method:</span>
                                        <span className="font-semibold text-slate-900 dark:text-white">{selectedOrder.paymentMethod}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Total Price:</span>
                                        <span className="font-bold text-slate-900 dark:text-white">Tsh {selectedOrder.totalPrice?.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Status:</span>
                                        <span className="font-bold text-emerald-600">CONFIRMED</span>
                                    </div>
                                </div>

                                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-150 dark:border-slate-750 space-y-1.5">
                                    <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[10px] block text-slate-400">
                                        Customer &amp; Address
                                    </span>
                                    <p className="font-semibold text-slate-900 dark:text-white">{selectedOrder.user?.name || 'Customer'}</p>
                                    <p className="text-slate-500">{selectedOrder.shippingAddress?.address}, {selectedOrder.shippingAddress?.city}</p>
                                    <p className="text-slate-500">Phone: {selectedOrder.shippingAddress?.phone}</p>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div>
                                <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[10px] block text-slate-400 mb-2">
                                    Enclosed Items ({selectedOrder.orderItems?.length || 0})
                                </span>
                                <div className="space-y-2">
                                    {selectedOrder.orderItems?.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-150 dark:border-slate-750"
                                        >
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-10 h-10 rounded-md object-cover bg-white"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-bold text-slate-900 dark:text-white truncate">
                                                    {item.name}
                                                </h4>
                                                <span className="text-slate-400 text-[11px]">
                                                    Qty: {item.quantity} × Tsh {item.price?.toLocaleString()}
                                                </span>
                                            </div>
                                            <span className="font-bold text-slate-900 dark:text-white">
                                                Tsh {(item.price * item.quantity).toLocaleString()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Status Change Control */}
                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-slate-600 dark:text-slate-400">Change Status:</span>
                                    <select
                                        value={selectedOrder.status}
                                        onChange={(e) => handleStatusUpdate(selectedOrder._id, e.target.value)}
                                        className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md font-semibold text-slate-900 dark:text-white"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Shipping">Shipping</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </div>
                                <button
                                    onClick={() => setIsOrderModalOpen(false)}
                                    className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-xs font-semibold"
                                >
                                    Dismiss
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* PRODUCT ADD / EDIT MODAL */}
            {isProductModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center sticky top-0 bg-white dark:bg-slate-900 z-10">
                            <h3 className="text-base font-bold text-slate-900 dark:text-white">
                                {editingProduct ? 'Edit Catalog Hardware' : 'Add New Hardware to Catalog'}
                            </h3>
                            <button
                                onClick={() => setIsProductModalOpen(false)}
                                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                                <FaTimes className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleProductSubmit} className="p-5 space-y-4 text-xs">
                            <div className="space-y-1">
                                <label className="font-semibold text-slate-700 dark:text-slate-300">
                                    Model / Device Name <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={productForm.name}
                                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="font-semibold text-slate-700 dark:text-slate-300">
                                        Price (Tsh) <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        value={productForm.price}
                                        onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-semibold text-slate-700 dark:text-slate-300">
                                        Category <span className="text-rose-500">*</span>
                                    </label>
                                    <select
                                        value={productForm.category}
                                        onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Flagship">Flagship</option>
                                        <option value="Foldable">Foldable</option>
                                        <option value="Budget">Budget</option>
                                        <option value="Mid-range">Mid-range</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="font-semibold text-slate-700 dark:text-slate-300">
                                    Image URL <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={productForm.image}
                                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="font-semibold text-slate-700 dark:text-slate-300">
                                    Description &amp; Warranty Terms <span className="text-rose-500">*</span>
                                </label>
                                <textarea
                                    required
                                    rows={4}
                                    value={productForm.description}
                                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-rose-500 resize-none"
                                />
                            </div>

                            <div className="pt-2 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsProductModalOpen(false)}
                                    className="flex-1 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-rose-600 dark:hover:bg-rose-600 dark:hover:text-white rounded-lg font-semibold shadow-xs transition-colors"
                                >
                                    Save Product
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
