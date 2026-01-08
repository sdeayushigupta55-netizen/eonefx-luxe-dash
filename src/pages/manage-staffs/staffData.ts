export interface StaffMember {
  id: string;
  firstName: string;
  lastName: string;
  nickName: string;
  email: string;
  role: "Super-Admin" | "Manager" | "Staff" | "Support";
  employeeId: string;
  key: string;
  dateOfBirth: string;
  gender: "Male" | "Female" | "Other";
  maritalStatus: "Single" | "Married";
  workPhone: string;
  personalPhone: string;
  status: boolean;
  avatar?: string;
}

export const mockStaffMembers: StaffMember[] = [
  {
    id: "1",
    firstName: "Super",
    lastName: "Admin",
    nickName: "Super Admin",
    email: "admin@brokeret.com",
    role: "Super-Admin",
    employeeId: "EMP001",
    key: "12345678",
    dateOfBirth: "1990-01-15",
    gender: "Male",
    maritalStatus: "Single",
    workPhone: "+1234567890",
    personalPhone: "+0987654321",
    status: true,
  },
  {
    id: "2",
    firstName: "Sufyan",
    lastName: "Hashmi",
    nickName: "Sufyan",
    email: "sufyanhashmi931@gmail.com",
    role: "Super-Admin",
    employeeId: "EMP002",
    key: "87654321",
    dateOfBirth: "1988-05-20",
    gender: "Male",
    maritalStatus: "Married",
    workPhone: "+1234567891",
    personalPhone: "+0987654322",
    status: true,
  },
  {
    id: "3",
    firstName: "Irfan",
    lastName: "Rehman",
    nickName: "Irfan",
    email: "irfan55dixeam@gmail.com",
    role: "Super-Admin",
    employeeId: "EMP003",
    key: "11223344",
    dateOfBirth: "1992-08-10",
    gender: "Male",
    maritalStatus: "Single",
    workPhone: "+1234567892",
    personalPhone: "+0987654323",
    status: true,
  },
  {
    id: "4",
    firstName: "Racheal",
    lastName: "J",
    nickName: "Racheal",
    email: "richirj43743@gmail.com",
    role: "Super-Admin",
    employeeId: "EMP004",
    key: "55667788",
    dateOfBirth: "1995-03-25",
    gender: "Female",
    maritalStatus: "Single",
    workPhone: "+1234567893",
    personalPhone: "+0987654324",
    status: true,
  },
  {
    id: "5",
    firstName: "Test",
    lastName: "Mod 2",
    nickName: "Test Mod",
    email: "user@brokeret.com",
    role: "Manager",
    employeeId: "EMP005",
    key: "99887766",
    dateOfBirth: "1991-11-12",
    gender: "Male",
    maritalStatus: "Married",
    workPhone: "+1234567894",
    personalPhone: "+0987654325",
    status: true,
  },
  {
    id: "6",
    firstName: "Test",
    lastName: "Mod3",
    nickName: "Test Mod3",
    email: "rachealjameel@gmail.com",
    role: "Super-Admin",
    employeeId: "EMP006",
    key: "44332211",
    dateOfBirth: "1993-07-18",
    gender: "Male",
    maritalStatus: "Single",
    workPhone: "+1234567895",
    personalPhone: "+0987654326",
    status: true,
  },
];

export const roleOptions = ["Super-Admin", "Manager", "Staff", "Support"] as const;
export const genderOptions = ["Male", "Female", "Other"] as const;
