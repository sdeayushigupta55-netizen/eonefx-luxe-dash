export interface IBMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  ibGroup: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Unprocessed';
}

export interface IBForm {
  id: string;
  verificationName: string;
  status: 'Active' | 'Inactive';
}

export interface IBResource {
  id: string;
  icon: string;
  language: string;
  type: string;
  status: 'Active' | 'Inactive';
}

export const mockPendingIBMembers: IBMember[] = [
  { id: '1', name: 'Test Account', email: 'kumarfx47@gmail.com', ibGroup: 'N/A', status: 'Pending' },
  { id: '2', name: 'Bilawal Iqbal', email: 'bilawal@beyondtechservices.com', ibGroup: 'N/A', status: 'Pending' },
  { id: '3', name: 'Aieman Basit', email: 'aimanbasit0416@gmail.com', ibGroup: 'N/A', status: 'Pending' },
];

export const mockApprovedIBMembers: IBMember[] = [
  { id: '1', name: 'Test New', email: 'richirj43743@gmail.com', ibGroup: 'Silver', status: 'Approved' },
  { id: '2', name: 'Sufyan-4 Sufyan-4', email: 'sufyan-4@gmail.com', ibGroup: 'test-ib-group-1', status: 'Approved' },
  { id: '3', name: 'Sufyan-2 Sufyan-2', email: 'sufyan2@gmail.com', ibGroup: 'Gold', status: 'Approved' },
  { id: '4', name: 'Sufyan Aslam', email: 'sufyanhashmi931@gmail.com', ibGroup: 'VIP', status: 'Approved' },
  { id: '5', name: 'Sufyan Aslam', email: 'sufyanhashmi3021@gmail.com', ibGroup: 'Silver', status: 'Approved' },
  { id: '6', name: 'Racheal R', email: 'rachealjameel@gmail.com', ibGroup: 'test-ib-group-1', status: 'Approved' },
  { id: '7', name: 'Mikhail Prescott', email: 'prescottmikhail@gmail.com', ibGroup: 'test-ib-group-1', status: 'Approved' },
];

export const mockRejectedIBMembers: IBMember[] = [
  { id: '1', name: 'Sangarreko5058', email: 'sangarreko5058@gmail.com', ibGroup: 'N/A', status: 'Rejected' },
];

export const mockAllIBMembers: IBMember[] = [
  { id: '1', name: 'User Brokeret', email: 'user@brokeret.com', ibGroup: 'Silver', status: 'Approved' },
  { id: '2', name: 'Testt Testt', email: 'abcde@gmail.com', ibGroup: 'N/A', status: 'Unprocessed' },
  { id: '3', name: 'Test New', email: 'richirj43743@gmail.com', ibGroup: 'Silver', status: 'Approved' },
  { id: '4', name: 'Test Account', email: 'kumarfx47@gmail.com', ibGroup: 'N/A', status: 'Pending' },
  { id: '5', name: 'Sufyan-5 Sufyan-5', email: 'sufyanhashmiw301@gmail.com', ibGroup: 'N/A', status: 'Unprocessed' },
  { id: '6', name: 'Sufyan-4 Sufyan-4', email: 'sufyan-4@gmail.com', ibGroup: 'test-ib-group-1', status: 'Approved' },
  { id: '7', name: 'Sufyan-3 Sufyan-3', email: 'sufyan3@brokeret.com', ibGroup: 'Gold', status: 'Approved' },
  { id: '8', name: 'Sufyan-2 Sufyan-2', email: 'sufyan2@gmail.com', ibGroup: 'Gold', status: 'Approved' },
  { id: '9', name: 'Sufyan Test', email: 'sufyanhashmi301+3@gmail.com', ibGroup: 'N/A', status: 'Unprocessed' },
  { id: '10', name: 'Sufyan Aslam', email: 'sufyanhashmi931@gmail.com', ibGroup: 'VIP', status: 'Approved' },
];

export const mockIBForms: IBForm[] = [
  { id: '1', verificationName: 'Into', status: 'Active' },
];

export const mockIBResources: IBResource[] = [];
