import { useState, useEffect } from "react";
import { Mail, Info, Upload, Eye, EyeOff, Trash2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { StaffMember, roleOptions, genderOptions } from "./staffData";

interface StaffDetailsProps {
  staff: StaffMember | null;
  isNewStaff?: boolean;
  onSave: (staff: StaffMember) => void;
  onDelete: (staffId: string) => void;
}

export function StaffDetails({ staff, isNewStaff, onSave, onDelete }: StaffDetailsProps) {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState<Partial<StaffMember>>({
    firstName: "",
    lastName: "",
    nickName: "",
    employeeId: "",
    key: "",
    role: "Staff",
    dateOfBirth: "",
    gender: "Male",
    maritalStatus: "Single",
    workPhone: "",
    personalPhone: "",
    email: "",
    status: true,
  });

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (staff) {
      setFormData(staff);
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        nickName: "",
        employeeId: "",
        key: "",
        role: "Staff",
        dateOfBirth: "",
        gender: "Male",
        maritalStatus: "Single",
        workPhone: "",
        personalPhone: "",
        email: "",
        status: true,
      });
    }
    setPassword("");
    setConfirmPassword("");
  }, [staff]);

  const handleInputChange = (field: keyof StaffMember, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (isNewStaff && password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    const savedStaff: StaffMember = {
      id: staff?.id || Date.now().toString(),
      firstName: formData.firstName || "",
      lastName: formData.lastName || "",
      nickName: formData.nickName || "",
      email: formData.email || "",
      role: formData.role as StaffMember["role"] || "Staff",
      employeeId: formData.employeeId || "",
      key: formData.key || "",
      dateOfBirth: formData.dateOfBirth || "",
      gender: formData.gender as StaffMember["gender"] || "Male",
      maritalStatus: formData.maritalStatus as StaffMember["maritalStatus"] || "Single",
      workPhone: formData.workPhone || "",
      personalPhone: formData.personalPhone || "",
      status: formData.status ?? true,
    };

    onSave(savedStaff);
    toast({
      title: "Success",
      description: isNewStaff ? "Staff member added successfully" : "Changes saved successfully",
    });
  };

  const handleDelete = () => {
    if (staff) {
      onDelete(staff.id);
      toast({
        title: "Deleted",
        description: "Staff member deleted successfully",
      });
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase() || "??";
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-amber-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
    ];
    const index = (name?.charCodeAt(0) || 0) % colors.length;
    return colors[index];
  };

  const getRoleBadgeStyle = (role: string) => {
    switch (role) {
      case "Super-Admin":
        return "bg-blue-600 text-white";
      case "Manager":
        return "bg-green-600 text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  if (!staff && !isNewStaff) {
    return (
      <div className="bg-card rounded-xl border border-border p-8 flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Select a staff member to view details</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border p-6 space-y-6">
      {/* Profile Header */}
      <div className="flex items-center gap-4 pb-4 border-b border-border">
        <div
          className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-semibold",
            getAvatarColor(formData.firstName || "")
          )}
        >
          {getInitials(formData.firstName || "", formData.lastName || "")}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-foreground">
              {formData.firstName} {formData.lastName}
            </h2>
            {formData.role && (
              <span className={cn("px-2 py-0.5 rounded text-xs font-medium", getRoleBadgeStyle(formData.role))}>
                {formData.role}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-muted-foreground mt-1">
            <Mail className="h-4 w-4" />
            <span className="text-sm">{formData.email || "No email"}</span>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-3 gap-4">
        {/* First Name */}
        <div className="space-y-2">
          <Label className="flex items-center gap-1">
            First Name <Info className="h-3 w-3 text-muted-foreground" /> <span className="text-red-500">*</span>
          </Label>
          <Input
            value={formData.firstName || ""}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            placeholder="First Name"
          />
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <Label className="flex items-center gap-1">
            Last Name <Info className="h-3 w-3 text-muted-foreground" /> <span className="text-red-500">*</span>
          </Label>
          <Input
            value={formData.lastName || ""}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            placeholder="Last Name"
          />
        </div>

        {/* Profile Avatar */}
        <div className="space-y-2">
          <Label className="flex items-center gap-1">
            Profile Avatar <Info className="h-3 w-3 text-muted-foreground" />
          </Label>
          <div className="flex flex-col items-center gap-2">
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center text-white",
              getAvatarColor(formData.firstName || "")
            )}>
              {getInitials(formData.firstName || "", formData.lastName || "")}
            </div>
            <Button variant="ghost" size="sm" className="text-xs">
              <Upload className="h-3 w-3 mr-1" />
              Upload Avatar
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Nick Name */}
        <div className="space-y-2">
          <Label className="flex items-center gap-1">
            Nick Name <Info className="h-3 w-3 text-muted-foreground" /> <span className="text-red-500">*</span>
          </Label>
          <Input
            value={formData.nickName || ""}
            onChange={(e) => handleInputChange("nickName", e.target.value)}
            placeholder="Nick Name"
          />
        </div>

        {/* Employee ID */}
        <div className="space-y-2">
          <Label className="flex items-center gap-1">
            Employee ID <Info className="h-3 w-3 text-muted-foreground" />
          </Label>
          <Input
            value={formData.employeeId || ""}
            onChange={(e) => handleInputChange("employeeId", e.target.value)}
            placeholder="Employee ID"
          />
        </div>
      </div>

      {/* Key */}
      <div className="space-y-2">
        <Label className="flex items-center gap-1">
          Key <Info className="h-3 w-3 text-muted-foreground" />
        </Label>
        <Input
          value={formData.key || ""}
          onChange={(e) => handleInputChange("key", e.target.value)}
          placeholder="Key"
          className="max-w-md"
        />
      </div>

      {/* Role Management */}
      <div className="space-y-4 pt-4 border-t border-border">
        <h3 className="text-lg font-semibold text-foreground">Role Management</h3>
        <div className="space-y-2">
          <Label className="flex items-center gap-1">
            Select Role <Info className="h-3 w-3 text-muted-foreground" /> <span className="text-red-500">*</span>
          </Label>
          <Select
            value={formData.role}
            onValueChange={(value) => handleInputChange("role", value)}
          >
            <SelectTrigger className="max-w-md">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              {roleOptions.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Personal Details */}
      <div className="space-y-4 pt-4 border-t border-border">
        <h3 className="text-lg font-semibold text-foreground">Personal Details</h3>
        
        <div className="grid grid-cols-3 gap-4">
          {/* Date of Birth */}
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              Date Of Birth <Info className="h-3 w-3 text-muted-foreground" />
            </Label>
            <Input
              type="date"
              value={formData.dateOfBirth || ""}
              onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
            />
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              Gender <Info className="h-3 w-3 text-muted-foreground" />
            </Label>
            <Select
              value={formData.gender}
              onValueChange={(value) => handleInputChange("gender", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                {genderOptions.map((gender) => (
                  <SelectItem key={gender} value={gender}>
                    {gender}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Marital Status */}
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              Marital Status <Info className="h-3 w-3 text-muted-foreground" />
            </Label>
            <RadioGroup
              value={formData.maritalStatus}
              onValueChange={(value) => handleInputChange("maritalStatus", value)}
              className="flex items-center gap-4 pt-2"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="Single" id="single" />
                <Label htmlFor="single" className="font-normal">Single</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="Married" id="married" />
                <Label htmlFor="married" className="font-normal">Married</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Work Phone */}
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              Work Phone Number <Info className="h-3 w-3 text-muted-foreground" />
            </Label>
            <Input
              value={formData.workPhone || ""}
              onChange={(e) => handleInputChange("workPhone", e.target.value)}
              placeholder="Work Phone Number"
            />
          </div>

          {/* Personal Phone */}
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              Personal Phone Number <Info className="h-3 w-3 text-muted-foreground" />
            </Label>
            <Input
              value={formData.personalPhone || ""}
              onChange={(e) => handleInputChange("personalPhone", e.target.value)}
              placeholder="Personal Phone Number"
            />
          </div>
        </div>
      </div>

      {/* System Info */}
      <div className="space-y-4 pt-4 border-t border-border">
        <h3 className="text-lg font-semibold text-foreground">System Info</h3>
        
        <div className="grid grid-cols-3 gap-4">
          {/* Email */}
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              Email <Info className="h-3 w-3 text-muted-foreground" /> <span className="text-red-500">*</span>
            </Label>
            <Input
              type="email"
              value={formData.email || ""}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Email"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              Password <Info className="h-3 w-3 text-muted-foreground" />
            </Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              Confirm Password <Info className="h-3 w-3 text-muted-foreground" />
            </Label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center gap-3">
          <Label className="flex items-center gap-1">
            Status <Info className="h-3 w-3 text-muted-foreground" /> <span className="text-red-500">*</span>
          </Label>
          <Switch
            checked={formData.status}
            onCheckedChange={(checked) => handleInputChange("status", checked)}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t border-border">
        <Button onClick={handleSave} className="gap-2 bg-primary hover:bg-primary/90">
          <Check className="h-4 w-4" />
          Save Changes
        </Button>
        {!isNewStaff && (
          <Button variant="destructive" onClick={handleDelete} className="gap-2">
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        )}
      </div>
    </div>
  );
}
