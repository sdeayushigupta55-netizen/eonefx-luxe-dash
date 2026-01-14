import { VerifyBanner } from "@/components/userdashboard/VerifyBanner";

import { UserDashboardLayout } from "@/components/layout/UserDashboardLayout";
import DownloadPlatform from "../myaccount/DownloadPlatform";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const accounts = [
	{
		id: 'standard',
		title: 'Standard',
		description: 'Most popular! A great account for all types of traders',
		badge: 'Recommended',
		initialDeposit: '$0',
		features: ['Standard', 'Low Spread', 'Testing Module', 'Double Bonus'],
	},
	{
		id: 'test',
		title: 'Test',
		description: 'ddfrgr',
		badge: 'Cent Acc',
		initialDeposit: '$10',
		features: ['standard', 'test module'],
	},
	{
		id: 'standard2',
		title: 'Standard',
		description: 'A great account for all types of traders',
		badge: 'Recommended',
		initialDeposit: '$50',
		features: ['low spread'],
	},
	{
		id: 'vip',
		title: 'VIP Account',
		description: '',
		badge: 'Recommended',
		initialDeposit: '$0',
		features: ['Spread from 0.1', 'Fast Execution'],
	},
];

const NewAccount = () => {
	const navigate = useNavigate();

	return (
		<UserDashboardLayout>
			<div className="space-y-6">
				<VerifyBanner />
				<div className="p-6 bg-card rounded-xl border border-border">
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-xl font-semibold">Open New Account</h2>
						<Button onClick={() => navigate('/user/accounts')}>Account</Button>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{accounts.map((account) => (
							<div
								key={account.id}
								className="bg-card p-4 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow"
							>
								<div className="flex justify-between items-center mb-4">
									<h3 className="text-lg font-medium text-foreground">{account.title}</h3>
									{account.badge && (
										<Badge className="bg-primary text-primary-foreground">{account.badge}</Badge>
									)}
								</div>
								<p className="text-sm text-muted-foreground mb-4">{account.description}</p>
								<div className="bg-muted/30 p-4 rounded-lg mb-4">
									<p className="text-sm font-medium text-muted-foreground mb-2">Initial Deposit</p>
									<p className="text-lg font-semibold text-green-600">{account.initialDeposit}</p>
									<p className="text-sm font-medium text-muted-foreground mt-4">Key Features</p>
									<ul className="list-disc list-inside text-sm text-muted-foreground">
										{account.features.map((feature, index) => (
											<li key={index}>{feature}</li>
										))}
									</ul>
								</div>
								<Button className="w-full">Create Account</Button>
							</div>
						))}
					</div>
				</div>
				<DownloadPlatform />
			</div>
		</UserDashboardLayout>
	);
}

export default NewAccount;
