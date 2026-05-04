// components/pricing/faq-accordion-minimal.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
    q: string;
    a: string;
}

const faqs: FAQItem[] = [
    { q: 'Can I change my plan anytime?', a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.' },
    { q: 'Is there a setup fee?', a: 'No setup fees. Just sign up and start using our service immediately. Your first pickup can be scheduled within 24 hours.' },
    { q: 'What happens if I cancel?', a: 'You can cancel anytime with no penalties. Your plan remains active until the end of your current billing period.' },
    { q: 'Do you offer discounts for annual billing?', a: 'Yes! Annual plans save you 20% compared to monthly billing. That\'s 2+ months free.' },
    { q: 'Do you clean wedding dresses and special garments?', a: 'Absolutely! We offer specialized care for wedding dresses (AED 50-100) and other premium garments.' },
    { q: 'Is there a minimum order requirement?', a: 'No minimum order required! Free pickup & delivery on all orders, regardless of size.' },
    { q: 'How do I track my order?', a: 'Track your order in real-time through our app or website dashboard with SMS/email notifications.' },
    { q: 'What if I\'m not satisfied?', a: 'We offer free re-cleaning or full refunds for any item you\'re not completely happy with.' }
];

export function FAQAccordionMinimal() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-3">
                {faqs.map((faq, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                        className="border-b border-gray-100 last:border-0"
                    >
                        <button
                            onClick={() => toggleFAQ(idx)}
                            className="w-full py-5 flex items-center justify-between text-left group"
                        >
                            <span className={`text-base font-medium transition-colors duration-300 ${openIndex === idx ? 'text-[#00261b]' : 'text-gray-700 group-hover:text-[#00261b]'
                                }`}>
                                {faq.q}
                            </span>
                            <motion.div
                                animate={{ rotate: openIndex === idx ? 45 : 0 }}
                                transition={{ duration: 0.3 }}
                                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${openIndex === idx ? 'bg-[#00261b] text-white' : 'bg-gray-100 text-gray-500'
                                    }`}
                            >
                                {openIndex === idx ? (
                                    <Minus className="w-3.5 h-3.5" />
                                ) : (
                                    <Plus className="w-3.5 h-3.5" />
                                )}
                            </motion.div>
                        </button>

                        <AnimatePresence>
                            {openIndex === idx && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="pb-5">
                                        <p className="text-gray-500 leading-relaxed">
                                            {faq.a}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}