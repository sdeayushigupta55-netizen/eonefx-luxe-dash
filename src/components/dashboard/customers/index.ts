// Customers Module - Centralized exports
export { default as AllCustomers } from "./AllCustomers";
export { default as ActiveCustomers } from "./ActiveCustomers";
export { default as DisabledCustomers } from "./DisabledCustomers";
export { default as GracePeriodCustomers } from "./GracePeriodCustomers";
export { default as SendEmailCustomers } from "./SendEmailCustomers";

// Route configuration
export { customersRoutes } from "./CustomersRoutes";

// Shared components
export { CustomersTable } from "./CustomersTable";
export { CustomersTabs, customerTabs, getTabTitle } from "./CustomersTabs";

// Data
export { mockCustomers } from "./customersData";

// Types
export type { Customer } from "./CustomersTable";
