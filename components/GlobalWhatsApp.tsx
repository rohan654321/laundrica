// app/layout.tsx or app/components/GlobalWhatsApp.tsx
'use client';

import { usePathname } from 'next/navigation';
import { WhatsAppButton } from '@/components/whatsapp-button';

export function GlobalWhatsApp() {
    const pathname = usePathname();

    // Don't show on admin pages or checkout pages
    const hidePaths = ['/admin', '/checkout', '/login', '/register'];
    const shouldHide = hidePaths.some(path => pathname?.startsWith(path));

    if (shouldHide) return null;

    // Dynamic message based on current page
    const getMessage = () => {
        if (pathname?.includes('/services')) {
            return "Hello! I'm interested in your laundry services. Can you please help me?";
        }
        if (pathname?.includes('/contact')) {
            return "Hello! I came from the contact page. Can you help me?";
        }
        return "Hello! I'm interested in your laundry services. Can you please help me?";
    };

    return (
        <WhatsAppButton
            phoneNumber="971509259667"
            message={getMessage()}
            position="bottom-right"
            size="medium"
            showTooltip={true}
            tooltipText="Chat with us on WhatsApp"
        />
    );
}