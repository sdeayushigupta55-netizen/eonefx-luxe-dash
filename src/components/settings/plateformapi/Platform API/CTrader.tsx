import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/form/InputField";
import { SelectField } from "@/components/form/SelectField";
import { Switch } from "@/components/ui/switch";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function CTrader() {
  const [formData, setFormData] = useState({
    serverName: "CTrader",
    networkAddress: "https://your-platform.encrypted-gateway.com",
    login: "45423",
    password: "••••••••••••••",
    status: "Enabled",
    demoServerSeparate: false,
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        {/* Server Name and Demo Server Toggle */}
        <div className="grid grid-cols-12 gap-5">
          <div className="md:col-span-6 col-span-12">
            <InputField
              label="Server Name"
              tooltip="Specify a recognizable name for the server, such as 'YourCompany-Live' or 'YourCompany-Demo,' for easy identification and selection"
              type="text"
              value={formData.serverName}
              onChange={(e) => handleInputChange("serverName", e.target.value)}
              placeholder="CTrader"
            />
          </div>
          <div className="md:col-span-6 col-span-12">
            <label className="form-label invisible">Demo server</label>
            <div className="flex items-center gap-3">
              <Switch
                checked={formData.demoServerSeparate}
                onCheckedChange={(checked) =>
                  handleInputChange("demoServerSeparate", checked)
                }
              />
              <label className="text-sm">
                <span className="inline-flex items-center gap-1">
                  Demo Server (If separate)
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-4 h-4 cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent className="whitespace-pre-line break-words max-w-xs">
                      <p>Enable this option if the demo environment is hosted on a separately deployed server</p>
                    </TooltipContent>
                  </Tooltip>
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Network Address */}
        <div className="grid grid-cols-12 gap-5">
          <div className="md:col-span-6 col-span-12">
            <InputField
              label="Network Address"
              tooltip="This is the API Endpoint or URL to the network. It serves as the connection point for communicating with the server"
              type="text"
              value={formData.networkAddress}
              onChange={(e) =>
                handleInputChange("networkAddress", e.target.value)
              }
              placeholder="https://your-platform.encrypted-gateway.com"
            />
          </div>
          {/* Login */}
      
          <div className="md:col-span-6 col-span-12">
            <InputField
              label="Login"
              tooltip="This is the login credential required to authenticate and connect to the platform through the API"
              type="text"
              value={formData.login}
              onChange={(e) => handleInputChange("login", e.target.value)}
              placeholder="45423"
            />
          </div>
       
        </div>

        

        {/* Password */}
        <div className="grid grid-cols-12 gap-5">
          <div className="md:col-span-6 col-span-12">
            <InputField
              label="Password"
              tooltip="The password associated with the login credential for secure access to the platform"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              placeholder="*************"
            />
          </div>
           {/* Status */}
  
          <div className="md:col-span-6 col-span-12">
            <SelectField
              label="Status"
              tooltip="Set the connection as Enabled or Disabled"
              value={formData.status}
              onChange={(value) => handleInputChange("status", value)}
              options={[
                { value: "Enabled", label: "Enabled" },
                { value: "Disabled", label: "Disabled" },
              ]}
            />
          </div>
     
        </div>

       

        {/* Updated Timestamp */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Updated:</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="w-4 h-4 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent className="whitespace-pre-line break-words max-w-xs">
              <p>Displays the date and time when the server settings were last modified or updated</p>
            </TooltipContent>
          </Tooltip>
          <span className="font-medium">Mar. 14, 2024 02:44:24</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t">
          <Button>Save</Button>
        </div>
      </CardContent>
    </Card>
  );
}
