import React from 'react';
import { FaUsers, FaEye, FaHandshake, FaAward, FaHistory, FaBullseye } from 'react-icons/fa';

const About = () => {
    return (
        <div className="pt-24 pb-20 min-h-screen transition-colors duration-500">
            {/* Hero Section */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 dark:opacity-20 z-0">
                    <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-pink-600 rounded-full blur-[150px] animate-pulse"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600 rounded-full blur-[150px] animate-pulse"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <span className="inline-block px-6 py-2 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 text-xs font-black uppercase tracking-[0.3em] mb-8 shadow-sm">
                        Since 2015
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-8 tracking-tighter uppercase leading-tight">
                        Redefining the <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">Mobile Experience</span>
                    </h1>
                    <p className="max-w-3xl mx-auto text-gray-500 dark:text-gray-300 text-lg md:text-xl font-medium leading-relaxed">
                        At KENNSON MATELEPHONE, we don't just sell phones; we provide the gateways to your digital world. We bridge the gap between cutting-edge technology and exceptional accessibility.
                    </p>
                </div>
            </section>

            {/* Our Story / Vision / Mission Grid */}
            <section className="py-20 backdrop-blur-sm transition-colors border-y border-gray-100 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="flex flex-col items-center text-center group">
                            <div className="p-6 rounded-[2.5rem] bg-gray-50 dark:bg-gray-950/50 border border-gray-100 dark:border-gray-800 text-pink-600 mb-8 transform transition-all group-hover:scale-110 shadow-lg">
                                <FaHistory className="h-10 w-10" />
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight">Our Story</h3>
                            <p className="text-gray-500 dark:text-gray-300 font-medium">Started in Tanzanian local markets, we've grown into a digital powerhouse, serving thousands of happy customers with premium mobile tech.</p>
                        </div>
                        <div className="flex flex-col items-center text-center group">
                            <div className="p-6 rounded-[2.5rem] bg-gray-50 dark:bg-gray-950/50 border border-gray-100 dark:border-gray-800 text-purple-600 mb-8 transform transition-all group-hover:scale-110 shadow-lg">
                                <FaBullseye className="h-10 w-10" />
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight">Our Mission</h3>
                            <p className="text-gray-500 dark:text-gray-300 font-medium">To democratize technology by providing the latest premium smartphones at the most competitive prices across East Africa.</p>
                        </div>
                        <div className="flex flex-col items-center text-center group">
                            <div className="p-6 rounded-[2.5rem] bg-gray-50 dark:bg-gray-950/50 border border-gray-100 dark:border-gray-800 text-pink-500 mb-8 transform transition-all group-hover:scale-110 shadow-lg">
                                <FaEye className="h-10 w-10" />
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight">Our Vision</h3>
                            <p className="text-gray-500 dark:text-gray-300 font-medium">To become the leading digital electronics retailer in Tanzania, known for authenticity, innovation, and unparalleled service.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why KENNSON Section */}
            <section className="py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="md:w-1/2 relative">
                            <div className="aspect-square rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white dark:border-gray-900">
                                <img src="https://images.unsplash.com/photo-1556742049-04ffad435847?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Customer Service" className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute -bottom-10 -right-10 p-10 bg-gradient-to-br from-pink-600 to-purple-600 rounded-[3rem] text-white shadow-2xl hidden lg:block">
                                <div className="text-5xl font-black mb-1">10k+</div>
                                <div className="text-xs font-black uppercase tracking-widest opacity-80">Happy Clients</div>
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-8 tracking-tighter uppercase">Why <span className="text-pink-600">KENNSON</span> ?</h2>
                            <div className="space-y-8">
                                <div className="flex items-start gap-6">
                                    <div className="mt-1 bg-pink-50 dark:bg-pink-900/20 p-3 rounded-xl text-pink-600">
                                        <FaHandshake className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black text-gray-900 dark:text-white mb-2 uppercase tracking-tight">Authenticity Guaranteed</h4>
                                        <p className="text-gray-500 dark:text-gray-300 font-medium">We source directly from manufacturers and authorized distributors to ensures 100% genuine products.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-6">
                                    <div className="mt-1 bg-purple-50 dark:bg-purple-900/20 p-3 rounded-xl text-purple-600">
                                        <FaAward className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black text-gray-900 dark:text-white mb-2 uppercase tracking-tight">Award Winning Support</h4>
                                        <p className="text-gray-500 dark:text-gray-300 font-medium">Our support team is available 24/7 to assist with your purchases, technical setups, and warranty claims.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-6">
                                    <div className="mt-1 bg-pink-50 dark:bg-pink-900/20 p-3 rounded-xl text-pink-600">
                                        <FaUsers className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black text-gray-900 dark:text-white mb-2 uppercase tracking-tight">Community Focused</h4>
                                        <p className="text-gray-500 dark:text-gray-300 font-medium">We believe in giving back to the community that helps us grow, through local tech workshops and support.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="py-24 transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-16 tracking-tighter uppercase">Our Core <span className="text-purple-600">Values</span></h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {['Integrity', 'Innovation', 'Excellence', 'Respect'].map((value, idx) => (
                            <div key={idx} className="p-10 rounded-[3rem] bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-xl group hover:-translate-y-3 transition-all duration-500">
                                <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-pink-600 to-purple-600 mb-2">0{idx + 1}</div>
                                <div className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-widest">{value}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
