import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaLock, FaEnvelope, FaUser, FaShieldAlt } from 'react-icons/fa';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await register(name, email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please check your details and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-28 pb-20 flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-10 shadow-xs space-y-6">
                {/* Brand Seal Header */}
                <div className="text-center space-y-2">
                    <img
                        src="/logo.svg"
                        alt="Kennson Logo"
                        className="w-10 h-10 rounded-xl mx-auto mb-3 shadow-xs"
                    />
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                        Create Your Customer Account
                    </h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        Join Kennson for official warranty registration and order updates.
                    </p>
                </div>

                {error && (
                    <div className="p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-xs font-medium rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Full Name
                        </label>
                        <div className="relative">
                            <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. Amani Mwita"
                                className="w-full pl-9 pr-3.5 py-2.5 text-base sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-rose-500"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Email Address
                        </label>
                        <div className="relative">
                            <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                className="w-full pl-9 pr-3.5 py-2.5 text-base sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-rose-500"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Password
                        </label>
                        <div className="relative">
                            <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                            <input
                                type="password"
                                required
                                minLength={6}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="At least 6 characters"
                                className="w-full pl-9 pr-3.5 py-2.5 text-base sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-rose-500"
                            />
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-rose-600 dark:hover:bg-rose-600 dark:hover:text-white rounded-lg text-xs sm:text-sm font-semibold shadow-xs transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Creating Account...' : 'Complete Registration'}
                        </button>
                    </div>
                </form>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500 space-y-2">
                    <p>
                        Already have an account?{' '}
                        <Link to="/login" className="font-semibold text-rose-600 dark:text-rose-400 hover:underline">
                            Sign in here
                        </Link>
                    </p>
                    <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
                        <FaShieldAlt className="w-3 h-3 text-emerald-500" />
                        <span>Protected by 256-bit encrypted secure sessions</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
