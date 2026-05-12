// app/privacy/page.tsx
'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
    Shield,
    Lock,
    Eye,
    Cookie,
    Share2,
    Database,
    Trash2,
    RotateCcw,
    AlertTriangle,
    Scale,
    Mail,
    Phone,
    MapPin,
    FileText,
    Clock,
    CheckCircle,
    Server,
    UserCheck,
    Bell
} from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
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

    // Privacy policy sections data
    const privacySections = [
        {
            title: "1. Information We Collect",
            icon: <Database className="w-5 h-5" />,
            sub: "Personal Information & Technical Data",
            content: "We may collect personal information including your full name, phone number, email address, pickup and delivery address, service preferences, and order details. Additionally, we collect technical information such as IP address, device and browser type, website usage data, and cookies/analytics data."
        },
        {
            title: "2. How We Use Your Information",
            icon: <Eye className="w-5 h-5" />,
            sub: "Purpose of Data Processing",
            content: "We use your information to: process pickup and delivery requests, manage service orders, provide customer support, send order updates and notifications, improve website and service experience, prevent fraud and misuse, comply with legal obligations, and send optional promotional updates."
        },
        {
            title: "3. Cookies",
            icon: <Cookie className="w-5 h-5" />,
            sub: "Browser Technologies",
            content: "We use cookies and similar technologies to improve website performance, analyze traffic, and enhance user experience. You may disable cookies in your browser settings, but some features may not function properly."
        },
        {
            title: "4. Information Sharing",
            icon: <Share2 className="w-5 h-5" />,
            sub: "Third-Party Disclosure",
            content: "We do not sell or rent personal information. Information may only be shared with: delivery and logistics partners, payment service providers, technology and hosting providers, and legal authorities if required under UAE law. All third parties are required to maintain confidentiality and data security."
        },
        {
            title: "5. Data Security",
            icon: <Lock className="w-5 h-5" />,
            sub: "Protection Measures",
            content: "We take reasonable technical and organizational measures to protect your personal data from unauthorized access, loss, misuse, or disclosure. However, no system can guarantee 100% security."
        },
        {
            title: "6. Data Retention",
            icon: <Trash2 className="w-5 h-5" />,
            sub: "Storage Period",
            content: "We retain personal data only as long as necessary to: provide laundry pickup and delivery services, maintain service records, resolve disputes, and comply with legal requirements. After this period, data is securely deleted or anonymized."
        }
    ];

    // Policy summaries (Refund, Damage, Liability)
    const policySummaries = [
        {
            title: "Refund Policy Summary",
            icon: <RotateCcw className="w-5 h-5" />,
            items: [
                "Orders may be cancelled before pickup without charge (unless already dispatched)",
                "Once items are collected, cancellation may not always be possible",
                "Refunds are only issued in approved cases",
                "Approved refunds are processed within 7–14 business days",
                "No refunds are applicable once service processing has started"
            ]
        },
        {
            title: "Damage & Claims Policy Summary",
            icon: <AlertTriangle className="w-5 h-5" />,
            items: [
                "Claims must be reported within 24 hours of delivery",
                "Proof (photos/videos) is required for review",
                "Pre-existing damage or fabric-related reactions are not covered",
                "Approved claims are limited to the service value of the affected item only"
            ]
        },
        {
            title: "Limitation of Liability",
            icon: <Scale className="w-5 h-5" />,
            items: [
                "Delays caused by traffic, weather, or operational conditions in Dubai",
                "Losses due to incorrect or incomplete customer information",
                "Indirect, incidental, or consequential damages",
                "Our total liability is limited to the value of the specific service provided"
            ]
        }
    ];

    return (
        <main className="flex flex-col min-h-screen bg-[#f9faf7]">
            <Header />

            {/* Hero Section */}
            <section ref={heroRef} className="relative min-h-[400px] flex items-center overflow-hidden pt-10 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7 }}
                        className="z-10"
                    >
                        <span className="inline-block px-4 py-1.5 bg-[#bcedd7] text-[#214f3f] rounded-full text-sm mb-6">Your Privacy Matters</span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#00261b] mb-6 leading-tight">
                            Privacy <span className="text-emerald-700">Policy</span>
                        </h1>
                        <p className="text-lg text-[#5c5f5e] mb-6 leading-relaxed max-w-lg">
                            We respect your privacy and are committed to protecting your personal information.
                            This Privacy Policy explains how we collect, use, and safeguard your data.
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
                                    <Lock className="w-12 h-12 text-[#00261b]" />
                                </div>
                                <h3 className="text-2xl font-bold text-[#00261b]">Data Protection</h3>
                                <p className="text-4xl font-bold text-emerald-700 mt-2">GDPR + UAE</p>
                                <p className="text-[#5c5f5e] mt-3">Compliant Standards</p>
                            </div>
                        </div>
                        <div className="absolute -bottom-6 -right-6 bg-white p-5 rounded-2xl shadow-xl max-w-[200px]">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-emerald-600" />
                                <div>
                                    <p className="text-sm font-semibold text-[#00261b]">Your Data, Your Rights</p>
                                    <p className="text-xs text-gray-500">Full transparency</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Main Privacy Policy Content */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={staggerContainer}
                        className="mb-12 text-center"
                    >
                        <motion.span variants={fadeInUp} className="inline-block px-4 py-1.5 bg-[#bcedd7] text-[#214f3f] rounded-full text-sm mb-4">Data Privacy</motion.span>
                        <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-[#00261b] mb-4">How We Handle Your Information</motion.h2>
                        <motion.p variants={fadeInUp} className="text-[#5c5f5e] max-w-2xl mx-auto">
                            We are committed to protecting your personal data and being transparent about our practices.
                        </motion.p>
                    </motion.div>

                    <div className="space-y-6">
                        {privacySections.map((section, idx) => (
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
                                        <h3 className="font-bold text-xl text-[#00261b] mb-1">{section.title}</h3>
                                        <p className="text-sm text-emerald-600 mb-3">{section.sub}</p>
                                        <p className="text-[#5c5f5e] leading-relaxed">
                                            {section.content}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Policy Summaries Section */}
            <section className="py-16 bg-[#edeeeb]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={staggerContainer}
                        className="text-center mb-12"
                    >
                        <motion.span variants={fadeInUp} className="inline-block px-4 py-1.5 bg-[#bcedd7] text-[#214f3f] rounded-full text-sm mb-4">Policies at a Glance</motion.span>
                        <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-[#00261b] mb-4">Additional Policy Information</motion.h2>
                        <motion.p variants={fadeInUp} className="text-[#5c5f5e] max-w-2xl mx-auto">
                            Important summaries of our refund, claims, and liability policies.
                        </motion.p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {policySummaries.map((summary, idx) => (
                            <motion.div
                                key={idx}
                                variants={fadeInUp}
                                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-gray-100"
                            >
                                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
                                    {summary.icon}
                                </div>
                                <h3 className="font-bold text-xl text-[#00261b] mb-4">{summary.title}</h3>
                                <ul className="space-y-2">
                                    {summary.items.map((item, itemIdx) => (
                                        <li key={itemIdx} className="text-[#5c5f5e] text-sm flex items-start gap-2">
                                            <span className="text-emerald-600 mt-0.5">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Changes & Contact Section */}
            <section className="py-16 bg-[#f9faf7]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={fadeInUp}
                            className="bg-white rounded-xl p-8 shadow-sm border border-gray-100"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <Clock className="w-6 h-6 text-emerald-600" />
                                <h3 className="font-bold text-2xl text-[#00261b]">Changes to This Policy</h3>
                            </div>
                            <p className="text-[#5c5f5e] leading-relaxed">
                                We may update this Privacy Policy from time to time. Updates will be posted on this page with the revised effective date. We encourage you to review this policy periodically to stay informed about how we protect your information.
                            </p>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={fadeInUp}
                            className="bg-white rounded-xl p-8 shadow-sm border border-gray-100"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <Mail className="w-6 h-6 text-emerald-600" />
                                <h3 className="font-bold text-2xl text-[#00261b]">Contact Us</h3>
                            </div>
                            <div className="space-y-3 text-[#5c5f5e]">
                                <p className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    <span>Laundrica LLC FZ, Dubai, United Arab Emirates</span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    <span>support@laundrica.com</span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <Phone className="w-4 h-4" />
                                    <span>+971 50 820 3555</span>
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        variants={fadeInUp}
                        className="mt-8 text-center p-6 bg-[#edeeeb] rounded-xl"
                    >
                        <p className="text-sm text-[#00261b] font-medium">
                            By using Laundrica, you agree to this Privacy Policy. If you have any questions about how we handle your data, please don't hesitate to contact us.
                        </p>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}