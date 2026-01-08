export interface Transaction {
  id: string;
  date: string;
  userName: string;
  email: string;
  detail: string;
  transactionId: string;
  type: "Refund" | "Withdraw" | "Manual Deposit" | "Deposit";
  account: string;
  amount: string;
  amountColor: "green" | "red";
  gateway: string;
  actionBy: string;
  status: "Success" | "Cancelled" | "Pending";
}

export interface PaymentCard {
  title: string;
  amount: string;
  completed: string;
  pending: string;
  rejected: string;
}

export interface IBMemberRanking {
  rank: number;
  userName: string;
  email: string;
  ibGroup: string;
  networkUsers: number;
  incomingPayments: string;
  outgoingPayments: string;
}

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    date: "Dec 17, 2025 11:53",
    userName: "Racheal R",
    email: "rachealjameel@gmail.com",
    detail: "Withdraw With Bank Transfer - PKR-PKR",
    transactionId: "TRXB2G0ALWZ97",
    type: "Refund",
    account: "3394695823",
    amount: "+10 USD",
    amountColor: "green",
    gateway: "System",
    actionBy: "Super Admin",
    status: "Success"
  },
  {
    id: "2",
    date: "Dec 17, 2025 11:49",
    userName: "Racheal R",
    email: "rachealjameel@gmail.com",
    detail: "Withdraw With Bank Transfer - PKR-PKR",
    transactionId: "TRXORBMIOOMKI",
    type: "Withdraw",
    account: "3394695823",
    amount: "-10 USD",
    amountColor: "red",
    gateway: "Bank Transfer - PKR",
    actionBy: "Super Admin",
    status: "Cancelled"
  },
  {
    id: "3",
    date: "Dec 17, 2025 11:27",
    userName: "Test New",
    email: "richirj43743@gmail.com",
    detail: "Deposit With Bank Transfer - PKR",
    transactionId: "TRXNK7NJCGD5F",
    type: "Manual Deposit",
    account: "878859",
    amount: "+10 USD",
    amountColor: "green",
    gateway: "Bank-PKR",
    actionBy: "Super Admin",
    status: "Cancelled"
  },
  {
    id: "4",
    date: "Dec 09, 2025 09:45",
    userName: "Sufyan Aslam",
    email: "sufyanhashmi931@gmail.com",
    detail: "Deposit With Bank Transfer - PKR",
    transactionId: "TRXSUQSUYH444",
    type: "Manual Deposit",
    account: "5267185332",
    amount: "+20 USD",
    amountColor: "green",
    gateway: "Bank-PKR",
    actionBy: "Super Admin",
    status: "Cancelled"
  },
  {
    id: "5",
    date: "Dec 09, 2025 09:42",
    userName: "Sufyan Aslam",
    email: "sufyanhashmi931@gmail.com",
    detail: "Deposit With Bank Transfer - PKR",
    transactionId: "TRXQAKQBJZZ6R",
    type: "Manual Deposit",
    account: "5267185332",
    amount: "+100 USD",
    amountColor: "green",
    gateway: "Bank-PKR",
    actionBy: "Super Admin",
    status: "Success"
  },
  {
    id: "6",
    date: "Dec 04, 2025 01:06",
    userName: "Test New",
    email: "richirj43743@gmail.com",
    detail: "Deposit With Bank Transfer - PKR",
    transactionId: "TRXISUZ4CINXJ",
    type: "Manual Deposit",
    account: "878816",
    amount: "+10 USD",
    amountColor: "green",
    gateway: "Bank-PKR",
    actionBy: "",
    status: "Pending"
  }
];

