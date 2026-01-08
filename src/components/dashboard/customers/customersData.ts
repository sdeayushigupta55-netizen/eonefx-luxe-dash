import { Customer } from "./CustomersTable";

export const mockCustomers: Record<string, Customer[]> = {
  all: [
    { id: 1, name: "Aieman Basit", email: "aimanbasit0416@gmail.com", balance: 0, equity: 0, credit: 0, country: "Pakistan", branch: "N/A", staff: "N/A", kyc: "Unverified", joined: "Nov 13, 2025 01:37", status: "Active" },
    { id: 2, name: "Bilawal Iqbal", email: "bilawal@beyondtechservices.com", balance: 0, equity: 0, credit: 0, country: "Pakistan", branch: "N/A", staff: "N/A", kyc: "Unverified", joined: "Nov 13, 2025 12:21", status: "Active" },
    { id: 3, name: "Test New", email: "richirj43743@gmail.com", balance: 10, equity: 10, credit: 0, country: "Pakistan", branch: "N/A", staff: "N/A", kyc: "Verified", joined: "Nov 12, 2025 03:00", status: "Active" },
    { id: 4, name: "Sufyan Test", email: "sufyanhashmi301+3@gmail.com", balance: 0, equity: 0, credit: 0, country: "Pakistan", branch: "N/A", staff: "Racheal J", kyc: "Unverified", joined: "Nov 11, 2025 06:45", status: "Active" },
    { id: 5, name: "Richi Rj", email: "hiphaven6@gmail.com", balance: 0, equity: 0, credit: 0, country: "Pakistan", branch: "Test", staff: "N/A", kyc: "Unverified", joined: "Nov 06, 2025 08:37", status: "Active" },
    { id: 6, name: "Testt Testt", email: "abcde@gmail.com", balance: 0, equity: 0, credit: 0, country: "Pakistan", branch: "N/A", staff: "Racheal J", kyc: "Unverified", joined: "Oct 15, 2025 09:02", status: "Active" },
    { id: 7, name: "Test Account", email: "kumarfx47@gmail.com", balance: 0, equity: 0, credit: 0, country: "India", branch: "N/A", staff: "N/A", kyc: "Unverified", joined: "Oct 08, 2025 07:56", status: "Active" },
    { id: 8, name: "Naeem Ali", email: "naeemali2020@gmail.com", balance: 0, equity: 0, credit: 0, country: "Pakistan", branch: "N/A", staff: "N/A", kyc: "Verified", joined: "Oct 01, 2025 09:39", status: "Active" },
  ],
  active: [
    { id: 1, name: "Aieman Basit", email: "aimanbasit0416@gmail.com", balance: 0, equity: 0, credit: 0, country: "Pakistan", branch: "N/A", staff: "N/A", kyc: "Unverified", joined: "Nov 13, 2025 01:37", status: "Active" },
    { id: 2, name: "Bilawal Iqbal", email: "bilawal@beyondtechservices.com", balance: 0, equity: 0, credit: 0, country: "Pakistan", branch: "N/A", staff: "N/A", kyc: "Unverified", joined: "Nov 13, 2025 12:21", status: "Active" },
    { id: 3, name: "Test New", email: "richirj43743@gmail.com", balance: 10, equity: 10, credit: 0, country: "Pakistan", branch: "N/A", staff: "N/A", kyc: "Verified", joined: "Nov 12, 2025 03:00", status: "Active" },
    { id: 4, name: "Sufyan Test", email: "sufyanhashmi301+3@gmail.com", balance: 0, equity: 0, credit: 0, country: "Pakistan", branch: "N/A", staff: "Racheal J", kyc: "Unverified", joined: "Nov 11, 2025 06:45", status: "Active" },
    { id: 5, name: "Richi Rj", email: "hiphaven6@gmail.com", balance: 0, equity: 0, credit: 0, country: "Pakistan", branch: "Test", staff: "N/A", kyc: "Unverified", joined: "Nov 06, 2025 08:37", status: "Active" },
    { id: 6, name: "Testt Testt", email: "abcde@gmail.com", balance: 0, equity: 0, credit: 0, country: "Pakistan", branch: "N/A", staff: "Racheal J", kyc: "Unverified", joined: "Oct 15, 2025 09:02", status: "Active" },
    { id: 7, name: "Test Account", email: "kumarfx47@gmail.com", balance: 0, equity: 0, credit: 0, country: "India", branch: "N/A", staff: "N/A", kyc: "Unverified", joined: "Oct 08, 2025 07:56", status: "Active" },
  ],
  disabled: [],
  "with-balance": [
    { id: 1, name: "Test New", email: "richirj43743@gmail.com", balance: 10, equity: 10, credit: 0, country: "Pakistan", branch: "N/A", staff: "N/A", kyc: "Verified", joined: "Nov 12, 2025 03:00", status: "Active" },
    { id: 2, name: "Test Account", email: "kumarfx47@gmail.com", balance: 0, equity: 0, credit: 0, country: "India", branch: "N/A", staff: "N/A", kyc: "Unverified", joined: "Oct 08, 2025 07:56", status: "Active" },
    { id: 3, name: "Sufyan Aslam", email: "sufyanhashmi931@gmail.com", balance: 93763.11, equity: 95054.28, credit: 1400, country: "Wallis And Futuna", branch: "N/A", staff: "Test Mod3", kyc: "Verified", joined: "May 14, 2025 02:56", status: "Active" },
    { id: 4, name: "User Brokeret", email: "user@brokeret.com", balance: 40, equity: 40, credit: 0, country: "Algeria", branch: "UAE Branch", staff: "Sufyan Hashmi, Test Mod3, Test Mod 2", kyc: "Verified", joined: "May 14, 2025 12:20", status: "Active" },
  ],
  "without-balance": [
    { id: 1, name: "Naeem Ali", email: "naeemali2020@gmail.com", balance: 0, equity: 0, credit: 0, country: "Pakistan", branch: "N/A", staff: "N/A", kyc: "Verified", joined: "Oct 01, 2025 09:39", status: "Active" },
    { id: 2, name: "Racheal R", email: "rachealjameel@gmail.com", balance: 0, equity: 0, credit: 0, country: "Pakistan", branch: "UAE Branch", staff: "Racheal J", kyc: "Verified", joined: "Sep 23, 2025 11:10", status: "Active" },
    { id: 3, name: "User Brokeret", email: "user@brokeret.com", balance: 40, equity: 40, credit: 0, country: "Algeria", branch: "UAE Branch", staff: "Sufyan Hashmi, Test Mod3, Test Mod 2", kyc: "Verified", joined: "May 14, 2025 12:20", status: "Active" },
  ],
  "grace-period": [
    { id: 1, name: "Racheal Jameel", email: "richirrrfccej43743@gmail.com", balance: 0, equity: 0, credit: 0, country: "Pakistan", branch: "N/A", staff: "N/A", kyc: "Unverified", joined: "Nov 25, 2025 11:43", status: "Active" },
  ],
};
