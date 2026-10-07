import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/api';

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

    const filteredProducts = filter === 'All'
        ? products
        : products.filter(p => p.category === filter);

    if (loading) {
        return (
            <div className="pt-32 pb-16 min-h-screen flex items-center justify-center transition-colors">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-600"></div>
            </div>
        );
    }
    return (
        <div className="pt-32 pb-24 min-h-screen transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter uppercase">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">Collection</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-gray-500 dark:text-gray-400 text-lg font-medium leading-relaxed">
                        Explore the pinnacle of mobile innovation. From flagship powerhouses to versatile mid-range devices.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex justify-center mb-16 space-x-3 overflow-x-auto pb-4 no-scrollbar">
                    {['All', 'Flagship', 'Foldable', 'Budget', 'Mid-range'].map((category) => (
                        <button
                            key={category}
                            onClick={() => setFilter(category)}
                            className={`px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 transform active:scale-95 ${filter === category
                                ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-xl shadow-pink-600/30 ring-2 ring-pink-500/20'
                                : 'bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-100 dark:border-gray-800 shadow-sm'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-xl">
                        <p className="text-gray-400 dark:text-gray-600 font-black uppercase tracking-widest italic">No products found in this category.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
