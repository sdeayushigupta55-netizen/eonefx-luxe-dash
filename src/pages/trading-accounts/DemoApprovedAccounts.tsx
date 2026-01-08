import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Filter, Download, Calendar, Settings2, Eye, Trash2, Edit, MoreVertical, CreditCard, CheckCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface TradingAccount {
  id: string;
  accountNumber: string;
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  accountType: string;
  group: string;
  leverage: number;
  balance: string;
  agentIBNumber: string;
  status: string;
  createdAt: string;
}

const approvedAccounts: TradingAccount[] = [
  {
    id: '1',
    accountNumber: '878828',
    user: { name: 'Naeem Ali', email: 'naeemail2020@gmail.com' },
    accountType: 'Standard',
    group: 'Real|Test1',
    leverage: 100,
    balance: '0.00 USD',
    agentIBNumber: 'NA',
    status: 'Active',
    createdAt: 'Dec 08, 2025 05:09',
  },
  {
    id: '2',
    accountNumber: '878769',
    user: { name: 'Test Account', email: 'kumarfx47@gmail.com' },
    accountType: 'Standard',
    group: 'Real|Test1',
    leverage: 100,
    balance: '100.00 USD',
    agentIBNumber: 'NA',
    status: 'Active',
    createdAt: 'Nov 18, 2025 21:00',
  },
];

const statCards = [
  { label: 'Total Accounts', value: '1', icon: CreditCard },
  { label: 'With Balance', value: '0', icon: CreditCard },
  { label: 'With Bonus', value: '0', icon: CreditCard },
  { label: 'Without Balance', value: '0', icon: CreditCard },
  { label: 'Without Bonus', value: '0', icon: CreditCard },
  { label: 'Inactive Accounts', value: '0', icon: CheckCircle },
];

const DemoApprovedAccounts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Title */}
        <h1 className="text-2xl font-semibold text-foreground">All Approved Demo Accounts</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {statCards.map((stat, index) => (
            <div
              key={index}
              className={`rounded-xl p-4 text-center border ${
                index === 0 ? 'bg-primary/5 border-primary/20' : 'bg-card border-border'
              }`}
            >
              <stat.icon className={`h-6 w-6 mx-auto mb-2 ${index === 0 ? 'text-primary' : 'text-muted-foreground'}`} />
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <Input
            placeholder="Search by Name, Email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-[280px] bg-background border-border"
          />
          <Input
            placeholder="Account Number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="max-w-[200px] bg-background border-border"
          />
          <div className="relative max-w-[180px]">
            <Input
              type="text"
              placeholder="dd-mm-yyyy"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="bg-background border-border pr-10"
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="ghost" size="icon">
            <Settings2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Table */}
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="font-semibold text-foreground">ACCOUNT NUMBER</TableHead>
                <TableHead className="font-semibold text-foreground">USER</TableHead>
                <TableHead className="font-semibold text-foreground">ACCOUNT TYPE</TableHead>
                <TableHead className="font-semibold text-foreground">GROUP</TableHead>
                <TableHead className="font-semibold text-foreground">LEVERAGE</TableHead>
                <TableHead className="font-semibold text-foreground">BALANCE</TableHead>
                <TableHead className="font-semibold text-foreground">AGENT/IB NUMBER</TableHead>
                <TableHead className="font-semibold text-foreground">STATUS</TableHead>
                <TableHead className="font-semibold text-foreground">CREATED AT</TableHead>
                <TableHead className="font-semibold text-foreground">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {approvedAccounts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-12 text-muted-foreground">
                    No Data Available In Table
                  </TableCell>
                </TableRow>
              ) : (
                approvedAccounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell className="text-foreground font-medium">{account.accountNumber}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={account.user.avatar} />
                          <AvatarFallback className="bg-yellow-500 text-white text-xs">
                            {account.user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{account.user.name}</p>
                          <p className="text-sm text-muted-foreground">{account.user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-foreground">{account.accountType}</TableCell>
                    <TableCell className="text-foreground">{account.group}</TableCell>
                    <TableCell className="text-foreground">{account.leverage}</TableCell>
                    <TableCell className="text-foreground">{account.balance}</TableCell>
                    <TableCell className="text-foreground">{account.agentIBNumber}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500">
                        Active
                      </span>
                    </TableCell>
                    <TableCell className="text-foreground">{account.createdAt}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DemoApprovedAccounts;
