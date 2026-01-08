import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Info, Bold, Italic, Underline, Paintbrush, List, ListOrdered, AlignLeft, Link, Image, Maximize, Code, HelpCircle, Table } from "lucide-react";

export default function SendEmailCustomers() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-foreground mb-6">Send Email To All</h1>
        
        <div className="space-y-6">
          {/* Users and IB Groups */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="flex items-center gap-1 text-foreground">
                Users <Info className="h-4 w-4 text-muted-foreground" />
              </Label>
              <Input 
                placeholder="Search user by name or email" 
                className="bg-background border-border"
              />
              <p className="text-sm text-muted-foreground">Start typing to search users</p>
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-1 text-foreground">
                IB Groups <Info className="h-4 w-4 text-muted-foreground" />
              </Label>
              <Input 
                className="bg-background border-border"
              />
              <p className="text-sm text-muted-foreground">Select one or multiple IB groups</p>
            </div>
          </div>
          
          {/* Account Types */}
          <div className="space-y-2">
            <Label className="flex items-center gap-1 text-foreground">
              Account Types <Info className="h-4 w-4 text-muted-foreground" />
            </Label>
            <Input 
              className="bg-background border-border max-w-md"
            />
            <p className="text-sm text-muted-foreground">Select one or multiple account types</p>
          </div>
          
          {/* Subject */}
          <div className="space-y-2">
            <Label className="flex items-center gap-1 text-foreground">
              Subject <Info className="h-4 w-4 text-muted-foreground" />
            </Label>
            <Input 
              className="bg-background border-border"
            />
          </div>
          
          {/* Email Details */}
          <div className="space-y-2">
            <Label className="flex items-center gap-1 text-foreground">
              Email Details <Info className="h-4 w-4 text-muted-foreground" />
            </Label>
            <div className="border border-border rounded-lg overflow-hidden">
              {/* Toolbar */}
              <div className="flex items-center gap-1 p-2 border-b border-border bg-muted/30 flex-wrap">
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Paintbrush className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Bold className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Italic className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Underline className="h-4 w-4" />
                </Button>
                <div className="h-6 w-px bg-border mx-1" />
                <Button variant="ghost" size="sm" className="h-8 px-2 text-sm">
                  16
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2 text-yellow-500 font-bold">
                  A
                </Button>
                <div className="h-6 w-px bg-border mx-1" />
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <List className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <ListOrdered className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <AlignLeft className="h-4 w-4" />
                </Button>
                <div className="h-6 w-px bg-border mx-1" />
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Table className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Link className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Image className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Maximize className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Code className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </div>
              {/* Editor area */}
              <div className="min-h-[200px] p-4 bg-background">
                <textarea 
                  className="w-full h-full min-h-[180px] bg-transparent border-none outline-none resize-none text-foreground"
                  placeholder="Write your email content here..."
                />
              </div>
            </div>
          </div>
          
          {/* Send Button */}
          <div className="flex justify-end">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Send Email
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
