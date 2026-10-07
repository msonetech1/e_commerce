import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    FaShieldAlt,
    FaShippingFast,
    FaHeadset,
    FaMobileAlt,
    FaArrowRight,
    FaCheck,
    FaQuoteLeft
} from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/api';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const { data } = await getProducts();
                const flagship = data.filter((p) => p.category === 'Flagship').slice(0, 4);
                setFeaturedProducts(flagship.length > 0 ? flagship : data.slice(0, 4));
            } catch (error) {
                console.error('Error fetching featured products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFeatured();
    }, []);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 border-b border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-b from-white via-slate-50 to-slate-100/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        {/* Hero Text Column */}
                        <div className="lg:col-span-7 space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200/60 dark:border-rose-900/40">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping" />
                                Tanzanian Certified Mobile Foundation • Est. 2015
                            </div>

                            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12]">
                                Authentic Technology.{' '}
                                <span className="text-rose-600 dark:text-rose-400">
                                    Trusted by Communities.
                                </span>
                            </h1>

                            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-normal">
                                We bridge East Africa&apos;s digital divide with 100% genuine smartphones, transparent pricing, and local technical warranty support you can count on every single day.
                            </p>

                            {/* Trust Checklist */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 flex items-center justify-center flex-shrink-0">
                                        <FaCheck className="w-2.5 h-2.5" />
                                    </div>
                                    <span>Direct authorized manufacturer serials</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 flex items-center justify-center flex-shrink-0">
                                        <FaCheck className="w-2.5 h-2.5" />
                                    </div>
                                    <span>Same-day insured dispatch in Dar es Salaam</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 flex items-center justify-center flex-shrink-0">
                                        <FaCheck className="w-2.5 h-2.5" />
                                    </div>
                                    <span>Support for M-Pesa, T-Pesa &amp; HaloPesa</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 flex items-center justify-center flex-shrink-0">
                                        <FaCheck className="w-2.5 h-2.5" />
                                    </div>
                                    <span>In-person warranty service counter</span>
                                </div>
                            </div>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
                                <Link
                                    to="/products"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-rose-600 dark:hover:bg-rose-600 dark:hover:text-white shadow-sm transition-colors"
                                >
                                    <span>Explore Collection</span>
                                    <FaArrowRight className="w-3 h-3" />
                                </Link>
                                <Link
                                    to="/about"
                                    className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors"
                                >
                                    Our Mission &amp; Impact
                                </Link>
                            </div>
                        </div>

                        {/* Hero Right: Handcrafted Device Spotlight Card */}
                        <div className="lg:col-span-5">
                            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-md p-6 sm:p-8 space-y-6">
                                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                                    <div className="flex items-center gap-2">
                                        <FaShieldAlt className="w-4 h-4 text-emerald-500" />
                                        <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                                            The Kennson Promise
                                        </span>
                                    </div>
                                    <span className="text-[11px] font-medium text-slate-400">
                                        Official Guarantee
                                    </span>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <FaMobileAlt className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                                                Zero Counterfeits, 100% Genuine
                                            </h4>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                                Every unit comes in factory sealed packaging with authentic manufacturer IMEI verification.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <FaShippingFast className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                                                Safe &amp; Insured Transit
                                            </h4>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                                Nationwide secure logistics with real-time phone tracking and doorstep inspection.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <FaHeadset className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                                                Complete Setup Support
                                            </h4>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                                Complimentary data transfer and initial device configuration for every customer.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-750 flex items-center justify-between text-xs">
                                    <div>
                                        <span className="font-bold text-slate-900 dark:text-white block">
                                            Questions before buying?
                                        </span>
                                        <span className="text-slate-500 dark:text-slate-400">
                                            Speak directly to our technical team
                                        </span>
                                    </div>
                                    <Link
                                        to="/contact"
                                        className="font-semibold text-rose-600 dark:text-rose-400 hover:underline"
                                    >
                                        Contact Us
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact Metric Strip */}
            <section className="py-10 bg-white dark:bg-slate-900/40 border-b border-slate-200/80 dark:border-slate-800/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div className="space-y-1">
                            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                                12,500+
                            </span>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                Genuine Devices Placed
                            </p>
                        </div>
                        <div className="space-y-1">
                            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                                10 Years
                            </span>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                Trusted in Tanzania
                            </p>
                        </div>
                        <div className="space-y-1">
                            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                                100%
                            </span>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                Official Warranty Honor
                            </p>
                        </div>
                        <div className="space-y-1">
                            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                                4.9 / 5.0
                            </span>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                Community Satisfaction
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Devices Section */}
            <section className="py-16 md:py-24 bg-slate-50/50 dark:bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-1 block">
                                Handpicked Inventory
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                                Featured Smartphones &amp; Devices
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
                                Curated for long-term reliability, proven battery endurance, and full carrier compatibility.
                            </p>
                        </div>
                        <Link
                            to="/products"
                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-rose-600 dark:text-rose-400 hover:text-rose-700 transition-colors"
                        >
                            <span>Browse Complete Catalog</span>
                            <FaArrowRight className="w-3 h-3" />
                        </Link>
                    </div>

                    {/* Products Grid */}
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[1, 2, 3, 4].map((i) => (
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
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {featuredProducts.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Foundation Values / Why Trust Us Section */}
            <section className="py-16 md:py-24 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-1 block">
                            Our Standards
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                            Built on Transparency &amp; Human Care
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
                            Unlike anonymous marketplaces, Kennson operates a physical center, provides certified paperwork, and stands behind every device we supply.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-750">
                            <div className="w-10 h-10 rounded-lg bg-rose-100 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center mb-4">
                                <FaShieldAlt className="w-5 h-5" />
                            </div>
                            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                                Verified Direct Sourcing
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                We deal exclusively with authorized regional distributors. No refurbished surprises, no locked phones, and no grey-market risks.
                            </p>
                        </div>

                        <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-750">
                            <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mb-4">
                                <FaHeadset className="w-5 h-5" />
                            </div>
                            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                                Human Technical Assistance
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                Our support team is based right here in Dar es Salaam. We assist you with iCloud, Google account transfers, and troubleshooting anytime.
                            </p>
                        </div>

                        <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-750">
                            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center mb-4">
                                <FaShippingFast className="w-5 h-5" />
                            </div>
                            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                                Responsible Community Trade
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                We invest back into digital accessibility through educational phone drives, subsidized student accessories, and electronics recycling.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Community Voices / Authentic Testimonials */}
            <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-xl mx-auto mb-12">
                        <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-1 block">
                            Real Experiences
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                            Trusted by Tanzanians Everywhere
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between">
                            <div className="space-y-3">
                                <FaQuoteLeft className="w-4 h-4 text-rose-400" />
                                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                    &ldquo;I ordered a phone for my university coursework. Kennson delivered the sealed device right to my hostel in Sinza within three hours. Their warranty certificate gave me total peace of mind.&rdquo;
                                </p>
                            </div>
                            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                                <p className="text-xs font-bold text-slate-900 dark:text-white">Amina Mwamba</p>
                                <p className="text-[11px] text-slate-400">Medical Student, Dar es Salaam</p>
                            </div>
                        </div>

                        <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between">
                            <div className="space-y-3">
                                <FaQuoteLeft className="w-4 h-4 text-rose-400" />
                                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                    &ldquo;For our small business logistics fleet, we needed reliable smartphones. Kennson guided us to the right model within our budget and helped transfer our business accounts smoothly.&rdquo;
                                </p>
                            </div>
                            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                                <p className="text-xs font-bold text-slate-900 dark:text-white">Joseph Makundi</p>
                                <p className="text-[11px] text-slate-400">Logistics Director, Kariakoo</p>
                            </div>
                        </div>

                        <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between">
                            <div className="space-y-3">
                                <FaQuoteLeft className="w-4 h-4 text-rose-400" />
                                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                    &ldquo;I was hesitant about ordering online because of fake devices on social media. Visiting Kennson&apos;s physical counter at Career House changed everything. Honest people doing honest work.&rdquo;
                                </p>
                            </div>
                            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                                <p className="text-xs font-bold text-slate-900 dark:text-white">Rehema Lyimo</p>
                                <p className="text-[11px] text-slate-400">Educator &amp; Content Creator</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
