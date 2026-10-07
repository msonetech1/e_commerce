import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { sendMessage } from '../services/api';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        try {
            await sendMessage({
                name: 'Newsletter Subscriber',
                email,
                subject: 'Newsletter Subscription',
                message: `New newsletter subscription request from: ${email}`
            });
            setStatus({ type: 'success', message: 'Thank you for subscribing!' });
            setEmail('');
        } catch (error) {
            setStatus({ type: 'error', message: 'Failed to subscribe. Please try again.' });
        } finally {
            setLoading(false);
            setTimeout(() => setStatus({ type: '', message: '' }), 5000);
        }
    };

    return (
        <footer className="relative bg-[#030712] text-white pt-12 pb-8 md:pt-24 md:pb-12 overflow-hidden border-t border-gray-900/50">
            {/* Visual Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-[-30%] right-[-10%] w-[60%] h-[70%] bg-pink-600/30 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-20%] left-[-5%] w-[40%] h-[60%] bg-purple-600/20 rounded-full blur-[100px] animate-pulse"></div>
                {/* Grid Overlay */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16 mb-12 md:mb-20">
                    {/* Brand Info */}
                    <div className="space-y-8">
                        <Link to="/" className="flex items-center space-x-3">
                            <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent uppercase">
                                KENNSON
                            </span>
                        </Link>
                        <p className="text-gray-400 font-medium leading-relaxed">
                            Leading the mobile revolution with premium devices and authentic experiences. Your trusted partner in digital innovation since 2015.
                        </p>
                        <div className="flex space-x-5">
                            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, idx) => (
                                <a key={idx} href="#" className="w-12 h-12 rounded-2xl bg-gray-900/50 backdrop-blur-md border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-pink-600 hover:border-pink-600 transition-all duration-300">
                                    <Icon className="h-5 w-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-8">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-500">Navigation</h4>
                        <ul className="space-y-4 font-bold uppercase tracking-widest text-[10px]">
                            {['Home', 'Products', 'About', 'Contact', 'Admin Panel'].map((item) => (
                                <li key={item}>
                                    <Link to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-2 inline-block">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-8">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-500">Contact Us</h4>
                        <ul className="space-y-6">
                            <li className="flex items-start space-x-4 group">
                                <div className="p-3 rounded-xl bg-gray-900/50 border border-gray-800 text-pink-500">
                                    <FaMapMarkerAlt />
                                </div>
                                <span className="text-gray-400 font-medium group-hover:text-gray-300 transition-colors">Career House, 1st Floor, Pugu Road, Dar es Salaam.</span>
                            </li>
                            <li className="flex items-center space-x-4 group">
                                <div className="p-3 rounded-xl bg-gray-900/50 border border-gray-800 text-pink-500">
                                    <FaPhoneAlt />
                                </div>
                                <span className="text-gray-400 font-medium group-hover:text-gray-300 transition-colors">+255 777 555 444</span>
                            </li>
                            <li className="flex items-center space-x-4 group">
                                <div className="p-3 rounded-xl bg-gray-900/50 border border-gray-800 text-pink-500">
                                    <FaEnvelope />
                                </div>
                                <span className="text-gray-400 font-medium group-hover:text-gray-300 transition-colors">sales@kennson.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-8">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-500">Mailing List</h4>
                        <div className="p-8 rounded-[2.5rem] bg-gray-900/30 backdrop-blur-md border border-gray-800">
                            <p className="text-gray-300 text-sm font-medium mb-6">Stay updated with the latest releases.</p>
                            <form onSubmit={handleSubscribe} className="relative">
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-gray-950/50 border border-gray-800 rounded-2xl px-5 py-4 text-white text-sm focus:outline-none focus:border-pink-600 transition-colors placeholder:text-gray-700"
                                    required
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="absolute right-2 top-2 w-10 h-10 bg-pink-600 hover:bg-pink-500 text-white rounded-xl flex items-center justify-center transition-all shadow-xl active:scale-90 disabled:opacity-50"
                                >
                                    {loading ? (
                                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <FaPaperPlane className="h-4 w-4" />
                                    )}
                                </button>
                            </form>
                            {status.message && (
                                <p className={`mt-4 text-[10px] font-black uppercase tracking-widest ${status.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                                    {status.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="pt-12 border-t border-gray-900/50 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-center">
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em]">&copy; {new Date().getFullYear()} KENNSON MATELEPHONE. ALL RIGHTS RESERVED.</p>
                    <div className="flex space-x-8 text-gray-500 text-[10px] font-black uppercase tracking-widest">
                        <Link to="/terms" className="hover:text-pink-500 transition-colors">Terms of Service</Link>
                        <a href="#" className="hover:text-pink-500 transition-colors">Privacy Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
