import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShippingFast, FaCheckCircle, FaHeadset, FaMobileAlt } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/api';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const { data } = await getProducts();
                // Show flagship products as featured, or just first 4
                const featured = data.filter(p => p.category === 'Flagship').slice(0, 4);
                setFeaturedProducts(featured.length > 0 ? featured : data.slice(0, 4));
            } catch (error) {
                console.error('Error fetching featured products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFeatured();
    }, []);

    return (
        <div className="min-h-screen transition-colors duration-500">
            {/* Hero Section */}
            <section className="relative py-32 flex items-center min-h-[80vh] dark:bg-gray-950 overflow-hidden transition-colors">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/home-bg.jpg"
                        alt="Background"
                        className="w-full h-full object-cover opacity-30 dark:opacity-20 translate-y-[-10%]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white dark:via-gray-950/50 dark:to-gray-950"></div>
                </div>

                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 dark:opacity-20 z-10 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-pink-600 rounded-full blur-[150px] animate-pulse"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600 rounded-full blur-[150px] animate-pulse"></div>
                </div>

                <div className="relative z-20 px-4 max-w-7xl mx-auto w-full flex justify-center items-center h-full text-center">
                    <div className="max-w-4xl">
                        <span className="block text-pink-600 font-extrabold uppercase tracking-widest mb-4 animate-fade-in-up drop-shadow-sm">
                            Welcome to the Future
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-6 leading-tight animate-fade-in-up delay-100 drop-shadow-sm uppercase">
                            KENNSON <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">MATELEPHONE</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 font-medium leading-relaxed max-w-2xl mx-auto animate-fade-in-up delay-200">
                            Discover the ultimate collection of premium smartphones and accessories. Elevate your mobile lifestyle today with cutting-edge technology.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in-up delay-300">
                            <Link to="/products" className="px-10 py-5 bg-gray-950 dark:bg-white text-white dark:text-gray-950 rounded-[2rem] font-black text-lg hover:bg-pink-600 dark:hover:bg-pink-600 dark:hover:text-white transition-all transform hover:-translate-y-1 hover:shadow-2xl text-center shadow-xl uppercase tracking-widest">
                                Shop Now
                            </Link>
                            <Link to="/about" className="px-10 py-5 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-[2rem] font-black text-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all transform hover:-translate-y-1 hover:shadow-2xl border border-gray-200 dark:border-gray-800 text-center shadow-lg uppercase tracking-widest">
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                        <div className="flex flex-col items-center text-center p-10 bg-white/50 dark:bg-gray-950/50 rounded-[3rem] border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
                            <div className="bg-pink-100 dark:bg-pink-900/30 p-5 rounded-[2rem] text-pink-600 mb-6 group-hover:scale-110 transition-transform">
                                <FaMobileAlt className="h-10 w-10" />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 uppercase tracking-wide">Premium Quality</h3>
                            <p className="text-gray-500 dark:text-gray-300 text-sm font-medium">Certified genuine devices with global manufacturer warranty.</p>
                        </div>
                        <div className="flex flex-col items-center text-center p-10 bg-gray-50 dark:bg-gray-950/50 rounded-[3rem] border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
                            <div className="bg-purple-100 dark:bg-purple-900/30 p-5 rounded-[2rem] text-purple-600 mb-6 group-hover:scale-110 transition-transform">
                                <FaShippingFast className="h-10 w-10" />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 uppercase tracking-wide">Fast Delivery</h3>
                            <p className="text-gray-500 dark:text-gray-300 text-sm font-medium">Free express shipping on all orders over Tsh 1,000,000.</p>
                        </div>
                        <div className="flex flex-col items-center text-center p-10 bg-gray-50 dark:bg-gray-950/50 rounded-[3rem] border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
                            <div className="bg-blue-100 dark:bg-blue-900/30 p-5 rounded-[2rem] text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                                <FaCheckCircle className="h-10 w-10" />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 uppercase tracking-wide">Secure Payment</h3>
                            <p className="text-gray-500 dark:text-gray-300 text-sm font-medium">100% secure payment processing with top-tier encryption.</p>
                        </div>
                        <div className="flex flex-col items-center text-center p-10 bg-gray-50 dark:bg-gray-950/50 rounded-[3rem] border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
                            <div className="bg-green-100 dark:bg-green-900/30 p-5 rounded-[2rem] text-green-600 mb-6 group-hover:scale-110 transition-transform">
                                <FaHeadset className="h-10 w-10" />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 uppercase tracking-wide">24/7 Support</h3>
                            <p className="text-gray-500 dark:text-gray-300 text-sm font-medium">Dedicated support team ready to assist you anytime.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-32 transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter uppercase">
                            Featured <span className="text-pink-600">Smartphones</span>
                        </h2>
                        <p className="text-gray-500 dark:text-gray-300 max-w-2xl mx-auto text-lg font-medium">
                            Check out our most popular devices this season. Only the best for you.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                        {loading ? (
                            <div className="col-span-full py-12 flex justify-center">
                                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-600"></div>
                            </div>
                        ) : (
                            featuredProducts.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))
                        )}
                    </div>

                    <div className="text-center mt-20">
                        <Link to="/products" className="inline-block px-12 py-5 border-4 border-gray-950 dark:border-white text-gray-950 dark:text-white font-black text-lg rounded-[2rem] hover:bg-gray-950 dark:hover:bg-white hover:text-white dark:hover:text-gray-950 transition-all duration-500 uppercase tracking-widest shadow-2xl">
                            View All Products
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