export const mockIncomingPayments: PaymentCard[] = [
  { title: "Deposit", amount: "$5950", completed: "370$", pending: "0$", rejected: "420$" },
  { title: "Manual Deposit", amount: "$20488.25", completed: "15095$", pending: "5149.75$", rejected: "243.5$" },
  { title: "Voucher Deposit", amount: "$60", completed: "60$", pending: "0$", rejected: "0$" },
  { title: "IB Bonus", amount: "$0", completed: "0$", pending: "0$", rejected: "0$" },
  { title: "Demo Deposit", amount: "$100", completed: "100$", pending: "0$", rejected: "0$" },
  { title: "External Receive Money", amount: "$29", completed: "29$", pending: "0$", rejected: "0$" },
  { title: "Internal Receive Money", amount: "$500", completed: "500$", pending: "0$", rejected: "0$" },
  { title: "Referral", amount: "$0", completed: "0$", pending: "0$", rejected: "0$" },
  { title: "Signup Bonus", amount: "$0", completed: "0$", pending: "0$", rejected: "0$" },
  { title: "Bonus", amount: "$100", completed: "100$", pending: "0$", rejected: "0$" },
  { title: "Bonus Refund", amount: "$0", completed: "0$", pending: "0$", rejected: "0$" },
  { title: "Refund", amount: "$98", completed: "98$", pending: "0$", rejected: "0$" },
];

export const mockOutgoingPayments: PaymentCard[] = [
  { title: "Withdraw", amount: "$1269", completed: "1121$", pending: "50$", rejected: "98$" },
  { title: "Withdraw Auto", amount: "$0", completed: "0$", pending: "0$", rejected: "0$" },
  { title: "Subtract", amount: "$110", completed: "110$", pending: "0$", rejected: "0$" },
  { title: "External Send Money", amount: "$29", completed: "29$", pending: "0$", rejected: "0$" },
  { title: "Internal Send Money", amount: "$500", completed: "500$", pending: "0$", rejected: "0$" },
  { title: "Bonus Subtract", amount: "$0", completed: "0$", pending: "0$", rejected: "0$" },
];

export const mockIBLeaderboard: IBMemberRanking[] = [
  {
    rank: 1,
    userName: "Sufyan Aslam",
    email: "sufyanhashmi931@gmail.com",
    ibGroup: "VIP",
    networkUsers: 6,
    incomingPayments: "$21,615.25",
    outgoingPayments: "$1,888.00"
  },
  {
    rank: 2,
    userName: "Sufyan-2 Sufyan-2",
    email: "sufyan2@gmail.com",
    ibGroup: "Gold",
    networkUsers: 4,
    incomingPayments: "$3,020.00",
    outgoingPayments: "$0.00"
  },
  {
    rank: 3,
    userName: "Mikhail Prescott",
    email: "prescottmikhail@gmail.com",
    ibGroup: "Test-Ib-Group-1",
    networkUsers: 0,
    incomingPayments: "$100.00",
    outgoingPayments: "$0.00"
  },
  {
    rank: 4,
    userName: "Racheal R",
    email: "rachealjameel@gmail.com",
    ibGroup: "Test-Ib-Group-1",
    networkUsers: 2,
    incomingPayments: "$80.00",
    outgoingPayments: "$20.00"
  },
  {
    rank: 5,
    userName: "Test New",
    email: "richirj43743@gmail.com",
    ibGroup: "Silver",
    networkUsers: 1,
    incomingPayments: "$30.00",
    outgoingPayments: "$0.00"
  },
  {
    rank: 6,
    userName: "Sufyan-4 Sufyan-4",
    email: "sufyan-4@gmail.com",
    ibGroup: "Test-Ib-Group-1",
    networkUsers: 2,
    incomingPayments: "$0.00",
    outgoingPayments: "$0.00"
  },
  {
    rank: 7,
    userName: "Sufyan Aslam",
    email: "sufyanhashmi3021@gmail.com",
    ibGroup: "Silver",
    networkUsers: 0,
    incomingPayments: "$0.00",
    outgoingPayments: "$0.00"
  }
];

export const selectedUserPayments = {
  incoming: {
    deposit: "$5,420.00",
    manualDeposit: "$15,438.25",
    voucherDeposit: "$40.00",
    ibBonus: "$0.00",
    demoDeposit: "$0.00",
    externalReceiveMoney: "$29.00",
    internalReceiveMoney: "$500.00",
    referral: "$0.00",
    signupBonus: "$0.00",
    bonus: "$100.00",
    bonusRefund: "$0.00",
    refund: "$88.00"
  },
  outgoing: {
    withdraw: "$1,249.00",
    withdrawAuto: "$0.00",
    subtract: "$110.00",
    externalSendMoney: "$29.00",
    internalSendMoney: "$500.00",
    bonusSubtract: "$0.00"
  }
};
