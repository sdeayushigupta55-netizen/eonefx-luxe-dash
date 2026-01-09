import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { CustomAccountsTabs } from "./CustomAccountsTabs";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2, FileText } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { mockCustomForms, CustomAccountForm } from "./customAccountsData";
import { EditFormModal } from "./EditFormModal";
import { DeleteFormModal } from "./DeleteFormModal";

export function ManageForms() {
  const [forms, setForms] = useState<CustomAccountForm[]>(mockCustomForms);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState<CustomAccountForm | null>(null);

  const handleEdit = (form: CustomAccountForm) => {
    setSelectedForm(form);
    setEditModalOpen(true);
  };

  const handleDelete = (form: CustomAccountForm) => {
    setSelectedForm(form);
    setDeleteModalOpen(true);
  };

  const handleSaveEdit = (updatedForm: CustomAccountForm) => {
    setForms(forms.map(f => f.id === updatedForm.id ? updatedForm : f));
    setEditModalOpen(false);
    setSelectedForm(null);
  };

  const confirmDelete = () => {
    if (selectedForm) {
      setForms(forms.filter(f => f.id !== selectedForm.id));
    }
    setDeleteModalOpen(false);
    setSelectedForm(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold ">Custom Payment Account Forms</h1>
        
        <CustomAccountsTabs />
        
        {/* Table */}
        <Card className="bg-card border-border/50">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead className="text-muted-foreground">FORM NAME</TableHead>
                <TableHead className="text-muted-foreground">STATUS</TableHead>
                <TableHead className="text-muted-foreground">CREATED AT</TableHead>
                <TableHead className="text-muted-foreground">ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {forms.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                    No Data Available In Table
                  </TableCell>
                </TableRow>
              ) : (
                forms.map((form) => (
                  <TableRow key={form.id} className="border-border/50 hover:bg-accent/5">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium text-foreground">{form.formName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        form.status === "Active" 
                          ? "bg-green-500/20 text-green-400"
                          : "bg-gray-500/20 text-gray-400"
                      }`}>
                        {form.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{form.createdAt}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              onClick={() => handleEdit(form)}
                              className="p-1.5 rounded hover:bg-orange-500/20 text-muted-foreground hover:text-orange-400 transition-colors"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>Edit</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              onClick={() => handleDelete(form)}
                              className="p-1.5 rounded hover:bg-red-500/20 text-muted-foreground hover:text-red-400 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>Delete</TooltipContent>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </div>

      <EditFormModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        form={selectedForm}
        onSave={handleSaveEdit}
      />
      <DeleteFormModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        form={selectedForm}
        onConfirm={confirmDelete}
      />
    </DashboardLayout>
  );
}
