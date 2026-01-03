import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, X, Info } from "lucide-react";
import { InputField } from "@/components/form/InputField";
import { TooltipProvider } from "@/components/ui/tooltip";

interface MailProvider {
    id: string;
    name: string;
    logo: string;
    description: string;
    badge?: string;
    badgeVariant?: "default" | "secondary" | "destructive";
}

export default function Email() {
    const [activeProvider, setActiveProvider] = useState<string>("smtp");
    const [openModal, setOpenModal] = useState(false);
    const [openConnectionModal, setOpenConnectionModal] = useState(false);

    const mailProviders: MailProvider[] = [
        {
            id: "smtp",
            name: "SMTP",
            logo: "https://cdn.brokeret.com/crm-assets/integration-logo/svg/smtp.svg",
            description: "Configure SMTP server",
            badge: "Recommended",
            badgeVariant: "default",
        },
        {
            id: "gmail",
            name: "Gmail",
            logo: "https://cdn.brokeret.com/crm-assets/integration-logo/svg/gmail.svg",
            description: "Google Workspace",
            badge: "Limited Support",
            badgeVariant: "destructive",
        },
        {
            id: "sendgrid",
            name: "SendGrid",
            logo: "https://cdn.brokeret.com/crm-assets/integration-logo/svg/sendgrid.svg",
            description: "SendGrid mail service",
            badge: "Recommended",
            badgeVariant: "default",
        },
        {
            id: "ses",
            name: "Amazon SES",
            logo: "https://cdn.brokeret.com/crm-assets/admin/mail/awsses.webp",
            description: "AWS Simple Email Service",
            badge: "Recommended",
            badgeVariant: "default",
        },
    ];

    const selectProvider = (providerId: string) => {
        setActiveProvider(providerId);
    };

    const openConnectModal = () => {
        setOpenModal(true);
    };

    const closeModal = () => {
        setOpenModal(false);
    };

    const handleOpenConnectionModal = () => {
        // Logic for connection check can be implemented here
        setOpenConnectionModal(true);
    };
    
    const getConfigTitle = () => {
        switch (activeProvider) {
            case "gmail":
                return "Gmail Configuration";
            case "sendgrid":
                return "SendGrid Configuration";
            case "ses":
                return "Amazon SES Configuration";
            default:
                return "SMTP Configuration";
        }
    };

    const getModalTitle = () => {
        switch (activeProvider) {
            case "gmail":
                return "Google Mail Settings";
            case "sendgrid":
                return "SendGrid Configuration";
            case "ses":
                return "Amazon SES Configuration";
            default:
                return "SMTP Mail Settings";
        }
    };

    return (
        <TooltipProvider>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h2 className="text-xl font-semibold">Mail Settings</h2>
                    <Button variant="outline" size="sm" onClick={handleOpenConnectionModal}>
                        Connection Check
                    </Button>
                </div>

                {/* Mail Provider Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {mailProviders.map((provider) => (
                        <Card
                            key={provider.id}
                            className={`p-5 cursor-pointer hover:shadow-lg transition-all border ${activeProvider === provider.id
                                    ? "border-primary border-4 shadow-md "
                                    : "border-border bg-card"
                                } backdrop-blur bg-white`}
                            onClick={() => selectProvider(provider.id)}
                        >
                            <div className="flex flex-col items-center justify-center text-center">
                                <div className="h-20 flex items-center justify-center mb-3">
                                    <img
                                        src={provider.logo}
                                        alt={provider.name}
                                        className="h-20 object-contain"
                                        onError={(e) => {
                                            e.currentTarget.src = "https://via.placeholder.com/100x80?text=" + provider.name;
                                        }}
                                    />
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Dynamic Configuration Section */}
                <Card className="p-6 bg-muted/30">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h3 className="text-lg font-semibold">{getConfigTitle()}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                                {activeProvider === "smtp" && "Configure your SMTP server for reliable email delivery"}
                                {activeProvider === "gmail" && "Set up Gmail for basic email notifications"}
                                {activeProvider === "sendgrid" && "Configure your SendGrid server for reliable email delivery"}
                                {activeProvider === "ses" && "Configure your Amazon SES server for reliable email delivery"}
                            </p>
                        </div>
                        {(activeProvider === "smtp" || activeProvider === "sendgrid" || activeProvider === "ses") && (
                            <Badge>Recommended</Badge>
                        )}
                        {activeProvider === "gmail" && (
                            <Badge variant="destructive">Limited Support</Badge>
                        )}
                    </div>

                    <div className="space-y-4 mb-6">
                        {/* SMTP Content */}
                        {activeProvider === "smtp" && (
                            <>
                                <div className="flex items-start gap-3 p-4 border border-blue-500/30 bg-blue-500/5 rounded-lg">
                                    <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-muted-foreground">
                                        SMTP servers provide the most reliable way to send automated emails. We recommend using professional providers like SendGrid or Mailgun for best delivery rates.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-semibold text-sm mb-2">1. Create Mail Server Account</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Sign up for a third-party mail server provider (SendGrid, Mailgun, etc.)
                                        </p>
                                        <a
                                            href="#"
                                            className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-1"
                                        >
                                            Sign up Now <ExternalLink className="h-3 w-3" />
                                        </a>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-sm mb-2">2. Domain Authentication</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Verify your domain ownership through DNS records to ensure proper delivery
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-sm mb-2">3. Generate SMTP Credentials</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Create and securely store your SMTP credentials from your provider
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-sm mb-2">4. Configure Settings</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Enter your SMTP server details, port, encryption type, and authentication
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Gmail Content */}
                        {activeProvider === "gmail" && (
                            <>
                                <div className="flex items-start gap-3 p-4 border border-yellow-500/30 bg-yellow-500/5 rounded-lg">
                                    <Info className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-muted-foreground">
                                        Gmail has strict sending limits and security restrictions that may affect delivery reliability. For business use, we recommend using a professional SMTP provider instead.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-semibold text-sm mb-2">Enable IMAP Access</h4>
                                        <p className="text-sm text-muted-foreground mb-2">
                                            Go to Gmail settings and enable IMAP to allow third-party access
                                        </p>
                                        <a
                                            href="#"
                                            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                                        >
                                            View Gmail Settings <ExternalLink className="h-3 w-3" />
                                        </a>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-sm mb-2">Create App Password</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Generate a secure app-specific password for this integration
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-sm mb-2">Configure Authentication</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Enter your Gmail address and the generated app password
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* SendGrid Content */}
                        {activeProvider === "sendgrid" && (
                            <>
                                <div className="flex items-start gap-3 p-4 border border-blue-500/30 bg-blue-500/5 rounded-lg">
                                    <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-muted-foreground">
                                        SendGrid servers provide the most reliable way to send automated emails. We recommend using professional providers like SendGrid or Mailgun for best delivery rates.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-semibold text-sm mb-2">Create Mail Server Account</h4>
                                        <p className="text-sm text-muted-foreground mb-2">
                                            Sign up for a third-party mail server provider (SendGrid, Mailgun, etc.)
                                        </p>
                                        <a
                                            href="#"
                                            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                                        >
                                            Sign up Now <ExternalLink className="h-3 w-3" />
                                        </a>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-sm mb-2">Domain Authentication</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Verify your domain ownership through DNS records to ensure proper delivery
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-sm mb-2">Generate SendGrid Credentials</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Create and securely store your SendGrid credentials from your provider
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-sm mb-2">Configure Settings</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Enter your SendGrid server details, port, encryption type, and authentication
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Amazon SES Content */}
                        {activeProvider === "ses" && (
                            <>
                                <div className="flex items-start gap-3 p-4 border border-blue-500/30 bg-blue-500/5 rounded-lg">
                                    <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-muted-foreground">
                                        Amazon SES servers provide the most reliable way to send automated emails. We recommend using professional providers like SendGrid or Mailgun for best delivery rates.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-semibold text-sm mb-2">Create Mail Server Account</h4>
                                        <p className="text-sm text-muted-foreground mb-2">
                                            Sign up for a third-party mail server provider (SendGrid, Mailgun, etc.)
                                        </p>
                                        <a
                                            href="#"
                                            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                                        >
                                            Sign up Now <ExternalLink className="h-3 w-3" />
                                        </a>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-sm mb-2">Domain Authentication</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Verify your domain ownership through DNS records to ensure proper delivery
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-sm mb-2">Generate Amazon SES Credentials</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Create and securely store your Amazon SES credentials from your provider
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-sm mb-2">Configure Settings</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Enter your Amazon SES server details, port, encryption type, and authentication
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </Card>
                <div className="flex justify-end">
                    <Button className="w-full sm:w-auto" onClick={openConnectModal}>
                        Connect
                    </Button>
                </div>

                           {/* Modal - Only opens when Connect button is clicked */}
            {openModal && (
                <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-2 sm:p-4">
                    <Card className="w-full max-w-[95vw] sm:max-w-2xl bg-card shadow-card max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col">
                        <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 border-b border-border flex-shrink-0">
                            <h2 className="text-lg sm:text-xl font-semibold truncate pr-4">
                                {getModalTitle()}
                            </h2>
                            <Button size="icon" variant="ghost" onClick={closeModal} className="flex-shrink-0">
                                <X size={20} />
                            </Button>
                        </div>
            
                        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
                            {/* SMTP Modal Form */}
                            {activeProvider === "smtp" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                    <InputField
                                        label="Email From Name"
                                        tooltip="The name that will appear as the sender in emails"
                                        defaultValue="Brokeret"
                                    />
            
                                    <InputField
                                        label="Email From Address"
                                        tooltip="The email address that will appear as the sender"
                                        type="email"
                                        defaultValue="no-reply@brokeret.com"
                                    />
            
                                    <InputField
                                        label="Mail Username"
                                        tooltip="Your SMTP server username or API key"
                                        defaultValue="emailapikey"
                                    />
            
                                    <InputField
                                        label="Mail Password"
                                        tooltip="Your SMTP server password or secret key"
                                        type="password"
                                        defaultValue="••••••••••••••••••••••••••••••••••••••••"
                                    />
            
                                    <div className="col-span-1 md:col-span-2">
                                        <InputField
                                            label="SMTP Host"
                                            tooltip="The hostname of your SMTP server"
                                            defaultValue="smtp.zeptomail.com"
                                        />
                                    </div>
            
                                    <InputField
                                        label="SMTP Port"
                                        tooltip="The port number for SMTP connection (usually 465 or 587)"
                                        type="number"
                                        defaultValue="465"
                                    />
            
                                    <InputField
                                        label="SMTP Secure"
                                        tooltip="Security protocol (tls or ssl)"
                                        defaultValue="tls"
                                    />
                                </div>
                            )}
            
                            {/* Gmail Modal Form */}
                            {activeProvider === "gmail" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                    <InputField
                                        label="Email From Name"
                                        tooltip="The name that will appear as the sender in emails"
                                        defaultValue="Brokeret"
                                    />
            
                                    <InputField
                                        label="Email From Address"
                                        tooltip="The email address that will appear as the sender"
                                        type="email"
                                        defaultValue="no-reply@brokeret.com"
                                    />
            
                                    <InputField
                                        label="Mail Username"
                                        tooltip="Your SMTP server username or API key"
                                        defaultValue="emailapikey"
                                    />
            
                                    <InputField
                                        label="Mail Password"
                                        tooltip="Your SMTP server password or secret key"
                                        type="password"
                                        defaultValue="••••••••••••••••••••••••••••••••••••••••"
                                    />
            
                                    <div className="col-span-1 md:col-span-2">
                                        <InputField
                                            label="SMTP Host"
                                            tooltip="The hostname of your SMTP server"
                                            defaultValue="smtp.zeptomail.com"
                                        />
                                    </div>
            
                                    <InputField
                                        label="SMTP Port"
                                        tooltip="The port number for SMTP connection (usually 465 or 587)"
                                        type="number"
                                        defaultValue="465"
                                    />
            
                                    <InputField
                                        label="SMTP Secure"
                                        tooltip="Security protocol (tls or ssl)"
                                        defaultValue="tls"
                                    />
                                </div>
                            )}
            
                            {/* SendGrid Modal Form */}
                            {activeProvider === "sendgrid" && (
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                    <InputField
                                        label="Email From Name"
                                        tooltip="The name that will appear as the sender in emails"
                                        defaultValue="Brokeret"
                                    />
            
                                    <InputField
                                        label="Email From Address"
                                        tooltip="The email address that will appear as the sender"
                                        type="email"
                                        defaultValue="no-reply@brokeret.com"
                                    />
            
                                    <InputField
                                        label="Mail Username"
                                        tooltip="Your SMTP server username or API key"
                                        defaultValue="emailapikey"
                                    />
            
                                    <InputField
                                        label="Mail Password"
                                        tooltip="Your SMTP server password or secret key"
                                        type="password"
                                        defaultValue="••••••••••••••••••••••••••••••••••••••••"
                                    />
            
                                    <div className="col-span-1 md:col-span-2">
                                        <InputField
                                            label="SMTP Host"
                                            tooltip="The hostname of your SMTP server"
                                            defaultValue="smtp.zeptomail.com"
                                        />
                                    </div>
            
                                    <InputField
                                        label="SMTP Port"
                                        tooltip="The port number for SMTP connection (usually 465 or 587)"
                                        type="number"
                                        defaultValue="465"
                                    />
            
                                    <InputField
                                        label="SMTP Secure"
                                        tooltip="Security protocol (tls or ssl)"
                                        defaultValue="tls"
                                    />
                                </div>
                            )}
            
                            {/* Amazon SES Modal Form */}
                            {activeProvider === "ses" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                    <InputField
                                        label="Email From Name"
                                        tooltip="The name that will appear as the sender in emails"
                                        defaultValue="Brokeret"
                                    />
            
                                    <InputField
                                        label="Email From Address"
                                        tooltip="The email address that will appear as the sender"
                                        type="email"
                                        defaultValue="no-reply@brokeret.com"
                                    />
            
                                    <InputField
                                        label="Mail Username"
                                        tooltip="Your SMTP server username or API key"
                                        defaultValue="emailapikey"
                                    />
            
                                    <InputField
                                        label="Mail Password"
                                        tooltip="Your SMTP server password or secret key"
                                        type="password"
                                        defaultValue="••••••••••••••••••••••••••••••••••••••••"
                                    />
            
                                    <div className="col-span-1 md:col-span-2">
                                        <InputField
                                            label="SMTP Host"
                                            tooltip="The hostname of your SMTP server"
                                            defaultValue="smtp.zeptomail.com"
                                        />
                                    </div>
            
                                    <InputField
                                        label="SMTP Port"
                                        tooltip="The port number for SMTP connection (usually 465 or 587)"
                                        type="number"
                                        defaultValue="465"
                                    />
            
                                    <InputField
                                        label="SMTP Secure"
                                        tooltip="Security protocol (tls or ssl)"
                                        defaultValue="tls"
                                    />
                                </div>
                            )}
            
                            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-6 pt-4 border-t border-border">
                                <Button variant="destructive" onClick={closeModal} className="w-full sm:w-auto">
                                    Close
                                </Button>
                                <Button onClick={closeModal} className="w-full sm:w-auto">
                                    Save Changes
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            )}

                           {openConnectionModal && (
                <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-2 sm:p-4">
                    <Card className="w-full max-w-[95vw] sm:max-w-2xl bg-card shadow-card max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col">
                        <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 border-b border-border flex-shrink-0">
                            <h2 className="text-lg sm:text-xl font-semibold truncate pr-4">
                                SMTP Connection Check
                            </h2>
                            <Button size="icon" variant="ghost" onClick={() => setOpenConnectionModal(false)} className="flex-shrink-0">
                                <X size={20} />
                            </Button>
                        </div>
            
                        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
                            <div className="space-y-4">
                                <InputField
                                    label="Your Email "
                                    tooltip="Enter the email address you want to test the SMTP configuration with"
                                    type="email"
                                    placeholder="test@example.com"
                                />
                                
                            </div>
            
                            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-6 pt-4  border-border">
                                <Button variant="destructive" onClick={() => setOpenConnectionModal(false)} className="w-full sm:w-auto">
                                    Close
                                </Button>
                                <Button onClick={() => setOpenConnectionModal(false)} className="w-full sm:w-auto">
                                    Check Now
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
            </div>
        </TooltipProvider>
    );
}