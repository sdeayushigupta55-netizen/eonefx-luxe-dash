import { useState } from "react";
import {
  Pencil,
  Trash2,
  Plus,
  X,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export default function RoleAndPermission() {
  const [openAddRole, setOpenAddRole] = useState(false);

  const permissions = [
    "Customer Management",
    "Customer Profile Management",
    "Customer Features Management",
    "Leads Management",
    "Deposit Management",
    "Withdraw Management",
    "KYC Management",
  ];

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Roles & Permissions</h1>

        <Button
          className="flex gap-2 "
          onClick={() => setOpenAddRole(true)}
        >
          <Plus size={16} />
          Add New Role
        </Button>
      </div>

      {/* TABLE */}
      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-muted/60">
              <tr>
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">NAME</th>
                <th className="px-6 py-4">ACTION</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-t">
                <td className="px-6 py-4">1</td>
                <td className="px-6 py-4 font-medium">
                  Super Admin
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-2 rounded-md bg-red-600/20 px-4 py-2 text-sm font-semibold text-red-500">
                    Not Editable
                  </span>
                </td>
              </tr>

              {[
                "Manager",
                "Main Manager",
                "Finance Manager",
                "Compliance Officer",
              ].map((role, index) => (
                <tr key={role} className="border-t">
                  <td className="px-6 py-4">
                    {index + 2}
                  </td>
                  <td className="px-6 py-4 font-medium">
                    {role}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex gap-2 "
                      >
                        <Pencil size={14} />
                        Edit Permission
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                      >
                        <Trash2 size={14} />
                        Delete Role
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* ================= MODAL ================= */}
      {openAddRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <Card className="w-full max-w-3xl bg-card">
            <CardContent className="p-6 space-y-6">
              {/* MODAL HEADER */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  Add New Role
                </h2>

                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setOpenAddRole(false)}
                >
                  <X size={18} />
                </Button>
              </div>

              {/* ROLE NAME */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  Role Name
                  <Info
                    size={14}
                    className="text-muted-foreground"
                  />
                </label>

                <Input
                  placeholder="Enter role name"
                  required
                />
              </div>

              {/* PERMISSIONS */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  All Permissions
                </h3>

                <div className="border rounded-lg divide-y divide-border">
                  {permissions.map((permission) => (
                    <div
                      key={permission}
                      className="flex items-center gap-3 px-4 py-4 hover:bg-muted/30"
                    >
                      <Checkbox defaultChecked />
                      <span className="text-sm font-medium">
                        {permission}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* MODAL ACTIONS */}
              <div className="flex justify-end gap-3 pt-4">
                
                <Button >Add New Role</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
