export interface ManageLevel {
  id: string;
  name: string;
  image: string;
  leverage: string;
  country: string;
  tags: string;
  status: "active" | "inactive";
  platform: "metatrader" | "x9trader";
}

export interface MultiIBLevel {
  id: string;
  title: string;
  levelOrder: number;
}

export interface Symbol {
  id: number;
  symbol: string;
  path: string;
  description: string;
  contractSize: number;
  enabled: boolean;
  platform: string;
}

export const mockManageLevels: ManageLevel[] = [
  {
    id: "1",
    name: "Standard",
    image: "/placeholder.svg",
    leverage: "100,200,300,400,500,1000",
    country: "",
    tags: "",
    status: "active",
    platform: "metatrader",
  },
  {
    id: "2",
    name: "Test",
    image: "/placeholder.svg",
    leverage: "10,50,100",
    country: "Pakistan",
    tags: "All",
    status: "active",
    platform: "metatrader",
  },
  {
    id: "3",
    name: "Standard",
    image: "/placeholder.svg",
    leverage: "100,200,300,400,500,1000",
    country: "",
    tags: "",
    status: "active",
    platform: "metatrader",
  },
  {
    id: "4",
    name: "Promo Account",
    image: "/placeholder.svg",
    leverage: "100,200,300",
    country: "",
    tags: "",
    status: "active",
    platform: "metatrader",
  },
  {
    id: "5",
    name: "Cent Account",
    image: "/placeholder.svg",
    leverage: "10,50,100",
    country: "",
    tags: "",
    status: "active",
    platform: "metatrader",
  },
  {
    id: "6",
    name: "VIP Account",
    image: "/placeholder.svg",
    leverage: "100,200,300,400",
    country: "",
    tags: "",
    status: "active",
    platform: "metatrader",
  },
];

export const mockMultiIBLevels: MultiIBLevel[] = [
  { id: "1", title: "Level-1", levelOrder: 1 },
  { id: "2", title: "Level-2", levelOrder: 2 },
  { id: "3", title: "Level-3", levelOrder: 3 },
  { id: "4", title: "Level-4", levelOrder: 4 },
  { id: "5", title: "Level-5", levelOrder: 5 },
];

export const mockSymbols: Symbol[] = [
  { id: 1, symbol: "AUDCAD", path: "Forex\\FX Crosses\\AUDCAD", description: "Australian Dollar Vs Canadian Dollar", contractSize: 100000, enabled: true, platform: "Meta Trader 5" },
  { id: 2, symbol: "AUDCHF", path: "Forex\\FX Crosses\\AUDCHF", description: "Australian Dollar Vs Swiss Franc", contractSize: 100000, enabled: true, platform: "Meta Trader 5" },
  { id: 3, symbol: "AUDJPY", path: "Forex\\FX Crosses\\AUDJPY", description: "Australian Dollar Vs Japanese Yen", contractSize: 100000, enabled: true, platform: "Meta Trader 5" },
  { id: 4, symbol: "AUDNZD", path: "Forex\\FX Minors\\AUDNZD", description: "Australian Dollar Vs New Zealand Dollar", contractSize: 100000, enabled: true, platform: "Meta Trader 5" },
  { id: 5, symbol: "CADCHF", path: "Forex\\FX Crosses\\CADCHF", description: "Canadian Dollar Vs Swiss Franc", contractSize: 100000, enabled: true, platform: "Meta Trader 5" },
  { id: 6, symbol: "CADJPY", path: "Forex\\FX Crosses\\CADJPY", description: "Canadian Dollar Vs Japanese Yen", contractSize: 100000, enabled: true, platform: "Meta Trader 5" },
  { id: 7, symbol: "CHFJPY", path: "Forex\\FX Crosses\\CHFJPY", description: "Swiss Frank Vs Japanese Yen", contractSize: 100000, enabled: true, platform: "Meta Trader 5" },
  { id: 8, symbol: "EURAUD", path: "Forex\\FX Crosses\\EURAUD", description: "Euro Vs Australian Dollar", contractSize: 100000, enabled: true, platform: "Meta Trader 5" },
  { id: 9, symbol: "EURCAD", path: "Forex\\FX Crosses\\EURCAD", description: "Euro Vs Canadian Dollar", contractSize: 100000, enabled: true, platform: "Meta Trader 5" },
  { id: 10, symbol: "EURCHF", path: "Forex\\FX Crosses\\EURCHF", description: "Euro Vs Swiss Franc", contractSize: 100000, enabled: true, platform: "Meta Trader 5" },
  { id: 11, symbol: "EURGBP", path: "Forex\\FX Crosses\\EURGBP", description: "Euro Vs Great Britain Pound", contractSize: 100000, enabled: false, platform: "Meta Trader 5" },
  { id: 12, symbol: "EURJPY", path: "Forex\\FX Crosses\\EURJPY", description: "Euro Vs Japanese Yen", contractSize: 100000, enabled: false, platform: "Meta Trader 5" },
  { id: 13, symbol: "EURNZD", path: "Forex\\FX Minors\\EURNZD", description: "Euro Vs New Zealand Dollar", contractSize: 100000, enabled: false, platform: "Meta Trader 5" },
  { id: 14, symbol: "GBPAUD", path: "Forex\\FX Crosses\\GBPAUD", description: "British Pound Vs Australian Dollar", contractSize: 100000, enabled: false, platform: "Meta Trader 5" },
  { id: 15, symbol: "GBPCAD", path: "Forex\\FX Crosses\\GBPCAD", description: "British Pound Vs Canadian Dollar", contractSize: 100000, enabled: false, platform: "Meta Trader 5" },
  { id: 16, symbol: "GBPCHF", path: "Forex\\FX Crosses\\GBPCHF", description: "Great Britain Pound Vs Swiss Franc", contractSize: 100000, enabled: false, platform: "Meta Trader 5" },
  { id: 17, symbol: "GBPJPY", path: "Forex\\FX Crosses\\GBPJPY", description: "Great Britain Pound Vs Japanese Yen", contractSize: 100000, enabled: false, platform: "Meta Trader 5" },
  { id: 18, symbol: "GBPNZD", path: "Forex\\FX Minors\\GBPNZD", description: "British Pound Vs New Zealand Dollar", contractSize: 100000, enabled: false, platform: "Meta Trader 5" },
  { id: 19, symbol: "NZDCAD", path: "Forex\\FX Minors\\NZDCAD", description: "New Zealand Dollar Vs Canadian Dollar", contractSize: 100000, enabled: false, platform: "Meta Trader 5" },
  { id: 20, symbol: "NZDCHF", path: "Forex\\FX Minors\\NZDCHF", description: "New Zealand Dollar Vs Swiss Franc", contractSize: 100000, enabled: false, platform: "Meta Trader 5" },
  { id: 21, symbol: "NZDJPY", path: "Forex\\FX Minors\\NZDJPY", description: "New Zealand Dollar Vs Japanese Yen", contractSize: 100000, enabled: false, platform: "Meta Trader 5" },
  { id: 22, symbol: "AUDUSD", path: "Forex\\FX Majors\\AUDUSD", description: "Australian Dollar Vs US Dollar", contractSize: 100000, enabled: false, platform: "Meta Trader 5" },
  { id: 23, symbol: "NZDUSD", path: "Forex\\FX Minors\\NZDUSD", description: "New Zealand Dollar Vs US Dollar", contractSize: 100000, enabled: false, platform: "Meta Trader 5" },
  { id: 24, symbol: "EURUSD", path: "Forex\\FX Majors\\EURUSD", description: "Euro Vs US Dollar", contractSize: 100000, enabled: true, platform: "Meta Trader 5" },
  { id: 25, symbol: "GBPUSD", path: "Forex\\FX Majors\\GBPUSD", description: "Great Britain Pound Vs US Dollar", contractSize: 100000, enabled: false, platform: "Meta Trader 5" },
];

