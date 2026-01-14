import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { cn } from "@/lib/utils";
import { mockCustomers } from "@/components/dashboard/customers/customersData";


export default function UserProfile() {
  const { customerId } = useParams();
  const navigate = useNavigate();

  // Find customer from mock data
  const customer = mockCustomers.all.find(c => c.id === Number(customerId)) || {
    id: 1,
    name: "Aieman Basit",
    email: "aimanbasit0416@gmail.com",
    balance: 0,
    equity: 0,
    credit: 0,
    country: "Pakistan",
    branch: "N/A",
    staff: "N/A",
    kyc: "Unverified",
    joined: "Nov 13, 2025 01:37",
    status: "Active"
  };

  const [firstName, lastName] = customer.name.split(" ");

  return (

    <div className="p-6">


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar - Profile Card */}
        <div className="lg:col-span-1">
          <Card className="bg-card border-border overflow-hidden">
            {/* Red Header */}
            <div className="h-32 bg-gradient-to-r from-red-500 to-red-600 relative">
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                <Avatar className="h-24 w-24 border-4 border-card">
                  <AvatarFallback className="bg-primary/20 text-primary text-2xl font-bold">
                    {customer.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>

            <CardContent className="pt-16 pb-6">
              {/* Name & Country */}
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-foreground">{customer.name}</h2>
                <Badge className={cn(
                  customer.kyc === "Verified" ? "bg-green-500/20 text-green-500" : "bg-orange-500/20 text-orange-400"
                )}>{customer.kyc}</Badge>
                <p className="text-sm text-muted-foreground">{customer.country}</p>
                <p className="text-xs text-muted-foreground mt-2">Member since: {customer.joined}</p>
              </div>

              {/* Status Info */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Customer Group:</span>
                  <span className="text-sm text-foreground">N/A</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Risk Profile:</span>
                  <span className="text-sm text-primary">Under Investigation</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">KYC Level:</span>
                  <span className="text-sm text-foreground">Level 1</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">IB Member:</span>
                  <span className="text-sm text-foreground">Pending</span>
                </div>



              </div>




            </CardContent>
          </Card>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-card border-border p-4 text-center">
              <p className="text-xs text-muted-foreground">Total Balance</p>
              <p className="text-xl font-bold text-foreground">0</p>
            </Card>
            <Card className="bg-card border-border p-4 text-center">
              <p className="text-xs text-muted-foreground">Current Equity</p>
              <p className="text-xl font-bold text-foreground">0</p>
            </Card>
            <Card className="bg-card border-border p-4 text-center">
              <p className="text-xs text-muted-foreground">Wallet Balance</p>
              <p className="text-xl font-bold text-foreground">0</p>
            </Card>
          </div>

          <Card className="bg-card border-border">
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm text-foreground">First Name</Label>
                  <Input defaultValue={firstName} className="bg-background border-border" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-foreground">Last Name</Label>
                  <Input defaultValue={lastName || ""} className="bg-background border-border" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-foreground">Country</Label>
                  <Select defaultValue={customer.country.toLowerCase()}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pakistan">Pakistan</SelectItem>
                      <SelectItem value="india">India</SelectItem>
                      <SelectItem value="usa">USA</SelectItem>
                      <SelectItem value="uk">UK</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm text-foreground">Phone</Label>
                  <Input placeholder="+92 Phone Number" className="bg-background border-border" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-foreground">Username</Label>
                  <Input defaultValue={firstName + lastName?.charAt(0) || ""} className="bg-background border-border" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-foreground">Email Address</Label>
                  <Input defaultValue={customer.email} className="bg-background border-border text-primary" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm text-foreground">Gender</Label>
                  <Select defaultValue="male">
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-foreground">Date Of Birth</Label>
                  <Input type="date" className="bg-background border-border" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-foreground">City</Label>
                  <Input placeholder="Enter city" className="bg-background border-border" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm text-foreground">Zip</Label>
                  <Input placeholder="Enter zip code" className="bg-background border-border" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-foreground">Address</Label>
                  <Input placeholder="Enter address" className="bg-background border-border" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-foreground">Joining Date</Label>
                  <Input defaultValue={customer.joined} className="bg-background border-border" readOnly />
                </div>
              </div>


              <div className="flex justify-end">
                <Button
                >


                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>



        </div>
      </div>


    </div>

  );
}
