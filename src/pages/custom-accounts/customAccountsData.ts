export interface CustomAccountRequest {
  id: string;
  userName: string;
  email: string;
  avatar?: string;
  requestDetails: string;
  fieldsSubmitted: number;
  bankName?: string;
  accountNumber?: string;
  submittedAt: string;
  approvedAt?: string;
  rejectedAt?: string;
  approvedBy?: string;
  approvedByRole?: string;
  status: "Pending" | "Approved" | "Rejected";
}

export interface CustomAccountForm {
  id: string;
  formName: string;
  status: "Active" | "Inactive";
  createdAt: string;
}

export const mockPendingRequests: CustomAccountRequest[] = [
  {
    id: "1",
    userName: "User Brokeret",
    email: "user@brokeret.com",
    requestDetails: "Payment Request",
    fieldsSubmitted: 4,
    submittedAt: "Aug 23, 2025 04:10 PM",
    status: "Pending"
  },
  {
    id: "2",
    userName: "John Smith",
    email: "john.smith@example.com",
    requestDetails: "Bank Transfer Request",
    fieldsSubmitted: 6,
    submittedAt: "Aug 22, 2025 02:30 PM",
    status: "Pending"
  }
];

export const mockApprovedRequests: CustomAccountRequest[] = [
  {
    id: "1",
    userName: "Sufyan-2 Sufyan-2",
    email: "sufyan2@gmail.com",
    bankName: "Emirates NBD",
    accountNumber: "12123223423",
    approvedAt: "Aug 22, 2025 11:40 AM",
    approvedBy: "Super Admin",
    approvedByRole: "Admin",
    requestDetails: "Bank Account",
    fieldsSubmitted: 5,
    submittedAt: "Aug 20, 2025",
    status: "Approved"
  },
  {
    id: "2",
    userName: "Sufyan Aslam",
    email: "sufyanhashmi931@gmail.com",
    bankName: "Emirates NBD",
    accountNumber: "NBD12123223423",
    approvedAt: "Aug 22, 2025 10:49 AM",
    approvedBy: "Super Admin",
    approvedByRole: "Admin",
    requestDetails: "Bank Account",
    fieldsSubmitted: 5,
    submittedAt: "Aug 19, 2025",
    status: "Approved"
  }
];

export const mockRejectedRequests: CustomAccountRequest[] = [
  {
    id: "1",
    userName: "Test User",
    email: "test@example.com",
    requestDetails: "Invalid Request",
    fieldsSubmitted: 2,
    submittedAt: "Aug 18, 2025",
    rejectedAt: "Aug 19, 2025 10:00 AM",
    status: "Rejected"
  }
];

export const mockCustomForms: CustomAccountForm[] = [
  {
    id: "1",
    formName: "Form-1",
    status: "Active",
    createdAt: "Aug 22, 2025 10:44 AM"
  },
  {
    id: "2",
    formName: "Payment Form",
    status: "Active",
    createdAt: "Aug 20, 2025 09:30 AM"
  },
  {
    id: "3",
    formName: "Bank Details Form",
    status: "Inactive",
    createdAt: "Aug 15, 2025 02:15 PM"
  }
];
