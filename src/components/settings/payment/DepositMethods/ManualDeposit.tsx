import { useState, useEffect } from "react";
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
import RichTextEditor from "@/components/form/RichTextEditor";
import { Input } from "@/components/ui/input";

/* Seed data */
const initialManualDepositMethods = [
    { logo: "https://demo.brokeret.com/assets/global/images/CFHcj4dqNVEXZcQoa2F7.png", title: "Bank Transfer - PKR", status: "Active", processing: "Instant", fee: "0", limits: "10 - 10000 USDT TRC20", branches: "N/A" },
    { logo: "https://demo.brokeret.com/assets/global/images/CFHcj4dqNVEXZcQoa2F7.png", title: "ETH-UniWire", status: "Active", processing: "Automated", fee: "0", limits: "1 - 1000 ETH", branches: "N/A" },
    { logo: "https://demo.brokeret.com/assets/global/images/CFHcj4dqNVEXZcQoa2F7.png", title: "BTC-Uniwire", status: "Disabled", processing: "Automated", fee: "0", limits: "1 - 10000 BTC", branches: "N/A" },
];

const statusClasses: Record<string, string> = {
    Active: "bg-[#0d2e1e] text-[#4ade80] border border-[#1a5e41]",
    Disabled: "bg-[#2e0f0f] text-[#f87171] border border-[#7f1d1d]",
};
type Props = {
    openAddIntent?: boolean;
    onAddIntentConsumed?: () => void;
};


