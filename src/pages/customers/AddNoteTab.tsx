import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { X, Check } from "lucide-react";

export function AddNoteTab() {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const handleAddNote = () => {
    if (!note.trim()) {
      setError("Please fill in this field.");
      return;
    }
    // Add note logic here
    setOpen(false);
    setNote("");
    setError("");
  };

  return (
    <Card className="bg-muted/30  p-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold text-foreground">Notes</h2>
        <Button
          
          onClick={() => setOpen(true)}
        >
          Add Notes
        </Button>
      </div>
      <Card className="bg-muted/40 rounded-b-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead >DESCRIPTION</TableHead>
              <TableHead>ADDED FROM</TableHead>
              <TableHead>DATE ADDED</TableHead>
              <TableHead>ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Called</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="inline-block h-10 w-10 rounded-full bg-yellow-400 flex items-center justify-center text-xl">
                    <span role="img" aria-label="avatar">🧑‍💼</span>
                  </span>
                  <div>
                    <div className="font-medium text-foreground">Super Admin</div>
                    <div className="text-muted-foreground text-sm">admin@brokeret.com</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>2025-11-18 19:45:02</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
         <div className="flex items-center justify-between px-4 py-2 border-t border-border/50 bg-muted/50 rounded-b-lg">
          <span className="text-muted-foreground text-sm">Showing 1 to 1 of 1 entries</span>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <span>&lt;</span>
            </Button>
            <Button variant="outline" size="icon" className="bg-primary text-primary-foreground border-primary">
              1
            </Button>
            <Button variant="outline" size="icon">
              <span>&gt;</span>
            </Button>
          </div>
        </div>
      </Card>

      {/* Add Note Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-card border-border max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-foreground">Add New Note</DialogTitle>
            <div className="text-muted-foreground text-base mt-1">
              Enter details for your Note Description
            </div>
          </DialogHeader>
          <form
            onSubmit={e => {
              e.preventDefault();
              handleAddNote();
            }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Note Description <span className="text-destructive">*</span>
              </label>
              <Textarea
                required
                value={note}
                onChange={e => {
                  setNote(e.target.value);
                  setError("");
                }}
                className="w-full min-h-[120px] bg-background border-border"
                placeholder="Enter note description"
              />
              {error && (
                <div className="text-destructive text-sm mt-1">{error}</div>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="submit"
                
              >
                <Check className="h-4 w-4 mr-2" />
                Add Note
              </Button>
              <Button
                variant="destructive"
                type="button"
                onClick={() => {
                  setOpen(false);
                  setError("");
                }}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

export default AddNoteTab;