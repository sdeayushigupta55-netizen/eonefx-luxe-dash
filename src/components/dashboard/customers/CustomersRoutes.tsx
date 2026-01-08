import { Route } from "react-router-dom";
import AllCustomers from "./AllCustomers";
import ActiveCustomers from "./ActiveCustomers";
import DisabledCustomers from "./DisabledCustomers";
import GracePeriodCustomers from "./GracePeriodCustomers";
import SendEmailCustomers from "./SendEmailCustomers";

// Export route elements for use in App.tsx
export const customersRoutes = [
  { path: "/customers/all", element: <AllCustomers /> },
  { path: "/customers/active", element: <ActiveCustomers /> },
  { path: "/customers/disabled", element: <DisabledCustomers /> },
  { path: "/customers/with-balance", element: <AllCustomers /> },
  { path: "/customers/without-balance", element: <AllCustomers /> },
  { path: "/customers/grace-period", element: <GracePeriodCustomers /> },
  { path: "/customers/send-email", element: <SendEmailCustomers /> },
];

// Export components for direct import
export {
  AllCustomers,
  ActiveCustomers,
  DisabledCustomers,
  GracePeriodCustomers,
  SendEmailCustomers,
};