export default function ManualDeposit({ openAddIntent, onAddIntentConsumed }: Props) {
    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [methods, setMethods] = useState(initialManualDepositMethods);
    const [logoPreview, setLogoPreview] = useState<string>("");

    const [formStatus, setFormStatus] = useState<"Active" | "Disabled">("Active");
    const [globalAccess, setGlobalAccess] = useState<"Active" | "Disabled">("Disabled");
    const [manualRate, setManualRate] = useState<"Active" | "Disabled">("Disabled");
    const [customBank, setCustomBank] = useState<"Active" | "Disabled">("Disabled");
    const [fields, setFields] = useState<{ name: string; type: string; required: string }[]>([]);

    useEffect(() => {
        if (openAddIntent) {
            handleAddNew();
            onAddIntentConsumed?.();
        }
    }, [openAddIntent]);

    const [formData, setFormData] = useState({
        name: "",
        codeName: "",
        currency: "",
        charges: "",
        chargeType: "percentage",
        conversionRate: "",
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

    const handleAddField = () => setFields([...fields, { name: "", type: "Input Text", required: "No" }]);
    const handleRemoveField = (index: number) => {
        const updated = [...fields];
        updated.splice(index, 1);
        setFields(updated);
    };

    const resetForm = () => {
        setFormData({
            name: "", codeName: "", currency: "", charges: "", chargeType: "percentage",
            conversionRate: "", minDeposit: "", maxDeposit: "", processingTime: "",
            countries: [], branches: [], logo: "",
        });
        setLogoPreview("");
        setFormStatus("Active");
        setGlobalAccess("Disabled");
        setManualRate("Disabled");
        setCustomBank("Disabled");
        setFields([]);
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
            name: item.title || "",
            codeName: "",
            currency: "",
            charges: item.fee || "",
            chargeType: "percentage",
            conversionRate: "",
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
                <div className="flex justify-between items-center">

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {methods.map((item, index) => (
                        <Card key={index} className="border border-border bg-card">
                            <CardContent className="p-6 space-y-4">
                                <div className="flex justify-between items-center">
                                    <img className="inline-block h-10 object-contain" src={item.logo} alt={item.title} />
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button size="icon" variant="ghost"><MoreVertical size={16} /></Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => handleUpdate(item, index)}><Pencil size={14} className="mr-2" />Update</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleDelete(item, index)} className="text-destructive focus:text-destructive">
                                                <Trash2 size={14} className="mr-2" />Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>

                                <div className="flex justify-between items-center">
                                    <h2 className="font-semibold">{item.title}</h2>
                                    <span className={`px-3 py-1 rounded-md text-xs ${statusClasses[item.status]}`}>{item.status}</span>
                                </div>

                                <div className="text-sm text-muted-foreground space-y-2">
                                    <div className="flex justify-between"><span>Processing Time</span><span>Manual Approval</span></div>
                                    <div className="flex justify-between"><span>Fee</span><span>{item.fee}</span></div>
                                    <div className="flex justify-between"><span>Limits</span><span>{item.limits}</span></div>
                                    <div className="flex justify-between"><span>Branches</span><span>{item.branches}</span></div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {openModal && (
                    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
                        <Card className="w-full max-w-5xl bg-card max-h-[90vh] overflow-hidden flex flex-col">
                            <div className="flex justify-between items-center px-6 py-4 border-b border-border flex-shrink-0">
                                <h2 className="text-xl font-semibold">{editIndex !== null ? "Update Manual Deposit Method" : "Add New Manual Deposit Method"}</h2>
                                <Button size="icon" variant="ghost" onClick={closeModal}><X size={20} /></Button>
                            </div>

                            <div className="p-6 overflow-y-auto flex-1">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="col-span-2">
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
                                            className="h-32 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center text-muted-foreground cursor-pointer hover:bg-muted/20 transition-colors"
                                        >
                                            {logoPreview ? (
                                                <img src={logoPreview} alt="Logo preview" className="h-24 object-contain" />
                                            ) : (
                                                <>
                                                    <Plus size={32} />
                                                    <span className="text-sm mt-2">Upload Logo</span>
                                                </>
                                            )}
                                        </label>
                                    </div>
                                    <InputField label="Name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Method name" tooltip="Friendly name" />
                                    <InputField label="Code Name" name="codeName" value={formData.codeName} onChange={handleInputChange} placeholder="method-code" tooltip="Internal code name" />

                                    <SelectField
                                        label="Currency"
                                        options={[{ value: "usd", label: "USD" }, { value: "eur", label: "EUR" }, { value: "gbp", label: "GBP" }]}
                                        value={formData.currency}
                                        onChange={(value) => handleSelectChange("currency", value)}
                                        placeholder="Select Currency"
                                        tooltip="Transaction currency"
                                    />

                                    <InputField
                                        label="Charges"
                                        name="charges"
                                        type="number"
                                        value={formData.charges}
                                        onChange={handleInputChange}
                                        placeholder="0"
                                        tooltip="Percentage or fixed"
                                        suffix={
                                            <select
                                                name="chargeType"
                                                value={formData.chargeType}
                                                onChange={(e) => handleSelectChange("chargeType", e.target.value)}
                                                className="outline-none bg-transparent"
                                            >
                                                <option value="percentage">%</option>
                                                <option value="fixed">$</option>
                                            </select>
                                        }
                                    />

                                    <div>
                                        <StatusToggle label="Manual Conversion Rate" status={manualRate} onChange={setManualRate} tooltip="Toggle manual rate" />
                                         <p className="text-xs text-muted-foreground mt-2">
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
                                        tooltip="Define conversion rate"
                                        prefix="1 USD ="
                                    />

                                    <InputField label="Minimum Deposit" name="minDeposit" type="number" value={formData.minDeposit} onChange={handleInputChange} placeholder="10" tooltip="Minimum deposit" suffix="USD" />
                                    <InputField label="Maximum Deposit" name="maxDeposit" type="number" value={formData.maxDeposit} onChange={handleInputChange} placeholder="10000" tooltip="Maximum deposit" suffix="USD" />
                                    <InputField label="Processing Time" name="processingTime" value={formData.processingTime} onChange={handleInputChange} placeholder="Manual Approval" tooltip="Processing time" />

                                    <SelectField
                                        label="Select Countries Authorized to Use"
                                        options={[{ value: "all", label: "All Countries" }, { value: "us", label: "United States" }, { value: "uk", label: "United Kingdom" }]}
                                        values={formData.countries}
                                        onValuesChange={(values) => handleMultiSelectChange("countries", values)}
                                        placeholder="Select an Option"
                                        isMulti
                                    />
                                                                   <div className="col-span-2">
                                  <Button onClick={handleAddField}>Add Field Option</Button>
                                </div>
                                
                                <div className="col-span-2 space-y-3">
                                  {fields.map((field, index) => (
                                    <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                                      <input
                                        className="rounded-md border border-border bg-transparent px-3 py-2"
                                        placeholder="Field Name"
                                        value={field.name}
                                        onChange={(e) => {
                                          const nf = [...fields];
                                          nf[index].name = e.target.value;
                                          setFields(nf);
                                        }}
                                      />
                                
                                      <select
                                        className="rounded-md border border-border bg-transparent px-3 py-2"
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
                                          className="rounded-md border border-border bg-transparent px-3 py-2 flex-1"
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

                                    <div className="col-span-2">
                                        <RichTextEditor
                                            label="Payment Details"
                                            value={""}
                                            onChange={(value) => {
                                                // Handle rich text change
                                            }}
                                            tooltip="Instructions for users"

                                        />
                                    </div>
                                    <div className="col-span-2">
                                    <SelectField
                                        label="Assign Branches"
                                        options={[{ value: "main", label: "Main Branch" }, { value: "branch1", label: "Branch 1" }, { value: "branch2", label: "Branch 2" }]}
                                        values={formData.branches}
                                        onValuesChange={(values) => handleMultiSelectChange("branches", values)}
                                        placeholder="Select an Option"
                                        tooltip="Leave empty for all branches"
                                        isMulti
                                    />
                                    </div>

                                    <StatusToggle label="Status" status={formStatus} onChange={setFormStatus} tooltip="Toggle to enable or disable the method for users" />
                                    <StatusToggle label="Global Access" status={globalAccess} onChange={setGlobalAccess} tooltip="Enable this to restrict the method to only users with no branch or specifically assigned branches" />
                                    <StatusToggle label="Is Custom Requested Bank Details" status={customBank} onChange={setCustomBank} tooltip="Enable this to allow users to request custom bank details for this method" />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 px-6 py-4 border-t border-border flex-shrink-0">
                                <Button variant="destructive" onClick={closeModal}>Cancel</Button>
                                <Button onClick={handleSave}>{editIndex !== null ? "Update Method" : "Save Changes"}</Button>
                            </div>
                        </Card>
                    </div>
                )}

                {openDeleteModal && selectedItem && (
                    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
                        <Card className="w-full max-w-md bg-card">
                            <CardContent className="p-8 text-center space-y-6">
                                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-900/30 ring-4 ring-red-900/20">
                                    <Trash2 className="text-red-500" size={32} />
                                </div>
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-semibold">Delete Method?</h2>
                                    <p className="text-muted-foreground">
                                        Are you sure you want to delete <span className="font-semibold text-foreground">"{selectedItem.title}"</span>? This action cannot be undone.
                                    </p>
                                </div>
                                <div className="flex justify-center gap-3 pt-2">
                                    <Button variant="outline" onClick={() => { setOpenDeleteModal(false); setSelectedItem(null); }}>Cancel</Button>
                                    <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </TooltipProvider>
    );
}