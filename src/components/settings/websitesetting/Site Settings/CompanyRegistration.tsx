import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Trash2 } from "lucide-react";
import { StatusToggle } from "@/components/form/Status";

interface FormField {
  name: string;
  type: string;
  required: string;
}

export default function CompanyRegistration() {
  const [formStatus, setFormStatus] = useState<"Active" | "Disabled">("Active");
  const [adminApproval, setAdminApproval] = useState<"Active" | "Disabled">("Disabled");
  const [fields, setFields] = useState<FormField[]>([
    {
      name: "test",
      type: "Input Text",
      required: "Required",
    },
  ]);

  const handleAddField = () => {
    const newField: FormField = {
      name: "",
      type: "Input Text",
      required: "Required",
    };
    setFields([...fields, newField]);
  };

  const handleRemoveField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div>
          <h2 className="text-base sm:text-lg lg:text-xl font-semibold mb-6">
            Register Company Form Builder
          </h2>

          <Card className="shadow-card border border-border bg-card">
            <CardContent className="p-4 sm:p-6 space-y-6">
              {/* Add Field Button */}
              <div className="col-span-2">
                <Button onClick={handleAddField}>Add Field Option</Button>
              </div>

              {/* Dynamic Fields */}
              <div className="col-span-2 space-y-3">
                {fields.map((field, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
                  >
                    <input
                      className="rounded-md border border-border bg-transparent px-3 py-2 h-10"
                      placeholder="Field Name"
                      value={field.name}
                      onChange={(e) => {
                        const nf = [...fields];
                        nf[index].name = e.target.value;
                        setFields(nf);
                      }}
                    />

                    <select
                      className="rounded-md border border-border bg-transparent px-3 py-2 h-10"
                      value={field.type}
                      onChange={(e) => {
                        const nf = [...fields];
                        nf[index].type = e.target.value;
                        setFields(nf);
                      }}
                    >
                      <option>Input Text</option>
                      <option>Dropdown</option>
                      <option>Date</option>
                      <option>File Upload</option>
                    </select>

                    <div className="flex items-end gap-2">
                      <select
                        className="rounded-md border border-border bg-transparent px-3 py-2 flex-1 h-10"
                        value={field.required}
                        onChange={(e) => {
                          const nf = [...fields];
                          nf[index].required = e.target.value;
                          setFields(nf);
                        }}
                      >
                        <option>Required</option>
                        <option>Optional</option>
                      </select>

                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => handleRemoveField(index)}
                      >
                        <Trash2 size={20} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Form Status and Admin Approval */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                {/* Form Status */}
                <StatusToggle
                  label="Form Status"
                  tooltip="Enable or disable the company registration form"
                  status={formStatus}
                  onChange={setFormStatus}
                />

                {/* Admin Approval Required */}
                <StatusToggle
                  label="Admin Approval Required"
                  tooltip="If enabled, new company registrations will require admin approval"
                  status={adminApproval}
                  onChange={setAdminApproval}
                />
              </div>

              {/* Save Button */}
              <div className="flex justify-end pt-4">
                <Button variant="default" className="w-full sm:w-auto px-8">
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
}
