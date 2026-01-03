import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, X, Info, Settings, Copy, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { InputField } from "@/components/form/InputField";
import { StatusToggle } from "@/components/form/Status";
import { SelectField } from "@/components/form/SelectField";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SuccessPage {
  id: number;
  name: string;
  type: string;
  title: string;
  subtitle: string;
  message: string;
  showQuote: boolean;
  quote: string;
  quoteAuthor: string;
  buttonText: string;
  buttonLink: string;
  buttonType: string;
  showTrustpilot: boolean;
}

const routeShortcodes = [
  { label: "Dashboard:", value: "{{route.dashboard}}" },
  { label: "Transactions:", value: "{{route.transactions}}" },
  { label: "Deposit:", value: "{{route.deposit}}" },
  { label: "Withdraw:", value: "{{route.withdraw}}" },
  { label: "Profile:", value: "{{route.profile}}" },
  { label: "Transfer:", value: "{{route.transfer}}" },
  { label: "Wallet:", value: "{{route.wallet}}" },
];

export default function Success() {
  const [successPages] = useState<SuccessPage[]>([
    {
      id: 1,
      name: "Default Deposit Success",
      type: "Deposit",
      title: "Payment Successful",
      subtitle: "Your deposit has been processed successfully",
      message:
        "Thank you for your trust in our platform. Your funds have been credited to your account and are ready to use.",
      showQuote: true,
      quote:
        "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      quoteAuthor: "Winston Churchill",
      buttonText: "Go to Dashboard",
      buttonLink: "/user/dashboard",
      buttonType: "Primary",
      showTrustpilot: false,
    },
    {
      id: 2,
      name: "Default Withdrawal Success",
      type: "Withdrawal",
      title: "Withdrawal Successful",
      subtitle: "Your withdrawal has been processed",
      message: "Your withdrawal request has been completed successfully.",
      showQuote: false,
      quote: "",
      quoteAuthor: "",
      buttonText: "Go to Dashboard",
      buttonLink: "/user/dashboard",
      buttonType: "Primary",
      showTrustpilot: false,
    },
    {
      id: 3,
      name: "Default Transfer Success",
      type: "Transfer",
      title: "Transfer Successful",
      subtitle: "Your transfer has been completed",
      message: "The transfer was successful.",
      showQuote: false,
      quote: "",
      quoteAuthor: "",
      buttonText: "Go to Dashboard",
      buttonLink: "/user/dashboard",
      buttonType: "Primary",
      showTrustpilot: false,
    },
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [selectedPage, setSelectedPage] = useState<SuccessPage | null>(null);
  const [formData, setFormData] = useState<SuccessPage | null>(null);

  const handleEdit = (page: SuccessPage) => {
    setSelectedPage(page);
    setFormData({ ...page });
    setOpenModal(true);
  };

  const handleSave = () => {
    console.log("Saving:", formData);
    setOpenModal(false);
  };

  const handleInputChange = (field: keyof SuccessPage, value: any) => {
    if (formData) {
      setFormData({ ...formData, [field]: value });
    }
  };

  return (
    <div className="space-y-6">
      {/* Table */}
      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-muted/60 text-sm">
              <tr>
                <th className="px-3 py-4">#</th>
                <th className="px-3 py-4">NAME</th>
                <th className="px-3 py-4">TYPE</th>
                <th className="px-3 py-4">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {successPages.map((page) => (
                <tr
                  key={page.id}
                  className="border-t border-border hover:bg-muted/30 "
                >
                  <td className="p-3">{page.id}</td>
                  <td className="p-3">{page.name}</td>
                  <td className="p-3">
                    <Badge variant="secondary" className="rounded-sm">
                      {page.type}
                    </Badge>
                  </td>
                  <td className="p-3">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleEdit(page)}
                    >
                      <Pencil size={14} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto p-0">
          {formData && (
            <>
              {/* Header */}
              <div className="sticky top-0 z-10 bg-background border-b px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  Edit {formData.name}
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpenModal(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                {/* Left Column - Route Shortcodes */}
                <div className="lg:col-span-1">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium">Route Shortcodes</h3>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="w-4 h-4 cursor-pointer" />
                          </TooltipTrigger>
                          <TooltipContent>
                           
                            <p>Use these shortcodes for button links</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                       
                      <div className="flex items-center gap-2 mb-4">
                        <AlertTriangle size={14} className="text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">Use these shortcodes for button links</p>
                      </div>
                      <div className="space-y-2">
                        {routeShortcodes.map((route, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-2 rounded bg-muted/50 text-sm"
                          >
                            <span className="text-muted-foreground">
                              {route.label}
                            </span>
                            <div className="flex items-center gap-2">
                              <code className="text-xs bg-background px-2 py-1 rounded">
                                {route.value}
                              </code>
                              <button
                                type="button"
                                onClick={() => navigator.clipboard.writeText(route.value)}
                                className="text-muted-foreground hover:text-foreground transition-colors"
                              >
                                <Copy className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column - Form Fields */}
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardContent className="p-6 space-y-6">
                      <div className="mb-6">
                        <div className="flex items-center gap-2">
                          <Pencil className="w-5 h-5 text-muted-foreground" />
                          <h3 className="text-lg font-semibold">
                            Success Page Settings
                          </h3>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Customize the success page content and appearance
                        </p>
                      </div>

                      {/* Name */}
                      <div className="grid grid-cols-12 gap-5">
                        <label className="md:col-span-3 col-span-12 form-label">
                          <span className="inline-flex items-center gap-1">
                            Name
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="w-4 h-4  cursor-pointer" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Name to identify this success page</p>
                              </TooltipContent>
                            </Tooltip>
                          </span>
                        </label>
                        <div className="md:col-span-9 col-span-12">
                          <InputField
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                              handleInputChange("name", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      {/* Type */}
                      <div className="grid grid-cols-12 gap-5">
                        <label className="md:col-span-3 col-span-12 form-label">
                          <span className="inline-flex items-center gap-1">
                            Type
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="w-4 h-4  cursor-pointer" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Type of success page</p>
                              </TooltipContent>
                            </Tooltip>
                          </span>
                        </label>
                        <div className="md:col-span-9 col-span-12">
                          <SelectField
                            label=""
                            value={formData.type}
                            disabled={true}
                            onChange={(value) => handleInputChange("type", value)}
                            options={[
                              { value: "Deposit", label: "Deposit" },
                              { value: "Withdrawal", label: "Withdrawal" },
                              { value: "Transfer", label: "Transfer" },
                            ]}
                          />
                        </div>
                      </div>

                      {/* Title */}
                      <div className="grid grid-cols-12 gap-5">
                        <label className="md:col-span-3 col-span-12 form-label">
                          <span className="inline-flex items-center gap-1">
                            Title
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="w-4 h-4  cursor-pointer" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Main heading of the success page</p>
                              </TooltipContent>
                            </Tooltip>
                          </span>
                        </label>
                        <div className="md:col-span-9 col-span-12">
                          <InputField
                            type="text"
                            value={formData.title}
                            onChange={(e) =>
                              handleInputChange("title", e.target.value)
                            }
                            placeholder="e.g., Payment Successful!"
                          />
                        </div>
                      </div>

                      {/* Subtitle */}
                      <div className="grid grid-cols-12 gap-5">
                        <label className="md:col-span-3 col-span-12 form-label">
                          <span className="inline-flex items-center gap-1">
                            Subtitle
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="w-4 h-4  cursor-pointer" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Subtitle or tagline</p>
                              </TooltipContent>
                            </Tooltip>
                          </span>
                        </label>
                        <div className="md:col-span-9 col-span-12">
                          <InputField
                            type="text"
                            value={formData.subtitle}
                            onChange={(e) =>
                              handleInputChange("subtitle", e.target.value)
                            }
                            placeholder="e.g., Your transaction was processed successfully"
                          />
                        </div>
                      </div>

                      {/* Message */}
                      <div className="grid grid-cols-12 gap-5">
                        <label className="md:col-span-3 col-span-12 form-label">
                          <span className="inline-flex items-center gap-1">
                            Message
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="w-4 h-4  cursor-pointer" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Main message body</p>
                              </TooltipContent>
                            </Tooltip>
                          </span>
                        </label>
                        <div className="md:col-span-9 col-span-12">
                          <textarea
                            value={formData.message}
                            onChange={(e) =>
                              handleInputChange("message", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-input bg-background rounded-md"
                            rows={4}
                            placeholder="Write your success message here..."
                          />
                        </div>
                      </div>

                      {/* Show Quote */}
                      <div className="grid grid-cols-12 gap-5">
                        <label className="md:col-span-3 col-span-12 form-label">
                          <span className="inline-flex items-center gap-1">
                            Show Quote
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="w-4 h-4  cursor-pointer" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Show / Hide quote section</p>
                              </TooltipContent>
                            </Tooltip>
                          </span>
                        </label>
                        <div className="md:col-span-9 col-span-12">
                          <StatusToggle
                            label=""
                            status={formData.showQuote ? "Active" : "Disabled"}
                            onChange={(status) =>
                              handleInputChange("showQuote", status === "Active")
                            }
                          />
                        </div>
                      </div>

                      {/* Quote */}
                      {formData.showQuote && (
                        <>
                          <div className="grid grid-cols-12 gap-5">
                            <label className="md:col-span-3 col-span-12 form-label">
                              <span className="inline-flex items-center gap-1">
                                Quote
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="w-4 h-4  cursor-pointer" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Inspirational quote</p>
                                  </TooltipContent>
                                </Tooltip>
                              </span>
                            </label>
                            <div className="md:col-span-9 col-span-12">
                              <textarea
                                value={formData.quote}
                                onChange={(e) =>
                                  handleInputChange("quote", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-input bg-background rounded-md"
                                rows={2}
                                placeholder="Enter an inspirational quote..."
                              />
                            </div>
                          </div>

                          {/* Quote Author */}
                          <div className="grid grid-cols-12 gap-5">
                            <label className="md:col-span-3 col-span-12 form-label">
                              <span className="inline-flex items-center gap-1">
                                Quote Author
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="w-4 h-4  cursor-pointer" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Author of the quote</p>
                                  </TooltipContent>
                                </Tooltip>
                              </span>
                            </label>
                            <div className="md:col-span-9 col-span-12">
                              <InputField
                                type="text"
                                value={formData.quoteAuthor}
                                onChange={(e) =>
                                  handleInputChange("quoteAuthor", e.target.value)
                                }
                                placeholder="e.g., - Winston Churchill"
                              />
                            </div>
                          </div>
                        </>
                      )}

                      {/* Success Image */}
                      <div className="grid grid-cols-12 gap-5">
                        <label className="md:col-span-3 col-span-12 form-label">
                          <span className="inline-flex items-center gap-1">
                            Success Image
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="w-4 h-4  cursor-pointer" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Upload a custom success image</p>
                              </TooltipContent>
                            </Tooltip>
                          </span>
                        </label>
                        <div className="md:col-span-9 col-span-12 space-y-3">
                         
                          <div className="rounded-md p-3">
                            <img
                              src="https://demo.brokeret.com/assets/global/images/sQEeTvAOU4x39HeN1J5G.png"
                              alt="Success preview"
                              className="w-20 h-20 object-contain"
                            />
                          </div>
                           <div className="flex items-center gap-3 border border-input rounded-md">
                            <input
                              type="file"
                              id="success-image-upload"
                              className="hidden"
                              accept="image/*"
                            />
                            <label
                              htmlFor="success-image-upload"
                              className="px-4 py-2 border border-input bg-background rounded-md cursor-pointer hover:bg-muted transition-colors text-sm"
                            >
                              Choose file
                            </label>
                            <span className="text-sm text-muted-foreground">No file chosen</span>
                          </div>
                          <small className="text-xs text-muted-foreground block">
                            Recommended: SVG or PNG (transparent background), max 2MB
                          </small>
                        </div>
                      </div>

                      {/* Button Text */}
                      <div className="grid grid-cols-12 gap-5">
                        <label className="md:col-span-3 col-span-12 form-label">
                          <span className="inline-flex items-center gap-1">
                            Button Text
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="w-4 h-4  cursor-pointer" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Text displayed on the button</p>
                              </TooltipContent>
                            </Tooltip>
                          </span>
                        </label>
                        <div className="md:col-span-9 col-span-12">
                          <InputField
                            type="text"
                            value={formData.buttonText}
                            onChange={(e) =>
                              handleInputChange("buttonText", e.target.value)
                            }
                            placeholder="e.g., Go to Dashboard"
                          />
                        </div>
                      </div>

                      {/* Button Link */}
                      <div className="grid grid-cols-12 gap-5">
                        <label className="md:col-span-3 col-span-12 form-label">
                          <span className="inline-flex items-center gap-1">
                            Button Link
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="w-4 h-4  cursor-pointer" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>URL or route shortcode for the button</p>
                              </TooltipContent>
                            </Tooltip>
                          </span>
                        </label>
                        <div className="md:col-span-9 col-span-12">
                          <InputField
                            type="text"
                            value={formData.buttonLink}
                            onChange={(e) =>
                              handleInputChange("buttonLink", e.target.value)
                            }
                            placeholder="e.g., {{route.dashboard}} or /user/dashboard"
                          />
                          <small className="text-xs text-muted-foreground block mt-2">
                           
                            Use route shortcodes from the sidebar or enter a full URL
                          </small>
                        </div>
                      </div>

                      {/* Button Type */}
                      <div className="grid grid-cols-12 gap-5">
                        <label className="md:col-span-3 col-span-12 form-label">
                          <span className="inline-flex items-center gap-1">
                            Button Type
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="w-4 h-4  cursor-pointer" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Button style</p>
                              </TooltipContent>
                            </Tooltip>
                          </span>
                        </label>
                        <div className="md:col-span-9 col-span-12">
                          <SelectField
                            label=""
                            value={formData.buttonType}
                            onChange={(value) =>
                              handleInputChange("buttonType", value)
                            }
                            options={[
                              { value: "Primary", label: "Primary" },
                              { value: "Secondary", label: "Secondary" },
                              { value: "Outline", label: "Outline" },
                            ]}
                          />
                        </div>
                      </div>

                      {/* Show Trustpilot Button */}
                      <div className="grid grid-cols-12 gap-5">
                        <label className="md:col-span-3 col-span-12 form-label">
                          <span className="inline-flex items-center gap-1">
                            Show Trustpilot Button
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="w-4 h-4  cursor-pointer" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Show Trustpilot review button</p>
                              </TooltipContent>
                            </Tooltip>
                          </span>
                        </label>
                        <div className="md:col-span-9 col-span-12">
                          <StatusToggle
                            label=""
                            status={formData.showTrustpilot ? "Active" : "Disabled"}
                            onChange={(status) =>
                              handleInputChange("showTrustpilot", status === "Active")
                            }
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Save Button - Bottom Right */}
                  <div className="flex justify-end">
                    <Button onClick={handleSave} size="lg">
                      Save Changes
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
