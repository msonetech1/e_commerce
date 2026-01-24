import React, { useState, useEffect } from 'react';
import {
    FaBox, FaShoppingCart, FaUsers, FaChartLine, FaPlus,
    FaTrash, FaEdit, FaCheck, FaTimes, FaSignOutAlt, FaChevronRight,
    FaRegClock, FaCheckCircle, FaTruck, FaBars
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
    getStats, getProducts, getOrders, getUsers,
    createProduct, updateProduct, deleteProduct,
    updateOrderStatus, deleteUser
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
        name: '', price: '', image: '', category: '', description: ''
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
                getStats(), getProducts(), getOrders(), getUsers()
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
        } catch (error) {
            toast.error('Error saving product');
        }
    };

    const handleDeleteProduct = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id);
                toast.success('Product deleted successfully');
                fetchAllData();
            } catch (error) {
                toast.error('Error deleting product');
            }
        }
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            await updateOrderStatus(id, status);
            toast.success(`Order status updated to ${status}`);
            fetchAllData();
        } catch (error) {
            toast.error('Error updating status');
        }
    };

    const handleDeleteUser = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await deleteUser(id);
                toast.success('User deleted successfully');
                fetchAllData();
            } catch (error) {
                toast.error('Error deleting user');
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex transition-colors duration-500">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 z-30 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-transform duration-300 ease-in-out pt-20 flex flex-col
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                <div className="p-4 flex-1">
                    <nav className="space-y-1">
                        <button
                            onClick={() => { setActiveTab('overview'); setIsSidebarOpen(false); }}
                            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all ${activeTab === 'overview' ? 'bg-pink-50 dark:bg-pink-900/20 text-pink-600' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                        >
                            <FaChartLine className="mr-3" /> Overview
                        </button>
                        <button
                            onClick={() => { setActiveTab('products'); setIsSidebarOpen(false); }}
                            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all ${activeTab === 'products' ? 'bg-pink-50 dark:bg-pink-900/20 text-pink-600' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                        >
                            <FaBox className="mr-3" /> Products
                        </button>
                        <button
                            onClick={() => { setActiveTab('orders'); setIsSidebarOpen(false); }}
                            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all ${activeTab === 'orders' ? 'bg-pink-50 dark:bg-pink-900/20 text-pink-600' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                        >
                            <FaShoppingCart className="mr-3" /> Orders
                        </button>
                        <button
                            onClick={() => { setActiveTab('users'); setIsSidebarOpen(false); }}
                            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all ${activeTab === 'users' ? 'bg-pink-50 dark:bg-pink-900/20 text-pink-600' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                        >
                            <FaUsers className="mr-3" /> Customers
                        </button>
                    </nav>
                </div>
                <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                    <button
                        onClick={logout}
                        className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 dark:text-red-500 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                    >
                        <FaSignOutAlt className="mr-3" /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content Wrapper */}
            <div className="flex-1 md:ml-64 flex flex-col min-h-screen transition-all duration-300">
                {/* Main Content */}
                <main className="flex-1 p-4 md:p-8 lg:p-10 xl:p-12 pt-24 md:pt-28">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="md:hidden p-2 -ml-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                            >
                                <FaBars className="text-xl" />
                            </button>
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white capitalize">{activeTab}</h2>
                        </div>
                        {activeTab === 'products' && (
                            <button
                                onClick={() => {
                                    setEditingProduct(null);
                                    setProductForm({ name: '', price: '', image: '', category: '', description: '' });
                                    setIsProductModalOpen(true);
                                }}
                                className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 md:px-6 py-2 rounded-xl font-bold text-sm md:text-base flex items-center hover:bg-black dark:hover:bg-gray-100 transition-all"
                            >
                                <FaPlus className="mr-2" /> <span className="hidden sm:inline">Add Product</span><span className="sm:hidden">Add</span>
                            </button>
                        )}
                    </div>


                    {/* Content Tabs */}
                    {activeTab === 'overview' && (
                        <div className="space-y-8">
                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
                                <div className="bg-white dark:bg-gray-900 p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-xl w-fit mb-4"><FaShoppingCart /></div>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Orders</p>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.totalOrders}</h3>
                                </div>
                                <div className="bg-white dark:bg-gray-900 p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                                    <div className="p-3 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-xl w-fit mb-4"><FaChartLine /></div>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Revenue</p>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Tsh {stats?.revenue.toLocaleString()}</h3>
                                </div>
                                <div className="bg-white dark:bg-gray-900 p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                                    <div className="p-3 bg-purple-50 dark:bg-purple-900/20 text-purple-600 rounded-xl w-fit mb-4"><FaBox /></div>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Active Products</p>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.totalProducts}</h3>
                                </div>
                                <div className="bg-white dark:bg-gray-900 p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                                    <div className="p-3 bg-pink-50 dark:bg-pink-900/20 text-pink-600 rounded-xl w-fit mb-4"><FaUsers /></div>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Registered Users</p>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.totalUsers}</h3>
                                </div>
                            </div>

                            {/* Recent Orders Table */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                                <div className="p-4 md:p-6 border-b border-gray-50 dark:border-gray-800 flex justify-between items-center">
                                    <h3 className="font-bold text-gray-900 dark:text-white">Recent Orders</h3>
                                    <button onClick={() => setActiveTab('orders')} className="text-pink-600 text-sm font-bold flex items-center hover:underline">
                                        View All <FaChevronRight className="ml-1 text-[10px]" />
                                    </button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs uppercase font-bold">
                                            <tr>
                                                <th className="px-6 py-4">Order ID</th>
                                                <th className="px-6 py-4 hidden md:table-cell">Customer</th>
                                                <th className="px-6 py-4 hidden sm:table-cell">Date</th>
                                                <th className="px-6 py-4">Total</th>
                                                <th className="px-6 py-4">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                            {orders.slice(0, 5).map(order => (
                                                <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                                    <td className="px-6 py-4 text-sm font-mono text-gray-500 dark:text-gray-400">#{order._id.slice(-6).toUpperCase()}</td>
                                                    <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-white hidden md:table-cell">{order.user?.name || 'Guest'}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 hidden sm:table-cell">{new Date(order.createdAt).toLocaleDateString()}</td>
                                                    <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-white">Tsh {order.totalPrice.toLocaleString()}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Completed' ? 'bg-green-100 text-green-600' :
                                                            order.status === 'Shipping' ? 'bg-blue-100 text-blue-600' : 'bg-yellow-100 text-yellow-600'
                                                            }`}>
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'products' && (
                        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs uppercase font-bold">
                                        <tr>
                                            <th className="px-6 py-4">Product</th>
                                            <th className="px-6 py-4 hidden md:table-cell">Category</th>
                                            <th className="px-6 py-4">Price</th>
                                            <th className="px-6 py-4">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                        {products.map(product => (
                                            <tr key={product._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center">
                                                        <img src={product.image} className="w-10 h-10 rounded-lg object-cover mr-3 bg-gray-50 dark:bg-gray-800" alt="" />
                                                        <span className="font-bold text-gray-900 dark:text-white">{product.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 hidden md:table-cell">{product.category}</td>
                                                <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">Tsh {product.price.toLocaleString()}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => {
                                                                setEditingProduct(product);
                                                                setProductForm(product);
                                                                setIsProductModalOpen(true);
                                                            }}
                                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                                        >
                                                            <FaEdit />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteProduct(product._id)}
                                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                        >
                                                            <FaTrash />
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

                    {activeTab === 'orders' && (
                        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs uppercase font-bold">
                                        <tr>
                                            <th className="px-6 py-4">Order</th>
                                            <th className="px-6 py-4 hidden md:table-cell">Customer</th>
                                            <th className="px-6 py-4 hidden sm:table-cell">Items</th>
                                            <th className="px-6 py-4">Total</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                        {orders.map(order => (
                                            <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-mono font-bold text-gray-900 dark:text-white">#{order._id.slice(-6).toUpperCase()}</div>
                                                    <div className="text-xs text-gray-400 dark:text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</div>
                                                </td>
                                                <td className="px-6 py-4 hidden md:table-cell">
                                                    <div className="text-sm font-bold text-gray-900 dark:text-white">{order.user?.name || 'Guest'}</div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400">{order.user?.email}</div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 hidden sm:table-cell">{order.orderItems.length} items</td>
                                                <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">Tsh {order.totalPrice.toLocaleString()}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center space-x-2">
                                                        <select
                                                            value={order.status}
                                                            onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                                            className={`text-xs font-bold px-2 py-1 rounded-lg outline-none cursor-pointer border-none ${order.status === 'Completed' ? 'bg-green-100 text-green-600' :
                                                                order.status === 'Shipping' ? 'bg-blue-100 text-blue-600' : 'bg-yellow-100 text-yellow-600'
                                                                }`}
                                                        >
                                                            <option value="Pending">Pending</option>
                                                            <option value="Shipping">Shipping</option>
                                                            <option value="Completed">Completed</option>
                                                            <option value="Cancelled">Cancelled</option>
                                                        </select>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button onClick={() => {
                                                        setSelectedOrder(order);
                                                        setIsOrderModalOpen(true);
                                                    }} className="text-xs font-bold text-pink-600 hover:underline">View Details</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'users' && (
                        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs uppercase font-bold">
                                        <tr>
                                            <th className="px-6 py-4">Name</th>
                                            <th className="px-6 py-4 hidden md:table-cell">Email</th>
                                            <th className="px-6 py-4">Role</th>
                                            <th className="px-6 py-4 hidden lg:table-cell">Joined</th>
                                            <th className="px-6 py-4">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                        {users.map(u => (
                                            <tr key={u._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                                <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">{u.name}</td>
                                                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 hidden md:table-cell">{u.email}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${u.isAdmin ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-500'}`}>
                                                        {u.isAdmin ? 'Admin' : 'Customer'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 hidden lg:table-cell">{new Date(u.createdAt).toLocaleDateString()}</td>
                                                <td className="px-6 py-4">
                                                    {!u.isAdmin && (
                                                        <button 
                                                            onClick={() => handleDeleteUser(u._id)}
                                                            className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50">
                                                            <FaTrash />
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

                {/* Footer */}
                <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors duration-500">
                    <div className="px-8 py-6">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            {/* Left side - Copyright */}
                            <div className="text-center md:text-left">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    © {new Date().getFullYear()} <span className="font-bold text-gray-900 dark:text-white">KENNSON MATELEPHONE</span>. All rights reserved.
                                </p>
                            </div>

                            {/* Right side - Admin info */}
                            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm">
                                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                                    <span>Admin Panel</span>
                                </div>
                                <div className="hidden sm:block h-4 w-px bg-gray-200 dark:bg-gray-700"></div>
                                <span className="text-gray-500 dark:text-gray-400">
                                    Logged in as <span className="font-semibold text-gray-900 dark:text-white">{user?.name}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </footer>
            </div >

            {/* Order Details Modal */}
            {isOrderModalOpen && selectedOrder && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto mx-4 md:mx-0">
                        <div className="p-4 md:p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center sticky top-0 bg-white dark:bg-gray-900 z-10">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Order Details</h3>
                                <p className="text-sm text-gray-500">#{selectedOrder._id}</p>
                            </div>
                            <button onClick={() => setIsOrderModalOpen(false)} className="text-gray-400 dark:text-gray-600 hover:text-gray-900 dark:hover:text-white"><FaTimes /></button>
                        </div>
                        <div className="p-4 md:p-6 space-y-8">
                            {/* Order Status & Payment */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                                    <h4 className="text-xs font-bold uppercase text-gray-400 mb-2">Payment Info</h4>
                                    <div className="space-y-1">
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600 dark:text-gray-300">Method</span>
                                            <span className="text-sm font-bold text-gray-900 dark:text-white">{selectedOrder.paymentMethod}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600 dark:text-gray-300">Total Amount</span>
                                            <span className="text-sm font-bold text-gray-900 dark:text-white">Tsh {selectedOrder.totalPrice.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600 dark:text-gray-300">Payment Status</span>
                                            <span className={`text-xs font-bold px-2 py-0.5 rounded ${selectedOrder.isPaid ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                                {selectedOrder.isPaid ? 'PAID' : 'UNPAID'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                                    <h4 className="text-xs font-bold uppercase text-gray-400 mb-2">Customer & Shipping</h4>
                                    <div className="space-y-1">
                                        <p className="text-sm font-bold text-gray-900 dark:text-white">{selectedOrder.shippingAddress?.address}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">{selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.zipCode}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">Phone: {selectedOrder.shippingAddress?.phone}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Customer: <span className="font-bold">{selectedOrder.user?.name}</span></p>
                                        <p className="text-xs text-gray-400">{selectedOrder.user?.email}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div>
                                <h4 className="text-xs font-bold uppercase text-gray-400 mb-4">Order Items ({selectedOrder.orderItems.length})</h4>
                                <div className="space-y-4">
                                    {selectedOrder.orderItems.map((item, index) => (
                                        <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors border border-gray-100 dark:border-gray-800">
                                            <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover bg-white" />
                                            <div className="flex-1">
                                                <h5 className="font-bold text-gray-900 dark:text-white text-sm">{item.name}</h5>
                                                <p className="text-xs text-gray-500">Qty: {item.quantity} x Tsh {item.price.toLocaleString()}</p>
                                            </div>
                                            <div className="font-bold text-gray-900 dark:text-white text-sm">
                                                Tsh {(item.price * item.quantity).toLocaleString()}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-gray-500">Status:</span>
                                    <select
                                        value={selectedOrder.status}
                                        onChange={(e) => handleStatusUpdate(selectedOrder._id, e.target.value)}
                                        className={`text-sm font-bold px-3 py-1.5 rounded-lg outline-none cursor-pointer border-none ${selectedOrder.status === 'Completed' ? 'bg-green-100 text-green-600' :
                                            selectedOrder.status === 'Shipping' ? 'bg-blue-100 text-blue-600' : 'bg-yellow-100 text-yellow-600'
                                            }`}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Shipping">Shipping</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </div>
                                <button onClick={() => setIsOrderModalOpen(false)} className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-2 rounded-xl font-bold hover:bg-black dark:hover:bg-gray-100 transition-all text-sm">
                                    Close Details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Product Modal */}
            {
                isProductModalOpen && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-scale-in mx-4 md:mx-0">
                            <div className="p-4 md:p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                                <button onClick={() => setIsProductModalOpen(false)} className="text-gray-400 dark:text-gray-600 hover:text-gray-900 dark:hover:text-white"><FaTimes /></button>
                            </div>
                            <form onSubmit={handleProductSubmit} className="p-4 md:p-6 space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-1">Product Name</label>
                                        <input
                                            type="text" required value={productForm.name}
                                            onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                                            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none text-gray-900 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-1">Price (Tsh)</label>
                                        <input
                                            type="number" required value={productForm.price}
                                            onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                                            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none text-gray-900 dark:text-white"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-1">Image URL</label>
                                        <input
                                            type="text" required value={productForm.image}
                                            onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                                            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none text-gray-900 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-1">Category</label>
                                        <select
                                            value={productForm.category}
                                            onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                                            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none text-gray-900 dark:text-white"
                                        >
                                            <option value="">Select Category</option>
                                            <option value="Flagship">Flagship</option>
                                            <option value="Foldable">Foldable</option>
                                            <option value="Budget">Budget</option>
                                            <option value="Mid-range">Mid-range</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-1">Description</label>
                                    <textarea
                                        required rows="3" value={productForm.description}
                                        onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none resize-none text-gray-900 dark:text-white"
                                    ></textarea>
                                </div>
                                <div className="pt-4 flex space-x-4">
                                    <button type="button" onClick={() => setIsProductModalOpen(false)} className="flex-1 py-3 border border-gray-100 dark:border-gray-700 rounded-xl font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800">Cancel</button>
                                    <button type="submit" className="flex-1 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold hover:bg-black dark:hover:bg-gray-100">Save Product</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default AdminDashboard;
