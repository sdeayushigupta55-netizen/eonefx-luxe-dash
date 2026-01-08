import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Info, ChevronDown, Check } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

export default function AddLead() {
  const navigate = useNavigate();
  const [companyOpen, setCompanyOpen] = useState(true);

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-foreground mb-6 inline-block bg-primary/20 px-1">Create New Lead</h1>

        <div className="bg-card rounded-lg border border-border p-6">
          {/* Lead Contact Detail */}
          <h2 className="text-lg font-semibold text-foreground mb-6">Lead Contact Detail</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label className="flex items-center gap-1 text-sm">
                Salutation <Info className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-red-500">*</span>
              </Label>
              <Select defaultValue="mr">
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mr">Mr</SelectItem>
                  <SelectItem value="mrs">Mrs</SelectItem>
                  <SelectItem value="ms">Ms</SelectItem>
                  <SelectItem value="dr">Dr</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-1 text-sm">
                First Name <Info className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-red-500">*</span>
              </Label>
              <Input placeholder="e.g. John" className="bg-background" />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-1 text-sm">
                Last Name <Info className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-red-500">*</span>
              </Label>
              <Input placeholder="e.g. Doe" className="bg-background" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="space-y-2">
              <Label className="flex items-center gap-1 text-sm">
                Email <Info className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-red-500">*</span>
              </Label>
              <Input placeholder="e.g. johndoe@example.com" className="bg-background" />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-1 text-sm">
                Phone <Info className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-red-500">*</span>
              </Label>
              <Input placeholder="e.g. 1234567890" className="bg-background" />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-1 text-sm">
                Lead Source <Info className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-red-500">*</span>
              </Label>
              <Select defaultValue="email">
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="phone">Phone</SelectItem>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="referral">Referral</SelectItem>
                  <SelectItem value="social">Social Media</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <Label className="flex items-center gap-1 text-sm">
              Lead Owner <Info className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-red-500">*</span>
            </Label>
            <Select defaultValue="super-admin">
              <SelectTrigger className="bg-background max-w-md">
                <SelectValue>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-amber-500 text-white text-xs">SA</AvatarFallback>
                    </Avatar>
                    <span>Super Admin</span>
                    <Badge className="bg-slate-700 text-white text-xs">Super-Admin</Badge>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="super-admin">
                  <div className="flex items-center gap-2">
                    <span>Super Admin</span>
                    <Badge className="bg-slate-700 text-white text-xs">Super-Admin</Badge>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-6 flex items-center space-x-2">
            <Checkbox id="create-deal" />
            <label htmlFor="create-deal" className="text-sm text-foreground cursor-pointer">
              Create Deal
            </label>
          </div>

          {/* Company Details */}
          <Collapsible open={companyOpen} onOpenChange={setCompanyOpen} className="mt-8">
            <CollapsibleTrigger className="flex items-center gap-2 text-lg font-semibold text-foreground">
              Company Details
              <ChevronDown className={`h-5 w-5 transition-transform ${companyOpen ? "rotate-180" : ""}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label className="flex items-center gap-1 text-sm">
                    Company Name <Info className="h-3.5 w-3.5 text-muted-foreground" />
                  </Label>
                  <Input placeholder="e.g. Acme Corporation" className="bg-background" />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-1 text-sm">
                    Website <Info className="h-3.5 w-3.5 text-muted-foreground" />
                  </Label>
                  <Input placeholder="e.g. https://www.example.com" className="bg-background" />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-1 text-sm">
                    Office Phone Number <Info className="h-3.5 w-3.5 text-muted-foreground" />
                  </Label>
                  <Input placeholder="e.g. 1234567890" className="bg-background" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label className="flex items-center gap-1 text-sm">
                    Country <Info className="h-3.5 w-3.5 text-muted-foreground" />
                  </Label>
                  <Select>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                      <SelectItem value="in">India</SelectItem>
                      <SelectItem value="pk">Pakistan</SelectItem>
                      <SelectItem value="ae">UAE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-1 text-sm">
                    State <Info className="h-3.5 w-3.5 text-muted-foreground" />
                  </Label>
                  <Input placeholder="e.g. California, Rajasthan, Dubai" className="bg-background" />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-1 text-sm">
                    City <Info className="h-3.5 w-3.5 text-muted-foreground" />
                  </Label>
                  <Input placeholder="e.g. New York, Jaipur, Dubai" className="bg-background" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label className="flex items-center gap-1 text-sm">
                    Postal Code <Info className="h-3.5 w-3.5 text-muted-foreground" />
                  </Label>
                  <Input placeholder="e.g. 90250" className="bg-background" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-1 text-sm">
                  Address <Info className="h-3.5 w-3.5 text-muted-foreground" />
                </Label>
                <Textarea 
                  placeholder="e.g. 132, My Street, Kingston, New York 12401" 
                  className="bg-background min-h-[100px]" 
                />
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Add Lead Button - Fixed at bottom right */}
        <div className="flex justify-end mt-6">
          <Button onClick={() => navigate("/leads/contacts")} className="gap-2">
            <Check className="h-4 w-4" />
            Add Lead
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
