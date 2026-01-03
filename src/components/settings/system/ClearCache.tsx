import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, AlertCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function ClearCache() {
  const [isClearing, setIsClearing] = useState(false);

  const handleClearCache = async () => {
    setIsClearing(true);
    // Simulate cache clearing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsClearing(false);
    // Show success message
    alert("Cache cleared successfully!");
  };

  return (
    <div className="space-y-6">
     
      <div className="flex justify-center items-center py-12">
        <div className="text-center max-w-md space-y-6">
          {/* Trash Icon Illustration */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-48 h-48 bg-muted/30 rounded-full flex items-center justify-center">
                <Trash2 className="w-24 h-24 text-muted-foreground" />
              </div>
              <div className="absolute top-0 right-0 w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-primary" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-foreground font-medium">
              Clearing the cache can help resolve issues with outdated data and improve system performance.
            </p>
            <p className="text-sm text-muted-foreground">
              Only use this option when necessary, as it may temporarily affect loading times.
            </p>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="lg"
                className="gap-2"
                disabled={isClearing}
              >
                <Trash2 className="w-4 h-4" />
                {isClearing ? "Clearing Cache..." : "Clear Cache"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action will clear all cached data. You may experience
                  slower loading times immediately after clearing the cache.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <Button variant="destructive" asChild>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                </Button>
                <AlertDialogAction onClick={handleClearCache}>
                  Clear Cache
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}