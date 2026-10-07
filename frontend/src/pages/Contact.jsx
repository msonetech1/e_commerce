import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaClock } from 'react-icons/fa';
import { sendMessage } from '../services/api';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await sendMessage({ ...formData, type: 'Contact Message' });
            setStatus({ type: 'success', message: 'Your message has been sent to our team! You will receive a response shortly.' });
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            setStatus({ type: 'error', message: 'Something went wrong. Please try again later.' });
        } finally {
            setLoading(false);
            setTimeout(() => setStatus({ type: '', message: '' }), 6000);
        }
    };

    return (
        <div className="pt-32 pb-24 min-h-screen transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-20">
                    <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter">
                        GET IN <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">TOUCH</span>
                    </h1>
                    <p className="text-xl text-gray-500 dark:text-gray-300 max-w-2xl mx-auto font-medium leading-relaxed">
                        Have a question about a product or need technical assistance? Our team is standing by to help you.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Contact Info Cards */}
                    <div className="space-y-8">
                        <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 transform hover:-translate-y-2 transition-all duration-300">
                            <div className="bg-pink-100 dark:bg-pink-900/30 w-14 h-14 rounded-2xl flex items-center justify-center text-pink-600 mb-6">
                                <FaPhoneAlt className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2 uppercase tracking-wide">Call Us</h3>
                            <p className="text-gray-500 dark:text-gray-300 font-bold mb-4">Available Mon-Sat, 9am - 7pm</p>
                            <p className="text-2xl font-black text-pink-600 tracking-tighter">+255 700 000 000</p>
                        </div>

                        <div className="dark:bg-gray-900 duration-500 p-8 rounded-3xl backdrop-blur-md shadow-xl border border-gray-100 dark:border-gray-800 transform hover:-translate-y-2 transition-all">
                            <div className="bg-purple-100 dark:bg-purple-900/30 w-14 h-14 rounded-2xl flex items-center justify-center text-purple-600 mb-6">
                                <FaEnvelope className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2 uppercase tracking-wide">Email Us</h3>
                            <p className="text-gray-500 dark:text-gray-300 font-bold mb-4">We reply within 2 hours</p>
                            <p className="text-lg font-black text-purple-600 tracking-wide break-all">support@kennson.com</p>
                        </div>

                        <div className="dark:bg-gray-900 duration-500 p-8 rounded-3xl backdrop-blur-md shadow-xl border border-gray-100 dark:border-gray-800 transform hover:-translate-y-2 transition-all">
                            <div className="bg-blue-100 dark:bg-blue-900/30 w-14 h-14 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                                <FaMapMarkerAlt className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2 uppercase tracking-wide">Our Store</h3>
                            <p className="text-gray-500 dark:text-gray-300 font-bold mb-4">Visit us for hands-on experience</p>
                            <p className="text-lg font-black text-blue-600 tracking-wide leading-tight">Mlimani City, Dar es Salaam</p>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-10 md:p-16 rounded-[3rem] shadow-2xl shadow-gray-300 dark:shadow-none border border-gray-100 dark:border-gray-800 relative overflow-hidden">
                        {/* Decor */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-100 rounded-full -mr-32 -mt-32 opacity-50 blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-100 rounded-full -ml-32 -mb-32 opacity-50 blur-3xl"></div>

                        <div className="relative z-10">
                            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-8 uppercase tracking-tighter">Send us a message</h2>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-300 ml-1">Your Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="John Doe"
                                            className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-gray-50 dark:border-gray-800 px-6 py-4 rounded-3xl focus:outline-none focus:border-pink-600/20 dark:focus:border-pink-500/20 focus:bg-white dark:focus:bg-gray-950 transition-all text-gray-900 dark:text-white font-bold"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-300 ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="john@example.com"
                                            className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-gray-50 dark:border-gray-800 px-6 py-4 rounded-3xl focus:outline-none focus:border-purple-600/20 dark:focus:border-purple-500/20 focus:bg-white dark:focus:bg-gray-950 transition-all text-gray-900 dark:text-white font-bold"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-300 ml-1">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        placeholder="Order Inquiry / Support"
                                        className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-gray-50 dark:border-gray-800 px-6 py-4 rounded-3xl focus:outline-none focus:border-pink-600/20 dark:focus:border-pink-500/20 focus:bg-white dark:focus:bg-gray-950 transition-all text-gray-900 dark:text-white font-bold"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-300 ml-1">Your Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="5"
                                        placeholder="How can we help you today?"
                                        className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-gray-50 dark:border-gray-800 px-6 py-10 rounded-[2.5rem] focus:outline-none focus:border-purple-600/20 dark:focus:border-purple-500/20 focus:bg-white dark:focus:bg-gray-950 transition-all text-gray-900 dark:text-white font-bold resize-none"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-6 rounded-[2.5rem] font-black text-lg uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-2xl shadow-pink-600/30 flex items-center justify-center space-x-3 disabled:opacity-50"
                                >
                                    {loading ? (
                                        <div className="h-6 w-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            <span>Send Message</span>
                                            <FaPaperPlane className="h-5 w-5" />
                                        </>
                                    )}
                                </button>

                                {status.message && (
                                    <div className={`p-6 rounded-3xl text-center font-bold text-sm animate-fade-in ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                                        {status.message}
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
