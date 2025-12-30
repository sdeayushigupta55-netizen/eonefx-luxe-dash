import { useState, useEffect } from "react";
import { Info, ListCheck, Settings2, UserSquare, X, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { InputField } from "@/components/form/InputField";
import { StatusToggle } from "@/components/form/Status";

// --- Sumsub Modal ---
function SumsubModal({ open, initialData, onClose, onSave }: {
  open: boolean;
  initialData?: {
    appToken: string;
    appSecret: string;
    levelName: string;
    status: boolean;
  };
  onClose: () => void;
  onSave: (data: { appToken: string; appSecret: string; levelName: string; status: boolean }) => void;
}) {
  const [appToken, setAppToken] = useState(initialData?.appToken || "");
  const [appSecret, setAppSecret] = useState(initialData?.appSecret || "");
  const [levelName, setLevelName] = useState(initialData?.levelName || "");
  const [status, setStatus] = useState(initialData?.status || false);

  useEffect(() => {
    setAppToken(initialData?.appToken || "");
    setAppSecret(initialData?.appSecret || "");
    setLevelName(initialData?.levelName || "");
    setStatus(initialData?.status || false);
  }, [initialData, open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-[#181e29] rounded-xl p-8 w-full max-w-lg relative">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Update Sumsub (Automated KYC)</h2>
          <Button size="icon" variant="ghost" onClick={onClose}><X size={22} /></Button>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">App Token</label>
          <input className="w-full rounded-md border border-border bg-transparent px-3 py-2" value={appToken} onChange={e => setAppToken(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">App Secret Id</label>
          <input className="w-full rounded-md border border-border bg-transparent px-3 py-2" type="password" value={appSecret} onChange={e => setAppSecret(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Level Name</label>
          <input className="w-full rounded-md border border-border bg-transparent px-3 py-2" value={levelName} onChange={e => setLevelName(e.target.value)} />
        </div>
        <div className="mb-4 flex items-center gap-2">
          <label className="font-medium">Status:</label>
          <Switch checked={status} onCheckedChange={setStatus} />
        </div>
        <div className="flex justify-end gap-4 mt-8">
          <Button className="bg-primary" onClick={() => onSave({ appToken, appSecret, levelName, status })}>Save Changes</Button>
          <Button variant="destructive" onClick={onClose}><X size={22} /> Cancel</Button>
        </div>
      </div>
    </div>
  );
}

// --- Veriff Modal ---
function VeriffModal({ open, initialData, onClose, onSave }: {
  open: boolean;
  initialData?: {
    apiKey: string;
    sharedSecret: string;
    baseUrl: string;
    integrationId: string;
    levelName: string;
    status: boolean;
  };
  onClose: () => void;
  onSave: (data: { apiKey: string; sharedSecret: string; baseUrl: string; integrationId: string; levelName: string; status: boolean }) => void;
}) {
  const [apiKey, setApiKey] = useState(initialData?.apiKey || "");
  const [sharedSecret, setSharedSecret] = useState(initialData?.sharedSecret || "");
  const [baseUrl, setBaseUrl] = useState(initialData?.baseUrl || "");
  const [integrationId, setIntegrationId] = useState(initialData?.integrationId || "");
  const [levelName, setLevelName] = useState(initialData?.levelName || "");
  const [status, setStatus] = useState(initialData?.status || false);

  useEffect(() => {
    setApiKey(initialData?.apiKey || "");
    setSharedSecret(initialData?.sharedSecret || "");
    setBaseUrl(initialData?.baseUrl || "");
    setIntegrationId(initialData?.integrationId || "");
    setLevelName(initialData?.levelName || "");
    setStatus(initialData?.status || false);
  }, [initialData, open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-[#181e29] rounded-xl p-8 w-full max-w-lg relative">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Update Veriff (Automated KYC)</h2>
          <Button size="icon" variant="ghost" onClick={onClose}><X size={22} /></Button>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Api Key</label>
          <input className="w-full rounded-md border border-border bg-transparent px-3 py-2" value={apiKey} onChange={e => setApiKey(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Shared Secret</label>
          <input className="w-full rounded-md border border-border bg-transparent px-3 py-2" type="password" value={sharedSecret} onChange={e => setSharedSecret(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Base Url</label>
          <input className="w-full rounded-md border border-border bg-transparent px-3 py-2" value={baseUrl} onChange={e => setBaseUrl(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Integration Id</label>
          <input className="w-full rounded-md border border-border bg-transparent px-3 py-2" value={integrationId} onChange={e => setIntegrationId(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Level Name</label>
          <input className="w-full rounded-md border border-border bg-transparent px-3 py-2" value={levelName} onChange={e => setLevelName(e.target.value)} />
        </div>
        <div className="mb-4 flex items-center gap-2">
          <label className="font-medium">Status:</label>
          <Switch checked={status} onCheckedChange={setStatus} />
        </div>
        <div className="flex justify-end gap-4 mt-8">
          <Button className="bg-primary" onClick={() => onSave({ apiKey, sharedSecret, baseUrl, integrationId, levelName, status })}>Save Changes</Button>
          <Button variant="destructive" onClick={onClose}><X size={22} /> Cancel</Button>
        </div>
      </div>
    </div>
  );
}

// --- Main KYC Modal and Tab logic ---
const statusClasses: Record<string, string> = {
  Active: "bg-[#0d2e1e] text-[#4ade80] border border-[#1a5e41]",
  Disabled: "bg-[#2e0f0f] text-[#f87171] border border-[#7f1d1d]",
};

type KycMethod = {
  id: number;
  name: string;
  status?: boolean;
  fields?: { fieldName: string; type: string; required: boolean }[];
};

const KycTab = () => {
  const [modalOpen, setModalOpen] = useState<1 | 2 | 3 | null>(null);
  const [kycStatus1, setKycStatus1] = useState(false);
  const [kycStatus2, setKycStatus2] = useState(false);
  const [kycStatus3, setKycStatus3] = useState(false);

  const [kycMethods1, setKycMethods1] = useState<KycMethod[]>([
    { id: 1, name: "Email ", status: true, fields: [{ fieldName: "Email", type: "Input Text", required: true }] },
    { id: 2, name: "Phone ", status: false, fields: [{ fieldName: "Phone", type: "Input Text", required: true }] },
  ]);
  const [kycMethods2, setKycMethods2] = useState<KycMethod[]>([
    { id: 3, name: "Passport", status: true, fields: [{ fieldName: "Passport Number", type: "Input Text", required: true }] },
    { id: 4, name: "ID Card", status: false, fields: [{ fieldName: "ID Card Number", type: "Input Text", required: true }] },
    { id: 5, name: "Emirates ID", status: false, fields: [{ fieldName: "Emirates ID", type: "Input Text", required: true }] },
  ]);
  const [kycMethods3, setKycMethods3] = useState<KycMethod[]>([
    { id: 6, name: "Proof of Address", status: false, fields: [{ fieldName: "Address", type: "Input Text", required: true }] },

  ]);

  // Automated KYC provider modal state
  const [showProviderModal, setShowProviderModal] = useState<{
    open: boolean;
    provider: "sumsub" | "veriff" | null;
    data?: any;
  }>({ open: false, provider: null, data: null });

  // Example provider data (replace with real data/state as needed)
  const sumsubData = {
    appToken: "sbx:i8yH1JBpYRVY3yZJWeofwlp7.g1cJ7zIfDIEOa2S9CR1v1gsRw7kqVzzE",
    appSecret: "***************",
    levelName: "gfyHu388N1TGNVVWtwRS5LCtOlyDINbZf2",
    status: true,
  };
  const veriffData = {
    apiKey: "781df7cf-aba9-4cc1-bf87-f7f681843e7f",
    sharedSecret: "***************",
    baseUrl: "https://stationapi.veriff.com",
    integrationId: "sdfa",
    levelName: "afads",
    status: false,
  };

  return (
    <div className="space-y-6">
      <Card className="border p-2">
        <h2>Verification Management</h2>
        <h5 className="text-sm">
          Configure and manage verification levels, requirements, and compliance settings for user onboarding.
        </h5>
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT CARD */}
        <Card className="p-6 flex flex-col items-center justify-center text-center">
          
          <h3 className="font-semibold">Verification Center</h3>
          <p className="text-sm text-muted-foreground">
            Secure identity verification
          </p>
                                    <div className="flex items-center justify-center mb-4 mt-4 bg-gradient-to-br rounded-2xl">
                    <svg width="180" height="140" viewBox="0 0 180 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="10" y="20" width="160" height="100" rx="16" fill="#e5e7eb" strokeWidth="3"/>
                      <rect x="30" y="40" width="60" height="12" rx="6" fill="#6366f1" opacity="0.2"/>
                      <rect x="30" y="60" width="120" height="8" rx="4" fill="#6366f1" opacity="0.1"/>
                      <rect x="30" y="75" width="90" height="8" rx="4" fill="#6366f1" opacity="0.1"/>
                      <circle cx="140" cy="50" r="14" fill="#6366f1" opacity="0.2"/>
                      <rect x="30" y="95" width="40" height="8" rx="4" fill="#6366f1" opacity="0.1"/>
                    </svg>
                  </div>
          <div className="flex gap-4 mt-6 text-xs text-muted-foreground">
            <span className="text-green">● Secure</span>
            <span className="text-blue-500">● Fast</span>
            <span>Compliant</span>
          </div>
        </Card>

        {/* RIGHT SECTION */}
        <div className="lg:col-span-2 space-y-4">
          <KycLevel
            level={1}
            title="Email and Phone verification required"
            status="Active"
            onMethod={() => setModalOpen(1)}
          />
          <KycLevel
            level={2}
            title="ID verification method"
            status="Active"
            manualOption
            onMethod={() => setModalOpen(2)}
          />
          <KycLevel
            level={3}
            title="Additional verification requirements"
            status="Disabled"
            checkboxLabel="Proof of Documents"
            onMethod={() => setModalOpen(3)}
          />
        </div>
      </div>

      {/* Level Modals */}
      <KycLevelModal
        open={modalOpen === 1}
        onClose={() => setModalOpen(null)}
        status={kycStatus1}
        setStatus={setKycStatus1}
        onSave={() => setModalOpen(null)}
        methods={kycMethods1}
        setMethods={setKycMethods1}
        level={1}
        methodsType="level1"
      />
      <KycLevelModal
        open={modalOpen === 2}
        onClose={() => setModalOpen(null)}
        status={kycStatus2}
        setStatus={setKycStatus2}
        onSave={() => setModalOpen(null)}
        methods={kycMethods2}
        setMethods={setKycMethods2}
        level={2}
        methodsType="level2"
        onProviderSettings={setShowProviderModal}
        sumsubData={sumsubData}
        veriffData={veriffData}
      />
      <KycLevelModal
        open={modalOpen === 3}
        onClose={() => setModalOpen(null)}
        status={kycStatus3}
        setStatus={setKycStatus3}
        onSave={() => setModalOpen(null)}
        methods={kycMethods3}
        setMethods={setKycMethods3}
        level={3}
        methodsType="level3"
      />

      {/* Automated KYC Provider Modals */}
      {showProviderModal.open && showProviderModal.provider === "sumsub" && (
        <SumsubModal
          open={showProviderModal.open}
          initialData={showProviderModal.data}
          onClose={() => setShowProviderModal({ open: false, provider: null })}
          onSave={() => setShowProviderModal({ open: false, provider: null })}
        />
      )}
      {showProviderModal.open && showProviderModal.provider === "veriff" && (
        <VeriffModal
          open={showProviderModal.open}
          initialData={showProviderModal.data}
          onClose={() => setShowProviderModal({ open: false, provider: null })}
          onSave={() => setShowProviderModal({ open: false, provider: null })}
        />
      )}
    </div>
  );
};

// --- KYC Level Modal ---
function KycLevelModal({
  open,
  onClose,
  status,
  setStatus,
  onSave,
  methods,
  setMethods,
  level,
  methodsType,
  onProviderSettings,
  sumsubData,
  veriffData,
}: {
  open: boolean;
  onClose: () => void;
  status: boolean;
  setStatus: (v: boolean) => void;
  onSave: () => void;
  methods: KycMethod[];
  setMethods: (m: KycMethod[]) => void;
  level: number;
  methodsType: "level1" | "level2" | "level3";
  onProviderSettings?: (modal: { open: boolean; provider: "sumsub" | "veriff"; data: any }) => void;
  sumsubData?: any;
  veriffData?: any;
}) {
  const [levelName, setLevelName] = useState(`Level ${level}`);
  const [selectedMethod, setSelectedMethod] = useState<"manual" | "automatic">("manual");
  const [showKycFieldModal, setShowKycFieldModal] = useState(false);
  const [showUpdateFieldModal, setShowUpdateFieldModal] = useState<{ open: boolean; fieldIdx: number | null }>({ open: false, fieldIdx: null });

  // For updating method name/status/fields
  const handleUpdateField = (data: { name: string; fields: any[]; status: boolean }) => {
    if (showUpdateFieldModal.fieldIdx !== null) {
      setMethods(
        methods.map((m, idx) =>
          idx === showUpdateFieldModal.fieldIdx
            ? { ...m, name: data.name, status: data.status, fields: data.fields }
            : m
        )
      );
    }
    setShowUpdateFieldModal({ open: false, fieldIdx: null });
  };

  // For adding new method
  const handleAddField = (data: { name: string; fields: any[]; status: boolean }) => {
    setMethods([
      ...methods,
      {
        id: Date.now(),
        name: data.name,
        status: data.status,
        fields: data.fields,
      },
    ]);
    setShowKycFieldModal(false);
  };

  if (!open) return null;

  // Render right side KYC Methods UI based on level
  let methodsContent = null;
  if (methodsType === "level1") {
    methodsContent = (
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-xl font-bold">KYC Methods</h2>
        </div>
        <h4 className="mb-6 text-xs">Set Methods For KYC Level 1</h4>
        <div className="space-y-4">
          {methods.map((method, idx) => (
            <div
              key={method.id}
              className="flex items-center justify-between border border-border rounded-md px-4 py-3"
            >
              <div className="flex items-center gap-2">
                <UserSquare size={22} />
                <span className="font-medium">{method.name}</span>
              </div>
              <div className="flex items-center gap-2">
                {method.status ? (
                  <Badge variant="outline" className={`${statusClasses["Active"]} rounded-md`}>Active</Badge>
                ) : (
                  <Badge variant="outline" className={`${statusClasses["Disabled"]} rounded-md`}>Deactivated</Badge>
                )}
                <Button size="icon" variant="ghost" onClick={() => setShowUpdateFieldModal({ open: true, fieldIdx: idx })}>
                  <Settings2 size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <KycFieldModal
          open={showUpdateFieldModal.open}
          onClose={() => setShowUpdateFieldModal({ open: false, fieldIdx: null })}
          isUpdate
          initialData={
            showUpdateFieldModal.fieldIdx !== null
              ? {
                  name: methods[showUpdateFieldModal.fieldIdx]?.name || "",
                  fields: methods[showUpdateFieldModal.fieldIdx]?.fields || [
                    { fieldName: "", type: "Input Text", required: true }
                  ],
                  status: methods[showUpdateFieldModal.fieldIdx]?.status || false,
                }
              : undefined
          }
          onSave={handleUpdateField}
        />
      </div>
    );
  } else if (methodsType === "level2") {
    methodsContent = (
      <div>
        <div className="flex items-center gap-2 mb-2">
          <UserSquare size={22} />
          <h2 className="text-xl font-bold">KYC Methods</h2>
        </div>
        <h4 className="mb-6 text-xs">Set methods for Level 2</h4>
        <h2>Kyc Method</h2>
        <div className="flex gap-4 items-center justify-between">
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="kyc-method"
                checked={selectedMethod === "manual"}
                onChange={() => setSelectedMethod("manual")}
              />
              Manual
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="kyc-method"
                checked={selectedMethod === "automatic"}
                onChange={() => setSelectedMethod("automatic")}
              />
              Automatic
            </label>
          </div>
          {selectedMethod === "manual" && (
            <Button className="bg-primary mb-2" onClick={() => setShowKycFieldModal(true)}>
              + Add New
            </Button>
          )}
        </div>
        {selectedMethod === "manual" ? (
          <div className="space-y-4">
            {methods.map((method, idx) => (
              <div
                key={method.id}
                className="flex items-center justify-between border border-border rounded-md px-4 py-3"
              >
                <div className="flex items-center gap-2">
                  <UserSquare size={22} />
                  <span className="font-medium">{method.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {method.status ? (
                    <Badge variant="outline" className={`${statusClasses["Active"]} rounded-md`}>Active</Badge>
                  ) : (
                    <Badge variant="outline" className={`${statusClasses["Disabled"]} rounded-md`}>Deactivated</Badge>
                  )}
                  <Button size="icon" variant="ghost" onClick={() => setShowUpdateFieldModal({ open: true, fieldIdx: idx })}>
                    <Settings2 size={16} />
                  </Button>
                </div>
              </div>
            ))}
            <KycFieldModal
              open={showUpdateFieldModal.open}
              onClose={() => setShowUpdateFieldModal({ open: false, fieldIdx: null })}
              isUpdate
              initialData={
                showUpdateFieldModal.fieldIdx !== null
                  ? {
                      name: methods[showUpdateFieldModal.fieldIdx]?.name || "",
                      fields: methods[showUpdateFieldModal.fieldIdx]?.fields || [
                        { fieldName: "", type: "Input Text", required: true }
                      ],
                      status: methods[showUpdateFieldModal.fieldIdx]?.status || false,
                    }
                  : undefined
              }
              onSave={handleUpdateField}
            />
          </div>
        ) : (
          <div className="space-y-4 mt-4">
            {/* Automated KYC Providers */}
            {([
              {
                id: 101,
                name: "Sumsub (Automated KYC)",
                description: "AI-powered document verification and compliance",
                status: true,
                icon: (
                  <svg width="32" height="32" fill="none"><rect width="32" height="32" rx="6" fill="#1A2733"/><rect x="7" y="8" width="18" height="12" rx="2" fill="#fff" fillOpacity="0.1"/><rect x="7" y="21" width="18" height="3" rx="1.5" fill="#fff" fillOpacity="0.1"/></svg>
                ),
                provider: "sumsub" as const,
                data: sumsubData,
              },
              {
                id: 102,
                name: "Veriff (Automated KYC)",
                description: "Advanced identity verification with real-time fraud detection",
                status: false,
                icon: (
                  <svg width="32" height="32" fill="none"><rect width="32" height="32" rx="6" fill="#1A2733"/><path d="M10 18l4 4 8-8" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                ),
                provider: "veriff" as const,
                data: veriffData,
              },
            ] as const).map((provider) => (
              <div
                key={provider.id}
                className="flex items-center justify-between border border-border rounded-lg px-4 py-4 bg-[#181e29]"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span>{provider.icon}</span>
                    <div>
                      <div className="font-semibold text-base">
                        {provider.name}
                      </div>
                      <div className="text-muted-foreground text-sm">
                        {provider.description}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {provider.status ? (
                    <Badge variant="outline" className={`${statusClasses["Active"]} rounded-md`}>Active</Badge>
                  ) : (
                    <Badge variant="outline" className={`${statusClasses["Disabled"]} rounded-md`}>Deactivated</Badge>
                  )}
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => onProviderSettings && onProviderSettings({ open: true, provider: provider.provider, data: provider.data })}
                  >
                    <Settings2 size={18} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        <KycFieldModal open={showKycFieldModal} onClose={() => setShowKycFieldModal(false)} onSave={handleAddField} />
      </div>
    );
  }
    else if (methodsType === "level3") {
    methodsContent = (
      <div>
        <div className="flex items-center gap-2 mb-2">
          <UserSquare size={22} />
          <h2 className="text-xl font-bold">Level 3 Methods</h2>
        </div>
        <h4 className="mb-6 text-xs">Set Methods For KYC Level 3</h4>
        <div className="space-y-4">
          {methods.map((method, idx) => (
            <div
              key={method.id}
              className="flex items-center justify-between border border-border rounded-md px-4 py-3"
            >
              <div className="flex items-center gap-2">
                <UserSquare size={22} />
                <span className="font-medium">{method.name}</span>
              </div>
              <div className="flex items-center gap-2">
                {method.status ? (
                  <Badge variant="outline" className={`${statusClasses["Active"]} rounded-md`}>Active</Badge>
                ) : (
                  <Badge variant="outline" className={`${statusClasses["Disabled"]} rounded-md`}>Deactivated</Badge>
                )}
                <Button size="icon" variant="ghost" onClick={() => setShowUpdateFieldModal({ open: true, fieldIdx: idx })}>
                  <Settings2 size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <KycFieldModal
          open={showUpdateFieldModal.open}
          onClose={() => setShowUpdateFieldModal({ open: false, fieldIdx: null })}
          isUpdate
          initialData={
            showUpdateFieldModal.fieldIdx !== null
              ? {
                  name: methods[showUpdateFieldModal.fieldIdx]?.name || "",
                  fields: methods[showUpdateFieldModal.fieldIdx]?.fields || [
                    { fieldName: "", type: "Input Text", required: true }
                  ],
                  status: methods[showUpdateFieldModal.fieldIdx]?.status || false,
                }
              : undefined
          }
          onSave={handleUpdateField}
        />
    </div>
  );
}

return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-[#181e29] rounded-xl w-full max-w-5xl relative">
        <div className="flex items-center justify-between px-8 pt-6 pb-2 border-b border-border">
          <h2 className="text-xl font-semibold">Update KYC Level {level}</h2>
          <Button size="icon" variant="ghost" onClick={onClose}>
            <X size={18} />
          </Button>
        </div>
        <div className="md:grid-cols-3 grid grid-cols-2 gap-4">
          <div className="border-r border-border py-4 px-8">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-xl font-bold">KYC Details</h2>
            </div>
            <h4 className="mb-6 text-xs">Set Details For KYC Level {level}</h4>
            <div className="mb-4">
              <InputField
                label="Name"
                className="w-full rounded-md border border-border bg-transparent px-3 py-2"
                value={levelName}
                onChange={(e) => setLevelName(e.target.value)}
                tooltip="Enter a name for this KYC level (e.g., Level 1, Basic Verification)"
              />
            </div>
            <div className="mb-8 flex items-center gap-3">
              <StatusToggle
                label="Status"
                status={status ? "Active" : "Disabled"}
                onChange={(s) => setStatus(s === "Active")}
                tooltip="Enable or disable this KYC level for use in the system"
              />
            </div>
            <Button className="w-full flex items-center justify-center gap-2" onClick={onSave}>
              Save Changes
            </Button>
          </div>
          <div className="col-span-2 ... p-4">{methodsContent}</div>
        </div>
      </div>
    </div>
  );
}

// --- KYC Field Modal (reused for manual methods) ---
function KycFieldModal({
  open,
  onClose,
  isUpdate = false,
  initialData,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  isUpdate?: boolean;
  initialData?: {
    name: string;
    fields: { fieldName: string; type: string; required: boolean }[];
    status: boolean;
  };
  onSave?: (data: { name: string; fields: { fieldName: string; type: string; required: boolean }[]; status: boolean }) => void;
}) {
  const [name, setName] = useState(initialData?.name || "");
  const [fields, setFields] = useState(
    initialData?.fields && initialData.fields.length > 0
      ? initialData.fields
      : [{ fieldName: "", type: "Input Text", required: true }]
  );
  const [status, setStatus] = useState(initialData?.status || false);

  useEffect(() => {
    setName(initialData?.name || "");
    setFields(
      initialData?.fields && initialData.fields.length > 0
        ? initialData.fields
        : [{ fieldName: "", type: "Input Text", required: true }]
    );
    setStatus(initialData?.status || false);
  }, [initialData, open]);

  const handleFieldChange = (idx: number, key: string, value: any) => {
    setFields(fields.map((f, i) => (i === idx ? { ...f, [key]: value } : f)));
  };

  const handleAddField = () => {
    setFields([...fields, { fieldName: "", type: "Input Text", required: true }]);
  };

  const handleRemoveField = (idx: number) => {
    setFields(fields.filter((_, i) => i !== idx));
  };

  const handleSave = () => {
    if (onSave) {
      onSave({ name, fields, status });
    }
    onClose();
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-[#181e29] rounded-xl p-8 w-full max-w-2xl relative">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{isUpdate ? "Update KYC Form" : "Add KYC Form"}</h2>
          <Button size="icon" variant="ghost" onClick={onClose}>
            <X size={22} />
          </Button>
        </div>
        <div className="mb-4">
          <InputField
            label="Name"
            className="w-full rounded-md border border-border bg-transparent px-3 py-2"
            placeholder="KYC Type Name"
            value={name}
            onChange={e => setName(e.target.value)}
            tooltip="Enter the name of the KYC type"
          />
        </div>
        <Button
          variant="outline"
          className="mb-4"
          onClick={handleAddField}
        >
          Add Field Option
        </Button>
        {fields.map((field, idx) => (
          <div key={idx} className="flex gap-2 mb-3">
            <input
              className="rounded-md border border-border bg-transparent px-3 py-2 flex-1"
              placeholder="Field Name"
              value={field.fieldName}
              onChange={e => handleFieldChange(idx, "fieldName", e.target.value)}
            />
            <select
              className="rounded-md border border-border bg-transparent px-3 py-2"
              value={field.type}
              onChange={e => handleFieldChange(idx, "type", e.target.value)}
            >
              <option>Input Text</option>
              <option>Dropdown</option>
              <option>Date</option>
              <option>File Upload</option>
            </select>
            <select
              className="rounded-md border border-border bg-transparent px-3 py-2"
              value={field.required ? "Required" : "Optional"}
              onChange={e => handleFieldChange(idx, "required", e.target.value === "Required")}
            >
              <option>Required</option>
              <option>Optional</option>
            </select>
            <Button
              size="icon"
              variant="destructive"
              onClick={() => handleRemoveField(idx)}
            >
              <Trash2 size={20} />
            </Button>
          </div>
        ))}
        <div className="flex items-center gap-2 mt-6 mb-8">
          <StatusToggle
            label="Status"
            status={status ? "Active" : "Disabled"}
            onChange={(s) => setStatus(s === "Active")}
            tooltip="Enable or disable this KYC level for use in the system"
          />
        </div>
        <div className="flex justify-end gap-4 mt-8">
          <Button className="bg-primary flex items-center gap-2" onClick={handleSave}>
            Save Changes
          </Button>
          <Button variant="destructive" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

// --- KYC Level Card ---
type KycLevelProps = {
  level: number;
  title: string;
  status: "Active" | "Disabled";
  manualOption?: boolean;
  checkboxLabel?: string;
  onMethod?: () => void;
  name?: string;
};

const KycLevel = ({
  level,
  title,
  status,
  manualOption,
  checkboxLabel,
  onMethod,
  name,
}: KycLevelProps) => {
  return (
    <Card className="p-5 space-y-3">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-slate-800 text-slate-400 flex font-semibold h-12 items-center justify-center rounded-full text-lg w-12">{level}</span>
            <span className="font-semibold">{name || `Level ${level}`}</span>
            {status === "Active" ? (
              <Badge
                variant="outline"
                className={`${statusClasses[status]} rounded-md`}
              >
                {status}
              </Badge>
            ) : (
              <Badge variant="outline" className={`${statusClasses[status]} rounded-md`}>Disabled</Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-1">{title}</p>
        </div>
        <Button size="icon" variant="ghost" onClick={onMethod}>
          <Settings2 size={16} />
        </Button>
      </div>
      <Separator />
      <div className="flex items-center gap-2 text-sm font-medium">
        <ListCheck size={16} className="text-muted-foreground" />
        Requirements
      </div>
      {manualOption && (
        <div className="flex gap-4">
          <label className="flex items-center gap-2 border border-border rounded-md px-4 py-2 w-full">
            <input type="radio" defaultChecked />
            Manual
          </label>
          <label className="flex items-center gap-2 border border-border rounded-md px-4 py-2 w-full">
            <input type="radio" />
            Automatic
          </label>
        </div>
      )}
      {checkboxLabel && (
        <label className="flex items-center gap-2 border border-border rounded-md px-4 py-2 w-fit">
          <input type="checkbox" defaultChecked />
          {checkboxLabel}
        </label>
      )}
    </Card>
  );
};

const PermissionsTab = () => {
  const permissions = [
    "Deposit Amount",
    "Withdraw Amount",
    "Internal Transfer Amount",
    "External Transfer Amount",
    "Account Creation",
    "Master IB Request",
  ];

  return (
    <Card className="p-6 space-y-6">
      <Card className="border p-2">
        <h4 className="text-sm">
          Note: If a permission is enabled, the associated action will be allowed without checking whether the user has completed their KYC. If a permission is disabled, the system will first verify that KYC is completed before allowing the action.These settings will only apply on the user's side.
        </h4>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {permissions.map((item) => (
          <div
            key={item}
            className="flex justify-between items-center border border-border rounded-md px-4 py-3"
          >
            <span className="text-sm">{item}</span>
            <Switch />
          </div>
        ))}
      </div>
      <Button className="w-fit">Save Changes</Button>
    </Card>
  );
};

export default function KycAndCompliance() {
  const [activeTab, setActiveTab] = useState("kyc");

  const tabs = [
    { key: "kyc", label: "KYC & Compliance" },
    { key: "permisssions", label: "Permissions" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">KYC & Compliance</h1>
      <div className="flex gap-1 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-md border transition
              ${activeTab === tab.key
                ? "bg-primary text-primary-foreground"
                : "bg-muted border-border hover:bg-muted/70"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {activeTab === "kyc" ? <KycTab /> : <PermissionsTab />}
    </div>
  );
}