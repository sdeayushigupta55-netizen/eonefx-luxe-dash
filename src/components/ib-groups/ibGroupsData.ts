export interface IBGroup {
  id: string;
  groupName: string;
  rebateRules: string[];
  accountTypes: string[];
  globalAccountType: string;
  status: "Active" | "Disabled";
}

export const ibGroupsData: IBGroup[] = [
  {
    id: "1",
    groupName: "Silver",
    rebateRules: ["Standard-Rebate", "Promo-Rebate"],
    accountTypes: ["Promo Account", "Standard"],
    globalAccountType: "Active",
    status: "Active",
  },
  {
    id: "2",
    groupName: "Gold",
    rebateRules: ["Promo-Rebate"],
    accountTypes: ["Promo Account", "Standard"],
    globalAccountType: "Disabled",
    status: "Active",
  },
  {
    id: "3",
    groupName: "Test-Ib-Group-1",
    rebateRules: ["Standard-Rebate", "Promo-Rebate"],
    accountTypes: ["Promo Account", "Standard"],
    globalAccountType: "Active",
    status: "Active",
  },
  {
    id: "4",
    groupName: "VIP",
    rebateRules: ["STD-Kr"],
    accountTypes: ["VIP Account"],
    globalAccountType: "Disabled",
    status: "Active",
  },
];

export const ibGroupsSidebarItems = [
  { id: "customer", label: "Customer" },
  { id: "roles-permissions", label: "Roles & Permissions" },
  { id: "lead-settings", label: "Lead Settings" },
  { id: "kyc-compliance", label: "KYC & Compliance" },
  { id: "user-rankings", label: "User Rankings" },
];

export const ibGroupsTabs = [
  { id: "risk-profile-tags", label: "Risk Profile Tags" },
  { id: "system-tags", label: "System Tags" },
  { id: "customer-groups", label: "Customer Groups" },
  { id: "ib-groups", label: "IB Groups" },
  { id: "permission", label: "Permission" },
  { id: "misc", label: "Misc" },
];
