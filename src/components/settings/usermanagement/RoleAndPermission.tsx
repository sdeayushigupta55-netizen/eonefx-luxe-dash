import { useState } from "react";
import { Pencil, Trash2, Plus, X, ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { InputField } from "@/components/form/InputField";

/* ---------------- DATA ---------------- */

const roles = [
  "Manager",
  "Main Manager",
  "Finance Manager",
  "Compliance Officer",
];

const defaultPermissionGroups = [
  {
    key: "customer_management",
    label: "Customer Management",
    enabled: true,
    permissions: [
      { key: "list", label: "Customer List", enabled: true },
      {
        key: "default_staff",
        label: "Show All Users By Default To Staff",
        enabled: false,
      },
      { key: "create", label: "Customer Create", enabled: true },
      { key: "edit", label: "Customer Edit", enabled: false },
      { key: "export", label: "Customer Export", enabled: false },
      { key: "mail", label: "Customer Mail Send", enabled: false },
      {
        key: "password",
        label: "Customer Change Password",
        enabled: false,
      },
    ],
  },
  {
    key: "customer_profile",
    label: "Customer Profile Management",
    enabled: false,
    permissions: [],
  },
  {
    key: "customer_features",
    label: "Customer Features Management",
    enabled: false,
    permissions: [],
  },
];

/* ---------------- COMPONENT ---------------- */

export default function RoleAndPermission() {
  const [openModal, setOpenModal] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [roleName, setRoleName] = useState("");
  const [permissionGroups, setPermissionGroups] = useState(
    defaultPermissionGroups
  );

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Pagination calculations
  const totalItems = roles.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  const paginatedRoles = roles.slice(startIndex, endIndex);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  /* ---------- MODAL OPEN ---------- */

  const openAddModal = () => {
    setMode("add");
    setRoleName("");
    setPermissionGroups(defaultPermissionGroups);
    setOpenModal(true);
  };

  const openEditModal = (role: string) => {
    setMode("edit");
    setRoleName(role);
    setPermissionGroups(defaultPermissionGroups);
    setOpenModal(true);
  };

  const openDeleteModal = () => {
    
    setDeleteModalOpen(true);
  }

  /* ---------- TOGGLES ---------- */

  const toggleParent = (groupIndex: number, value: boolean) => {
    const updated = [...permissionGroups];
    updated[groupIndex].enabled = value;

    // when parent OFF → turn OFF all children
    if (!value) {
      updated[groupIndex].permissions.forEach(
        (p) => (p.enabled = false)
      );
    }

    setPermissionGroups(updated);
  };

  const toggleChild = (
    groupIndex: number,
    permissionIndex: number,
    value: boolean
  ) => {
    const updated = [...permissionGroups];
    updated[groupIndex].permissions[permissionIndex].enabled =
      value;
    setPermissionGroups(updated);
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">
          Roles & Permissions
        </h1>

        <Button onClick={openAddModal} className="flex gap-2">
          <Plus size={16} />
          Add New Role
        </Button>
      </div>

      {/* TABLE */}
      <Card>
        <CardContent className="p-0">
          <table className="w-full text-left">
            <thead className="bg-muted/60 text-sm">
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
                  <span className="rounded-md bg-red-600/20 px-4 py-2 text-sm font-semibold text-red-500">
                    Not Editable
                  </span>
                </td>
              </tr>

              {paginatedRoles.map((role, index) => (
                <tr key={role} className="border-t">
                  <td className="px-6 py-4">
                    {startIndex + index + 2}
                  </td>
                  <td className="px-6 py-4 font-medium">
                    {role}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => openEditModal(role)}
                      >
                        <Pencil size={14} />
                        Edit Permission
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                         
                          setDeleteModalOpen(true);
                        }}
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

      {/* FOOTER INFO + PAGINATION */}
      <div className="flex justify-between items-center mt-4 text-muted-foreground text-sm">
        <p>
          Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of{" "}
          {totalItems} Entries
        </p>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} />
          </Button>

          <span className="text-foreground">
            {currentPage} / {totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>

      {/* ================= MODAL ================= */}

      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <Card className="w-full max-w-5xl bg-card">
            <CardContent className="p-6 space-y-6">
              {/* HEADER */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  {mode === "add"
                    ? "Add New Role"
                    : "Edit Permissions"}
                </h2>

                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setOpenModal(false)}
                >
                  <X size={18} />
                </Button>
              </div>

              {/* ROLE NAME */}
              <InputField
                label="Role Name"
                value={roleName}
                disabled={mode === "edit"}
                onChange={(e) =>
                  setRoleName(e.target.value)
                }
                tooltip="Enter the name of user role"
              />

              {/* PERMISSIONS */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  All Permissions
                </h3>

                {permissionGroups.map((group, gIndex) => (
                  <div
                    key={group.key}
                    className="border rounded-lg"
                  >
                    {/* PARENT */}
                    <div className="flex items-center justify-between px-4 py-4 bg-muted/40">
                      <span className="font-medium">
                        {group.label}
                      </span>

                      <Switch
                        checked={group.enabled}
                        onCheckedChange={(value) =>
                          toggleParent(gIndex, value)
                        }
                      />
                    </div>

                    {/* CHILDREN (OPEN ONLY WHEN PARENT ON) */}
                    {group.enabled &&
                      group.permissions.length > 0 && (
                        <div className="grid grid-cols-3 gap-4 p-4">
                          {group.permissions.map(
                            (perm, pIndex) => (
                              <div
                                key={perm.key}
                                className="flex items-center justify-between border rounded-md px-4 py-3"
                              >
                                <span className="text-sm">
                                  {perm.label}
                                </span>

                                <Switch
                                  checked={perm.enabled}
                                  onCheckedChange={(value) =>
                                    toggleChild(
                                      gIndex,
                                      pIndex,
                                      value
                                    )
                                  }
                                />
                              </div>
                            )
                          )}
                        </div>
                      )}
                  </div>
                ))}
              </div>

              {/* ACTIONS */}
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  variant="destructive"
                  onClick={() => setOpenModal(false)}
                >
                  Cancel
                </Button>

                <Button>
                  {mode === "add"
                    ? "Add Role"
                    : "Save Changes"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
         {/* DELETE CONFIRM MODAL */}
        {deleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="w-full max-w-md rounded-xl bg-card border border-border p-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-900/30">
                <Trash2 className="text-red-500" size={28} />
              </div>

              <h2 className="text-2xl font-semibold mb-2">Are You Sure?</h2>
              <p className="mb-8">
                You want to delete?</p>

              <div className="flex justify-center gap-4">
                <Button onClick={openDeleteModal}>
                  Confirm
                </Button>
                <Button variant="destructive" className="px-6" onClick={() => setDeleteModalOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}
