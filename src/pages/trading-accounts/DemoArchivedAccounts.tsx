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
import { Filter, Download, Calendar, Settings2, CreditCard, CheckCircle } from 'lucide-react';

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

const archivedAccounts: TradingAccount[] = [];

const statCards = [
  { label: 'Total Accounts', value: '0', icon: CreditCard },
  { label: 'With Balance', value: '0', icon: CreditCard },
  { label: 'With Bonus', value: '0', icon: CreditCard },
  { label: 'Without Balance', value: '0', icon: CreditCard },
  { label: 'Without Bonus', value: '0', icon: CreditCard },
  { label: 'Inactive Accounts', value: '0', icon: CheckCircle },
];

const DemoArchivedAccounts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Title */}
        <h1 className="text-2xl font-semibold text-foreground">All Archived Demo Accounts</h1>

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
              {archivedAccounts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-12 text-muted-foreground">
                    No Data Available In Table
                  </TableCell>
                </TableRow>
              ) : (
                archivedAccounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell className="text-foreground font-medium">{account.accountNumber}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                          {account.user.name.charAt(0)}
                        </div>
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
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-500/10 text-gray-500">
                        Archived
                      </span>
                    </TableCell>
                    <TableCell className="text-foreground">{account.createdAt}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Settings2 className="h-4 w-4" />
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

export default DemoArchivedAccounts;
