// components/whatsapp-button.tsx
'use client';

import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface WhatsAppButtonProps {
    phoneNumber?: string;
    message?: string;
    position?: 'bottom-right' | 'bottom-left';
    size?: 'small' | 'medium' | 'large';
    showTooltip?: boolean;
    tooltipText?: string;
}

const DEFAULT_PHONE_NUMBER = "971509259667"; // Your business WhatsApp number
const DEFAULT_MESSAGE = "Hello! I'm interested in your laundry services. Can you please help me?";

export function WhatsAppButton({
    phoneNumber = DEFAULT_PHONE_NUMBER,
    message = DEFAULT_MESSAGE,
    position = 'bottom-right',
    size = 'medium',
    showTooltip = true,
    tooltipText = "Chat with us on WhatsApp",
}: WhatsAppButtonProps) {

    const handleWhatsAppClick = () => {
        // Clean the phone number (remove any non-digit characters except +)
        const cleanNumber = phoneNumber.toString().replace(/\D/g, '');

        // Encode the message for URL
        const encodedMessage = encodeURIComponent(message);

        // Create the WhatsApp URL
        // Use wa.me for a cleaner redirect that works on both mobile and desktop
        const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;

        // Open in new tab
        window.open(whatsappUrl, '_blank');
    };

    const sizeClasses = {
        small: 'w-10 h-10',
        medium: 'w-14 h-14',
        large: 'w-16 h-16',
    };

    const iconSizes = {
        small: 'w-5 h-5',
        medium: 'w-7 h-7',
        large: 'w-8 h-8',
    };

    const positionClasses = {
        'bottom-right': 'bottom-6 right-6',
        'bottom-left': 'bottom-6 left-6',
    };

    return (
        <div className={`fixed ${positionClasses[position]} z-50`}>
            {showTooltip && (
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap"
                >
                    {tooltipText}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
                </motion.div>
            )}

            <motion.a
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    handleWhatsAppClick();
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className={`${sizeClasses[size]} bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group relative`}
                style={{
                    boxShadow: '0 4px 14px rgba(37, 211, 102, 0.4)',
                }}
            >
                <MessageCircle className={`${iconSizes[size]} text-white`} />

                {/* Pulsing animation ring */}
                <span className="absolute inset-0 rounded-full animate-ping bg-[#25D366] opacity-40"></span>
            </motion.a>
        </div>
    );
}