import React from 'react';
import { FaShoppingCart, FaShieldAlt, FaStar, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        toast.success(`${product.name} added to cart!`);
    };

    return (
        <article className="group flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800/90 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
            {/* Image & Badges Container */}
            <div className="relative aspect-[4/3] bg-slate-100 dark:bg-slate-800/60 overflow-hidden">
                <Link to={`/product/${product._id}`} tabIndex={-1} aria-hidden="true" className="block w-full h-full">
                    <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
                        onError={(e) => {
                            e.target.src = 'https://placehold.co/600x450?text=Authentic+Device';
                        }}
                    />
                </Link>

                {/* Status Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
                    {product.isNew && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-600 text-white shadow-xs">
                            New Release
                        </span>
                    )}
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-900/80 text-white backdrop-blur-xs">
                        <FaShieldAlt className="w-2.5 h-2.5 text-emerald-400" />
                        Verified
                    </span>
                </div>

                {/* Category Pill */}
                {product.category && (
                    <div className="absolute bottom-3 left-3 pointer-events-none">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 backdrop-blur-xs border border-slate-200/50 dark:border-slate-750">
                            {product.category}
                        </span>
                    </div>
                )}
            </div>

            {/* Product Metadata & Actions */}
            <div className="p-4 sm:p-5 flex flex-col flex-1">
                {/* Rating & In-Stock indicator */}
                <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1 text-amber-500 text-xs">
                        <FaStar className="w-3 h-3" />
                        <span className="font-semibold text-slate-700 dark:text-slate-300 text-xs">4.9</span>
                        <span className="text-slate-400 text-[11px]">(Verified)</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        In Stock
                    </span>
                </div>

                {/* Title */}
                <Link to={`/product/${product._id}`} className="group/title block">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white line-clamp-1 group-hover/title:text-rose-600 dark:group-hover/title:text-rose-400 transition-colors">
                        {product.name}
                    </h3>
                </Link>

                {/* Subtitle / Description hint */}
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 mb-4 flex-1">
                    {product.description || 'Full manufacturer warranty included with certified genuine serial.'}
                </p>

                {/* Price & Purchase Actions */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                    <div className="min-w-0 flex-1">
                        <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider block">
                            Price
                        </span>
                        <span className="text-xs sm:text-sm lg:text-base font-extrabold text-slate-900 dark:text-white truncate block">
                            Tsh {product.price?.toLocaleString()}
                        </span>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                        <Link
                            to={`/product/${product._id}`}
                            aria-label={`View details for ${product.name}`}
                            className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
                            title="View Details"
                        >
                            <FaArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        <button
                            onClick={handleAddToCart}
                            aria-label={`Add ${product.name} to cart`}
                            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-rose-600 dark:hover:bg-rose-600 dark:hover:text-white rounded-lg text-xs font-semibold shadow-xs transition-colors min-h-[36px]"
                        >
                            <FaShoppingCart className="w-3 h-3" />
                            <span className="hidden sm:inline">Add</span>
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default ProductCard;
