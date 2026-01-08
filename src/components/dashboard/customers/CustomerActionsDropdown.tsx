import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoreVertical, Pencil, Mail, Key, DollarSign, Network } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Customer } from "./CustomersTable";
import { SendEmailModal } from "./SendEmailModal";
import { ResetPasswordModal } from "./ResetPasswordModal";

interface CustomerActionsDropdownProps {
  customer: Customer;
}

export function CustomerActionsDropdown({ customer }: CustomerActionsDropdownProps) {
  const navigate = useNavigate();
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);

  const handleEditUser = () => {
    navigate(`/customers/${customer.id}/edit`);
  };

  const handlePaymentStats = () => {
    navigate(`/customers/${customer.id}/payment-stats`);
  };

  const handleNetworkStats = () => {
    navigate(`/customers/${customer.id}/network-stats`);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-1 hover:bg-muted rounded">
            <MoreVertical className="h-4 w-4 text-muted-foreground" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 bg-card border-border z-50">
          <DropdownMenuItem
            onClick={handleEditUser}
            className="cursor-pointer gap-2 text-foreground hover:bg-muted"
          >
            <Pencil className="h-4 w-4" />
            Edit User
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsEmailModalOpen(true)}
            className="cursor-pointer gap-2 text-foreground hover:bg-muted"
          >
            <Mail className="h-4 w-4" />
            Send Email
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsResetPasswordModalOpen(true)}
            className="cursor-pointer gap-2 text-foreground hover:bg-muted"
          >
            <Key className="h-4 w-4" />
            Reset Password
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handlePaymentStats}
            className="cursor-pointer gap-2 text-foreground hover:bg-muted"
          >
            <DollarSign className="h-4 w-4" />
            Payment Stats
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleNetworkStats}
            className="cursor-pointer gap-2 text-foreground hover:bg-muted"
          >
            <Network className="h-4 w-4" />
            Network Stats
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <SendEmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        customerName={customer.name}
        customerEmail={customer.email}
      />

      <ResetPasswordModal
        isOpen={isResetPasswordModalOpen}
        onClose={() => setIsResetPasswordModalOpen(false)}
        customerEmail={customer.email}
      />
    </>
  );
}
