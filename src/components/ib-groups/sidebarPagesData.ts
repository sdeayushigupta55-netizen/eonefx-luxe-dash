// Customer section data
export const riskProfileTags = [
  { id: "1", name: "Suspicious", status: "Active" },
  { id: "2", name: "HFT & Arbitrage", status: "Active" },
  { id: "3", name: "High Risk Trader", status: "Active" },
  { id: "4", name: "Under Investigation", status: "Active" },
  { id: "5", name: "Under Audit", status: "Active" },
  { id: "6", name: "Under Review", status: "Active" },
  { id: "7", name: "Fraudulent Activities", status: "Active" },
  { id: "8", name: "Low Activity", status: "Active" },
  { id: "9", name: "Scalper", status: "Active" },
  { id: "10", name: "News Trader", status: "Active" },
];

export const systemTags: { id: string; name: string; status: string }[] = [];

export const customerGroups = [
  { id: "1", name: "VIP Traders", status: "Active" },
];

// Roles & Permissions data
export const rolesData = [
  { id: 1, name: "Super Admin", editable: false },
  { id: 2, name: "Manager", editable: true },
  { id: 3, name: "Main Manager", editable: true },
  { id: 4, name: "Finance Manager", editable: true },
  { id: 5, name: "Compliance Office", editable: true },
  { id: 6, name: "Test", editable: true },
  { id: 7, name: "Sales Manager", editable: true },
];

// Lead Settings data
export const leadSources = [
  { id: 1, name: "Email" },
  { id: 2, name: "Google" },
  { id: 3, name: "Facebook" },
  { id: 4, name: "Direct" },
  { id: 5, name: "Tv" },
  { id: 6, name: "Friend" },
];

export const pipelineStages = [
  { id: 1, name: "New Lead" },
  { id: 2, name: "Contacted" },
  { id: 3, name: "Qualified" },
  { id: 4, name: "Converted" },
];

// KYC Levels data
export const kycLevels = [
  {
    id: 1,
    name: "Level 1",
    status: "Active",
    description: "Email and Phone verification required",
    requirements: ["Email Verification", "Phone Verification"],
    mode: "manual" as const,
  },
  {
    id: 2,
    name: "Level 2",
    status: "Active",
    description: "ID verification method",
    requirements: ["ID Document"],
    mode: "manual" as const,
  },
  {
    id: 3,
    name: "Level 3",
    status: "Disabled",
    description: "Additional verification requirements",
    requirements: ["Proof of Documents"],
    mode: "automatic" as const,
  },
];

// User Rankings data
export const userRankings = [
  {
    id: "1",
    ranking: "Bronze",
    icon: "🥉",
    name: "Bronze",
    minEarning: "0 USD",
    bonus: "0 USD",
    description: "Gain Points On Every Activity",
    status: "Active",
  },
  {
    id: "2",
    ranking: "Silver",
    icon: "🥈",
    name: "Silver",
    minEarning: "100 USD",
    bonus: "10 USD",
    description: "Gain More With Silver Rank",
    status: "Active",
  },
  {
    id: "3",
    ranking: "Gold",
    icon: "🥇",
    name: "Gold",
    minEarning: "200 USD",
    bonus: "20 USD",
    description: "Exclusive Perks With Gold Rank",
    status: "Active",
  },
  {
    id: "4",
    ranking: "Platinum",
    icon: "💎",
    name: "Platinum",
    minEarning: "2000 USD",
    bonus: "50 USD",
    description: "Highest Level Of Benefits With Platinum Rank",
    status: "Active",
  },
];

// Customer Permissions data
export const customerPermissions = [
  { id: "editName", label: "Edit Name", enabled: false },
  { id: "editPhone", label: "Edit Phone", enabled: true },
  { id: "editUsername", label: "Edit Username", enabled: true },
  { id: "editEmail", label: "Edit Email", enabled: true },
  { id: "editCountry", label: "Edit Country", enabled: true },
  { id: "editDob", label: "Edit Date Of Birth", enabled: true },
  { id: "accountCreation", label: "Account Creation", enabled: false },
  { id: "emailVerification", label: "Email Verification", enabled: true },
  { id: "kycVerification", label: "KYC Verification", enabled: false },
  { id: "twoFaVerification", label: "2FA Verification", enabled: true },
  { id: "deposit", label: "Deposit", enabled: false },
  { id: "withdraw", label: "Withdraw", enabled: true },
  { id: "ticketsFeature", label: "Tickets Feature", enabled: false },
];
