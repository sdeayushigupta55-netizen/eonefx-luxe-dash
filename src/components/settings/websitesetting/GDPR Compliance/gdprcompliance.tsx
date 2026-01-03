import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { InputField } from "@/components/form/InputField";
import RichTextEditor from "@/components/form/RichTextEditor";
import { StatusToggle } from "@/components/form/Status";

export default function GDPRCompliance() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gdprStatus, setGdprStatus] = useState(true);
  const [buttonLabel, setButtonLabel] = useState("Learn More");
  const [buttonUrl, setButtonUrl] = useState("/privacy-policy");
  const [gdprText, setGdprText] = useState("");

  const handleSave = () => {
    // Handle save logic here
    console.log({
      gdprStatus,
      buttonLabel,
      buttonUrl,
      gdprText,
    });
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-8">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">GDPR Compliance</h1>
      </div>

      <Card className="border-border bg-card" style={{ minHeight: "calc(-221px + 100vh)" }}>
        <CardContent className="p-6">
          {/* Three Cards Section */}
          <div className="grid md:grid-cols-3 grid-cols-1 gap-5 mt-10">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="gdpr_landing_illustration_img data_collection"></div>
              <p className="text-sm font-semibold dark:text-white">Data Collection</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Capture customer data from various sources in compliance with GDPR regulations to ensure secure and
                transparent data handling.
              </p>
              <a
                href="https://brokeret.com/gdpr"
                className="btn-link inline-flex items-center text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Know more
              </a>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <div className="gdpr_landing_illustration_img data_processing"></div>
              <p className="text-sm font-semibold dark:text-white">Data Processing</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Manage and process customer personal data securely within the CRM while adhering to GDPR compliance
                standards.
              </p>
              <a
                href="https://brokeret.com/gdpr"
                className="btn-link inline-flex items-center text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Know more
              </a>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <div className="gdpr_landing_illustration_img data_request"></div>
              <p className="text-sm font-semibold dark:text-white">Data Request</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Handle and respond to customer data requests efficiently, ensuring GDPR compliance with easy access and
                control over personal information.
              </p>
              <a
                href="https://brokeret.com/gdpr"
                className="btn-link inline-flex items-center text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Know more
              </a>
            </div>
          </div>

          {/* Bottom Description and Enable Button */}
          <div className="text-center mt-10">
            <p className="card-text mb-5 text-muted-foreground">
              GDPR Settings allow you to manage and configure data privacy compliance for your clients. Use this feature
              to ensure your system adheres to data protection regulations while safeguarding user information.
            </p>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground inline-flex items-center justify-center"
            >
              Enable GDPR Compliance
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* GDPR Settings Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <Card className="w-full max-w-3xl bg-card max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center px-6 py-4 border-b border-border flex-shrink-0">
              <h2 className="text-xl font-semibold">GDPR Compliance Settings</h2>
              <Button size="icon" variant="ghost" onClick={closeModal}>
                <X size={20} />
              </Button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 gap-6">
                {/* GDPR Status Toggle */}
                <StatusToggle
                  label="GDPR Status"
                  tooltip="Toggle to enable or disable the GDPR notice on the site"
                  status={gdprStatus ? "Active" : "Disabled"}
                  onChange={(s) => setGdprStatus(s === "Active")}
                />

                {/* Button Label */}
                <InputField
                  label="Button Label"
                  type="text"
                  name="gdpr_button_label"
                  placeholder="Label"
                  value={buttonLabel}
                  onChange={(e) => setButtonLabel(e.target.value)}
                  
                  tooltip="Text shown on the GDPR button (e.g., Learn More)"
                />

                {/* Button URL */}
                <InputField
                  label="Button URL"
                  tooltip="Link to your privacy policy or related page"
                  type="text"
                  name="gdpr_button_url"
                  placeholder="URL"
                  value={buttonUrl}
                  onChange={(e) => setButtonUrl(e.target.value)}
                  
                />

                {/* GDPR Text */}
                <RichTextEditor
                  value={gdprText}
                  onChange={setGdprText}
                  label="GDPR Text"
                  tooltip="Message explaining your data collection purpose"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 px-6 py-4 border-t border-border flex-shrink-0">
              <Button variant="destructive" onClick={closeModal}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Save Changes
              </Button>
            </div>
          </Card>
        </div>
      )}

      <style>{`
        .gdpr_landing_illustration_img {
          background: url(https://demo.brokeret.com/assets/backend/images/gdpr_illustration.svg) no-repeat;
          margin: 0 auto;
        }
        .data_collection {
          width: 223px;
          height: 204px;
          background-position: -14px -14px;
        }
        .data_processing {
          width: 223px;
          height: 204px;
          background-position: -19px -249px;
        }
        .data_request {
          width: 223px;
          height: 204px;
          background-position: -21px -487px;
        }
      `}</style>
    </div>
  );
}