export interface SymbolGroup {
  id: number;
  name: string;
  symbols: string[];
  createTime: string;
  platform: string;
}

export interface RebateRule {
  id: number;
  name: string;
  symbolGroups: string[];
  accountTypes: string[];
  ibGroups: string[];
  totalRebate: number;
  status: boolean;
  ruleType: string;
  rebateAmount: number;
  perLot: number;
}

export const mockSymbolGroups: SymbolGroup[] = [
  { id: 6, name: "Test", symbols: ["ALGUSD"], createTime: "15 December 2025 6:50 Pm", platform: "Meta Trader 5" },
  { id: 5, name: "STD-Currencies", symbols: ["EURUSD", "AUDCAD", "AUDJPY", "AUDCHF", "AUDNZD", "CADCHF", "CADJPY", "CHFJPY", "EURAUD", "EURCAD", "EURCHF"], createTime: "18 November 2025 7:28 Pm", platform: "Meta Trader 5" },
  { id: 4, name: "Group Test", symbols: ["ADAUSD", "ALGUSD"], createTime: "10 September 2025 3:01 Pm", platform: "Meta Trader 5" },
  { id: 3, name: "Forex Major", symbols: ["EURUSD", "ADAUSD", "AUDJPY"], createTime: "29 July 2025 9:47 Pm", platform: "Meta Trader 5" },
  { id: 2, name: "Test-1-Group", symbols: ["EURUSD", "AUDJPY"], createTime: "5 July 2025 5:38 Pm", platform: "Meta Trader 5" },
  { id: 1, name: "USD-Group", symbols: ["EURUSD", "ADAUSD"], createTime: "22 May 2025 3:52 Pm", platform: "Meta Trader 5" },
];

export const mockRebateRules: RebateRule[] = [
  { id: 1, name: "Standard-Rebate", symbolGroups: ["USD-Group"], accountTypes: ["Promo Account", "Standard"], ibGroups: ["Silver", "Test-Ib-Group-1"], totalRebate: 20, status: true, ruleType: "Per Lot", rebateAmount: 20, perLot: 1 },
  { id: 2, name: "Promo-Rebate", symbolGroups: ["USD-Group"], accountTypes: ["Promo Account", "Standard"], ibGroups: ["Gold", "Silver", "Test-Ib-Group-1"], totalRebate: 10, status: true, ruleType: "Per Lot", rebateAmount: 10, perLot: 1 },
  { id: 5, name: "STD-Kr", symbolGroups: ["STD-Currencies"], accountTypes: ["VIP Account"], ibGroups: ["VIP"], totalRebate: 5, status: true, ruleType: "Per Lot", rebateAmount: 5, perLot: 1 },
];

export const availableSymbols = ["EURUSD", "AUDCAD", "AUDJPY", "AUDCHF", "AUDNZD", "CADCHF", "CADJPY", "CHFJPY", "EURAUD", "EURCAD", "EURCHF", "ADAUSD", "ALGUSD", "GBPUSD", "NZDUSD"];

export const availableAccountTypes = ["Standard", "Promo Account", "VIP Account", "Cent Account"];

export const availableIBGroups = ["Silver", "Gold", "VIP", "Test-Ib-Group-1"];
