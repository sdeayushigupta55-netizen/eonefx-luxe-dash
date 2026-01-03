import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Bug, Terminal, FileCode, AlertTriangle, Power } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function DevMode() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center py-16 space-y-6">
        {/* Icon Illustration */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="w-48 h-48 flex items-center justify-center">
              {/* Binary code pattern with gears and magnifying glass */}
              <div className="relative">
                <div className="text-6xl font-mono text-muted-foreground/40 space-y-2">
                  <div className="flex gap-2">
                    <span>1001</span>
                    <span className="text-blue-500">⚙</span>
                  </div>
                  <div className="flex gap-2">
                    <span>0010</span>
                    <span className="text-red-500">⚙</span>
                  </div>
                  <div className="flex gap-2">
                    <span>1010</span>
                    <span className="text-cyan-500">🔍</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Warning Message */}
        <div className="text-center max-w-lg space-y-2">
          <p className="text-foreground font-medium">
            Development Mode is strictly for troubleshooting and should only be activated by the Development or
            Technology Team in critical situations under their supervision.
          </p>
        </div>

        {/* Turn Off Button */}
        <Button
          variant="destructive"
          size="lg"
          className="gap-2 "
        >
          <Power className="w-4 h-4" />
          Turn Development Mode Off
        </Button>
      </div>
    </div>
  );
}