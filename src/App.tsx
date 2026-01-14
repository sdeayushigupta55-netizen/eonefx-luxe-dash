import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

// Page imports
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ActivePositions from "./pages/ActivePositions";
import DashboardActivePositions from "./pages/DashboardActivePositions";
import AddCustomer from "./pages/AddCustomer";
import LeadContact from "./pages/LeadContact";
import AddLead from "./pages/AddLead";
import Deals from "./pages/Deals";
import AddDeal from "./pages/AddDeal";
import UserIndex from "./pages/userIndex";
import  Wallets from "./pages/wallets/Wallets";
import RequestMasterIB from "./pages/requestmasterib/RequestMasterIB";
import UserTickets from "./pages/usertickets/UserTickets";
import UserHistory from "./pages/userhistory/UserHistory";

// Customers Module (modular structure)
import {
  AllCustomers,
  ActiveCustomers,
  DisabledCustomers,
  GracePeriodCustomers,
  SendEmailCustomers,
} from "./components/dashboard/customers";

// Customers pages
import { SendEmailToAll, CustomerDetail, CustomerPaymentStats, CustomerNetworkStats } from "./pages/customers";

// Company Forms Module
import { CompanyForms } from "./pages/company-forms";

// Branches Forms Module
import { BranchesForms } from "./pages/branches-forms";

// Deposits pages
import { AddDeposit, PendingDeposits, DepositHistory, DepositVouchers } from "./pages/deposits";

// Withdraw pages
import { AddWithdraw, PendingWithdraws, WithdrawHistory } from "./pages/withdraw";

// Withdraw Accounts pages
import { WithdrawAccountsPending, WithdrawAccountsApproved, WithdrawAccountsRejected } from "./pages/withdraw-accounts";

// Compliance & KYC Module
import { PendingKYC, RejectedKYC, AllKYCLogs } from "./pages/compliance-kyc";

// Manage Staffs Module
import { ManageStaffs } from "./pages/manage-staffs";

// Account Type Module
import { AccountType } from "./pages/account-type";

// Trading Accounts Module
import {
  LivePendingAccounts,
  LiveApprovedAccounts,
  LiveRejectedAccounts,
  LiveArchivedAccounts,
  DemoPendingAccounts,
  DemoApprovedAccounts,
  DemoRejectedAccounts,
  DemoArchivedAccounts,
  StatementLogs,
} from "./pages/trading-accounts";

// Leverage Module
import { AllLeverage, PendingLeverage } from "./pages/leverage";

// Manage IB Module
import { PendingIB, ApprovedIB, RejectedIB, AllIBLogs, IBForm, IBResources } from "./pages/manage-ib";

// Custom Accounts Module
import { PendingRequests, ApprovedRequests, RejectedRequests, ManageForms } from "./pages/custom-accounts";

// Reports Module
import { Transactions, PaymentOverview, ReferralNetworkStats, IBLeaderboard } from "./pages/reports";

// Subscribers Module
import { AllSubscribers, SendEmailToSubscribers } from "./pages/subscribers";

// Tickets Module
import { AllTickets, TicketDetail } from "./pages/tickets";

// Partnership Module
import { ManageLevels, MultiIBLevels, Symbols, SymbolGroups, RebateRules } from "./pages/partnership";

// Activity Logs Module
import { AllActivities, UserActivities, StaffActivities } from "./pages/activity-logs";

// Notifications
import AllNotifications from "./pages/notifications/AllNotifications";

// Profile Module
import { Profile, ChangePassword } from "./pages/profile";

// Auth Module
import { Login } from "./pages/auth";

