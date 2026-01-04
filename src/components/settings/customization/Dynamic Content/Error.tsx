import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, X, Info, Settings, Copy, AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";
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

interface ErrorPage {
  id: number;
  name: string;
  type: string;
  title: string;
  message: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  buttonType: string;
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

export default function Error() {
  const [errorPages] = useState<ErrorPage[]>([
    {
      id: 1,
      name: "Withdraw Disabled",
      type: "Withdraw Disabled",
      title: "Withdraw Disabled",
      message: "Thank you for your understanding",
      description: "Withdraw is currently disabled. Please contact our support team for assistance.",
      buttonText: "Back to Dashboard",
      buttonLink: "/user/dashboard",
      buttonType: "Primary",
    },
    {
      id: 2,
      name: "Withdraw Off Day",
      type: "Withdraw Off Day",
      title: "Withdrawals Not Available Today",
      message: "Withdrawal services are closed for the day",
      description: "Withdrawals are not available on this day. Please try again on the next business day.",
      buttonText: "Back to Dashboard",
      buttonLink: "/user/dashboard",
      buttonType: "Primary",
    },
    {
      id: 3,
      name: "Deposit Disabled",
      type: "Deposit Disabled",
      title: "Deposits Currently Unavailable",
      message: "We're unable to process deposits at this time",
      description: "Unfortunately, deposit services are temporarily disabled. Please try again later.",
      buttonText: "Back to Dashboard",
      buttonLink: "/user/dashboard",
      buttonType: "Primary",
    },
    {
      id: 4,
      name: "Transfer Money Disabled",
      type: "Transfer Money Disabled",
      title: "Transfers Currently Unavailable",
      message: "We're unable to process transfers at this time",
      description: "Unfortunately, transfer services are temporarily disabled. Please try again later.",
      buttonText: "Back to Dashboard",
      buttonLink: "/user/dashboard",
      buttonType: "Primary",
    },
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [selectedPage, setSelectedPage] = useState<ErrorPage | null>(null);
  const [formData, setFormData] = useState<ErrorPage | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const totalItems = errorPages.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  const paginatedData = errorPages.slice(startIndex, endIndex);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  const handleEdit = (page: ErrorPage) => {
    setSelectedPage(page);
    setFormData({ ...page });
    setOpenModal(true);
  };

  const handleSave = () => {
    console.log("Saving:", formData);
    setOpenModal(false);
  };

  const handleInputChange = (field: keyof ErrorPage, value: any) => {
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
              {paginatedData.map((page) => (
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
          <div className="flex justify-between items-center mt-4 px-3 pb-4 text-muted-foreground text-sm">
            <p>Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} Entries</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handlePrev} disabled={currentPage === 1}>
                <ChevronLeft size={16} />
              </Button>
              <span className="text-foreground">{currentPage} / {totalPages}</span>
              <Button variant="outline" size="sm" onClick={handleNext} disabled={currentPage === totalPages}>
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
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
                            Error Page Settings
                          </h3>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Customize the error page content and appearance
                        </p>
                      </div>

                      {/* Name */}
                      <div className="grid grid-cols-12 gap-5">
                        <label className="md:col-span-3 col-span-12 form-label">
                          <span className="inline-flex items-center gap-1">
                            Name
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="w-4 h-4 cursor-pointer" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Name to identify this error page</p>
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
                                <Info className="w-4 h-4 cursor-pointer" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Type of error page</p>
                              </TooltipContent>
                            </Tooltip>
                          </span>
                        </label>
                        <div className="md:col-span-9 col-span-12">
                          <SelectField
                            label=""
                            value={formData.type}
                            onChange={(value) => handleInputChange("type", value)}
                            disabled={true}
                            options={[
                              { value: "Withdraw Disabled", label: "Withdraw Disabled" },
                              { value: "Withdraw Off Day", label: "Withdraw Off Day" },
                              { value: "Deposit Disabled", label: "Deposit Disabled" },
                              { value: "Transfer Money Disabled", label: "Transfer Money Disabled" },
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
                                <Info className="w-4 h-4 cursor-pointer" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Main heading of the error page</p>
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
                            placeholder="e.g., Service Unavailable"
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
                                <Info className="w-4 h-4 cursor-pointer" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Brief message</p>
                              </TooltipContent>
                            </Tooltip>
                          </span>
                        </label>
                        <div className="md:col-span-9 col-span-12">
                          <InputField
                            type="text"
                            value={formData.message}
                            onChange={(e) =>
                              handleInputChange("message", e.target.value)
                            }
                            placeholder="e.g., Thank you for your understanding"
                          />
                        </div>
                      </div>

                      {/* Description */}
                      <div className="grid grid-cols-12 gap-5">
                        <label className="md:col-span-3 col-span-12 form-label">
                          <span className="inline-flex items-center gap-1">
                            Description
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="w-4 h-4 cursor-pointer" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Detailed description message</p>
                              </TooltipContent>
                            </Tooltip>
                          </span>
                        </label>
                        <div className="md:col-span-9 col-span-12">
                          <textarea
                            value={formData.description}
                            onChange={(e) =>
                              handleInputChange("description", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-input bg-background rounded-md"
                            rows={4}
                            placeholder="Write detailed description here..."
                          />
                        </div>
                      </div>

                      {/* Button Text */}
                      <div className="grid grid-cols-12 gap-5">
                        <label className="md:col-span-3 col-span-12 form-label">
                          <span className="inline-flex items-center gap-1">
                            Button Text
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="w-4 h-4 cursor-pointer" />
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
                                <Info className="w-4 h-4 cursor-pointer" />
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
                                <Info className="w-4 h-4 cursor-pointer" />
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

