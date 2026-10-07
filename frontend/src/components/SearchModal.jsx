import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaTimes, FaTag, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/api';

const SearchModal = ({ isOpen, onClose }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);

    // Escape key listener & focus management
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);

            const fetchProducts = async () => {
                setLoading(true);
                try {
                    const { data } = await getProducts();
                    setProducts(data);
                } catch (error) {
                    console.error('Error fetching products for search:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchProducts();
        } else {
            setSearchQuery('');
            setFilteredProducts([]);
        }
    }, [isOpen]);

    useEffect(() => {
        if (!searchQuery.trim()) {
            setFilteredProducts([]);
            return;
        }

        const query = searchQuery.toLowerCase().trim();
        const filtered = products.filter((product) =>
            product.name?.toLowerCase().includes(query) ||
            product.category?.toLowerCase().includes(query) ||
            product.description?.toLowerCase().includes(query)
        );
        setFilteredProducts(filtered);
    }, [searchQuery, products]);

    const handleProductClick = () => {
        onClose();
        setSearchQuery('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true" aria-label="Search Catalog">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Box */}
            <div className="min-h-screen px-4 text-center flex items-start justify-center pt-20 sm:pt-24 pb-12">
                <div
                    className="inline-block w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl text-left shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transform transition-all animate-slide-down relative z-10"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Search Input Bar */}
                    <div className="relative border-b border-slate-200 dark:border-slate-800 p-4 sm:p-5">
                        <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            ref={inputRef}
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search smartphones, specifications, accessories..."
                            aria-label="Search catalog"
                            className="w-full pl-9 pr-12 py-2 text-sm sm:text-base bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
                        />
                        <button
                            onClick={onClose}
                            aria-label="Close search"
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            <FaTimes className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Results or Suggestions Container */}
                    <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5">
                        {loading ? (
                            <div className="py-12 flex flex-col items-center justify-center text-slate-400">
                                <div className="w-6 h-6 border-2 border-slate-300 border-t-rose-600 rounded-full animate-spin mb-3" />
                                <span className="text-xs">Accessing inventory...</span>
                            </div>
                        ) : searchQuery.trim() === '' ? (
                            <div className="py-8 text-center">
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
                                    Popular Categories
                                </p>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {['Flagship', 'Foldable', 'Budget', 'Mid-range'].map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => setSearchQuery(cat)}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                                        >
                                            <FaTag className="w-2.5 h-2.5 text-slate-400" />
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : filteredProducts.length > 0 ? (
                            <div className="space-y-2">
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 mb-2">
                                    Matching Results ({filteredProducts.length})
                                </p>
                                {filteredProducts.map((product) => (
                                    <Link
                                        key={product._id}
                                        to={`/product/${product._id}`}
                                        onClick={handleProductClick}
                                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/70 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-all group"
                                    >
                                        <div className="w-14 h-14 bg-slate-150 dark:bg-slate-800 rounded-lg overflow-hidden flex-shrink-0 border border-slate-100 dark:border-slate-750">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = 'https://placehold.co/100x100?text=Phone';
                                                }}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-sm font-semibold text-slate-900 dark:text-white truncate group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                                                    {product.name}
                                                </h3>
                                                {product.category && (
                                                    <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex-shrink-0">
                                                        {product.category}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                                                {product.description || 'Authentic certified device with official warranty.'}
                                            </p>
                                        </div>
                                        <div className="text-right flex-shrink-0 pl-2">
                                            <span className="text-sm font-bold text-slate-900 dark:text-white block">
                                                Tsh {product.price?.toLocaleString()}
                                            </span>
                                            <span className="text-[11px] font-medium text-rose-600 dark:text-rose-400 flex items-center justify-end gap-1 mt-0.5 group-hover:translate-x-0.5 transition-transform">
                                                View <FaArrowRight className="w-2.5 h-2.5" />
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="py-12 text-center">
                                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    No products matching &ldquo;{searchQuery}&rdquo;
                                </p>
                                <p className="text-xs text-slate-400 mt-1">
                                    Try checking for typos or searching by category (Flagship, Foldable, Budget).
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between text-xs text-slate-400">
                        <span>Press <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded font-mono text-[10px]">ESC</kbd> to close</span>
                        <Link
                            to="/products"
                            onClick={handleProductClick}
                            className="font-medium text-rose-600 dark:text-rose-400 hover:underline"
                        >
                            Browse Full Catalog
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchModal;