// Layout
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { UserDashboardLayout } from "./components/layout/UserDashboardLayout";
import { AccountDetails } from "./pages/wallets";
import MyAccountIndex from "./pages/myaccount/myaccountindex";
import NewAccount from "./pages/newaccount/NewAccount";
import DemoAccount from "./pages/newaccount/DemoAccount";
import RealAccount from "./pages/newaccount/RealAccount";
import SetUpWires from "./pages/setupwires/SetUpWires";
import UserDeposit from "./pages/userdeposit/UserDeposit";
import UserTransfer from "./pages/usertransfer/UserTransfer";
import UserWithdraw from "./pages/userwithdraw/UserWithdraw";
import UserSettingProfile from "./pages/userwithdraw/UserSettingProfile";
import UserKYC from "./pages/userwithdraw/UserKYC";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Login */}
              <Route path="/login" element={<Login />} />

              {/* Dashboard */}
              <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
              <Route path="/active-positions" element={<ProtectedRoute><ActivePositions /></ProtectedRoute>} />
              <Route path="/dashboard/active-positions" element={<ProtectedRoute><DashboardActivePositions /></ProtectedRoute>} />

              {/* Customers Module Routes */}
              <Route path="/customers/all" element={<AllCustomers />} />
              <Route path="/customers/active" element={<ActiveCustomers />} />
              <Route path="/customers/disabled" element={<DisabledCustomers />} />
              <Route path="/customers/with-balance" element={<AllCustomers />} />
              <Route path="/customers/without-balance" element={<AllCustomers />} />
              <Route path="/customers/grace-period" element={<GracePeriodCustomers />} />
              <Route path="/customers/send-email" element={<SendEmailCustomers />} />
              <Route path="/customers/send-email-all" element={<SendEmailToAll />} />
              <Route path="/customers/add" element={<AddCustomer />} />
              <Route path="/customers/:customerId/edit/*" element={<CustomerDetail />} />
              <Route path="/customers/:customerId/payment-stats" element={<CustomerPaymentStats />} />
              <Route path="/customers/:customerId/network-stats" element={<CustomerNetworkStats />} />

              {/* Company Forms Module */}
              <Route path="/company-forms/pending" element={<CompanyForms />} />
              <Route path="/company-forms/approved" element={<CompanyForms />} />
              <Route path="/company-forms/rejected" element={<CompanyForms />} />

              {/* Branches Forms Module */}
              <Route path="/branches-forms/pending" element={<BranchesForms />} />
              <Route path="/branches-forms/approved" element={<BranchesForms />} />
              <Route path="/branches-forms/rejected" element={<BranchesForms />} />

              {/* Leads */}
              <Route path="/leads/contact" element={<LeadContact />} />
              <Route path="/leads/contacts" element={<LeadContact />} />
              <Route path="/leads/add" element={<AddLead />} />
              <Route path="/leads/deals" element={<Deals />} />
              <Route path="/leads/deals/add" element={<AddDeal />} />

              {/* Deposits */}
              <Route path="/deposits/add" element={<AddDeposit />} />
              <Route path="/deposits/pending" element={<PendingDeposits />} />
              <Route path="/deposits/history" element={<DepositHistory />} />
              <Route path="/deposits/vouchers" element={<DepositVouchers />} />

              {/* Withdraw */}
              <Route path="/withdraw/add" element={<AddWithdraw />} />
              <Route path="/withdraw/pending" element={<PendingWithdraws />} />
              <Route path="/withdraw/history" element={<WithdrawHistory />} />

              {/* Withdraw Accounts */}
              <Route path="/withdraw-accounts/pending" element={<WithdrawAccountsPending />} />
              <Route path="/withdraw-accounts/approved" element={<WithdrawAccountsApproved />} />
              <Route path="/withdraw-accounts/rejected" element={<WithdrawAccountsRejected />} />

              {/* Compliance & KYC */}
              <Route path="/compliance/pending" element={<PendingKYC />} />
              <Route path="/compliance/rejected" element={<RejectedKYC />} />
              <Route path="/compliance/logs" element={<AllKYCLogs />} />

              {/* Manage Staffs */}
              <Route path="/manage-staffs" element={<ManageStaffs />} />

              {/* Account Type */}
              <Route path="/account-type/*" element={<AccountType />} />

              {/* Trading Accounts - Live */}
              <Route path="/trading-accounts/live/pending" element={<LivePendingAccounts />} />
              <Route path="/trading-accounts/live/approved" element={<LiveApprovedAccounts />} />
              <Route path="/trading-accounts/live/rejected" element={<LiveRejectedAccounts />} />
              <Route path="/trading-accounts/live/archived" element={<LiveArchivedAccounts />} />

              {/* Trading Accounts - Demo */}
              <Route path="/trading-accounts/demo/pending" element={<DemoPendingAccounts />} />
              <Route path="/trading-accounts/demo/approved" element={<DemoApprovedAccounts />} />
              <Route path="/trading-accounts/demo/rejected" element={<DemoRejectedAccounts />} />
              <Route path="/trading-accounts/demo/archived" element={<DemoArchivedAccounts />} />

              {/* Trading Accounts - Statement Logs */}
              <Route path="/trading-accounts/statements" element={<StatementLogs />} />

              {/* Leverage */}
              <Route path="/leverage/all" element={<AllLeverage />} />
              <Route path="/leverage/pending" element={<PendingLeverage />} />

              {/* Manage IB */}
              <Route path="/manage-ib/pending" element={<PendingIB />} />
              <Route path="/manage-ib/approved" element={<ApprovedIB />} />
              <Route path="/manage-ib/rejected" element={<RejectedIB />} />
              <Route path="/manage-ib/logs" element={<AllIBLogs />} />
              <Route path="/manage-ib/form" element={<IBForm />} />
              <Route path="/manage-ib/resources" element={<IBResources />} />

              {/* Custom Accounts */}
              <Route path="/custom-accounts/pending" element={<PendingRequests />} />
              <Route path="/custom-accounts/approved" element={<ApprovedRequests />} />
              <Route path="/custom-accounts/rejected" element={<RejectedRequests />} />
              <Route path="/custom-accounts/manage-forms" element={<ManageForms />} />

              {/* Reports */}
              <Route path="/reports/transactions" element={<Transactions />} />
              <Route path="/reports/payment-overview" element={<PaymentOverview />} />
              <Route path="/reports/referral-network" element={<ReferralNetworkStats />} />
              <Route path="/reports/ib-leaderboard" element={<IBLeaderboard />} />

              {/* Subscribers */}
              <Route path="/subscribers" element={<AllSubscribers />} />
              <Route path="/subscribers/send-email" element={<SendEmailToSubscribers />} />

              {/* Tickets */}
              <Route path="/tickets" element={<AllTickets />} />
              <Route path="/tickets/:ticketId" element={<TicketDetail />} />

              {/* Partnership */}
              <Route path="/partnership/manage-levels" element={<ManageLevels />} />
              <Route path="/partnership/multi-ib-levels" element={<MultiIBLevels />} />
              <Route path="/partnership/symbols" element={<Symbols />} />
              <Route path="/partnership/symbol-groups" element={<SymbolGroups />} />
              <Route path="/partnership/rebate-rules" element={<RebateRules />} />

              {/* Activity Logs */}
              <Route path="/activity-logs/all" element={<AllActivities />} />
              <Route path="/activity-logs/users" element={<UserActivities />} />
              <Route path="/activity-logs/staff" element={<StaffActivities />} />

              {/* Notifications */}
              <Route path="/notifications" element={<AllNotifications />} />

              {/* Profile */}
              <Route path="/profile" element={<DashboardLayout><Profile /></DashboardLayout>} />
              <Route path="/profile/change-password" element={<DashboardLayout><ChangePassword /></DashboardLayout>} />

              {/* {customeruserdashboard} */}
              <Route path="/user/userdashboard" element={<UserIndex />} />
              
              <Route path="/user/wallets" element={<Wallets />} />
              <Route path="/user/accounts" element={<MyAccountIndex />} />
              <Route path="/user/new-account" element={<NewAccount />} />
              <Route path="/user/new-account/real" element={<RealAccount />} />
              <Route path="/user/new-account/demo" element={<DemoAccount />} />
              <Route path="/user/setup-wires" element={<SetUpWires />} />
              <Route path="/user/deposit" element={<UserDeposit />} />
              <Route path="/user/transfer" element={<UserTransfer />} />
              <Route path="/user/withdraw" element={<UserWithdraw />} />
              <Route path="/usersettingprofile" element={<UserSettingProfile />} />
              <Route path="/user/request-master-ib" element={<RequestMasterIB />} />
              <Route path="/user/tickets" element={<UserTickets />} />
              <Route path="/user/history" element={<UserHistory />} />
              <Route path="/user/userkyc" element={<UserSettingProfile><UserKYC /></UserSettingProfile>} />

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;