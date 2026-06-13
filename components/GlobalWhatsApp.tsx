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
            return "Hi I need Laundrica to sort my laundry WB";
        }
        if (pathname?.includes('/contact')) {
            return "Hi I need Laundrica to sort my laundry WB";
        }
        return "Hi I need Laundrica to sort my laundry WB";
    };

    return (
        <WhatsAppButton
            phoneNumber="971508203555"  // Changed this to your number
            message={getMessage()}       // Using your custom message
            position="bottom-right"
            size="medium"
            showTooltip={true}
            tooltipText="Chat with us on WhatsApp"
        />
    );
}