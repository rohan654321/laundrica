// app/terms/page.tsx
'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
    Shield,
    FileText,
    Clock,
    CreditCard,
    RotateCcw,
    Truck,
    Heart,
    AlertTriangle,
    Ban,
    ExternalLink,
    AlertCircle,
    Scale,
    Smartphone,
    CheckCircle,
    ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
    const heroRef = useRef(null);
    const isHeroInView = useInView(heroRef, { once: true });

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    // Terms sections data
    const termsSections = [
        {
            title: "1. Use of Services",
            icon: <Shield className="w-5 h-5" />,
            content: "Laundrica provides a premium laundry pickup and delivery service. By placing an order, you request laundry-related services including pickup, processing, and delivery through our platform. All services are subject to availability and operational capacity."
        },
        {
            title: "2. Eligibility",
            icon: <CheckCircle className="w-5 h-5" />,
            content: "To use Laundrica services, you must: • Be at least 18 years old • Provide accurate and complete information • Be legally authorized to place service requests"
        },
        {
            title: "3. Orders & Service Acceptance",
            icon: <FileText className="w-5 h-5" />,
            content: "All orders are subject to acceptance. Laundrica reserves the right to accept, reject, or modify any order. Pickup and delivery times are estimated and may vary due to operational conditions. Service availability may differ by location in Dubai and UAE."
        },
        {
            title: "4. Pricing & Payments",
            icon: <CreditCard className="w-5 h-5" />,
            content: "All prices are listed in AED (United Arab Emirates Dirhams). Pricing may vary based on service type and garment category. Full payment is required as per selected service method. We are not responsible for issues caused by third-party payment providers."
        },
        {
            title: "5. Cancellations & Changes",
            icon: <RotateCcw className="w-5 h-5" />,
            content: "Orders may be cancelled before pickup without charge (unless already dispatched). Once items are collected, cancellation may not always be possible. Changes must be requested before service processing begins."
        },
        {
            title: "6. Refund Policy",
            icon: <ArrowRight className="w-5 h-5" />,
            content: "Refunds are only applicable in approved cases. Approved refunds are processed within 7–14 business days. No refunds apply once service processing has started. Refunds are not issued for: Change of mind after pickup, Incorrect or incomplete customer information, or External operational delays."
        },
        {
            title: "7. Delivery Timelines",
            icon: <Truck className="w-5 h-5" />,
            content: "Delivery times are estimates only. Delays may occur due to traffic, weather, or operational conditions. Laundrica is not liable for delays beyond reasonable control."
        },
        {
            title: "8. Garment Care & Responsibility",
            icon: <Heart className="w-5 h-5" />,
            content: "Customers are responsible for checking items before handing them over, providing accurate service instructions, and removing valuables from garments. Laundrica is not responsible for pre-existing damage or wear and tear, fabric reactions such as shrinkage or color fading, or undisclosed items or instructions. Approved claims are limited to service value only."
        },
        {
            title: "9. Damage & Claims Policy",
            icon: <AlertTriangle className="w-5 h-5" />,
            content: "Claims must be reported within 24 hours of delivery. Proof (photos/videos) is required. Claims are reviewed based on evidence provided. Laundrica may approve or reject claims at its discretion. Compensation is limited to service value only."
        },
        {
            title: "10. Customer Responsibilities",
            icon: <Smartphone className="w-5 h-5" />,
            content: "Customers agree to provide correct pickup and delivery details, ensure items are ready at scheduled pickup time, disclose special care instructions, and remove all valuables before handover."
        },
        {
            title: "11. Prohibited Items",
            icon: <Ban className="w-5 h-5" />,
            content: "Customers must not include cash, jewelry, or valuables; illegal or hazardous items; or restricted or unsafe materials. We are not responsible for loss of undeclared items."
        },
        {
            title: "12. Third-Party Services",
            icon: <ExternalLink className="w-5 h-5" />,
            content: "We may use trusted third-party providers for logistics, payments, and related services. We are not responsible for third-party delays or issues beyond our control."
        },
        {
            title: "13. Service Disclaimer",
            icon: <AlertCircle className="w-5 h-5" />,
            content: "All services are provided on a 'best effort' basis. Results may vary depending on fabric type and condition."
        },
        {
            title: "14. Limitation of Liability",
            icon: <Scale className="w-5 h-5" />,
            content: "To the maximum extent permitted by law: We are not liable for indirect or consequential damages. Liability is limited to the value of the service order. We are not responsible for external operational delays."
        },
        {
            title: "15. Intellectual Property",
            icon: <FileText className="w-5 h-5" />,
            content: "All content, branding, design, and materials belong to Laundrica and may not be copied or reused without permission."
        },
        {
            title: "16. Changes to Terms",
            icon: <Clock className="w-5 h-5" />,
            content: "We may update these Terms from time to time. Continued use means acceptance of updates."
        },
        {
            title: "17. Governing Law",
            icon: <Scale className="w-5 h-5" />,
            content: "These Terms are governed by the laws of the United Arab Emirates. Any disputes fall under UAE jurisdiction."
        }
    ];

    return (
        <main className="flex flex-col min-h-screen bg-[#f9faf7]">
            <Header />

            {/* Hero Section - similar to pricing page */}
            <section ref={heroRef} className="relative min-h-[400px] flex items-center overflow-hidden pt-10 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7 }}
                        className="z-10"
                    >
                        <span className="inline-block px-4 py-1.5 bg-[#bcedd7] text-[#214f3f] rounded-full text-sm mb-6">Legal Agreement</span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#00261b] mb-6 leading-tight">
                            Terms of <span className="text-emerald-700">Service</span>
                        </h1>
                        <p className="text-lg text-[#5c5f5e] mb-6 leading-relaxed max-w-lg">
                            Please read these Terms carefully before using Laundrica's services.
                            By accessing or using our platform, you agree to be bound by these Terms.
                        </p>
                        <div className="flex items-center gap-3 text-sm text-[#5c5f5e] border-t border-gray-100 pt-6">
                            <Shield className="w-4 h-4 text-emerald-600" />
                            <span>Effective Date: 12 May 2026</span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            <span>Dubai, United Arab Emirates</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-[#bcedd7]/40 to-[#00261b]/10 flex items-center justify-center p-8">
                            <div className="text-center">
                                <div className="w-28 h-28 mx-auto bg-[#bcedd7] rounded-full flex items-center justify-center mb-6">
                                    <Shield className="w-12 h-12 text-[#00261b]" />
                                </div>
                                <h3 className="text-2xl font-bold text-[#00261b]">Last Updated</h3>
                                <p className="text-4xl font-bold text-emerald-700 mt-2">12 May 2026</p>
                                <p className="text-[#5c5f5e] mt-3">Version 2.0</p>
                            </div>
                        </div>
                        <div className="absolute -bottom-6 -right-6 bg-white p-5 rounded-2xl shadow-xl max-w-[200px]">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-emerald-600" />
                                <div>
                                    <p className="text-sm font-semibold text-[#00261b]">Acceptance Required</p>
                                    <p className="text-xs text-gray-500">By using our services</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Terms Content Section - similar structure to ServiceMenu */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={staggerContainer}
                        className="mb-12 text-center"
                    >
                        <motion.span variants={fadeInUp} className="inline-block px-4 py-1.5 bg-[#bcedd7] text-[#214f3f] rounded-full text-sm mb-4">Legal Information</motion.span>
                        <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-[#00261b] mb-4">Understanding Our Terms</motion.h2>
                        <motion.p variants={fadeInUp} className="text-[#5c5f5e] max-w-2xl mx-auto">
                            These Terms govern your relationship with Laundrica. Please review them carefully.
                        </motion.p>
                    </motion.div>

                    <div className="space-y-6">
                        {termsSections.map((section, idx) => (
                            <motion.div
                                key={idx}
                                variants={fadeInUp}
                                className="bg-[#f9faf7] rounded-xl p-6 border border-gray-100 hover:shadow-md transition-all hover:-translate-y-0.5"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 bg-[#bcedd7]/30 rounded-lg flex items-center justify-center text-emerald-700">
                                        {section.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-xl text-[#00261b] mb-3">{section.title}</h3>
                                        <p className="text-[#5c5f5e] leading-relaxed whitespace-pre-line">
                                            {section.content}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Additional legal note */}
                    <motion.div
                        variants={fadeInUp}
                        className="mt-12 p-6 bg-[#edeeeb] rounded-xl text-center"
                    >
                        <p className="text-[#00261b] font-medium mb-2">Questions about these Terms?</p>
                        <p className="text-[#5c5f5e] text-sm mb-4">
                            If you have any questions or concerns regarding these Terms of Service, please contact our legal team.
                        </p>
                        <Link href="/contact">
                            <button className="px-6 py-2.5 bg-[#00261b] text-white rounded-lg font-medium hover:opacity-90 transition text-sm">
                                Contact Legal Team
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Contact Section - similar to Why Choose Us style */}
            <section className="py-16 bg-[#f9faf7]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={staggerContainer}
                        className="text-center mb-12"
                    >
                        <motion.span variants={fadeInUp} className="inline-block px-4 py-1.5 bg-[#bcedd7] text-[#214f3f] rounded-full text-sm mb-4">Get in Touch</motion.span>
                        <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-[#00261b] mb-4">Have Questions?</motion.h2>
                        <motion.p variants={fadeInUp} className="text-[#5c5f5e] max-w-2xl mx-auto">
                            Our team is here to help clarify any part of our Terms of Service.
                        </motion.p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                        <motion.div
                            variants={fadeInUp}
                            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 text-center"
                        >
                            <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <Shield className="w-7 h-7 text-emerald-600" />
                            </div>
                            <h3 className="font-bold text-xl text-[#00261b] mb-2">Laundrica LLC FZ</h3>
                            <p className="text-gray-500">Dubai, United Arab Emirates</p>
                        </motion.div>

                        <motion.div
                            variants={fadeInUp}
                            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 text-center"
                        >
                            <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <FileText className="w-7 h-7 text-emerald-600" />
                            </div>
                            <h3 className="font-bold text-xl text-[#00261b] mb-2">Contact Information</h3>
                            <p className="text-gray-500">Email: support@laundrica.com</p>
                            <p className="text-gray-500">Phone: +971 50 820 3555</p>
                        </motion.div>
                    </div>

                    <motion.div
                        variants={fadeInUp}
                        className="mt-8 text-center"
                    >
                        <p className="text-xs text-[#5c5f5e]">
                            By continuing to use Laundrica services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                        </p>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}