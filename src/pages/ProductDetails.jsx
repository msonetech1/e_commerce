import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaShoppingCart, FaArrowLeft, FaStar, FaCheck } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { getProductById, getProducts } from '../services/api';

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await getProductById(id);
                setProduct(data);

                // Fetch all products to find related ones
                const allRes = await getProducts();
                const related = allRes.data
                    .filter(p => p.category === data.category && p._id !== data._id)
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
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    if (loading) {
        return (
            <div className="pt-32 pb-16 min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen pt-32 pb-12 px-4 flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
                <Link to="/products" className="text-pink-600 hover:text-pink-700 font-medium flex items-center">
                    <FaArrowLeft className="mr-2" /> Back to Products
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-16 min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/products" className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-8 transition-colors">
                    <FaArrowLeft className="mr-2" /> Back to Products
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                    {/* Image Section */}
                    <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    {/* Info Section */}
                    <div className="flex flex-col justify-center">
                        <span className="text-pink-600 font-bold tracking-wider text-sm uppercase mb-2">
                            {product.category}
                        </span>
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{product.name}</h1>

                        <div className="flex items-center mb-6">
                            <div className="flex text-yellow-400 mr-2">
                                {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                            </div>
                            <span className="text-gray-500 text-sm">(120 reviews)</span>
                        </div>

                        <p className="text-3xl font-bold text-gray-900 mb-8">Tsh {product.price.toLocaleString()}</p>

                        <p className="text-gray-600 text-lg leading-relaxed mb-10">
                            {product.description}
                        </p>

                        <div className="flex space-x-4">
                            <button
                                onClick={handleAddToCart}
                                disabled={added}
                                className={`flex-1 text-white py-4 px-8 rounded-full font-bold text-lg hover:shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center ${added
                                    ? 'bg-green-500 hover:shadow-green-500/30'
                                    : 'bg-gradient-to-r from-pink-600 to-purple-600 hover:shadow-pink-500/30'
                                    }`}
                            >
                                {added ? <FaCheck className="mr-2" /> : <FaShoppingCart className="mr-2" />}
                                {added ? 'Added to Cart' : 'Add to Cart'}
                            </button>
                            {/* <button className="p-4 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors text-gray-500 hover:text-red-500">
                                <FaHeart className="w-6 h-6" />
                            </button> */}
                        </div>
                    </div>
                </div>

                {/* Related Products Section */}
                {relatedProducts.length > 0 && (
                    <div className="mt-24 border-t border-gray-100 pt-16">
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Related Products</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {relatedProducts.map((relatedProduct) => (
                                <ProductCard key={relatedProduct.id} product={relatedProduct} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;
