import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings2, X } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface Gateway {
  name: string;
  logo: string;
  status: string;
  withdraw: string;
  currency: string;
}

const paymentGateways = [
  { name: "Paypal", logo: "https://cdn.brokeret.com/crm-assets/admin/pg/paypal.webp", status: "deactivated", withdraw: "Yes", currency: "30" },
  { name: "Stripe", logo: "https://cdn.brokeret.com/crm-assets/admin/pg/stripe.webp", status: "activated", withdraw: "Yes", currency: "135" },
  { name: "Mollie", logo: "https://cdn.brokeret.com/crm-assets/admin/pg/mollie.webp", status: "deactivated", withdraw: "Yes", currency: "25" },
  { name: "Perfect Money", logo: "https://cdn.brokeret.com/crm-assets/admin/pg/perfectmoney.webp", status: "deactivated", withdraw: "Yes", currency: "5" },
  { name: "Coinbase", logo: "https://cdn.brokeret.com/crm-assets/admin/pg/coinbase.webp", status: "deactivated", withdraw: "Yes", currency: "50" },
  { name: "Paystack", logo: "https://cdn.brokeret.com/crm-assets/admin/pg/paystack.webp", status: "deactivated", withdraw: "Yes", currency: "20" },
  { name: "Voguepay", logo: "https://cdn.brokeret.com/crm-assets/admin/pg/voguepay.webp", status: "deactivated", withdraw: "Yes", currency: "10" },
  { name: "Flutterwave", logo: "https://cdn.brokeret.com/crm-assets/admin/pg/flutterwave.webp", status: "deactivated", withdraw: "Yes", currency: "30" },
  { name: "CoinGate", logo: "https://cdn.brokeret.com/crm-assets/admin/pg/coingate.webp", status: "deactivated", withdraw: "Yes", currency: "70" },
  { name: "Monnify", logo: "https://cdn.brokeret.com/crm-assets/admin/pg/monnify.webp", status: "deactivated", withdraw: "Yes", currency: "15" },
  { name: "SecurionPay", logo: "https://cdn.brokeret.com/crm-assets/admin/pg/securionpay.webp", status: "deactivated", withdraw: "Yes", currency: "25" },
  { name: "CoinPayments", logo: "https://cdn.brokeret.com/crm-assets/admin/pg/coinpayments.webp", status: "activated", withdraw: "Yes", currency: "100" },
  { name: "Razorpay", logo: "https://cdn.brokeret.com/crm-assets/admin/pg/razorpay.webp", status: "deactivated", withdraw: "Yes", currency: "50" },
  { name: "Instamojo", logo: "https://cdn.brokeret.com/crm-assets/admin/pg/instamojo.webp", status: "deactivated", withdraw: "Yes", currency: "15" },
  { name: "Paytm", logo: "https://cdn.brokeret.com/crm-assets/admin/pg/paytm.webp", status: "deactivated", withdraw: "Yes", currency: "10" },
  { name: "Coinremitter", logo: "https://cdn.brokeret.com/crm-assets/admin/pg/coinremitter.webp", status: "deactivated", withdraw: "Yes", currency: "5" },
  { name: "NowPayments", logo: "https://cdn.brokeret.com/crm-assets/admin/pg/nowpayments.webp", status: "activated", withdraw: "Yes", currency: "90" },
  { name: "Cryptomus", logo: "https://cdn.brokeret.com/crm-assets/admin/pg/cryptomus.webp", status: "deactivated", withdraw: "Yes", currency: "75" },
  { name: "Paymongo", logo: "https://cdn.brokeret.com/crm-assets/admin/pg/paymongo.webp", status: "deactivated", withdraw: "Yes", currency: "20" },
  { name: "Btcpayserver", logo: "https://cdn.brokeret.com/crm-assets/admin/pg/btcpay.webp", status: "deactivated", withdraw: "Yes", currency: "15" },
  { name: "Binance", logo: "https://cdn.brokeret.com/crm-assets/admin/pg/binancepay.webp", status: "deactivated", withdraw: "Yes", currency: "10" },
  { name: "Cashmaal", logo: "https://cdn.brokeret.com/crm-assets/admin/pg/cashmall.webp", status: "deactivated", withdraw: "Yes", currency: "40" },
  { name: "Block.io", logo: "https://cdn.brokeret.com/crm-assets/integration-logo/svg/blockio.svg", status: "deactivated", withdraw: "Yes", currency: "30" },
  { name: "Blockchain", logo: "https://cdn.brokeret.com/crm-assets/admin/pg/blockchain.webp", status: "deactivated", withdraw: "Yes", currency: "60" },
  { name: "2Checkout", logo: "https://cdn.brokeret.com/crm-assets/admin/pg/2checkout.webp", status: "deactivated", withdraw: "No", currency: "87" },
  { name: "BridgerPay", logo: "https://cdn.brokeret.com/crm-assets/admin/pg/bridgerpay.webp", status: "activated", withdraw: "Yes", currency: "5" },
  { name: "Match2Pay", logo: "https://cdn.brokeret.com/crm-assets/admin/pg/match2pay.webp", status: "activated", withdraw: "No", currency: "20" },
  { name: "Alipay", logo: "https://cdn.brokeret.com/crm-assets/admin/pg/alipay.webp", status: "deactivated", withdraw: "No", currency: "3" },
  { name: "B2BinPay", logo: "https://cdn.brokeret.com/crm-assets/admin/pg/b2binpay.webp", status: "deactivated", withdraw: "No", currency: "2" },
  { name: "CheezePay", logo: "https://cdn.brokeret.com/crm-assets/admin/pg/cheezepay.webp", status: "deactivated", withdraw: "No", currency: "2" },
  { name: "Dpopay", logo: "https://cdn.brokeret.com/crm-assets/admin/pg/dpopay.webp", status: "deactivated", withdraw: "No", currency: "3" },
  { name: "Jeton", logo: "https://cdn.brokeret.com/crm-assets/admin/pg/jeton.webp", status: "deactivated", withdraw: "No", currency: "5" },
  { name: "Peach Payments", logo: "https://cdn.brokeret.com/crm-assets/admin/pg/peachpayments.webp", status: "deactivated", withdraw: "No", currency: "2" },
  { name: "Praxis", logo: "https://cdn.brokeret.com/crm-assets/admin/pg/praxis.webp", status: "deactivated", withdraw: "No", currency: "1" },
  { name: "Tazapay", logo: "https://cdn.brokeret.com/crm-assets/admin/pg/tazapay.webp", status: "deactivated", withdraw: "No", currency: "6" },
  { name: "Unlimit", logo: "https://cdn.brokeret.com/crm-assets/admin/pg/unlimit.webp", status: "deactivated", withdraw: "No", currency: "1" },
  { name: "Wirebit", logo: "https://cdn.brokeret.com/crm-assets/admin/pg/wirebit.webp", status: "deactivated", withdraw: "No", currency: "4" },
  { name: "ZaasPay", logo: "https://cdn.brokeret.com/crm-assets/admin/pg/zaaspay.webp", status: "deactivated", withdraw: "No", currency: "3" },
  { name: "ZoodPay", logo: "https://cdn.brokeret.com/crm-assets/admin/pg/zoodpay.webp", status: "deactivated", withdraw: "No", currency: "2" },
  { name: "Uniwire", logo: "https://cdn.brokeret.com/crm-assets/admin/pg/uniwire.png", status: "activated", withdraw: "Yes", currency: "59" },
  { name: "JenaPay", logo: "https://jenapay.com/wp-content/uploads/2023/09/Jena-Pay-Logo-1.png", status: "activated", withdraw: "No", currency: "5" },
];
const statusClasses: Record<string, string> = {
  Activated: "bg-[#0d2e1e] text-[#4ade80] border border-[#1a5e41]",
  Deactivated: "bg-[#2e0f0f] text-[#f87171] border border-[#7f1d1d]",
};
export default function PaymentGateways() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedGateway, setSelectedGateway] = useState<Gateway | null>(null);

  const openGatewayModal = (gateway: Gateway) => {
    setSelectedGateway(gateway);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setSelectedGateway(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Automatic Payment Gateway</h2>
        <p className="text-muted-foreground">
          Manage your payment gateway integrations
        </p>
      </div>

      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        {paymentGateways.map((gateway, index) => (
          <Card key={index} className="border hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
              <img 
                className="inline-block h-10" 
                src={gateway.logo} 
                alt={gateway.name}
                onError={(e) => {
                  e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect width='40' height='40' fill='%23ddd'/%3E%3Ctext x='50%25' y='50%25' font-size='20' text-anchor='middle' dy='.3em' fill='%23999'%3E💳%3C/text%3E%3C/svg%3E";
                }}
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => openGatewayModal(gateway)}
              >
                <Settings2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-base font-medium mr-1">{gateway.name}</h4>
                       <Badge
                  variant="outline"
                  className={`text-xs capitalize ${
                    statusClasses[gateway.status === "activated" ? "Activated" : "Deactivated"]
                  }`}
                >
                  {gateway.status === "activated" ? "Activated" : "Deactivated"}
                </Badge>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground mr-1">Withdraw Available</span>
                  <span className="capitalize">{gateway.withdraw}</span>
                </li>
                <li className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground mr-1">Supported Currency</span>
                  <span>{gateway.currency}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal - Responsive with shadow-card */}
      {openModal && selectedGateway && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-2 sm:p-4">
          <Card className="w-full max-w-[95vw] sm:max-w-4xl lg:max-w-5xl bg-card shadow-card max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 border-b border-border flex-shrink-0">
              <h2 className="text-lg sm:text-xl font-semibold truncate pr-4">
                {selectedGateway.name} Credential Edit
              </h2>
              <Button size="icon" variant="ghost" onClick={closeModal} className="flex-shrink-0">
                <X size={20} />
              </Button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="col-span-1 md:col-span-2">
                  <Label className="text-sm font-medium mb-2 block">
                    Upload Logo:
                  </Label>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="logo-upload"
                  />
                  <label
                    htmlFor="logo-upload"
                    className="h-28 sm:h-32 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center text-muted-foreground cursor-pointer hover:bg-muted/20 transition-colors"
                  >
                    <img 
                      className="h-20 sm:h-24 object-contain" 
                      src={selectedGateway.logo} 
                      alt={selectedGateway.name}
                    />
                  </label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">Name:</Label>
                  <Input id="name" defaultValue={selectedGateway.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="codeName" className="text-sm font-medium">Code Name:</Label>
                  <Input id="codeName" defaultValue={selectedGateway.name.toLowerCase()} />
                </div>

                <div className="col-span-1 md:col-span-2 space-y-2">
                  <Label htmlFor="clientId" className="text-sm font-medium">Client Id :</Label>
                  <Input 
                    id="clientId" 
                    defaultValue="AZeTli80UE-Vfrzf8ZMlHlXRwx2Rx8wl5zLlg2jDn0CcGLV034VQ2iy9uXR_nnev3yUkawXZ8v4SGYiX"
                    className="font-mono text-sm"
                  />
                </div>

                <div className="col-span-1 md:col-span-2 space-y-2">
                  <Label htmlFor="clientSecret" className="text-sm font-medium">Client Secret :</Label>
                  <Input 
                    id="clientSecret" 
                    type="password"
                    defaultValue="••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••"
                    className="font-mono text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="appId" className="text-sm font-medium">App Id :</Label>
                  <Input id="appId" defaultValue="Orfinex" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mode" className="text-sm font-medium">Mode :</Label>
                  <Input id="mode" defaultValue="sandbox" />
                </div>

                <div className="col-span-1 md:col-span-2 flex items-center gap-3 py-2">
                  <Label htmlFor="status" className="text-sm font-medium">Status:</Label>
                  <Switch 
                    id="status" 
                    defaultChecked={selectedGateway.status === "activated"}
                  />
                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-6 pt-4 border-t border-border">
                <Button variant="destructive" onClick={closeModal} className="w-full sm:w-auto">
                  Cancel
                </Button>
                <Button onClick={closeModal} className="w-full sm:w-auto">
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}