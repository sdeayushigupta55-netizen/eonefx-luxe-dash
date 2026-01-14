import React from 'react';
import { ChevronRight, Grid, Apple, Globe, Grid2x2 } from 'lucide-react';

const platforms = [
	{
		id: 'desktop',
		icon:  Grid2x2,
		label: 'Desktop Terminal',
		description: 'for window',
	},
	{
		id: 'ios',
		icon: Apple,
		label: 'IOS Mobile',
		description: 'for ios',
	},
	{
		id: 'web',
		icon: Globe,
		label: 'Web',
		description: 'for web',
	},
];

const DownloadPlatform = () => {
	return (
		<div className="rounded-xl border border-border bg-card p-6 shadow-md">
			<h2 className="mb-6 text-xl font-semibold">Download Platform</h2>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
				{platforms.map((platform) => (
					<div
						key={platform.id}
						className="flex items-center justify-between rounded-lg border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
					>
						<div className="flex items-center gap-4">
							<div className="text-primary text-2xl">
								<platform.icon className="h-5 w-5 sm:h-6 sm:w-6" />
							</div>
							<div>
								<p className="text-lg font-medium text-foreground">
									{platform.label}
								</p>
								<p className="text-sm text-muted-foreground">
									{platform.description}
								</p>
							</div>
						</div>
						<ChevronRight className="text-muted-foreground" />
					</div>
				))}
			</div>
		</div>
	);
};

export default DownloadPlatform;