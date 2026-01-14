import { UserDashboardLayout } from '@/components/layout/UserDashboardLayout';
import User from '@/components/settings/communications/EmailTemplate/User';
import { VerifyBanner } from '@/components/userdashboard/VerifyBanner';
import { ExternalLink } from 'lucide-react';
import React from 'react';

const gatewayLogos: Record<string, string> = {
    match2pay: "https://cdn.brokeret.com/crm-assets/admin/pg/match2pay.webp",
    uniwire: "https://cdn.brokeret.com/crm-assets/admin/pg/uniwire.png",
    jenapay: "https://jenapay.com/wp-content/uploads/2023/09/Jena-Pay-Logo-1.png",
    stripe: "https://cdn.brokeret.com/crm-assets/admin/pg/stripe.webp",
};

const initialAutoDepositMethods = [
    {
        provider: "Stripe",
        logo: "https://cdn.brokeret.com/crm-assets/admin/pg/stripe.webp",
        title: "USDT",
        status: "Active",
        processing: "Instant",
        fee: "0",
        limits: "10 - 10000 USDT TRC20",
        branches: "N/A",
    },
    {
        provider: "uniwire",
        logo: "https://cdn.brokeret.com/crm-assets/admin/pg/uniwire.png",
        title: "ETH-UniWire",
        status: "Active",
        processing: "Automated",
        fee: "0",
        limits: "1 - 1000 ETH",
        branches: "N/A",
    },
    {
        provider: "match2pay",
        logo: "https://cdn.brokeret.com/crm-assets/admin/pg/match2pay.webp",
        title: "USD TRC20",
        status: "Active",
        processing: "Automated",
        fee: "0",
        limits: "1 - 50000 USDC TRC20",
        branches: "N/A",
    },
    {
        provider: "jenapay",
        logo: "https://jenapay.com/wp-content/uploads/2023/09/Jena-Pay-Logo-1.png",
        title: "test",
        status: "Active",
        processing: "Automated",
        fee: "0",
        limits: "1 - 10000 USD",
        branches: "N/A",
    },
    {
        provider: "Stripe",
        logo: "https://cdn.brokeret.com/crm-assets/admin/pg/stripe.webp",
        title: "USDT",
        status: "Active",
        processing: "Instant",
        fee: "0",
        limits: "10 - 10000 USDT TRC20",
        branches: "N/A",
    },
    {
        provider: "uniwire",
        logo: "https://cdn.brokeret.com/crm-assets/admin/pg/uniwire.png",
        title: "ETH-UniWire",
        status: "Active",
        processing: "Automated",
        fee: "0",
        limits: "1 - 1000 ETH",
        branches: "N/A",
    },
];

const UserDeposit = () => {
    return (
        <UserDashboardLayout>
            <div className='space-y-6'>
            <VerifyBanner />      
            <div className="p-6 bg-card rounded-xl border border-border">
                
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Deposit Methods</h2>
                     <a href="" target="_blank" className="btn-link text-primary">
                    Client Fund Safety
                    <ExternalLink className="ml-1 inline-block h-4 w-4" />
                </a></div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {initialAutoDepositMethods.map((method, index) => (
                        <div
                            key={index}
                            className="bg-card p-4 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <img
                                    src={method.logo}
                                    alt={method.title}
                                    className="inline-block h-8 md:h-10 object-contain"
                                />
                                <span className="text-xs bg-muted/30 text-muted-foreground px-2 py-1 rounded">
                                    Verification Required
                                </span>
                            </div>
                            <h3 className="text-lg font-medium text-foreground mb-2">{method.title}</h3>
                            <p className="text-sm text-muted-foreground mb-1">
                                Processing Time: {method.processing}
                            </p>
                            <p className="text-sm text-muted-foreground mb-1">Fee: {method.fee}</p>
                            <p className="text-sm text-muted-foreground">Limits: {method.limits}</p>
                        </div>
                    ))}
                </div>
            </div>
           </div>
        </UserDashboardLayout>
    );
};

export default UserDeposit;