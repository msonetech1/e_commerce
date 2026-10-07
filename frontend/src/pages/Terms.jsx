import React from 'react';
import { FaShieldAlt, FaFileAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Terms = () => {
    return (
        <div className="min-h-screen pt-28 pb-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-10 pb-6 border-b border-slate-200/80 dark:border-slate-800/80 space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200/60 dark:border-rose-900/40">
                        <FaShieldAlt className="w-3 h-3 text-rose-600" />
                        <span>Consumer Protection &amp; Warranty Guidelines</span>
                    </div>
                    <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Terms of Service &amp; Customer Charter
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                        Last revised: January 2025 • Governing entity: Kennson Matelephone (Dar es Salaam, Tanzania)
                    </p>
                </div>

                {/* Content Document */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-8 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    <section className="space-y-3">
                        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <span className="text-rose-600 font-mono">01.</span>
                            <span>Purpose &amp; Community Commitment</span>
                        </h2>
                        <p>
                            Welcome to Kennson Matelephone. Our mission is to democratize reliable, authentic mobile communications across East Africa. By accessing our platform, purchasing hardware, or utilizing our technical service center, you enter into a binding understanding protected by Tanzanian commercial consumer laws.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <span className="text-rose-600 font-mono">02.</span>
                            <span>100% Hardware Authenticity Guarantee</span>
                        </h2>
                        <p>
                            Kennson guarantees that every smartphone, tablet, and accessory offered is 100% genuine and sourced through authorized distribution partners. All mobile phones arrive in intact factory seals. Customers receive verifiable International Mobile Equipment Identity (IMEI) numbers registered with national regulatory databases.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <span className="text-rose-600 font-mono">03.</span>
                            <span>One-Year Official Warranty Coverage</span>
                        </h2>
                        <p>
                            Unless explicitly stated otherwise, every brand-new smartphone is backed by a 12-month hardware warranty covering manufacturer defects in logic boards, displays, antennas, and factory-supplied power modules. Warranty claims may be initiated via our online tracking portal or in-person at our Career House service counter in Dar es Salaam.
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            *Note: Accidental liquid immersion, unauthorized third-party modifications, and physical screen shattering resulting from impact are excluded from manufacturer coverage, though subsidized repair assistance is available through our technical team.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <span className="text-rose-600 font-mono">04.</span>
                            <span>Delivery Inspection &amp; 7-Day Exchange</span>
                        </h2>
                        <p>
                            To protect our customers against courier damages, recipients are entitled to physically inspect the unopened box condition upon delivery before signing acceptance. If an item exhibits factory performance flaws within 7 calendar days of receipt, we provide an immediate, expedited device exchange.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <span className="text-rose-600 font-mono">05.</span>
                            <span>Payment Security &amp; Transparent TZS Pricing</span>
                        </h2>
                        <p>
                            All product prices are quoted in Tanzanian Shillings (Tsh) inclusive of statutory taxes. We support secure transactions through regional mobile money networks (M-Pesa, Airtel Money, Mix by Yas, HaloPesa, T-Pesa) and certified international cards. No payment data or mobile PINs are stored on our servers.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <span className="text-rose-600 font-mono">06.</span>
                            <span>Customer Data Privacy</span>
                        </h2>
                        <p>
                            We treat customer information with strict confidentiality. Contact numbers and delivery addresses are utilized solely for logistical coordination and warranty tracking. We never sell, rent, or lease personal identifiers to third-party telemarketers.
                        </p>
                    </section>

                    <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                        <div className="flex items-center gap-2 text-slate-500">
                            <FaFileAlt className="w-4 h-4 text-rose-500" />
                            <span>Inquiries regarding warranty? Contact us at legal@kennson.com</span>
                        </div>
                        <Link
                            to="/contact"
                            className="font-semibold text-rose-600 dark:text-rose-400 hover:underline"
                        >
                            Visit Customer Support Desk
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Terms;
