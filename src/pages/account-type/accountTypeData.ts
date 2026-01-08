export interface AccountType {
  id: string;
  traderType: string;
  priority: number;
  title: string;
  leverage: string;
  branches: string;
  accountCategory: string;
  countriesTags?: { countries?: string; tags?: string };
  ibRebateRules?: string;
  badge: string;
  badgeColor: string;
  status: "Active" | "Inactive";
}

export interface IBAccountType {
  id: string;
  title: string;
  group: string;
  badge: string;
  badgeColor: string;
  status: "Active" | "Inactive";
}

export const mockAccountTypes: AccountType[] = [
  {
    id: "1",
    traderType: "Mt5",
    priority: 1,
    title: "Standard",
    leverage: "100,200,300,400,500,1000",
    branches: "N/A",
    accountCategory: "Universal Global",
    badge: "Recommended",
    badgeColor: "bg-emerald-500",
    status: "Active",
  },
  {
    id: "2",
    traderType: "Mt5",
    priority: 1,
    title: "Test",
    leverage: "10,50,100",
    branches: "N/A",
    accountCategory: "",
    countriesTags: { countries: "Pakistan", tags: "All" },
    badge: "Cent Acc",
    badgeColor: "bg-orange-500",
    status: "Active",
  },
  {
    id: "3",
    traderType: "Mt5",
    priority: 1,
    title: "Standard",
    leverage: "100,200,300,400,500,1000",
    branches: "N/A",
    accountCategory: "Universal Global",
    badge: "Recommended",
    badgeColor: "bg-emerald-500",
    status: "Active",
  },
  {
    id: "4",
    traderType: "Mt5",
    priority: 2,
    title: "Promo Account",
    leverage: "100,200,300",
    branches: "Test",
    accountCategory: "",
    ibRebateRules: "Promo-Rebate, Standard-Rebate",
    badge: "30% Bonus",
    badgeColor: "bg-amber-500",
    status: "Active",
  },
  {
    id: "5",
    traderType: "Mt5",
    priority: 3,
    title: "Cent Account",
    leverage: "10,50,100",
    branches: "Test",
    accountCategory: "Global",
    badge: "Cent Special",
    badgeColor: "bg-yellow-500",
    status: "Active",
  },
  {
    id: "6",
    traderType: "Mt5",
    priority: 5,
    title: "VIP Account",
    leverage: "100,200,300,400",
    branches: "N/A",
    accountCategory: "Universal Global",
    badge: "Recommended",
    badgeColor: "bg-emerald-500",
    status: "Active",
  },
];

export const mockIBAccountTypes: IBAccountType[] = [];
