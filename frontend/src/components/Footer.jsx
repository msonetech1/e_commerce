import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaPaperPlane,
    FaShieldAlt,
    FaShippingFast,
    FaHeadset,
    FaCheckCircle
} from 'react-icons/fa';
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
                message: `New community newsletter subscription request from: ${email}`
            });
            setStatus({ type: 'success', message: 'Thank you for joining our community updates.' });
            setEmail('');
        } catch {
            setStatus({ type: 'error', message: 'Unable to subscribe. Please try again later.' });
        } finally {
            setLoading(false);
            setTimeout(() => setStatus({ type: '', message: '' }), 5000);
        }
    };

    return (
        <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors">
            {/* Trust Assurance Strip */}
            <div className="border-b border-slate-800/80 bg-slate-950/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center flex-shrink-0">
                                <FaShieldAlt className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-white">100% Genuine Devices</h4>
                                <p className="text-xs text-slate-400">Direct from verified manufacturers</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
                                <FaCheckCircle className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-white">Full Official Warranty</h4>
                                <p className="text-xs text-slate-400">Local support &amp; replacement coverage</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center flex-shrink-0">
                                <FaShippingFast className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-white">Direct East Africa Delivery</h4>
                                <p className="text-xs text-slate-400">Insured express logistics to your door</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center flex-shrink-0">
                                <FaHeadset className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-white">Human Technical Support</h4>
                                <p className="text-xs text-slate-400">Dedicated help desk in Dar es Salaam</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
                    {/* Brand Info & Mission */}
                    <div className="lg:col-span-2 space-y-4">
                        <Link to="/" className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-white text-slate-900 flex items-center justify-center font-bold text-sm">
                                K
                            </div>
                            <span className="text-lg font-bold text-white tracking-tight">
                                Kennson <span className="text-rose-400 font-medium">Matelephone</span>
                            </span>
                        </Link>
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
                            Bridging digital connectivity across East Africa since 2015. We empower students, professionals, and families through verified mobile technology, digital literacy, and community initiatives.
                        </p>
                        <div className="flex items-center gap-2 pt-2">
                            {[
                                { icon: FaFacebookF, label: 'Facebook', href: '#' },
                                { icon: FaTwitter, label: 'Twitter', href: '#' },
                                { icon: FaInstagram, label: 'Instagram', href: '#' },
                                { icon: FaLinkedinIn, label: 'LinkedIn', href: '#' }
                            ].map((item, idx) => (
                                <a
                                    key={idx}
                                    href={item.href}
                                    aria-label={item.label}
                                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                                >
                                    <item.icon className="w-3.5 h-3.5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-white">Explore</h4>
                        <ul className="space-y-2 text-xs sm:text-sm">
                            <li>
                                <Link to="/" className="text-slate-400 hover:text-white transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/products" className="text-slate-400 hover:text-white transition-colors">
                                    Devices &amp; Collection
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-slate-400 hover:text-white transition-colors">
                                    Our Mission &amp; Impact
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-slate-400 hover:text-white transition-colors">
                                    Contact &amp; Assistance
                                </Link>
                            </li>
                            <li>
                                <Link to="/orders" className="text-slate-400 hover:text-white transition-colors">
                                    Track Orders
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact & Support */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-white">Contact</h4>
                        <ul className="space-y-2.5 text-xs text-slate-400">
                            <li className="flex items-start gap-2.5">
                                <FaMapMarkerAlt className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 mt-0.5" />
                                <span>Career House, 1st Floor, Pugu Road, Dar es Salaam, Tanzania</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <FaPhoneAlt className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                                <span>+255 777 555 444</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <FaEnvelope className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                                <span>contact@kennson.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter Subscription */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-white">Community Updates</h4>
                        <p className="text-xs text-slate-400">
                            Receive notifications on new arrivals, educational discounts, and community tech workshops.
                        </p>
                        <form onSubmit={handleSubscribe} className="space-y-2">
                            <div className="flex gap-1.5">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    aria-label="Email address for updates"
                                    required
                                    className="w-full px-3 py-2 text-xs bg-slate-800 text-white rounded-lg border border-slate-700 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    aria-label="Subscribe to updates"
                                    className="px-3 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium rounded-lg flex items-center justify-center transition-colors disabled:opacity-50"
                                >
                                    {loading ? (
                                        <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <FaPaperPlane className="w-3.5 h-3.5" />
                                    )}
                                </button>
                            </div>
                            {status.message && (
                                <p className={`text-xs ${status.type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
                                    {status.message}
                                </p>
                            )}
                        </form>
                    </div>
                </div>

                {/* Footer Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <p>&copy; {new Date().getFullYear()} Kennson Matelephone. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <Link to="/terms" className="hover:text-slate-300 transition-colors">
                            Terms of Service
                        </Link>
                        <Link to="/terms" className="hover:text-slate-300 transition-colors">
                            Warranty &amp; Privacy
                        </Link>
                        <span className="text-slate-600">•</span>
                        <span>Empowering East African Mobility</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
