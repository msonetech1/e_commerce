import React from 'react';
import {
    FaHandshake,
    FaAward,
    FaUsers,
    FaShieldAlt,
    FaCheck,
    FaStore
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="min-h-screen pt-28 pb-20">
            {/* Editorial Header */}
            <section className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 py-16 md:py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200/60 dark:border-rose-900/40">
                        Our History &amp; Mission • Established 2015
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                        Connecting East Africa with{' '}
                        <span className="text-rose-600 dark:text-rose-400">Authentic Technology</span>
                    </h1>
                    <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
                        We believe access to modern mobile technology is a fundamental catalyst for education, entrepreneurship, and personal dignity.
                    </p>
                </div>
            </section>

            {/* Narrative & Story Section */}
            <section className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-6 space-y-5 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                        <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 block">
                            Our Origins
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                            Started in Local Markets. Built on Absolute Trust.
                        </h2>
                        <p>
                            In 2015, the East African electronics landscape was plagued by counterfeit devices, misleading warranties, and inconsistent pricing that disadvantaged everyday buyers. Students and hardworking families were spending their savings on phones that failed within months.
                        </p>
                        <p>
                            Kennson Matelephone was founded with a single, uncompromising rule: <strong className="text-slate-900 dark:text-white font-semibold">100% genuine products, direct manufacturer verification, and unconditional accountability</strong>.
                        </p>
                        <p>
                            Today, from our headquarters at Career House in Dar es Salaam, we have equipped more than 12,500 Tanzanians with verified mobile devices, provided hands-on digital onboarding, and built one of the region&apos;s most respected customer service foundations.
                        </p>

                        <div className="pt-2">
                            <Link
                                to="/products"
                                className="inline-flex items-center gap-2 text-sm font-semibold text-rose-600 dark:text-rose-400 hover:text-rose-700"
                            >
                                <span>Browse Our Verified Catalog</span>
                                <span>&rarr;</span>
                            </Link>
                        </div>
                    </div>

                    {/* Mission Pillars Grid */}
                    <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-750 space-y-2">
                            <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center">
                                <FaShieldAlt className="w-4 h-4" />
                            </div>
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Authenticity First</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                Zero tolerance for counterfeits. Every serial number is verifiable through official manufacturer databases.
                            </p>
                        </div>

                        <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-750 space-y-2">
                            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
                                <FaHandshake className="w-4 h-4" />
                            </div>
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Fair Pricing</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                Transparent Tanzanian Shilling pricing with no hidden import duties or surprise checkout fees.
                            </p>
                        </div>

                        <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-750 space-y-2">
                            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center">
                                <FaAward className="w-4 h-4" />
                            </div>
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Local Warranty</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                Complete coverage supported by certified local technicians right in Dar es Salaam.
                            </p>
                        </div>

                        <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-750 space-y-2">
                            <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
                                <FaUsers className="w-4 h-4" />
                            </div>
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Digital Literacy</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                Free software setup, contact transfers, and basic digital safety guidance for all new device owners.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Commitments / Transparency Box */}
            <section className="py-16 bg-slate-100/60 dark:bg-slate-900/60 border-y border-slate-200/80 dark:border-slate-800/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-1 block">
                            Accountability
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                            The Kennson Guarantee to You
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-3">
                            <div className="flex items-center gap-2 text-rose-600 font-bold text-sm">
                                <FaCheck className="w-3.5 h-3.5" />
                                <span>Physical Presence</span>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                We are not an anonymous web store. You can visit our service counter at Career House in Dar es Salaam during normal business hours to inspect devices or receive warranty care.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-3">
                            <div className="flex items-center gap-2 text-rose-600 font-bold text-sm">
                                <FaCheck className="w-3.5 h-3.5" />
                                <span>Official Factory Sealing</span>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                Every smartphone arrives in unblemished manufacturer box seals. You break the seal yourself or inspect it at the moment of delivery before confirming receipt.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-3">
                            <div className="flex items-center gap-2 text-rose-600 font-bold text-sm">
                                <FaCheck className="w-3.5 h-3.5" />
                                <span>Accessible Community Support</span>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                We collaborate with local schools and university unions to provide installment programs and educational discounts for students needing mobile research tools.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Visit Us Invitation */}
            <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 mb-2">
                    <FaStore className="w-5 h-5" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    Experience Our Service Counter in Dar es Salaam
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
                    Visit us at Career House, 1st Floor, Pugu Road. Our specialists are ready to help you compare devices, configure settings, and handle warranty inquiries.
                </p>
                <div className="pt-2">
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-rose-600 dark:hover:bg-rose-600 dark:hover:text-white transition-colors"
                    >
                        Contact Our Support Team
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default About;
