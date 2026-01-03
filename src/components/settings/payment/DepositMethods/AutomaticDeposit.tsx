import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, X, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { InputField } from "@/components/form/InputField";
import { SelectField } from "@/components/form/SelectField";
import { StatusToggle } from "@/components/form/Status";
import { TooltipProvider } from "@/components/ui/tooltip";

/* Gateway logos mapping */
const gatewayLogos: Record<string, string> = {
  match2pay: "https://cdn.brokeret.com/crm-assets/admin/pg/match2pay.webp",
  uniwire: "https://cdn.brokeret.com/crm-assets/admin/pg/uniwire.png",
  jenapay: "https://jenapay.com/wp-content/uploads/2023/09/Jena-Pay-Logo-1.png",
  stripe: "https://cdn.brokeret.com/crm-assets/admin/pg/stripe.webp",
};

/* Seed data */
const initialAutoDepositMethods = [
  { provider: "Stripe", logo: "https://cdn.brokeret.com/crm-assets/admin/pg/stripe.webp", title: "USDT", status: "Active", processing: "Instant", fee: "0", limits: "10 - 10000 USDT TRC20", branches: "N/A" },
  { provider: "uniwire", logo: "https://cdn.brokeret.com/crm-assets/admin/pg/uniwire.png", title: "ETH-UniWire", status: "Active", processing: "Automated", fee: "0", limits: "1 - 1000 ETH", branches: "N/A" },
  { provider: "match2pay", logo: "https://cdn.brokeret.com/crm-assets/admin/pg/match2pay.webp", title: "USD TRC20", status: "Active", processing: "Automated", fee: "0", limits: "1 - 50000 USDC TRC20", branches: "N/A" },
  { provider: "jenapay", logo: "https://jenapay.com/wp-content/uploads/2023/09/Jena-Pay-Logo-1.png", title: "test", status: "Active", processing: "Automated", fee: "0", limits: "1 - 10000 USD", branches: "N/A" },
];

const statusClasses: Record<string, string> = {
  Active: "bg-[#0d2e1e] text-[#4ade80] border border-[#1a5e41]",
  Disabled: "bg-[#2e0f0f] text-[#f87171] border border-[#7f1d1d]",
};

type Props = {
  openAddIntent?: boolean;
  onAddIntentConsumed?: () => void;
};

