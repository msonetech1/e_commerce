import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
    FaSearch,
    FaShoppingCart,
    FaUser,
    FaBars,
    FaTimes,
    FaSignOutAlt,
    FaSun,
    FaMoon,
    FaBox,
    FaShieldAlt
} from 'react-icons/fa';
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

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 15);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent background scrolling when mobile drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Collection', path: '/products' },
        { name: 'Our Mission', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    const cartCount = getCartItemsCount();

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
                    scrolled
                        ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 dark:border-slate-800/80 py-3'
                        : 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm border-b border-slate-100 dark:border-slate-850 py-4'
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-12">
                        {/* Brand Logo & Seal */}
                        <Link
                            to="/"
                            className="flex items-center gap-3 group focus-visible:ring-2 focus-visible:ring-rose-500 rounded-lg p-1"
                        >
                            <div className="w-9 h-9 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-base tracking-wider shadow-sm transition-transform duration-200 group-hover:scale-105">
                                K
                            </div>
                            <div className="flex flex-col">
                                <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-none">
                                    Kennson <span className="font-medium text-rose-600 dark:text-rose-400">Matelephone</span>
                                </span>
                                <span className="text-[10px] uppercase font-semibold tracking-widest text-slate-500 dark:text-slate-400 mt-0.5">
                                    Authentic Mobile Tech
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Navigation Links */}
                        <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `px-3.5 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ${
                                            isActive
                                                ? 'text-rose-600 dark:text-rose-400 bg-rose-50/70 dark:bg-rose-950/40 font-semibold'
                                                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                                        }`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                        </nav>

                        {/* Desktop Action Utilities */}
                        <div className="hidden md:flex items-center gap-2 lg:gap-3">
                            {/* Search Button */}
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                aria-label="Search devices"
                                className="flex items-center gap-2 px-3 py-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200/70 dark:hover:bg-slate-700/80 rounded-lg border border-slate-200/60 dark:border-slate-700/60 transition-colors"
                            >
                                <FaSearch className="w-3.5 h-3.5 text-slate-400" />
                                <span className="hidden lg:inline">Search...</span>
                                <kbd className="hidden lg:inline text-[10px] font-mono bg-white dark:bg-slate-900 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                                    /
                                </kbd>
                            </button>

                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                                className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                title={isDarkMode ? 'Light mode' : 'Dark mode'}
                            >
                                {isDarkMode ? (
                                    <FaSun className="w-4 h-4 text-amber-400" />
                                ) : (
                                    <FaMoon className="w-4 h-4 text-slate-600" />
                                )}
                            </button>

                            {/* Cart Link with Badge */}
                            <Link
                                to="/cart"
                                aria-label={`Shopping cart with ${cartCount} items`}
                                className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                                <FaShoppingCart className="w-4 h-4" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-bold rounded-full min-w-4 h-4 px-1 flex items-center justify-center shadow-sm">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>

                            <div className="h-5 w-px bg-slate-200 dark:bg-slate-800 mx-1" />

                            {/* User Authentication Status */}
                            {user ? (
                                <div className="flex items-center gap-2">
                                    <Link
                                        to="/orders"
                                        className="text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                    >
                                        My Orders
                                    </Link>
                                    {user.isAdmin && (
                                        <Link
                                            to="/admin"
                                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 px-2.5 py-1.5 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors"
                                        >
                                            <FaShieldAlt className="w-3 h-3 text-rose-600" />
                                            Admin
                                        </Link>
                                    )}
                                    <div className="flex items-center gap-2 pl-2">
                                        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                                            {user.name.split(' ')[0]}
                                        </span>
                                        <button
                                            onClick={handleLogout}
                                            aria-label="Log out"
                                            className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                                            title="Sign Out"
                                        >
                                            <FaSignOutAlt className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Link
                                        to="/login"
                                        className="text-xs font-medium text-slate-700 dark:text-slate-200 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="text-xs font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 px-3.5 py-2 rounded-lg shadow-sm transition-colors"
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile Actions: Search, Theme, Hamburger */}
                        <div className="flex items-center gap-1.5 md:hidden">
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                aria-label="Search"
                                className="p-2 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                                <FaSearch className="w-4 h-4" />
                            </button>

                            <Link
                                to="/cart"
                                aria-label={`Cart with ${cartCount} items`}
                                className="relative p-2 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                                <FaShoppingCart className="w-4 h-4" />
                                {cartCount > 0 && (
                                    <span className="absolute top-1 right-1 bg-rose-600 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>

                            <button
                                onClick={toggleTheme}
                                aria-label="Toggle color theme"
                                className="p-2 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                                {isDarkMode ? (
                                    <FaSun className="w-4 h-4 text-amber-400" />
                                ) : (
                                    <FaMoon className="w-4 h-4 text-slate-600" />
                                )}
                            </button>

                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                                className="p-2 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
                            >
                                {isOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Drawer Backdrop */}
            <div
                className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 md:hidden transition-opacity duration-300 ${
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={() => setIsOpen(false)}
            />

            {/* Mobile Navigation Drawer */}
            <div
                className={`fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-white dark:bg-slate-900 shadow-2xl z-50 md:hidden flex flex-col transform transition-transform duration-300 ease-out border-l border-slate-200 dark:border-slate-800 ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {/* Drawer Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-sm">
                            K
                        </div>
                        <span className="font-bold text-slate-900 dark:text-white">Kennson</span>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        aria-label="Close navigation"
                        className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
                    >
                        <FaTimes className="w-5 h-5" />
                    </button>
                </div>

                {/* Drawer Links */}
                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                    <div className="space-y-1">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 px-3">
                            Navigation
                        </p>
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                        isActive
                                            ? 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 font-semibold'
                                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-800 pt-6 space-y-1">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 px-3">
                            Account &amp; Orders
                        </p>
                        <Link
                            to="/cart"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                        >
                            <span className="flex items-center gap-2.5">
                                <FaShoppingCart className="w-4 h-4 text-slate-400" />
                                Cart
                            </span>
                            {cartCount > 0 && (
                                <span className="bg-rose-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                                    {cartCount} items
                                </span>
                            )}
                        </Link>
                        {user ? (
                            <>
                                <Link
                                    to="/orders"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                                >
                                    <FaBox className="w-4 h-4 text-slate-400" />
                                    My Orders
                                </Link>
                                {user.isAdmin && (
                                    <Link
                                        to="/admin"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                                    >
                                        <FaShieldAlt className="w-4 h-4 text-rose-500" />
                                        Admin Panel
                                    </Link>
                                )}
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setIsOpen(false);
                                    }}
                                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 text-left"
                                >
                                    <FaSignOutAlt className="w-4 h-4" />
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <div className="pt-2 space-y-2">
                                <Link
                                    to="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="w-full flex items-center justify-center py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/register"
                                    onClick={() => setIsOpen(false)}
                                    className="w-full flex items-center justify-center py-2.5 text-sm font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 rounded-lg shadow-sm"
                                >
                                    Create Account
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Drawer Footer */}
                <div className="p-6 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400">
                    <p className="font-medium text-slate-600 dark:text-slate-400">Kennson Matelephone</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">East Africa's Certified Mobile Partner</p>
                </div>
            </div>

            {/* Accessible Search Dialog */}
            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
};

export default Navbar;