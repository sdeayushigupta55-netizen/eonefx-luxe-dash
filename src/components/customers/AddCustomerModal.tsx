import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, Info } from "lucide-react";
import { toast } from "sonner";

interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddCustomerModal({ isOpen, onClose }: AddCustomerModalProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    username: "",
    phone: "",
    phoneCode: "+971",
    email: "",
    gender: "",
    dateOfBirth: "",
    city: "",
    zipCode: "",
    address: "",
    riskProfile: "",
    comment: "",
    password: "",
    emailVerified: false,
    phoneVerified: false,
    temporaryPassword: false,
    staffMember: "",
    kycLevel: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Customer added successfully!");
    onClose();
    setFormData({
      firstName: "",
      lastName: "",
      country: "",
      username: "",
      phone: "",
      phoneCode: "+971",
      email: "",
      gender: "",
      dateOfBirth: "",
      city: "",
      zipCode: "",
      address: "",
      riskProfile: "",
      comment: "",
      password: "",
      emailVerified: false,
      phoneVerified: false,
      temporaryPassword: false,
      staffMember: "",
      kycLevel: "",
    });
  };

  const countries = [
    "United States", "United Kingdom", "United Arab Emirates", "India", 
    "Germany", "France", "Canada", "Australia", "Singapore", "Japan"
  ];

  const phoneCodes = [
    { code: "+971", country: "UAE" },
    { code: "+1", country: "US" },
    { code: "+44", country: "UK" },
    { code: "+91", country: "IN" },
    { code: "+49", country: "DE" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-6xl max-h-[90vh] p-0 bg-card border-border">
        <DialogHeader className="px-6 pt-6 pb-0">
          <DialogTitle className="text-xl font-semibold text-foreground">Add New Customer</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[calc(90vh-100px)] px-6 pb-6">
          <form onSubmit={handleSubmit} className="space-y-6 pt-4">
            {/* Basic Info Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-primary">Basic Info</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* First Name */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-1 text-foreground text-sm">
                    First Name <Info className="h-3 w-3 text-muted-foreground" />
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    placeholder="e.g. John"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="bg-background border-border h-9"
                    required
                  />
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-1 text-foreground text-sm">
                    Last Name <Info className="h-3 w-3 text-muted-foreground" />
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    placeholder="e.g. Doe"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="bg-background border-border h-9"
                    required
                  />
                </div>

                {/* Country */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-1 text-foreground text-sm">
                    Country <Info className="h-3 w-3 text-muted-foreground" />
                    <span className="text-destructive">*</span>
                  </Label>
                  <Select value={formData.country} onValueChange={(v) => setFormData({ ...formData, country: v })}>
                    <SelectTrigger className="bg-background border-border h-9">
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Username */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-1 text-foreground text-sm">
                    Username <Info className="h-3 w-3 text-muted-foreground" />
                  </Label>
                  <Input
                    placeholder="e.g. johndoe"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="bg-background border-border h-9"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-1 text-foreground text-sm">
                    Phone <Info className="h-3 w-3 text-muted-foreground" />
                  </Label>
                  <div className="flex gap-2">
                    <Select value={formData.phoneCode} onValueChange={(v) => setFormData({ ...formData, phoneCode: v })}>
                      <SelectTrigger className="w-24 bg-background border-border h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {phoneCodes.map((p) => (
                          <SelectItem key={p.code} value={p.code}>{p.code}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="flex-1 bg-background border-border h-9 text-primary"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-1 text-foreground text-sm">
                    Email <Info className="h-3 w-3 text-muted-foreground" />
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    type="email"
                    placeholder="e.g. johndoe@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-background border-border h-9 text-primary"
                    required
                  />
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-1 text-foreground text-sm">
                    Gender <Info className="h-3 w-3 text-muted-foreground" />
                  </Label>
                  <Select value={formData.gender} onValueChange={(v) => setFormData({ ...formData, gender: v })}>
                    <SelectTrigger className="bg-background border-border h-9">
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Date of Birth */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-1 text-foreground text-sm">
                    Date Of Birth <Info className="h-3 w-3 text-muted-foreground" />
                  </Label>
                  <Input
                    type="date"
                    placeholder="dd-mm-yyyy"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="bg-background border-border h-9"
                  />
                </div>

                {/* City */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-1 text-foreground text-sm">
                    City <Info className="h-3 w-3 text-muted-foreground" />
                  </Label>
                  <Input
                    placeholder="e.g. New York, Jaipur, Dubai"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="bg-background border-border h-9"
                  />
                </div>

                {/* Zip Code */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-1 text-foreground text-sm">
                    Zip Code <Info className="h-3 w-3 text-muted-foreground" />
                  </Label>
                  <Input
                    placeholder="e.g. 90250"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    className="bg-background border-border h-9"
                  />
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-1 text-foreground text-sm">
                    Address <Info className="h-3 w-3 text-muted-foreground" />
                  </Label>
                  <Input
                    placeholder="e.g. 132, My Street, Kingston, New York 12401"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="bg-background border-border h-9"
                  />
                </div>

                {/* Attach To Risk Profile */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-1 text-foreground text-sm">
                    Attach To Risk Profile <Info className="h-3 w-3 text-muted-foreground" />
                  </Label>
                  <Select value={formData.riskProfile} onValueChange={(v) => setFormData({ ...formData, riskProfile: v })}>
                    <SelectTrigger className="bg-background border-border h-9">
                      <SelectValue placeholder="Select Tags" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Risk</SelectItem>
                      <SelectItem value="medium">Medium Risk</SelectItem>
                      <SelectItem value="high">High Risk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Comment */}
                <div className="space-y-2 md:col-span-3">
                  <Label className="flex items-center gap-1 text-foreground text-sm">
                    Comment <Info className="h-3 w-3 text-muted-foreground" />
                  </Label>
                  <Textarea
                    placeholder="Add any comments here..."
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    className="bg-background border-border min-h-[80px] resize-y"
                  />
                </div>
              </div>
            </div>

            {/* Security Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-primary">Security</h2>
              
              <div className="flex flex-wrap items-end gap-4">
                {/* Password */}
                <div className="space-y-2 flex-1 min-w-[180px]">
                  <Label className="flex items-center gap-1 text-foreground text-sm">
                    Password <Info className="h-3 w-3 text-muted-foreground" />
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="bg-background border-border h-9"
                    required
                  />
                </div>

                {/* Email Verified */}
                <div className="flex items-center gap-2 pb-2">
                  <Switch
                    checked={formData.emailVerified}
                    onCheckedChange={(v) => setFormData({ ...formData, emailVerified: v })}
                  />
                  <Label className="flex items-center gap-1 text-foreground text-sm">
                    Email Verified <Info className="h-3 w-3 text-muted-foreground" />
                  </Label>
                </div>

                {/* Phone Verified */}
                <div className="flex items-center gap-2 pb-2">
                  <Switch
                    checked={formData.phoneVerified}
                    onCheckedChange={(v) => setFormData({ ...formData, phoneVerified: v })}
                  />
                  <Label className="flex items-center gap-1 text-foreground text-sm">
                    Phone Verified <Info className="h-3 w-3 text-muted-foreground" />
                  </Label>
                </div>

                {/* Temporary Password */}
                <div className="flex items-center gap-2 pb-2">
                  <Switch
                    checked={formData.temporaryPassword}
                    onCheckedChange={(v) => setFormData({ ...formData, temporaryPassword: v })}
                  />
                  <Label className="flex items-center gap-1 text-foreground text-sm">
                    Temporary Password <Info className="h-3 w-3 text-muted-foreground" />
                  </Label>
                </div>
              </div>
            </div>

            {/* Staff & KYC Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Assign Customer To Staff Member */}
              <div className="bg-background/50 rounded-lg p-4 border border-border/50">
                <h3 className="text-base font-semibold text-foreground mb-1">Assign Customer To Staff Member</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Assign a customer to a specific staff member for personalized service and ongoing support.
                </p>
                <div className="space-y-2">
                  <Label className="flex items-center gap-1 text-foreground text-sm">
                    Assign To Staff Member <Info className="h-3 w-3 text-muted-foreground" />
                  </Label>
                  <Select value={formData.staffMember} onValueChange={(v) => setFormData({ ...formData, staffMember: v })}>
                    <SelectTrigger className="bg-background border-border h-9">
                      <SelectValue placeholder="Select Staff Member" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="john">John Smith</SelectItem>
                      <SelectItem value="jane">Jane Doe</SelectItem>
                      <SelectItem value="mike">Mike Johnson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Customer KYC Verification */}
              <div className="bg-background/50 rounded-lg p-4 border border-border/50">
                <h3 className="text-base font-semibold text-foreground mb-1">Customer KYC Verification</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Complete the customer KYC verification during account creation (optional).
                </p>
                <div className="space-y-2">
                  <Label className="flex items-center gap-1 text-foreground text-sm">
                    KYC Level <Info className="h-3 w-3 text-muted-foreground" />
                  </Label>
                  <Select value={formData.kycLevel} onValueChange={(v) => setFormData({ ...formData, kycLevel: v })}>
                    <SelectTrigger className="bg-background border-border h-9">
                      <SelectValue placeholder="Select Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="level1">Level 1 - Basic</SelectItem>
                      <SelectItem value="level2">Level 2 - Standard</SelectItem>
                      <SelectItem value="level3">Level 3 - Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-2">
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Check className="h-4 w-4 mr-2" />
                Add New Customer
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
