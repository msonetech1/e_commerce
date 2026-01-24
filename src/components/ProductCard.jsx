import React from 'react';
import { FaShoppingCart, FaHeart, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(product);
        toast.success(`${product.name} added to cart!`, {
            style: {
                borderRadius: '1rem',
                background: '#111827',
                color: '#fff',
            },
            iconTheme: {
                primary: '#db2777',
                secondary: '#fff',
            },
        });
    };

    return (
        <div className="group relative bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_20px_60px_-15px_rgba(219,39,119,0.2)] transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 dark:border-gray-800">
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                        console.error(`Failed to load image for ${product.name}: ${product.image}`);
                        e.target.src = 'https://placehold.co/600x400?text=No+Image';
                    }}
                />

                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/60 dark:bg-pink-900/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center space-x-4 backdrop-blur-sm transform translate-y-4 group-hover:translate-y-0">
                    <button
                        onClick={handleAddToCart}
                        className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-4 rounded-2xl hover:bg-pink-600 hover:text-white dark:hover:bg-pink-600 transition-all duration-300 shadow-2xl transform hover:scale-110 active:scale-90"
                    >
                        <FaShoppingCart className="h-5 w-5" />
                    </button>
                    <Link to={`/product/${product._id}`} className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-4 rounded-2xl hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 transition-all duration-300 shadow-2xl transform hover:scale-110 active:scale-90">
                        <FaEye className="h-5 w-5" />
                    </Link>
                </div>

                {/* Badges */}
                {product.isNew && (
                    <div className="absolute top-6 left-6 bg-gradient-to-r from-pink-600 to-purple-600 text-white text-[10px] font-black px-4 py-2 rounded-full shadow-lg uppercase tracking-widest animate-bounce">
                        New
                    </div>
                )}

                <div className="absolute top-6 right-6 p-2 bg-white/10 backdrop-blur-md rounded-xl text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <FaHeart className="h-4 w-4 hover:text-pink-500 transition-colors cursor-pointer" />
                </div>
            </div>

            {/* Content */}
            <div className="p-8">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-[.2em]">{product.category || 'Accessories'}</h3>
                    <div className="flex items-center space-x-1">
                        <div className="flex text-amber-400 text-[10px]">
                            {[...Array(5)].map((_, i) => (
                                <span key={i}>★</span>
                            ))}
                        </div>
                    </div>
                </div>

                <Link to={`/product/${product._id}`} className="block">
                    <h2 className="text-gray-900 dark:text-white font-black text-xl mb-4 group-hover:text-pink-600 dark:group-hover:text-pink-500 transition-colors truncate uppercase tracking-tighter">
                        {product.name}
                    </h2>
                </Link>

                <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-800/50">
                    <span className="text-lg font-black text-gray-900 dark:text-white tracking-widest">Tsh {product.price.toLocaleString()}</span>
                    <span className="text-[10px] text-gray-400 dark:text-gray-400 font-bold uppercase tracking-widest">Available</span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
