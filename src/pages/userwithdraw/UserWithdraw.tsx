import { UserDashboardLayout } from '@/components/layout/UserDashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputField } from '@/components/form/InputField';
import { VerifyBanner } from '@/components/userdashboard/VerifyBanner';
import React from 'react';
import { SelectField } from '@/components/form/SelectField';
import { Mail , MessageCircleMore,Phone} from "lucide-react";
const UserWithdraw = () => {
    return (
        <UserDashboardLayout>
            <div className="min-h-screen">
                <VerifyBanner />
                <div className="bg-card p-6 rounded-xl border border-border mt-4 mb-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex-1">
                                <progress value={1} max={1} className="w-full h-1 bg-gray-200 rounded-full">
                                    <div className="h-1 bg-black rounded-full"></div>
                                </progress>
                                <div className="ml-4">
                                    <div className="text-sm">Step - 1</div>
                                    <h4 className="text-lg font-semibold">Withdraw Amount</h4>
                                </div>
                            </div>
                        
                        <div className="single-step">
                            <div className="flex-1">
                                <progress value={0} max={1} className="w-full h-1 bg-gray-200 rounded-full">
                                    <div className="bg-gray-300 h-1 rounded-full"></div>
                                </progress>
                                <div className="ml-4">
                                    <div className="text-sm">Step - 2</div>
                                    <h4 className="text-lg font-semibold ">Success</h4>
                                </div>
                            </div>
                            </div>
                            </div>
                        
                </div>

                {/* Withdrawal Form */}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   
                    {/* Left Column */}
                    <div className="bg-card p-4 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow">
                         <h2 className="text-lg font-semibold mb-4">Enter your withdraw details.</h2>
                        <div className="mb-4">
                            <SelectField
                                label="Account To Withdraw:"
                                options={[
                                    { label: "Left", value: "8651346183 - Main Wallet (0 USD)" },
                                    { label: "Center", value: "7362933200 - IB Wallet (0 USD)" },
                                ]}
                            />
                        </div>
                        <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-sm font-medium ">Withdraw Account:</label>
                                <p className="ml-2 text-sm">+ Add New Withdrawal Account</p>
                            </div>

                            <div className="flex items-center">
                                <Input
                                    type="text"
                                    placeholder="Withdraw Method"
                                />
                            </div>
                        </div>
                        <div className="mb-4 relative">
                            <InputField
                                label="Amount:"
                                type="text"
                                required
                                placeholder="Enter Amount"
                            />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 mt-2">USD</span>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="bg-card p-4 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow">
                        <h2 className="text-lg font-semibold mb-4">Withdraw Details</h2>
                        <div className="mb-4 flex justify-between">
                            <label className="block text-sm font-medium">Withdraw Amount</label>
                            <p className="text-gray-700">USD</p>
                        </div>
                        <Button className="w-full  rounded-md">Withdraw Money</Button>
                    </div>
                </div>

                {/* Support Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div className="bg-card p-4 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow text-center">
                        <span className="text-2xl mb-2 justify-center flex"><Mail /></span>
                        <h3 className="text-lg font-semibold mb-2">Email Support</h3>
                        <p className="text-sm ">
                            Get fast and reliable help directly in your inbox, perfect for detailed queries that need thorough answers.
                        </p>
                    </div>
                    <div className="bg-card p-4 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow text-center">
                        <span className="text-2xl mb-2 justify-center flex"> <MessageCircleMore /></span>
                        <h3 className="text-lg font-semibold mb-2">Direct Text Contact</h3>
                        <p className="text-sm ">
                            Reach us instantly through text for quick updates, clarifications, or immediate support.
                        </p>
                    </div>
                    <div className="bg-card p-4 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow text-center">
                        <span className="text-2xl mb-2 justify-center flex"><Phone /></span>
                        <h3 className="text-lg font-semibold mb-2">Personal Consultation</h3>
                        <p className="text-sm ">
                            Book a one-on-one session with our experts for tailored advice and personalized guidance.
                        </p>
                    </div>
                </div>
            </div>
        </UserDashboardLayout>
    );
};

export default UserWithdraw;

