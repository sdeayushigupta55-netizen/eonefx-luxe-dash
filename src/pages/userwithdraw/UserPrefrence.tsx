import React, { useState } from "react";

const themes = [
	{ name: "Light Mode", selected: true },
	{ name: "Dark Mode", selected: false },
];

const languages = [
	{ name: "English", selected: true },
	{ name: "French", selected: false },
	{ name: "Spanish", selected: false },
	{ name: "Chinese", selected: false },
	{ name: "Arabic", selected: false },
	{ name: "Hindi", selected: false },
	{ name: "Urdu", selected: false },
];

const UserPrefrence = () => {
	const [selectedTheme, setSelectedTheme] = useState("Light Mode");
	const [selectedLanguage, setSelectedLanguage] = useState("English");

	const handleThemeSelect = (theme) => {
		setSelectedTheme(theme);
		themes.forEach((t) => (t.selected = t.name === theme));
	};

	const handleLanguageSelect = (language) => {
		setSelectedLanguage(language);
		languages.forEach((l) => (l.selected = l.name === language));
	};

	return (
		<div className="p-6 bg-background min-h-screen">
			<div className="mb-8">
				<h2 className="text-xl font-semibold mb-4">Theme</h2>
				<p className="text-sm text-muted-foreground mb-6">
					Select your preferred theme
				</p>
				<div className="grid grid-cols-2 gap-4">
					{themes.map((theme, index) => (
						<div
							key={index}
							className={`flex items-center justify-between bg-card p-4 rounded-lg border border-border shadow-md hover:shadow-lg transition-shadow cursor-pointer ${
								theme.selected ? "font-semibold" : ""
							}`}
							onClick={() => handleThemeSelect(theme.name)}
						>
							<span>{theme.name}</span>
							<span
								className={
									theme.selected
										? "text-primary"
										: "text-muted-foreground"
								}
							>
								{theme.selected ? "Selected ✓" : "Select"}
							</span>
						</div>
					))}
				</div>
			</div>

			<div>
				<h2 className="text-xl font-semibold mb-4">Communication</h2>
				<p className="text-sm text-muted-foreground mb-6">
					Select your preferred language
				</p>
				<div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
					{languages.map((language, index) => (
						<div
							key={index}
							className={`flex items-center justify-between bg-card p-4 rounded-lg border border-border shadow-md hover:shadow-lg transition-shadow cursor-pointer ${
								language.selected ? "font-semibold" : ""
							}`}
							onClick={() => handleLanguageSelect(language.name)}
						>
							<span>{language.name}</span>
							<span
								className={
									language.selected
										? "text-primary"
										: "text-muted-foreground"
								}
							>
								{language.selected ? "Selected ✓" : "Select"}
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default UserPrefrence;
