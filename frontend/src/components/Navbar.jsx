import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUser, FaBars, FaTimes, FaSignOutAlt, FaSun, FaMoon, FaBox } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import SearchModal from './SearchModal';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { getCartItemsCount } = useCart();
    const { user, logout } = useAuth();
    const { isDarkMode, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Handle scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/products' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav
            className={`fixed w-full z-50 top-0 left-0 transition-all duration-500 ${scrolled
                ? 'bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl shadow-2xl py-2'
                : 'bg-transparent py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 flex items-center group">
                        <span className="text-xl md:text-2xl font-black tracking-tighter bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent group-hover:from-pink-500 group-hover:to-purple-500 transition-all duration-300 truncate max-w-[200px] md:max-w-none uppercase">
                            KENNSON MATELEPHONE
                        </span>
                        <div className="h-2 w-2 rounded-full bg-pink-600 ml-1.5 mt-3 animate-pulse"></div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-10 items-center">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={({ isActive }) =>
                                    `text-xs uppercase tracking-[0.2em] font-black transition-all duration-300 relative group py-2 ${isActive
                                        ? 'text-pink-600'
                                        : 'text-gray-900 dark:text-gray-100 hover:text-pink-600'
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        {link.name}
                                        <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-pink-600 transform origin-left transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </div>

                    {/* Icons */}
                    <div className="hidden md:flex items-center space-x-6">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2.5 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg border border-gray-200 dark:border-gray-700"
                            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        >
                            {isDarkMode ? <FaSun className="h-4 w-4 text-amber-500" /> : <FaMoon className="h-4 w-4 text-blue-600" />}
                        </button>

                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="text-gray-900 dark:text-gray-100 hover:text-pink-600 transition-all duration-300 hover:scale-110"
                            title="Search products"
                        >
                            <FaSearch className="h-5 w-5" />
                        </button>

                        <Link to="/cart" className="text-gray-900 dark:text-gray-100 hover:text-pink-600 transition-all duration-300 hover:scale-110 relative">
                            <FaShoppingCart className="h-5 w-5" />
                            <span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-[10px] font-black rounded-full h-4 w-4 flex items-center justify-center shadow-2xl ring-2 ring-white dark:ring-gray-900">
                                {getCartItemsCount()}
                            </span>
                        </Link>

                        {user ? (
                            <div className="flex items-center space-x-6 pl-4 border-l border-gray-200 dark:border-gray-800">
                                <Link to="/orders" className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-pink-600 transition-colors">My Orders</Link>
                                {user.isAdmin && (
                                    <Link to="/admin" className="text-pink-600 font-black text-[10px] uppercase tracking-widest flex items-center group px-3 py-2 rounded-xl bg-pink-50 dark:bg-pink-900/20 border border-pink-100 dark:border-pink-900/30 hover:bg-pink-100 dark:hover:bg-pink-900/40 transition-all">
                                        <span className="mr-1.5">Admin</span>
                                        <div className="h-1.5 w-1.5 rounded-full bg-pink-600 animate-pulse"></div>
                                    </Link>
                                )}
                                <div className="flex items-center space-x-4">
                                    <span className="text-xs font-black text-gray-700 dark:text-gray-300 hidden lg:block uppercase tracking-widest">Hi, {user.name.split(' ')[0]}</span>
                                    <button onClick={handleLogout} className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:text-red-500 dark:hover:text-red-400 transition-all duration-300 shadow-md" title="Logout">
                                        <FaSignOutAlt className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link to="/login" className="text-gray-900 dark:text-gray-100 hover:text-pink-600 transition-all duration-300 hover:scale-110 p-2.5 rounded-2xl bg-gray-100 dark:bg-gray-800">
                                <FaUser className="h-4 w-4" />
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 transition-all"
                        >
                            {isDarkMode ? <FaSun className="h-4 w-4 text-amber-500" /> : <FaMoon className="h-4 w-4 text-blue-600" />}
                        </button>
                        <button
                            onClick={toggleMenu}
                            className="text-gray-900 dark:text-gray-100 hover:text-pink-600 focus:outline-none transition-colors p-1"
                        >
                            {isOpen ? <FaTimes className="h-7 w-7" /> : <FaBars className="h-7 w-7" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-500 md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => setIsOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-4/5 max-sm:w-3/4 max-w-sm bg-white dark:bg-gray-950 shadow-[0_0_50px_rgba(0,0,0,0.5)] z-50 transform transition-transform duration-500 ease-in-out md:hidden flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-900">
                    <span className="text-lg font-black tracking-tighter bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent uppercase">
                        KENNSON
                    </span>
                    <button onClick={() => setIsOpen(false)} className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-red-500 transition-all">
                        <FaTimes className="h-6 w-6" />
                    </button>
                </div>

                <div className="px-8 py-10 flex flex-col space-y-8 overflow-y-auto flex-grow">
                    <div className="flex flex-col space-y-6">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) =>
                                    `text-xl font-black uppercase tracking-[0.2em] transition-all duration-300 border-b border-gray-50 dark:border-gray-900 pb-4 ${isActive
                                        ? 'text-pink-600'
                                        : 'text-gray-900 dark:text-gray-100'
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Link to="/cart" onClick={() => setIsOpen(false)} className="flex flex-col items-center justify-center p-6 rounded-[2.5rem] bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-gray-900 dark:text-gray-100 group">
                            <div className="relative mb-3">
                                <FaShoppingCart className="h-6 w-6 group-hover:text-pink-600 transition-colors" />
                                <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center shadow-lg">{getCartItemsCount()}</span>
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest">Cart</span>
                        </Link>

                        <button onClick={toggleTheme} className="flex flex-col items-center justify-center p-6 rounded-[2.5rem] bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-gray-900 dark:text-gray-100 group font-black">
                            {isDarkMode ? <FaSun className="h-6 w-6 text-amber-500 mb-3" /> : <FaMoon className="h-6 w-6 text-blue-600 mb-3" />}
                            <span className="text-[10px] uppercase tracking-widest">{isDarkMode ? 'Light' : 'Dark'}</span>
                        </button>
                    </div>

                    <div className="pt-6">
                        {user ? (
                            <div className="flex flex-col space-y-4">
                                <Link to="/orders" onClick={() => setIsOpen(false)} className="flex items-center justify-center space-x-3 p-5 rounded-[2.5rem] bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-black uppercase tracking-widest ">
                                    <FaBox className="h-4 w-4" />
                                    <span>My Orders</span>
                                </Link>
                                {user.isAdmin && (
                                    <Link to="/admin" onClick={() => setIsOpen(false)} className="flex items-center justify-center space-x-3 p-5 rounded-[2.5rem] bg-pink-600 text-white font-black uppercase tracking-widest shadow-xl shadow-pink-600/20">
                                        <FaUser className="h-4 w-4" />
                                        <span>Admin Panel</span>
                                    </Link>
                                )}
                                <button onClick={() => { handleLogout(); setIsOpen(false); }} className="flex items-center justify-center space-x-3 p-5 rounded-[2.5rem] bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-black uppercase tracking-widest shadow-xl">
                                    <FaSignOutAlt className="h-4 w-4" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" onClick={() => setIsOpen(false)} className="flex items-center justify-center space-x-3 p-5 rounded-[2.5rem] bg-gradient-to-r from-pink-600 to-purple-600 text-white font-black uppercase tracking-widest shadow-xl shadow-pink-600/20">
                                <FaUser className="h-4 w-4" />
                                <span>Sign In</span>
                            </Link>
                        )}
                    </div>
                </div>

                <div className="p-8 text-center bg-gray-50 dark:bg-gray-900/50">
                    <p className="text-[8px] font-black text-gray-400 dark:text-gray-600 uppercase tracking-[0.4em]">
                        KENNSON MATELEPHONE &copy; {new Date().getFullYear()}
                    </p>
                </div>
            </div>

            {/* Search Modal */}
            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </nav>
    );
};

export default Navbar;