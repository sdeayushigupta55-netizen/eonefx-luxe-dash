import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send, Info, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, Link, Image, Code, Table, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

export function SendEmailToSubscribers() {
  const { toast } = useToast();
  const [subject, setSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");

  const handleSendEmail = () => {
    if (!subject.trim()) {
      toast({
        title: "Error",
        description: "Please enter a subject for your email.",
        variant: "destructive",
      });
      return;
    }

    if (!emailContent.trim()) {
      toast({
        title: "Error",
        description: "Please enter the email content.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Email Sent",
      description: "Your email has been sent to all subscribers successfully.",
    });

    // Reset form
    setSubject("");
    setEmailContent("");
  };

  const toolbarButtons = [
    { icon: Bold, label: "Bold" },
    { icon: Italic, label: "Italic" },
    { icon: Underline, label: "Underline" },
    { divider: true },
    { icon: AlignLeft, label: "Align Left" },
    { icon: AlignCenter, label: "Align Center" },
    { icon: AlignRight, label: "Align Right" },
    { divider: true },
    { icon: List, label: "Bullet List" },
    { icon: ListOrdered, label: "Numbered List" },
    { divider: true },
    { icon: Link, label: "Insert Link" },
    { icon: Image, label: "Insert Image" },
    { icon: Table, label: "Insert Table" },
    { icon: Code, label: "Code" },
    { icon: X, label: "Clear Formatting" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-primary">Send Email To All Subscriber</h1>

        <Card className="bg-card border-border/50 p-6 max-w-4xl mx-auto">
          <div className="space-y-6">
            {/* Subject Field */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="subject" className="text-foreground">Subject</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-3.5 w-3.5 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>Enter the email subject line</TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="subject"
                placeholder="Enter email subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="bg-background border-border"
              />
            </div>

            {/* Email Details Field */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="emailContent" className="text-foreground">Email Details</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-3.5 w-3.5 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>Compose your email content</TooltipContent>
                </Tooltip>
              </div>
              
              {/* Rich Text Toolbar */}
              <div className="border border-border rounded-t-lg bg-muted/30 p-2 flex flex-wrap items-center gap-1">
                {toolbarButtons.map((btn, index) => 
                  btn.divider ? (
                    <div key={`divider-${index}`} className="w-px h-6 bg-border mx-1" />
                  ) : (
                    <Tooltip key={btn.label}>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-muted"
                        >
                          <btn.icon className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>{btn.label}</TooltipContent>
                    </Tooltip>
                  )
                )}
              </div>
              
              {/* Text Area */}
              <Textarea
                id="emailContent"
                placeholder="Compose your email..."
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                className="bg-background border-border min-h-[200px] rounded-t-none border-t-0"
              />
            </div>

            {/* Send Button */}
            <div className="flex justify-end">
              <Button 
                onClick={handleSendEmail}
                className="bg-foreground text-background hover:bg-foreground/90"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Email
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
