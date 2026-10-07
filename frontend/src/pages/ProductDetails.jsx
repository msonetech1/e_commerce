import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    FaShoppingCart,
    FaArrowLeft,
    FaStar,
    FaCheck,
    FaShieldAlt,
    FaShippingFast,
    FaUndo,
    FaCheckCircle
} from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { getProductById, getProducts } from '../services/api';
import toast from 'react-hot-toast';

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data } = await getProductById(id);
                setProduct(data);

                const allRes = await getProducts();
                const related = allRes.data
                    .filter((p) => p.category === data.category && p._id !== data._id)
                    .slice(0, 4);
                setRelatedProducts(related);
            } catch (error) {
                console.error('Error fetching product details:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleAddToCart = () => {
        if (!product) return;
        addToCart(product);
        setAdded(true);
        toast.success(`${product.name} added to your cart!`);
        setTimeout(() => setAdded(false), 2200);
    };

    if (loading) {
        return (
            <div className="pt-32 pb-20 min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-slate-300 border-t-rose-600 rounded-full animate-spin" />
                    <p className="text-xs text-slate-500 dark:text-slate-400">Loading device specifications...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen pt-32 pb-20 px-4 flex flex-col items-center justify-center text-center">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Device Not Found</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 max-w-sm">
                    The requested device may have been discontinued or moved to another section.
                </p>
                <Link
                    to="/products"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-xs font-semibold"
                >
                    <FaArrowLeft className="w-3 h-3" /> Back to Catalog
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-28 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6" aria-label="Breadcrumb">
                    <Link to="/" className="hover:text-slate-600 dark:hover:text-slate-200">
                        Home
                    </Link>
                    <span>/</span>
                    <Link to="/products" className="hover:text-slate-600 dark:hover:text-slate-200">
                        Collection
                    </Link>
                    <span>/</span>
                    <span className="text-slate-700 dark:text-slate-300 font-medium truncate max-w-xs">
                        {product.name}
                    </span>
                </nav>

                {/* Main Product Showcase Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-10 shadow-xs">
                    {/* Image Column */}
                    <div className="lg:col-span-6 flex flex-col justify-center">
                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-750">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover object-center"
                                onError={(e) => {
                                    e.target.src = 'https://placehold.co/800x600?text=Certified+Device';
                                }}
                            />
                            <div className="absolute top-4 left-4 flex gap-2">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-900/85 text-white backdrop-blur-xs">
                                    <FaShieldAlt className="w-3 h-3 text-emerald-400" />
                                    Verified Hardware
                                </span>
                            </div>
                        </div>

                        {/* Assurance Badges Strip under photo */}
                        <div className="grid grid-cols-3 gap-3 mt-4 text-center">
                            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-150 dark:border-slate-750">
                                <span className="text-[11px] font-semibold text-slate-900 dark:text-white block">1-Year Warranty</span>
                                <span className="text-[10px] text-slate-400">Official coverage</span>
                            </div>
                            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-150 dark:border-slate-750">
                                <span className="text-[11px] font-semibold text-slate-900 dark:text-white block">Free Transfer</span>
                                <span className="text-[10px] text-slate-400">Data setup support</span>
                            </div>
                            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-150 dark:border-slate-750">
                                <span className="text-[11px] font-semibold text-slate-900 dark:text-white block">Factory Sealed</span>
                                <span className="text-[10px] text-slate-400">Inspect before paying</span>
                            </div>
                        </div>
                    </div>

                    {/* Metadata & Purchase Column */}
                    <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                                    {product.category || 'Mobile Device'}
                                </span>
                                <span className="text-slate-300 dark:text-slate-700">•</span>
                                <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                                    <FaCheckCircle className="w-3 h-3" /> In Stock for Delivery
                                </span>
                            </div>

                            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                {product.name}
                            </h1>

                            <div className="flex items-center gap-3 mt-3">
                                <div className="flex items-center text-amber-500 text-xs">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className="w-3.5 h-3.5" />
                                    ))}
                                </div>
                                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                    4.9 Rating (Verified Customers)
                                </span>
                            </div>
                        </div>

                        {/* Price Box */}
                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-750 flex items-baseline justify-between">
                            <div>
                                <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider block">
                                    Transparent TZS Price
                                </span>
                                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                                    Tsh {product.price?.toLocaleString()}
                                </span>
                            </div>
                            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                VAT &amp; Verification Included
                            </span>
                        </div>

                        {/* Description */}
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2">
                                Overview &amp; Specifications
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                {product.description ||
                                    'This certified smartphone is 100% factory original, compatible with all East African cellular networks (Vodacom, Airtel, Yas, Halotel), and comes with authorized manufacturer accessories and documentation.'}
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3 pt-2">
                            <button
                                onClick={handleAddToCart}
                                disabled={added}
                                className={`w-full py-3.5 px-6 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm ${
                                    added
                                        ? 'bg-emerald-600 text-white'
                                        : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-rose-600 dark:hover:bg-rose-600 dark:hover:text-white'
                                }`}
                            >
                                {added ? (
                                    <>
                                        <FaCheck className="w-4 h-4" /> Added to Your Cart
                                    </>
                                ) : (
                                    <>
                                        <FaShoppingCart className="w-4 h-4" /> Add to Cart &amp; Order
                                    </>
                                )}
                            </button>

                            <div className="flex items-center justify-center gap-6 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                                <span className="flex items-center gap-1.5">
                                    <FaShippingFast className="w-3.5 h-3.5 text-slate-400" />
                                    Insured Delivery
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <FaShieldAlt className="w-3.5 h-3.5 text-slate-400" />
                                    1-Year Guarantee
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <FaUndo className="w-3.5 h-3.5 text-slate-400" />
                                    Inspection on Delivery
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products Section */}
                {relatedProducts.length > 0 && (
                    <div className="mt-16 sm:mt-20">
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200/80 dark:border-slate-800/80">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                                    Similar Devices in {product.category}
                                </h2>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                    Explore alternative options with comparable performance and warranty.
                                </p>
                            </div>
                            <Link
                                to="/products"
                                className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline"
                            >
                                View All
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((relatedProduct) => (
                                <ProductCard key={relatedProduct._id || relatedProduct.id} product={relatedProduct} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;
