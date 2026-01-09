import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";



export function OverviewTab({ customer, firstName, lastName }) {
  return (
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
                    <Label className="text-sm text-foreground">Email</Label>
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
                    <Label className="text-sm text-foreground">Zip Code</Label>
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm text-foreground">Assign Branch</Label>
                    <Select>
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue placeholder="Select Branch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="uae">UAE Branch</SelectItem>
                        <SelectItem value="main">Main Branch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-foreground">Assign Group</Label>
                    <Select>
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vip">VIP</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-foreground">Risk Profile Tags</Label>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-primary text-primary-foreground">
                        Under Investigation
                        <button className="ml-1">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm text-foreground">Lead Campaign</Label>
                    <Input placeholder="Enter campaign" className="bg-background border-border" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-foreground">Lead Source</Label>
                    <Input placeholder="Enter source" className="bg-background border-border" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-foreground">Comment</Label>
                  <Textarea placeholder="Enter comment" defaultValue="Under Investigation" className="bg-background border-border" />
                </div>

                <div className="flex justify-end">
                  <Button className="bg-foreground text-background hover:bg-foreground/90">
                    <Check className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
         
  );
}