import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/api';
import { FaMobileAlt } from 'react-icons/fa';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        const fetchProducts = async () => {
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
    }, []);

    const categories = ['All', 'Flagship', 'Foldable', 'Budget', 'Mid-range'];

    const filteredProducts = filter === 'All'
        ? products
        : products.filter((p) => p.category?.toLowerCase() === filter.toLowerCase());

    return (
        <div className="min-h-screen pt-28 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="max-w-3xl mb-8">
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-1 block">
                        Verified Hardware Catalog
                    </span>
                    <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Certified Smartphones &amp; Mobile Devices
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                        Every model in our inventory is backed by factory sealed packaging, verified IMEI credentials, and our 1-year East African warranty.
                    </p>
                </div>

                {/* Filter Bar */}
                <div className="flex items-center justify-between flex-wrap gap-4 py-4 mb-8 border-y border-slate-200/80 dark:border-slate-800/80">
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
                        {categories.map((category) => {
                            const count = category === 'All'
                                ? products.length
                                : products.filter((p) => p.category?.toLowerCase() === category.toLowerCase()).length;

                            return (
                                <button
                                    key={category}
                                    onClick={() => setFilter(category)}
                                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 flex-shrink-0 ${
                                        filter === category
                                            ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                    }`}
                                >
                                    <span>{category}</span>
                                    {!loading && (
                                        <span
                                            className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                                                filter === category
                                                    ? 'bg-slate-800 dark:bg-slate-200 text-slate-200 dark:text-slate-800'
                                                    : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                                            }`}
                                        >
                                            {count}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        Showing <span className="font-bold text-slate-900 dark:text-white">{filteredProducts.length}</span> devices
                    </div>
                </div>

                {/* Products Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div
                                key={i}
                                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 space-y-4 animate-pulse"
                            >
                                <div className="aspect-[4/3] bg-slate-100 dark:bg-slate-800 rounded-lg" />
                                <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-3/4" />
                                <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-1/2" />
                                <div className="h-8 bg-slate-100 dark:bg-slate-800 rounded" />
                            </div>
                        ))}
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 max-w-md mx-auto">
                        <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-4">
                            <FaMobileAlt className="w-6 h-6" />
                        </div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                            No devices found in &ldquo;{filter}&rdquo;
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                            We restock verified inventory weekly. Try viewing all products or contact our team for reservations.
                        </p>
                        <button
                            onClick={() => setFilter('All')}
                            className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-xs font-semibold shadow-xs"
                        >
                            View All Categories
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
