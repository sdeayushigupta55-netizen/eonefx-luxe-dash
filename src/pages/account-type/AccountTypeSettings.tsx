import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function AccountTypeSettings() {
  const [showCountryTags, setShowCountryTags] = useState(false);
  const [showIBRebateRules, setShowIBRebateRules] = useState(true);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-foreground">Account Type Settings</h1>

      {/* Toggle Settings */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-foreground">Show Global Accounts With Country & Tags</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Enable to show global accounts filtered by country and tags</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Switch checked={showCountryTags} onCheckedChange={setShowCountryTags} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-foreground">Show Global Accounts With Ib Rebate Rules</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Enable to show global accounts with IB rebate rules</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span className="text-xs text-muted-foreground">
                  After enabling this setting, manage Global account access from{" "}
                  <a href="#" className="text-primary hover:underline">IB Groups</a>.
                </span>
              </div>
              <Switch checked={showIBRebateRules} onCheckedChange={setShowIBRebateRules} />
            </div>
          </div>

          <div className="mt-6">
            <Button className="bg-primary text-primary-foreground">Save Changes</Button>
          </div>
        </CardContent>
      </Card>

      {/* Account Type Settings Documentation */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Account Type Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Branch System Overview */}
          <div className="bg-muted/30 rounded-lg p-4 border border-border">
            <h3 className="font-semibold text-foreground mb-2">Branch System Overview</h3>
            <p className="text-sm text-muted-foreground">
              If an account type is assigned to a branch, it will be visible only to users assigned to that branch. The following rules apply:
            </p>
          </div>

          {/* Branch System Visibility Rules */}
          <div className="bg-muted/30 rounded-lg p-4 border border-border space-y-4">
            <h3 className="font-semibold text-foreground">Branch System Visibility Rules</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-foreground">1. Universal Global</h4>
                <p className="text-sm text-muted-foreground ml-4">Visible to all users, whether they are assigned to a branch or not.</p>
              </div>

              <div>
                <h4 className="font-medium text-foreground">2. Branch + Global (with IB Rebate Rules Settings)</h4>
                <p className="text-sm text-muted-foreground ml-4">Shows only to branch-assigned users with <span className="underline">global settings</span> defined with IB Rebate Rules settings.</p>
              </div>

              <div>
                <h4 className="font-medium text-foreground">3. No Branch + Global (with IB Rebate Rules Settings)</h4>
                <p className="text-sm text-muted-foreground ml-4">Shows only to non-branch users with <span className="underline">global settings</span> defined with IB Rebate Rules settings.</p>
              </div>

              <div>
                <h4 className="font-medium text-foreground">4. Branch + Country & Tag</h4>
                <p className="text-sm text-muted-foreground ml-4">Shows only to branch-assigned users who meet the same country and <span className="underline">tag criteria</span>.</p>
              </div>

              <div>
                <h4 className="font-medium text-foreground">5. No Branch + Country & Tag</h4>
                <p className="text-sm text-muted-foreground ml-4">Shows only to non-branch users who meet the same country and tag criteria.</p>
              </div>

              <div>
                <h4 className="font-medium text-foreground">6. Branch + IB Rebate Rules</h4>
                <p className="text-sm text-muted-foreground ml-4">Shows only to branch-assigned users. This depends on IB rebate rules attached to account types. It will show all IB <span className="underline">group network</span> as per assigned account types with <span className="underline">IB rebate rules</span>.</p>
              </div>

              <div>
                <h4 className="font-medium text-foreground">7. No Branch + IB Rebate Rules</h4>
                <p className="text-sm text-muted-foreground ml-4">Shows only to non-branch users. This depends on IB rebate rules attached to account types. It will show all IB <span className="underline">group network</span> as per assigned account types with <span className="underline">IB rebate rules</span>.</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              We have 3 account categories: <strong>Global, Country & Tags, and IB Rebate Rules.</strong>
            </p>
          </div>

          {/* Show Global Accounts Documentation */}
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-foreground">1. Show Global Accounts with Country & Tags</h4>
              <ul className="list-disc list-inside ml-4 text-sm text-muted-foreground space-y-1">
                <li><strong>Enabled:</strong> Global accounts will also appear for users that match by country or tags.</li>
                <li><strong>Disabled:</strong> Global accounts will be hidden; only country/tag-specific accounts will show.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-foreground">2. Show Global Accounts with IB Rebate Rules</h4>
              <ul className="list-disc list-inside ml-4 text-sm text-muted-foreground space-y-1">
                <li><strong>Enabled:</strong> Global accounts will also appear for users within the IB network as per ib group settings.</li>
                <li><strong>Disabled:</strong> Global accounts will be hidden; users will only see accounts tied to their IB group.</li>
              </ul>
            </div>
          </div>

          {/* Exception */}
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Exception</h3>
            <p className="text-sm text-muted-foreground">
              When adding/updating an account type, there is a toggle under global account type:
            </p>
            <p className="text-sm italic text-foreground">"Set as Universal Global Account"</p>
            <ul className="list-disc list-inside ml-4 text-sm text-muted-foreground space-y-1">
              <li>If this is enabled, it overrides branch/country, tag, and IB restrictions.</li>
              <li>The account will be visible to all users, regardless of the above settings.</li>
            </ul>
          </div>

          {/* Global Vs Universal Global */}
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Global Vs Universal Global</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li><strong>Universal Global (enabled):</strong> Always visible to all users. If you enable universal global it overrides country, tag, and IB rebate rules. Shown as "Universal Global" in listings.</li>
              <li><strong>Global:</strong> Visibility follows settings and matching above rules. Additionally, if a user does not match any country, tag, or IB rule, these Global accounts are still shown as a fallback. Shown as "Global" in listings.</li>
            </ul>
          </div>

          {/* New Users */}
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">New Users</h3>
            <p className="text-sm text-muted-foreground">
              For new users who are not yet associated with any Branch, IB group, rebate rule, country, or tag, all Global and Universal Global account types are visible. Once they become associated with an Branch, IB group, rebate rule, country, or tag, the above visibility rules and settings will apply.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
