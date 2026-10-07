import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/api';

const SearchModal = ({ isOpen, onClose }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            // Focus input when modal opens
            setTimeout(() => inputRef.current?.focus(), 100);

            // Fetch products
            const fetchProducts = async () => {
                setLoading(true);
                try {
                    const { data } = await getProducts();
                    setProducts(data);
                } catch (error) {
                    console.error('Error fetching products:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchProducts();
        } else {
            // Reset search when modal closes
            setSearchQuery('');
            setFilteredProducts([]);
        }
    }, [isOpen]);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredProducts([]);
            return;
        }

        const query = searchQuery.toLowerCase();
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query) ||
            product.description?.toLowerCase().includes(query)
        );
        setFilteredProducts(filtered);
    }, [searchQuery, products]);

    const handleProductClick = () => {
        onClose();
        setSearchQuery('');
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-x-0 top-0 z-50 flex justify-center pt-20 px-4">
                <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden animate-slideDown">
                    {/* Search Input */}
                    <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                        <div className="relative">
                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search products by name, category, or description..."
                                className="w-full pl-12 pr-12 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                            />
                            <button
                                onClick={onClose}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-500 hover:text-red-500 transition-all"
                            >
                                <FaTimes className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="max-h-[60vh] overflow-y-auto">
                        {loading ? (
                            <div className="flex items-center justify-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-pink-600"></div>
                            </div>
                        ) : searchQuery.trim() === '' ? (
                            <div className="text-center py-20 px-6">
                                <FaSearch className="h-16 w-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                                <p className="text-gray-400 dark:text-gray-600 font-medium">
                                    Start typing to search for products
                                </p>
                            </div>
                        ) : filteredProducts.length > 0 ? (
                            <div className="p-4 space-y-2">
                                {filteredProducts.map((product) => (
                                    <Link
                                        key={product._id}
                                        to={`/products/${product._id}`}
                                        onClick={handleProductClick}
                                        className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all group border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-16 h-16 object-cover rounded-xl shadow-md group-hover:shadow-lg transition-shadow"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-gray-900 dark:text-white truncate group-hover:text-pink-600 transition-colors">
                                                {product.name}
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                                {product.category}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-black text-pink-600">
                                                {formatPrice(product.price)}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 px-6">
                                <div className="text-6xl mb-4">😕</div>
                                <p className="text-gray-400 dark:text-gray-600 font-medium mb-2">
                                    No products found
                                </p>
                                <p className="text-sm text-gray-400 dark:text-gray-600">
                                    Try searching with different keywords
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {filteredProducts.length > 0 && (
                        <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                            <p className="text-xs text-gray-500 dark:text-gray-400 text-center font-medium">
                                Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default SearchModal;
