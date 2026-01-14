import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const UserSecurity = () => {
  const [show2FASetup, setShow2FASetup] = useState(false);

  const handleEnable2FA = () => {
    setShow2FASetup(true);
  };

  return (
    <div className="p-6 border border-border rounded-lg bg-background min-h-screen">
      <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Strengthen Your Online Security: It's your primary defense.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Authorization Section */}
        <div className="bg-card p-6 rounded-lg border border-border shadow-md">
          <h3 className="text-lg font-semibold mb-4">Authorization</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Information for logging in to Brokeret Demo. Change your password
            whenever you think it might have been compromised.
          </p>
          <div className="space-y-4">
            <div className="flex items-center justify-between relative">
              <Input
                type="email"
                value="aimanbasit0416@gmail.com"
                readOnly
                
              />
              <button className="text-green ml-4 absolute right-2 top-2 text-sm">Change</button>
            </div>
            <div className="flex items-center justify-between relative">
              <Input
                type="password"
                value="********"
                readOnly
                
              />
              <button className="text-green ml-4 absolute right-2 top-2 text-sm">Change</button>
            </div>
          </div>
          <Button className="w-full mt-6">
            Update
          </Button>
        </div>

        {/* Two-Step Verification Section */}
        <div className="bg-card p-6 rounded-lg border border-border shadow-md">
          <h3 className="text-lg font-semibold mb-4">2-Step Verification</h3>
          {!show2FASetup ? (
            <>
              <p className="text-sm text-muted-foreground mb-6">
                Two-Factor Authentication (2FA) is not enabled. Enable 2FA to
                significantly strengthen your account security and safeguard
                against unauthorized access.
              </p>
              <Button
                className="w-full"
                onClick={handleEnable2FA}
              >
                Obtaining A Secret Key For Two-Factor Authentication
              </Button>
            </>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-6">
                Two-Factor Authentication (2FA) enhances security by requiring
                two forms of verification, protecting your account against
                phishing, social engineering, and stolen passwords. Scan the QR
                code with your Google Authenticator App.
              </p>
              <div className="mb-6">
                <img
                  src="https://www.emoderationskills.com/wp-content/uploads/2010/08/QR1.jpg" // Ensure this path points to a valid QR code image in your public/assets folder
                  alt="QR Code"
                  className="border border-border rounded"
                  width="200"
                  height="200"
                />
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Enter The PIN From Google Authenticator App
              </p>
              <div className="flex gap-2 mb-6">
                {Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      className="bg-muted-background p-2 rounded border border-border w-12 text-center"
                    />
                  ))}
              </div>
              <Button className="w-full mt-6">
                Enable 2FA
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSecurity;
