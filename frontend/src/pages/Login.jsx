import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaLock, FaEnvelope, FaShieldAlt } from 'react-icons/fa';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const data = await login(email, password);
            if (data.user && data.user.isAdmin) {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid email or password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-28 pb-20 flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-10 shadow-xs space-y-6">
                {/* Brand Seal Header */}
                <div className="text-center space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-base mx-auto mb-3 shadow-xs">
                        K
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                        Sign In to Your Account
                    </h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        Access your order history, verified receipts, and warranty details.
                    </p>
                </div>

                {error && (
                    <div className="p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-xs font-medium rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                            <span>Email Address</span>
                        </label>
                        <div className="relative">
                            <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-rose-500"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                            <span>Password</span>
                        </label>
                        <div className="relative">
                            <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-rose-500"
                            />
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-rose-600 dark:hover:bg-rose-600 dark:hover:text-white rounded-lg text-xs sm:text-sm font-semibold shadow-xs transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Authenticating...' : 'Sign In'}
                        </button>
                    </div>
                </form>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500 space-y-2">
                    <p>
                        Don&apos;t have an account yet?{' '}
                        <Link to="/register" className="font-semibold text-rose-600 dark:text-rose-400 hover:underline">
                            Register here
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

export default Login;
