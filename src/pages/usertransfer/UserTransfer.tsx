import React from 'react';
import { Button } from '@/components/ui/button';
import { UserDashboardLayout } from '@/components/layout/UserDashboardLayout';
import { VerifyBanner } from '@/components/userdashboard/VerifyBanner';

const UserTransfer = () => {
    return (
        <UserDashboardLayout>
             <div className='space-y-6'>
            <VerifyBanner />
           
             <div className="grid grid-cols-2 gap-4 ">
            <div className="p-6 bg-card rounded-xl border border-border">
                
                <h2 className="text-xl font-semibold mb-2">Internal Transfer</h2>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground mb-1">Unlimited</h3>
                    <span className="text-xs bg-primary px-2 py-1 rounded">
                        Instant
                    </span>
                </div>

                <p className="text-sm text-green-600 mb-4">Free of Cost</p>
                <p className="text-sm text-muted-foreground mb-6">
                    Instantly transfer funds between your accounts, seamlessly and without limits.
                </p>

                <div className="mb-2">
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2" htmlFor="transfer-to">
                                For sending funds to
                            </label>
                            <input
                                id="transfer-to"
                                type="text"
                                placeholder="your accounts"
                                className="block w-full text-sm border border-border rounded-lg p-2 bg-muted/30"
                            />
                        </div>

                       
                           
                       
                    </form>
                     <Button className="bg-primary w-full mt-4">Transfer Now</Button>
                </div>

               
               
                </div>
                
            </div>
            </div>
        </UserDashboardLayout>
    );
};

export default UserTransfer;