export default function AutomaticDeposit({ openAddIntent, onAddIntentConsumed }: Props) {
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [methods, setMethods] = useState(initialAutoDepositMethods);
  const [logoPreview, setLogoPreview] = useState<string>("");

  const [formStatus, setFormStatus] = useState<"Active" | "Disabled">("Active");
  const [globalAccess, setGlobalAccess] = useState<"Active" | "Disabled">("Disabled");
  const [manualRate, setManualRate] = useState<"Active" | "Disabled">("Disabled");

  useEffect(() => {
    if (openAddIntent) {
      handleAddNew();
      onAddIntentConsumed?.();
    }
  }, [openAddIntent]);

  const [formData, setFormData] = useState({
    gateway: "",
    currency: "",
    name: "",
    charges: "",
    chargeType: "percentage",
    conversionRate: "",
    currencySymbol: "",
    minDeposit: "",
    maxDeposit: "",
    processingTime: "",
    countries: [] as string[],
    branches: [] as string[],
    logo: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
    
    if (name === "gateway" && gatewayLogos[value]) {
      setFormData(prev => ({ ...prev, [name]: value, logo: gatewayLogos[value] }));
      setLogoPreview(gatewayLogos[value]);
    }
  };
  
  const handleMultiSelectChange = (name: string, values: string[]) => {
    setFormData({ ...formData, [name]: values });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setLogoPreview(result);
        setFormData({ ...formData, logo: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({
      gateway: "", currency: "", name: "", charges: "", chargeType: "percentage",
      conversionRate: "", currencySymbol: "", minDeposit: "", maxDeposit: "",
      processingTime: "", countries: [], branches: [], logo: "",
    });
    setLogoPreview("");
    setFormStatus("Active");
    setGlobalAccess("Disabled");
    setManualRate("Disabled");
    setEditIndex(null);
    setSelectedItem(null);
  };

  const handleAddNew = () => {
    resetForm();
    setOpenModal(true);
  };

  const handleUpdate = (item: any, index: number) => {
    setEditIndex(index);
    setSelectedItem(item);
    setFormData({
      gateway: item.provider || "",
      currency: "",
      name: item.title || "",
      charges: item.fee || "",
      chargeType: "percentage",
      conversionRate: "",
      currencySymbol: "",
      minDeposit: item.limits?.split(" - ")[0] || "",
      maxDeposit: item.limits?.split(" - ")[1]?.split(" ")[0] || "",
      processingTime: item.processing || "",
      countries: [],
      branches: item.branches !== "N/A" ? item.branches.split(", ") : [],
      logo: item.logo || "",
    });
    setLogoPreview(item.logo || "");
    setFormStatus(item.status || "Active");
    setOpenModal(true);
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      alert("Method name is required");
      return;
    }
    const payload = {
      provider: formData.gateway,
      logo: formData.logo,
      title: formData.name,
      status: formStatus,
      processing: formData.processingTime,
      fee: formData.charges,
      limits: `${formData.minDeposit} - ${formData.maxDeposit}`,
      branches: formData.branches.length ? formData.branches.join(", ") : "N/A",
    };
    if (editIndex !== null) {
      const updated = [...methods];
      updated[editIndex] = payload;
      setMethods(updated);
    } else {
      setMethods([...methods, payload]);
    }
    closeModal();
  };

  const closeModal = () => {
    setOpenModal(false);
    resetForm();
  };

  const handleDelete = (item: any, index: number) => {
    setSelectedItem(item);
    setEditIndex(index);
    setOpenDeleteModal(true);
  };

  const confirmDelete = () => {
    if (editIndex !== null) {
      setMethods(methods.filter((_, i) => i !== editIndex));
    }
    setOpenDeleteModal(false);
    resetForm();
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Responsive Grid with custom shadow-card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4 md:gap-6">
          {methods.map((item, index) => (
            <Card key={index} className="border border-border bg-card shadow-card hover-lift">
              <CardContent className="p-4 md:p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <img className="inline-block h-8 md:h-10 object-contain" src={item.logo} alt={item.title} />

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <MoreVertical size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleUpdate(item, index)}>
                        <Pencil size={14} className="mr-2" />
                        Update
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(item, index)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 size={14} className="mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <h2 className="font-semibold text-sm md:text-base">{item.title}</h2>
                  <span className={`px-2 md:px-3 py-1 rounded-md text-xs whitespace-nowrap ${statusClasses[item.status]}`}>
                    {item.status}
                  </span>
                </div>

                <div className="text-xs md:text-sm text-text-muted space-y-2">
                  <div className="flex justify-between gap-2">
                    <span className="truncate">Processing Time</span>
                    <span className="font-medium text-foreground">{item.processing}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span>Fee</span>
                    <span className="font-medium text-foreground">{item.fee}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span>Limits</span>
                    <span className="font-medium text-foreground text-right">{item.limits}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span>Branches</span>
                    <span className="font-medium text-foreground">{item.branches}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Modal - Responsive with shadow-card */}
        {openModal && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-2 sm:p-4">
            <Card className="w-full max-w-[95vw] sm:max-w-4xl lg:max-w-5xl bg-card shadow-card max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col">
              <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 border-b border-border flex-shrink-0">
                <h2 className="text-lg sm:text-xl font-semibold truncate pr-4">
                  {editIndex !== null ? "Update Deposit Method" : "Add New Deposit Method"}
                </h2>
                <Button size="icon" variant="ghost" onClick={closeModal} className="flex-shrink-0">
                  <X size={20} />
                </Button>
              </div>

              <div className="p-4 sm:p-6 overflow-y-auto flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="col-span-1 md:col-span-2">
                    <label className="text-sm font-medium mb-2 block">
                      {editIndex !== null ? "Update Method Logo" : "Add Method Logo"}
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                      id="logo-upload"
                    />
                    <label
                      htmlFor="logo-upload"
                      className="h-28 sm:h-32 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center text-text-muted cursor-pointer hover:bg-muted/20 transition-all duration-200"
                    >
                      {logoPreview ? (
                        <img src={logoPreview} alt="Logo preview" className="h-20 sm:h-24 object-contain" />
                      ) : (
                        <>
                          <Plus size={28} className="sm:size-32" />
                          <span className="text-xs sm:text-sm mt-2">Upload Logo</span>
                        </>
                      )}
                    </label>
                  </div>

                  <SelectField
                    label="Automatic Gateway"
                    options={[
                      { value: "match2pay", label: "Match2Pay" },
                      { value: "uniwire", label: "UniWire" },
                      { value: "jenapay", label: "JenaPay" },
                      { value: "stripe", label: "Stripe" },
                    ]}
                    value={formData.gateway}
                    onChange={(value) => handleSelectChange("gateway", value)}
                    placeholder="Select Gateway"
                    tooltip="Select the payment gateway (e.g., Stripe, PayPal) for automatic processing"
                  />

                  <SelectField
                    label="Gateway Supported Currency"
                    options={[
                      { value: "usdt", label: "USDT TRC20" },
                      { value: "eth", label: "ETH" },
                      { value: "btc", label: "BTC" },
                      { value: "usdc", label: "USDC TRC20" },
                    ]}
                    value={formData.currency}
                    onChange={(value) => handleSelectChange("currency", value)}
                    placeholder="Select Currency"
                    tooltip="The currency used by the selected gateway"
                  />

                  <InputField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Method name"
                    tooltip="Enter a user-friendly name for this deposit method"
                  />

                  <InputField
                    label="Charges"
                    name="charges"
                    type="number"
                    value={formData.charges}
                    onChange={handleInputChange}
                    placeholder="0"
                    tooltip="Set the transaction fee as a percentage or fixed amount"
                    suffix={
                      <select
                        name="chargeType"
                        value={formData.chargeType}
                        onChange={(e) => handleSelectChange("chargeType", e.target.value)}
                        className="outline-none bg-transparent text-sm"
                      >
                        <option value="percentage">%</option>
                        <option value="fixed">$</option>
                      </select>
                    }
                  />

                  <div>
                    <StatusToggle
                      label="Manual Conversion Rate"
                      status={manualRate}
                      onChange={setManualRate}
                      tooltip="Enable to set manually conversion rate"
                    />
                    <p className="text-xs text-text-muted mt-2">
                      Manage Auto Exchange Rate main setting{" "}
                      <a href="#" className="text-primary hover:underline">click here</a>
                    </p>
                  </div>

                  <InputField
                    label="Conversion Rate"
                    name="conversionRate"
                    value={formData.conversionRate}
                    onChange={handleInputChange}
                    placeholder="1"
                    disabled={manualRate === "Disabled"}
                    tooltip="Define the conversion from 1 USD to the target currency"
                    prefix="1 USD ="
                    suffix="USD"
                  />

                  <InputField
                    label="Currency Symbol"
                    name="currencySymbol"
                    value={formData.currencySymbol}
                    onChange={handleInputChange}
                    disabled
                    tooltip="The symbol representing the transaction currency (e.g., $, €, ₿)"
                  />

                  <InputField
                    label="Minimum Deposit"
                    name="minDeposit"
                    type="number"
                    value={formData.minDeposit}
                    onChange={handleInputChange}
                    placeholder="10"
                    tooltip="The minimum deposit allowed using this method"
                    suffix="USD"
                  />

                  <InputField
                    label="Maximum Deposit"
                    name="maxDeposit"
                    type="number"
                    value={formData.maxDeposit}
                    onChange={handleInputChange}
                    placeholder="10000"
                    tooltip="The maximum deposit limit for this method"
                    suffix="USD"
                  />

                  <InputField
                    label="Processing Time"
                    name="processingTime"
                    value={formData.processingTime}
                    onChange={handleInputChange}
                    placeholder="Instant"
                    tooltip="Specify the expected time to process a deposit (e.g., 1-2 hours)"
                  />

                  <SelectField
                    label="Select Countries Authorized to Use"
                    options={[
                      { value: "all", label: "All Countries" },
                      { value: "us", label: "United States" },
                      { value: "uk", label: "United Kingdom" },
                      { value: "eu", label: "European Union" },
                    ]}
                    values={formData.countries}
                    onValuesChange={(values) => handleMultiSelectChange("countries", values)}
                    placeholder="Select an Option"
                    tooltip="Select 'All' to make this payment method available in all countries"
                    isMulti
                  />

                  <div>
                    <SelectField
                      label="Assign Branches"
                      options={[
                        { value: "main", label: "Main Branch" },
                        { value: "branch1", label: "Branch 1" },
                        { value: "branch2", label: "Branch 2" },
                      ]}
                      values={formData.branches}
                      onValuesChange={(values) => handleMultiSelectChange("branches", values)}
                      placeholder="Select an Option"
                      tooltip="Select branches where this deposit method will be available"
                      isMulti
                    />
                    <span className="text-xs font-Inter font-normal text-text-muted block mt-1">
                      Leave empty to make available for all branches.
                    </span>
                  </div>

                  <StatusToggle label="Status" status={formStatus} onChange={setFormStatus} tooltip="Toggle to enable or disable the method for users" />
                  <StatusToggle label="Global Access" status={globalAccess} onChange={setGlobalAccess} tooltip="Enable this to restrict the method to only users with no branch or specifically assigned branches" />
                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 px-4 sm:px-6 py-3 sm:py-4 border-t border-border flex-shrink-0">
                <Button variant="destructive" onClick={closeModal} className="w-full sm:w-auto">Cancel</Button>
                <Button onClick={handleSave} className="w-full sm:w-auto">
                  {editIndex !== null ? "Update Method" : "Add Method"}
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Delete Modal - Responsive with shadow-card */}
        {openDeleteModal && selectedItem && (
          <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
            <Card className="w-full max-w-sm sm:max-w-md bg-card shadow-card">
              <CardContent className="p-6 sm:p-8 text-center space-y-4 sm:space-y-6">
                <div className="mx-auto flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-red-900/30 ring-4 ring-red-900/20">
                  <Trash2 className="text-red-500" size={28} />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl sm:text-2xl font-semibold">Delete Method?</h2>
                  <p className="text-sm sm:text-base text-text-muted">
                    Are you sure you want to delete <span className="font-semibold text-foreground">"{selectedItem.title}"</span>?
                    This action cannot be undone.
                  </p>
                </div>
                <div className="flex flex-col-reverse sm:flex-row justify-center gap-3 pt-2">
                  <Button variant="outline" onClick={() => { setOpenDeleteModal(false); setSelectedItem(null); }} className="w-full sm:w-auto">
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={confirmDelete} className="w-full sm:w-auto">
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}