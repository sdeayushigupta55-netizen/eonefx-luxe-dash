import { useNavigate } from "react-router-dom";
import { User, Lock, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

interface ProfileDropdownProps {
  children: React.ReactNode;
}

export function ProfileDropdown({ children }: ProfileDropdownProps) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-card border-border">
        <DropdownMenuItem 
          onClick={() => navigate("/profile")}
          className="cursor-pointer gap-2 text-foreground hover:bg-muted"
        >
          <User className="h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => navigate("/profile/change-password")}
          className="cursor-pointer gap-2 text-foreground hover:bg-muted"
        >
          <Lock className="h-4 w-4" />
          Change Password
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={handleLogout}
          className="cursor-pointer gap-2 text-foreground hover:bg-muted"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
