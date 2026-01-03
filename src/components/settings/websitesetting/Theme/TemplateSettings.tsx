import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";


interface ContactWidgetPage {
  id: string;
  label: string;
  enabled: boolean;
}

export default function TemplateSettings() {
  const [selectedTheme, setSelectedTheme] = useState("prime_x");
  const [showQuickLinksDesktop, setShowQuickLinksDesktop] = useState(true);
  const [showQuickLinksMobile, setShowQuickLinksMobile] = useState(false);



  const [contactWidgetPages, setContactWidgetPages] = useState<ContactWidgetPage[]>([
    { id: "deposit", label: "Deposit Page", enabled: true },
    { id: "withdraw", label: "Withdraw Page", enabled: true },
    { id: "transfer", label: "Transfer Page", enabled: true },
  ]);

 

  const toggleContactWidget = (id: string) => {
    setContactWidgetPages((prev) =>
      prev.map((page) => (page.id === id ? { ...page, enabled: !page.enabled } : page))
    );
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Theme Selection Card - col-4 */}
        <div className="md:col-span-4">
         <Card className="overflow-hidden border-border bg-card h-full">
            <CardContent className="space-y-6">
            <div className="rounded-lg mt-5">
              <img
                src="https://demo.brokeret.com/assets/backend/materials/theme/prime_x.jpg"
                alt="Prime X Theme"
                className="block w-full h-[350px] object-cover rounded-lg"
              />
              <div className="mt-3 py-2 px-3 flex items-center gap-3">
                <input 
                  type="radio" 
                  id="prime_x_theme" 
                  name="theme" 
                  value="prime_x"
                  checked={selectedTheme === "prime_x"}
                  onChange={(e) => setSelectedTheme(e.target.value)}
                  className="w-4 h-4 accent-green-500 cursor-pointer"
                />
                <label htmlFor="prime_x_theme" className="text-sm font-medium text-green-500 cursor-pointer">
                  Prima X Theme
                </label>
              </div>
            </div>
          </CardContent>
         </Card>
        </div>
      </div>

      {/* Dashboard Quick Links & Contact Widget Row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Dashboard Quick Links - col-6 */}
        <div className="md:col-span-6">
          <Card className="border-border bg-card h-full">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold">Dashboard Quick Links</CardTitle>
              <CardDescription>
                Customize and access your most important dashboard features with one click.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Preview Image */}
              <div className="mb-5">
                <img
                  src="https://demo.brokeret.com/assets/backend/images/dashboard-quick-links.png"
                  alt="Dashboard Quick Links Preview"
                  className="w-full rounded-lg border border-border"
                />
              </div>

              {/* Desktop Toggle */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border">
                <div>
                  <h4 className="font-medium text-foreground">Desktop</h4>
                  <p className="text-sm text-muted-foreground">
                    Show or hide quick links section on the dashboard.
                  </p>
                </div>
                <Switch checked={showQuickLinksDesktop} onCheckedChange={setShowQuickLinksDesktop} />
              </div>

              {/* Mobile Toggle */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border">
                <div>
                  <h4 className="font-medium text-foreground">Mobile</h4>
                  <p className="text-sm text-muted-foreground">
                    Show or hide quick links section on the dashboard.
                  </p>
                </div>
                <Switch checked={showQuickLinksMobile} onCheckedChange={setShowQuickLinksMobile} />
              </div>

              {/* Save Changes Button */}
            
                <Button className="px-8 bg-primary hover:bg-primary/90 text-primary-foreground w-full">
                  Save Changes
                </Button>
              
            </CardContent>
            
          </Card>
        </div>

        {/* Contact Widget - col-6 */}
        <div className="md:col-span-6">
          <Card className="border-border bg-card h-full">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold">Contact Widget</CardTitle>
              <CardDescription>
                Customize and access your most important contact widget features with one click.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Preview Image */}
              <div className="mb-5">
                <img
                  src="https://demo.brokeret.com/assets/backend/images/contact-widget.png"
                  alt="Contact Widget Preview"
                  className="w-full rounded-lg border border-border"
                />
              </div>

              {/* Contact Widget Pages */}
              <div className="space-y-3">
                {contactWidgetPages.map((page) => (
                  <div
                    key={page.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border"
                  >
                    <div>
                      <h4 className="font-medium text-foreground">{page.label}</h4>
                      <p className="text-sm text-muted-foreground">
                        Show or hide contact widget on the {page.label.toLowerCase()}.
                      </p>
                    </div>
                    <Switch checked={page.enabled} onCheckedChange={() => toggleContactWidget(page.id)} />
                  </div>
                ))}
                 
              </div>
<Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full">
                  Save Changes
                </Button>
              
            </CardContent>
          </Card>
           
        </div>
      </div>
    </div>
  );
}