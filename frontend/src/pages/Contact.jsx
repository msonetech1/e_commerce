import React, { useState } from 'react';
import {
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaPaperPlane,
    FaClock,
    FaShieldAlt,
    FaCheckCircle
} from 'react-icons/fa';
import { sendMessage } from '../services/api';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'General Inquiry',
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
            setStatus({
                type: 'success',
                message: 'Your message has been received. A support representative will respond within 2 business hours.'
            });
            setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
        } catch {
            setStatus({
                type: 'error',
                message: 'Unable to send message right now. Please call our hotline or try again.'
            });
        } finally {
            setLoading(false);
            setTimeout(() => setStatus({ type: '', message: '' }), 7000);
        }
    };

    return (
        <div className="min-h-screen pt-28 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="max-w-3xl mb-12">
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-1 block">
                        Direct Assistance
                    </span>
                    <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Support Desk &amp; Service Center
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                        Whether you have technical questions regarding a device, need warranty verification, or require educational bulk pricing, our Dar es Salaam team is here to assist.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Contact Channels Cards */}
                    <div className="lg:col-span-5 space-y-4">
                        {/* Physical Center */}
                        <div className="p-5 sm:p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-2">
                            <div className="flex items-center gap-2.5 text-rose-600 dark:text-rose-400 mb-1">
                                <FaMapMarkerAlt className="w-4 h-4" />
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                    Physical Service Counter
                                </h3>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-300">
                                Career House, 1st Floor, Pugu Road, Dar es Salaam, Tanzania
                            </p>
                            <p className="text-[11px] text-slate-400">
                                In-person device inspections, warranty repairs, and data transfer.
                            </p>
                        </div>

                        {/* Phone Assistance */}
                        <div className="p-5 sm:p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-2">
                            <div className="flex items-center gap-2.5 text-rose-600 dark:text-rose-400 mb-1">
                                <FaPhoneAlt className="w-4 h-4" />
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                    Direct Phone &amp; WhatsApp
                                </h3>
                            </div>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">
                                +255 777 555 444
                            </p>
                            <p className="text-[11px] text-slate-400">
                                English and Swahili support • Available Mon–Sat, 8:30 AM – 6:30 PM
                            </p>
                        </div>

                        {/* Email */}
                        <div className="p-5 sm:p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-2">
                            <div className="flex items-center gap-2.5 text-rose-600 dark:text-rose-400 mb-1">
                                <FaEnvelope className="w-4 h-4" />
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                    Official Email Desk
                                </h3>
                            </div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">
                                contact@kennson.com
                            </p>
                            <p className="text-[11px] text-slate-400">
                                Inquiries answered within 2 hours during normal business operating hours.
                            </p>
                        </div>

                        {/* Working Hours */}
                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-750 flex items-center gap-3 text-xs">
                            <FaClock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                            <div>
                                <span className="font-semibold text-slate-900 dark:text-white block">
                                    Operating Hours
                                </span>
                                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                                    Monday to Saturday: 8:30 AM – 6:30 PM EAT
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                            Send Us a Written Message
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                            Fill out the form below and our technical desk will get back to you promptly.
                        </p>

                        {status.message && (
                            <div
                                className={`mb-6 p-4 rounded-lg text-xs font-medium border flex items-start gap-2.5 ${
                                    status.type === 'success'
                                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                                        : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800'
                                }`}
                            >
                                {status.type === 'success' ? (
                                    <FaCheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                                ) : (
                                    <FaShieldAlt className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                                )}
                                <span>{status.message}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                        Your Full Name <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="e.g. Baraka Hassan"
                                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-rose-500"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                        Email Address <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="e.g. baraka@example.com"
                                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-rose-500"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                    Inquiry Category
                                </label>
                                <select
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
                                >
                                    <option value="General Inquiry">General Product Inquiry</option>
                                    <option value="Warranty Claim">Warranty Registration or Claim</option>
                                    <option value="Delivery Status">Shipment &amp; Delivery Tracking</option>
                                    <option value="Educational / Bulk Order">Educational or Corporate Bulk Order</option>
                                    <option value="Feedback">Feedback or Community Partnership</option>
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                    Your Message <span className="text-rose-500">*</span>
                                </label>
                                <textarea
                                    name="message"
                                    required
                                    rows={5}
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Please describe how we can assist you..."
                                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-rose-500 resize-none"
                                />
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full sm:w-auto px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-rose-600 dark:hover:bg-rose-600 dark:hover:text-white rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors disabled:opacity-50"
                                >
                                    {loading ? (
                                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <FaPaperPlane className="w-3.5 h-3.5" />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
