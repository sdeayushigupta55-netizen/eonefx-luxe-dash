import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/form/InputField";
import { SelectField } from "@/components/form/SelectField";
import RichTextEditor from "@/components/form/RichTextEditor";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function ReportIssue() {
  const [formData, setFormData] = useState({
    issueName: "",
    issueDescription: "",
    email: "",
    severity: "none",
    classification: "none",
    reproducible: "none",
    attachedFile: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Issue reported:", formData);
    alert("Issue reported successfully!");
    // Reset form
    setFormData({
      issueName: "",
      issueDescription: "",
      email: "",
      severity: "none",
      classification: "none",
      reproducible: "none",
      attachedFile: null,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, attachedFile: file });
  };

  const severityOptions = [
    { value: "none", label: "None" },
    { value: "showstopper", label: "Show stopper" },
    { value: "critical", label: "Critical" },
    { value: "major", label: "Major" },
    { value: "minor", label: "Minor" },
  ];

  const classificationOptions = [
    { value: "none", label: "None" },
    { value: "security", label: "Security" },
    { value: "crash", label: "Crash/Hang" },
    { value: "dataloss", label: "Data loss" },
    { value: "performance", label: "Performance" },
    { value: "ui", label: "UI/Usability" },
    { value: "otherbug", label: "Other bug" },
    { value: "feature", label: "Feature(New)" },
    { value: "enhancement", label: "Enhancement" },
  ];

  const reproducibleOptions = [
    { value: "none", label: "None" },
    { value: "always", label: "Always" },
    { value: "sometimes", label: "Sometimes" },
    { value: "rarely", label: "Rarely" },
    { value: "unable", label: "Unable" },
    { value: "nevertried", label: "Never tried" },
    { value: "notapplicable", label: "Not applicable" },
  ];

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Report Issues</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Issue Name */}
          <InputField
            label="Issue Name"
            tooltip="A short and clear title for the issue being reported"
            id="issueName"
            
            value={formData.issueName}
            onChange={(e) =>
              setFormData({ ...formData, issueName: e.target.value })
            }
            
          />

          {/* Issue Description */}
          <RichTextEditor
            label="Issue Description"
            tooltip="Provide detailed steps to reproduce the issue and any error messages"
            value={formData.issueDescription}
            onChange={(value) =>
              setFormData({ ...formData, issueDescription: value })
            }
          />

          {/* Attach File */}
          <div>
           <InputField
              label="Attach File"
                type="file"
                id="uploadfile"
                onChange={handleFileChange}
                className="hidden"
                tooltip="Upload screenshots, logs, or documents to help explain the issue"
              />
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">

              <label
                htmlFor="uploadfile"
                className="cursor-pointer text-muted-foreground"
              >
                {formData.attachedFile
                  ? formData.attachedFile.name
                  : "Drop files or add attachments here..."}
              </label>
            </div>
          </div>

          {/* Email and Severity */}
          <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
            <InputField
              label="Email Address"
              tooltip="Used to identify the reporter. You won't get account access via this email"
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              
            />

            <SelectField
              label="Severity"
              tooltip="Indicate how critical the issue is: Low, Medium, High, or Urgent"
              options={severityOptions}
              value={formData.severity}
              onChange={(value) =>
                setFormData({ ...formData, severity: value })
              }
              placeholder="Select severity"
            />
          </div>

          {/* Classification and Reproducible */}
          <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
            <SelectField
              label="Classification"
              tooltip="Categorize the type of issue: UI Bug, Backend Error, Data Issue, etc"
              options={classificationOptions}
              value={formData.classification}
              onChange={(value) =>
                setFormData({ ...formData, classification: value })
              }
              placeholder="Select classification"
            />

            <SelectField
              label="Reproducible"
              tooltip="Specify whether the issue can be consistently reproduced"
              options={reproducibleOptions}
              value={formData.reproducible}
              onChange={(value) =>
                setFormData({ ...formData, reproducible: value })
              }
              placeholder="Select reproducibility"
            />
          </div>

          {/* Note */}
          <div className="text-sm text-red-500">
            Note: Email ID is used to know the reporter of this bug. Submitting your email ID will not add you as a user or give you access to portal data.
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <Button type="submit" className="gap-2">
              Save
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() =>
                setFormData({
                  issueName: "",
                  issueDescription: "",
                  email: "",
                  severity: "none",
                  classification: "none",
                  reproducible: "none",
                  attachedFile: null,
                })
              }
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </TooltipProvider>
  );
}