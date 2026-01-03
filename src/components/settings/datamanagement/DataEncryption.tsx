import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

export default function DataEncryption() {
  const [isEncryptionEnabled, setIsEncryptionEnabled] = useState(false);

  const handleToggleEncryption = () => {
    setIsEncryptionEnabled(!isEncryptionEnabled);
    console.log("Encryption toggled:", !isEncryptionEnabled);
  };

  return (
    <div className="min-h-[600px] flex items-center justify-center p-6">
      <Card className="max-w-2xl w-full">
        <CardContent className="p-12 text-center">
          {/* Icon/Illustration */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-48 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl shadow-lg flex items-center justify-center">
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                </div>
                <code className="text-4xl font-bold text-slate-700">&lt;code/&gt;</code>
                <div className="absolute -top-2 -left-2 text-6xl opacity-20">❄</div>
                <div className="absolute top-8 right-4 text-5xl opacity-20">❄</div>
                <div className="absolute bottom-4 left-8 text-4xl opacity-20">❄</div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl shadow-lg flex items-center justify-center">
                <ShieldCheck className="w-10 h-10 text-yellow-400" />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="mb-8 space-y-2">
            <p className="text-base text-muted-foreground leading-relaxed max-w-xl mx-auto">
              End-to-End Encryption ensures that all data transmitted within the CRM remains secure and
              confidential. Admins can enable or disable this option to control the encryption of sensitive
              information, protecting client data throughout its entire journey.
            </p>
          </div>

          {/* Action Button */}
          <Button
            onClick={handleToggleEncryption}
            variant={isEncryptionEnabled ? "outline" : "destructive"}
            size="lg"
            className="px-8"
          >
            <ShieldCheck className="w-4 h-4 mr-2" />
            {isEncryptionEnabled ? "Disable" : "Enable"} End-To-End Encryption
          </Button>

          {isEncryptionEnabled && (
            <p className="mt-4 text-sm text-green-600 dark:text-green-400">
              ✓ End-to-End Encryption is currently enabled
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
