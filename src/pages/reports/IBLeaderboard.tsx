import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ReportsTabs } from "./ReportsTabs";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Filter, X, ChevronLeft, ChevronRight } from "lucide-react";
import { mockIBLeaderboard, selectedUserPayments, IBMemberRanking } from "./reportsData";

export function IBLeaderboard() {
  const [selectedUser, setSelectedUser] = useState<IBMemberRanking | null>(mockIBLeaderboard[0]);

  const topThree = mockIBLeaderboard.slice(0, 3);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold ">IB Leaderboard</h1>
        
        <ReportsTabs />
        
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 justify-end">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px] bg-background border-border">
              <SelectValue placeholder="All IB Groups" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All IB Groups</SelectItem>
              <SelectItem value="vip">VIP</SelectItem>
              <SelectItem value="gold">Gold</SelectItem>
              <SelectItem value="silver">Silver</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px] bg-background border-border">
              <SelectValue placeholder="-- Select Range --" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2">
            <Input type="date" className="w-[150px] bg-background border-border" />
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">Double click for a single date</p>
          <Button variant="outline" className="border-primary text-primary">
            <Filter className="h-4 w-4 mr-2" />
            Apply Filter
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Podium & Table */}
          <div className="lg:col-span-2 space-y-6">
            {/* Podium */}
            <Card className="bg-card border-border/50 p-6">
              <div className="flex items-end justify-center gap-4 h-[280px]">
                {/* 2nd Place */}
                {topThree[1] && (
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xl font-bold mb-2">
                      {topThree[1].userName.charAt(0)}
                    </div>
                    <p className="text-sm font-medium text-foreground text-center">{topThree[1].userName}</p>
                    <p className="text-xs text-muted-foreground text-center truncate max-w-[120px]">{topThree[1].email}</p>
                    <div className="w-28 h-32 bg-gradient-to-t from-slate-700 to-slate-600 rounded-t-lg mt-4 flex items-center justify-center">
                      <span className="text-3xl font-bold text-white">2</span>
                    </div>
                  </div>
                )}
                
                {/* 1st Place */}
                {topThree[0] && (
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-primary/30 flex items-center justify-center text-primary text-2xl font-bold mb-2 ring-4 ring-primary/50">
                      {topThree[0].userName.charAt(0)}
                    </div>
                    <p className="text-sm font-medium text-foreground text-center">{topThree[0].userName}</p>
                    <p className="text-xs text-muted-foreground text-center truncate max-w-[120px]">{topThree[0].email}</p>
                    <div className="w-32 h-44 bg-gradient-to-t from-slate-700 to-slate-600 rounded-t-lg mt-4 flex items-center justify-center">
                      <span className="text-4xl font-bold text-white">1</span>
                    </div>
                  </div>
                )}
                
                {/* 3rd Place */}
                {topThree[2] && (
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xl font-bold mb-2">
                      {topThree[2].userName.charAt(0)}
                    </div>
                    <p className="text-sm font-medium text-foreground text-center">{topThree[2].userName}</p>
                    <p className="text-xs text-muted-foreground text-center truncate max-w-[120px]">{topThree[2].email}</p>
                    <div className="w-28 h-24 bg-gradient-to-t from-slate-700 to-slate-600 rounded-t-lg mt-4 flex items-center justify-center">
                      <span className="text-3xl font-bold text-white">3</span>
                    </div>
                  </div>
                )}
              </div>
            </Card>
            
            {/* Leaderboard Table */}
            <Card className="bg-card border-border/50">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50 hover:bg-transparent">
                    <TableHead className="text-muted-foreground w-12">#</TableHead>
                    <TableHead className="text-muted-foreground">USER</TableHead>
                    <TableHead className="text-muted-foreground">IB GROUP</TableHead>
                    <TableHead className="text-muted-foreground">NETWORK USERS</TableHead>
                    <TableHead className="text-muted-foreground">INCOMING PAYMENTS</TableHead>
                    <TableHead className="text-muted-foreground">OUTGOING PAYMENTS</TableHead>
                    <TableHead className="text-muted-foreground"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockIBLeaderboard.map((member) => (
                    <TableRow 
                      key={member.rank} 
                      className={`border-border/50 hover:bg-accent/5 cursor-pointer ${selectedUser?.rank === member.rank ? 'bg-accent/10' : ''}`}
                      onClick={() => setSelectedUser(member)}
                    >
                      <TableCell className="text-muted-foreground">{member.rank}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-medium">
                            {member.userName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{member.userName}</p>
                            <p className="text-xs text-muted-foreground">{member.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{member.ibGroup}</TableCell>
                      <TableCell className="text-muted-foreground">{member.networkUsers}</TableCell>
                      <TableCell className="text-green-400">{member.incomingPayments}</TableCell>
                      <TableCell className="text-red-400">{member.outgoingPayments}</TableCell>
                      <TableCell>
                        <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700 text-white text-xs">
                          Network Stats
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {/* Pagination */}
              <div className="flex items-center justify-between p-4 border-t border-border/50">
                <p className="text-sm text-muted-foreground">Showing 1 to 7 of 7 entries</p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="h-8 w-8 border-border">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button size="sm" className="h-8 w-8 bg-primary text-primary-foreground">1</Button>
                  <Button variant="outline" size="icon" className="h-8 w-8 border-border">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Right Panel - Selected User Details */}
          <div className="space-y-6">
            {selectedUser && (
              <Card className="bg-card border-border/50 p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xl font-bold">
                    {selectedUser.userName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{selectedUser.userName}</p>
                    <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                  </div>
                </div>
                
                {/* Incoming Payments */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Incoming Payments</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Deposit</p>
                      <p className="font-medium text-foreground">{selectedUserPayments.incoming.deposit}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Manual Deposit</p>
                      <p className="font-medium text-foreground">{selectedUserPayments.incoming.manualDeposit}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Voucher Deposit</p>
                      <p className="font-medium text-foreground">{selectedUserPayments.incoming.voucherDeposit}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">IB Bonus</p>
                      <p className="font-medium text-foreground">{selectedUserPayments.incoming.ibBonus}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Demo Deposit</p>
                      <p className="font-medium text-foreground">{selectedUserPayments.incoming.demoDeposit}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">External Receive</p>
                      <p className="font-medium text-foreground">{selectedUserPayments.incoming.externalReceiveMoney}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Internal Receive</p>
                      <p className="font-medium text-foreground">{selectedUserPayments.incoming.internalReceiveMoney}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Referral</p>
                      <p className="font-medium text-foreground">{selectedUserPayments.incoming.referral}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Signup Bonus</p>
                      <p className="font-medium text-foreground">{selectedUserPayments.incoming.signupBonus}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Bonus</p>
                      <p className="font-medium text-foreground">{selectedUserPayments.incoming.bonus}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Bonus Refund</p>
                      <p className="font-medium text-foreground">{selectedUserPayments.incoming.bonusRefund}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Refund</p>
                      <p className="font-medium text-foreground">{selectedUserPayments.incoming.refund}</p>
                    </div>
                  </div>
                </div>
                
                {/* Outgoing Payments */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Outgoing Payments</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Withdraw</p>
                      <p className="font-medium text-foreground">{selectedUserPayments.outgoing.withdraw}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Withdraw Auto</p>
                      <p className="font-medium text-foreground">{selectedUserPayments.outgoing.withdrawAuto}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Subtract</p>
                      <p className="font-medium text-foreground">{selectedUserPayments.outgoing.subtract}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">External Send</p>
                      <p className="font-medium text-foreground">{selectedUserPayments.outgoing.externalSendMoney}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Internal Send</p>
                      <p className="font-medium text-foreground">{selectedUserPayments.outgoing.internalSendMoney}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Bonus Subtract</p>
                      <p className="font-medium text-foreground">{selectedUserPayments.outgoing.bonusSubtract}</p>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
